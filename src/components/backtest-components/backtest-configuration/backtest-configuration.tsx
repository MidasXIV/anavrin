import { zodResolver } from "@hookform/resolvers/zod";
import { Control, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/utils/shadcn";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from "@/components/ui/command";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useState } from "react";
import api from "services/create-service";
import clsx from "clsx";
import StockSearchCombobox from "@/components/stock-search-combobox";
import { encrypt } from "lib/crypto";
import { gunzipSync, gzipSync, inflateSync } from "zlib";
import CommandSearch from "../backtest-analysis/stock-search";

const portfolioConfigSchema = z.object({
  ticker: z.string().min(1, { message: "Non valid ticker" }),
  // portfolioDistribution: z.array(z.number().refine(distribution => distribution > 1))
  portfolioDistribution: z.array(
    z.object({
      distribution: z.string()
    })
  )
});
const formSchema = z
  .object({
    benchmark: z.string().min(2, {
      message: "Benchmark must be at least 2 characters."
    }),
    initialInvestment: z.coerce // SOLUTION
      .number()
      .min(100, {
        message: "Initial investment must be greater than 0."
      }),
    startYear: z.string(),
    endYear: z.string(),
    numberOfPortfolios: z
      .string()
      .min(1, {
        message: "Number of portfolios must be greater than 1."
      })
      .max(5, {
        message: "Number of portfolios must be lesser than 5."
      }),
    portfolioConfig: z.array(portfolioConfigSchema)
  })
  .refine(
    data => {
      const { portfolioConfig: distribution } = data;
      const isValidDistribution = distribution
        .reduce((result, item) => {
          const portfolioDistributionColumn = item.portfolioDistribution.map(
            row => row.distribution
          );
          result.push(portfolioDistributionColumn);
          return result;
        }, [])
        .reduce((acc, item, index) => {
          if (index === 0) {
            return item.map(a => parseInt(a, 10));
          }
          return acc.map((a, ind) => a + parseInt(item[ind], 10));
        }, [])
        .every(column => column === 100);
      console.log(isValidDistribution);
      return isValidDistribution;
    },
    {
      message: "Sum of distribution values must equal 100.",
      path: ["portfolioConfig"]
    }
  );

type FormSchemaType = z.infer<typeof formSchema>;

type NestedOptionValueFormProps = {
  nestIndex: number;
  control: Control<FormSchemaType>;
};

const NestedOptionValueForm = ({ nestIndex, control }: NestedOptionValueFormProps) => {
  const portfolioDistribution = useFieldArray({
    control,
    name: `portfolioConfig.${nestIndex}.portfolioDistribution`
  });
  return (
    <>
      {portfolioDistribution.fields.map((field, index) => (
        <FormField
          key={field.id}
          control={control}
          name={`portfolioConfig.${nestIndex}.portfolioDistribution.${index}.distribution`}
          render={({ field }) => (
            <FormItem className="flex w-full items-center border-gray-300 px-2 md:border-l-2">
              <FormControl>
                <>
                  <span className="w-full border-r-2 border-gray-300 md:hidden">{`Portfolio ${
                    index + 1
                  }`}</span>
                  <Input max="100" min="0" step="1" type="number" className="mr-2" {...field} />
                  <span className="text-gray-500 dark:text-gray-300">%</span>
                </>
              </FormControl>
            </FormItem>
          )}
        />
      ))}
    </>
  );
};
function convertData(data) {
  return {
    benchmark: data.benchmark,
    initialInvestment: data.initialInvestment,
    startYear: data.startYear,
    endYear: data.endYear,
    portfolioConfig: data.portfolioConfig.map(portfolio => ({
      ticker: portfolio.ticker,
      portfolioDistribution: portfolio.portfolioDistribution.map(distribution => ({
        distribution: parseFloat(distribution.distribution)
      }))
    }))
  };
}

const BacktestConfiguration = ({
  defaultConfiguration: configuration,
  setAnalysisData,
  setConfiguration
}) => {
  // const currentYear = new Date().getFullYear();
  // const years = Array.from({ length: currentYear - 1985 }, (_, i) => 1985 + i);
  const years = [
    1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000,
    2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016,
    2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024
  ];

  const defaultConfiguration = {
    benchmark: "^BSESN",
    initialInvestment: 100,
    startYear: "1985",
    endYear: "2020",
    numberOfPortfolios: "2",
    portfolioConfig: [
      {
        ticker: "HDFCBANK.NS",
        portfolioDistribution: [{ distribution: "40" }, { distribution: "50" }]
      },
      {
        ticker: "TCS.NS",
        portfolioDistribution: [{ distribution: "60" }, { distribution: "50" }]
      }
    ]
  };
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: configuration ?? defaultConfiguration
  });

  const { fields, append, update } = useFieldArray({
    name: "portfolioConfig",
    control: form.control
  });

  const [rowCount, setRowCount] = useState(3);
  const numberOfPortfolios: string = form.watch("numberOfPortfolios").toString();

  const getDefaultPortfolioDistribution = numberOfPortfolio => {
    const val = Math.round(100 / numberOfPortfolio);
    return new Array(numberOfPortfolio).fill({ distribution: "0" });
  };

  // 2. Define a submit handler.
  async function onSubmit(data: z.infer<typeof formSchema>) {
    toast(`You submitted the following values:${JSON.stringify(data, null, 2)}`);
    // const compressedString = gzipSync(JSON.stringify(data)).toString("base64");

    // const buffer = Buffer.from(compressedString, "base64");
    // const inflatedBuffer = gunzipSync(buffer);
    // const decompressedString = inflatedBuffer.toString("utf8");

    // console.log(compressedString);
    // console.log(decompressedString);
    // toast(compressedString);
    try {
      setConfiguration(data);

      const postRequestData = convertData(data);
      const response = await api.postBacktestAnalyze(postRequestData);

      if (response.status === 200) {
        // Email saved successfully
        setAnalysisData(response.data);
      } else if (response.status === 409) {
        // User is already subscribed
        // setError("You are already subscribed.");
      } else {
        // Other error occurred
        // setError("An error occurred. Please try again later.");
      }
    } catch (err) {
      console.log(err);
      // console.error("Error:", err);
      // setError("An error occurred. Please try again later.");
    }
  }

  const portfolioConfigData = form.watch("portfolioConfig");
  const portfolioAggregateDistribution = portfolioConfigData
    .reduce((result, item) => {
      const portfolioDistributionColumn = item.portfolioDistribution.map(row => row.distribution);
      result.push(portfolioDistributionColumn);
      return result;
    }, [])
    .reduce((acc, item, index) => {
      if (index === 0) {
        return item.map(a => parseInt(a, 10));
      }
      return acc.map((a, ind) => a + parseInt(item[ind], 10));
    }, []);

  const addRow = () => {
    const numberOfPortfoliosInt = parseInt(numberOfPortfolios, 10);
    setRowCount(rowCount + 1);
    append({
      ticker: "HDFCBANK.NS",
      portfolioDistribution: getDefaultPortfolioDistribution(numberOfPortfoliosInt)
    });
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <section className="flex max-h-full max-w-full flex-col border-b-2 border-gray-300 md:flex-row">
            <div className="w-full space-y-4 border-gray-300 p-4 md:border-r-2">
              <FormField
                control={form.control}
                name="benchmark"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Benchmark</FormLabel>
                    <FormControl>
                      <Input placeholder="^BSESN" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the benchmark ticker your portfolios will be compared against.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="initialInvestment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Initial Investment</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Initial Investment" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the initial investment for your portfolio.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full space-y-4 p-4">
              {/* <FormField
              control={form.control}
              name="startYear"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Start Year</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? years.find(year => year === field.value) : "Select year"}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command className="rounded-lg border shadow-md">
                        <CommandInput placeholder="Search framework..." className="h-9" />
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                          {years.map(year => (
                            <CommandItem
                              value={year.toString()}
                              key={year.toString()}
                              onSelect={() => {
                                form.setValue("startYear", year);
                              }}
                            >
                              {year.toString()}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  year === field.value ? "opacity-100" : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription>This is the start year for your portfolio.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
              <FormField
                control={form.control}
                name="startYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Year</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="1985" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {years.map(year => (
                          <SelectItem value={year.toString()} key={year.toString()}>
                            {year.toString()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>This is the start year for your portfolio.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Year</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="2020" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {years.map(year => (
                          <SelectItem value={year.toString()} key={year.toString()}>
                            {year.toString()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>This is the end year for your portfolio.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <FormField
                control={form.control}
                name="numberOfPortfolios"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Portfolios</FormLabel>
                    <FormControl>
                      
                      <CommandSearch {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the number of portfolios for your portfolio.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
            </div>
          </section>
          <section>
            <h1 className="w-full border-b-2 border-gray-300 px-2 py-3 text-center text-xl font-light">
              Portfolio configuration
            </h1>

            <div className="hidden w-full items-center rounded-md border border-gray-300 p-2 md:flex">
              <span className="w-full border-r-2 border-gray-300 font-medium" />
              <span className="w-full border-r-2 border-gray-300 font-medium" />
              {Array.from({ length: Number(numberOfPortfolios) }, (_, index) => (
                <div
                  key={index.toString()}
                  className="flex w-full items-center justify-center border-l-2 border-gray-300 px-1 text-center"
                >
                  <span className="w-full border-gray-300 font-medium">{`Portfolio ${
                    index + 1
                  }`}</span>
                </div>
              ))}
            </div>
            {fields.map((field, index2) => (
              <div
                key={field.id}
                className="mb-2 flex w-full flex-col items-center rounded-md border border-gray-300 p-2 md:flex-row"
              >
                <span className="w-full border-gray-300 pl-4 font-medium md:border-r-2 md:pl-0">
                  {`Asset ${index2 + 1}`}
                </span>
                <CommandSearch form={form} fieldName={`portfolioConfig.${index2}.ticker`} />
                <NestedOptionValueForm control={form.control} nestIndex={index2} />
              </div>
            ))}
            <div className="flex w-full flex-col items-center rounded-md border border-gray-300 p-2 md:flex-row">
              <span className="hidden w-full border-r-2 border-gray-300 font-medium md:block" />
              <span className="hidden w-full border-r-2 border-gray-300 font-medium md:block" />
              {Array.from({ length: Number(numberOfPortfolios) }, (_, index) => (
                <div key={`oriocorio_${index}`} className="flex w-full space-y-2 md:space-y-0">
                  <span className="w-full border-gray-300 px-2 md:hidden">{`Portfolio ${
                    index + 1
                  }`}</span>
                  <div
                    key={index.toString()}
                    className="flex w-full items-center justify-center border-l-2 border-gray-300 px-2 text-center md:px-1"
                  >
                    <span className="flex w-full items-center border-gray-300 px-2 font-medium text-black">
                      <Input
                        disabled
                        value={portfolioAggregateDistribution[index]?.toString()}
                        className={clsx("mr-2  font-bold text-black", {
                          "bg-red-200": portfolioAggregateDistribution[index] !== 100,
                          "bg-green-200": portfolioAggregateDistribution[index] === 100
                        })}
                      />
                      <span className="">%</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <FormField
                control={form.control}
                name="numberOfPortfolios"
                render={({ field }) => (
                  <FormItem className="flex w-1/2 items-center align-middle">
                    <FormLabel className="w-1/2">Number of Portfolios</FormLabel>
                    <Select
                      onValueChange={event => {
                        field.onChange(event);
                        const numberOfPortfoliosInt = parseInt(event, 10);
                        portfolioConfigData.forEach((row, index) => {
                          const portfolioDistributionLength = row.portfolioDistribution?.length;
                          if (portfolioDistributionLength !== numberOfPortfoliosInt) {
                            const newRow = row;
                            if (portfolioDistributionLength > numberOfPortfoliosInt) {
                              newRow.portfolioDistribution.splice(
                                numberOfPortfoliosInt - portfolioDistributionLength
                              );
                            } else {
                              const distribution = newRow.portfolioDistribution.concat(
                                new Array(numberOfPortfoliosInt - portfolioDistributionLength).fill(
                                  {
                                    distribution: "0"
                                  }
                                )
                              );
                              newRow.portfolioDistribution = distribution;
                            }
                            update(index, newRow);
                            console.log(row);
                          }
                        });
                      }}
                      defaultValue={field.value.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Number of Portfolios" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map(year => (
                          <SelectItem value={year.toString()} key={year.toString()}>
                            {year.toString()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {/* <FormDescription>
                      This is the number of portfolios for your portfolio.
                    </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="button" onClick={addRow}>
                Add Row
              </Button>
            </div>
          </section>

          {form.formState?.errors?.portfolioConfig?.root?.message
            ? form.formState?.errors?.portfolioConfig?.root?.message
            : null}
          <Button type="submit" className="mt-4 w-full p-2 font-thin">
            Analyse portfolio
          </Button>
        </form>
      </Form>
    </>
  );
};

export default BacktestConfiguration;
