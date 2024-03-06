import { parse } from "node-xlsx";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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
import {
  ArrowRightIcon,
  CaretLeftIcon,
  LoopIcon,
  ThickArrowUpIcon,
  TimerIcon
} from "@radix-ui/react-icons";
import { AssetType } from "lib/portfolio-utils";
import { ValidationResult, validateData } from "./utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Separator } from "../ui/separator";

const ValidationBlock: React.FC<{
  validationResult: ValidationResult;
  onUpload: (assetType, items) => void;
}> = ({ validationResult, onUpload }) => (
  <div className="py-6 font-chakra">
    <Accordion type="multiple">
      <AccordionItem value="valid-items" className="my-2 rounded-xl bg-neutral-100">
        <AccordionTrigger className="p-3">
          <div className="flex flex-row justify-start gap-4">
            <span className="font-bold">Valid entries</span>
            <div className="flex flex-col items-center justify-center rounded-full bg-green-100 px-2 text-xs text-green-500">
              <p>
                {validationResult.valid.length}/
                {validationResult.valid.length + validationResult.invalid.length}
              </p>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="p-4 pt-0 text-xs">
          <Separator className="mb-4 bg-neutral-300" />
          <div className="mt-4 flex flex-col items-start justify-start gap-4">
            {validationResult.valid.map((item, index) => (
              <div key={index} className="flex w-full flex-row items-center justify-between">
                <p className="w-1/3 text-neutral-500">{item.token}</p>
                <p className="w-1/3 px-3 text-right font-medium">{item.fiat}</p>
                <p className="w-1/3 px-3 text-right font-medium">{item.shares}</p>
              </div>
            ))}
          </div>
          <Separator className="my-4 bg-neutral-300" />
          <Button
            type="button"
            onClick={() => onUpload(AssetType.STOCK, validationResult.valid)}
            className="mb-2 w-full rounded-full border border-gray-300 bg-neutral-100 px-4 py-1 text-sm text-neutral-500 transition-all hover:cursor-pointer hover:bg-neutral-200 hover:text-black dark:hover:bg-neutral-800"
          >
            <ArrowRightIcon className="mr-1 inline-block h-4 w-4 text-neutral-600" />
            Proceed with following entries
          </Button>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="invalid-items" className="my-2 rounded-xl bg-neutral-100">
        <AccordionTrigger className="p-3">
          <div className="flex flex-row justify-start gap-4">
            <span className="font-bold">Invalid entries</span>
            <div className="flex flex-col items-center justify-center rounded-full bg-red-100 px-2 text-xs text-red-500">
              <p>
                {validationResult.invalid.length}/
                {validationResult.valid.length + validationResult.invalid.length}
              </p>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="p-4 pt-0 text-xs">
          <Separator className="mb-4 bg-neutral-300" />
          <div className="mt-4 flex flex-col items-start justify-start gap-4">
            {validationResult.invalid.map((item, index) => (
              <div key={index} className="flex w-full flex-row items-center justify-between">
                <p className="text-neutral-500">{item.token}</p>
                {/* Render other properties as needed */}
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
);

const UploadedPortfolioParser = ({ file, columnLabels, onUpload }) => {
  // Generate schema dynamically based on provided column labels
  const schema = z.object(
    Object.fromEntries(
      columnLabels.map(label => [
        label,
        z.string({ required_error: `Please select a ${label} to display.` })
      ])
    )
  );

  const form = useForm({
    resolver: zodResolver(schema)
  });

  const [sheetData, setSheetData] = useState(undefined);
  const [validationData, setValidationData] = useState(undefined);

  function onSubmit(data) {
    toast(`You submitted the following values: ${JSON.stringify(data, null, 2)}`);
    const tokenIndex = sheetData?.data?.[0].indexOf(data[columnLabels[0]]);
    const fiatIndex = sheetData?.data?.[0].indexOf(data[columnLabels[1]]);
    const sharesIndex = sheetData?.data?.[0].indexOf(data[columnLabels[2]]);

    const dataObj = sheetData?.data.map(sheetDatum => ({
      token: sheetDatum[tokenIndex],
      fiat: sheetDatum[fiatIndex],
      shares: sheetDatum[sharesIndex]
    }));
    const validationDataObj = validateData(dataObj);
    console.log(validationDataObj);
    setValidationData(validationDataObj);
  }

  useEffect(() => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const data = new Uint8Array(e.target.result as ArrayBuffer);
      const workSheetsFromBuffer = parse(data);
      const sheet = workSheetsFromBuffer?.[0]?.data.filter(datum => datum.length);
      setSheetData({ name: workSheetsFromBuffer?.[0]?.name, data: sheet });
    };
    reader.readAsArrayBuffer(file);
  }, [file]);

  console.log("Uploaded portfolio parser -> render");

  return (
    <div className="pb-6">
      <div className="flex items-center justify-between">
        <Button
          // onClick={cancel}
          className="mb-2 rounded-full border border-gray-300 bg-neutral-100 px-4 py-1 text-sm text-neutral-500 transition-all hover:cursor-pointer hover:bg-neutral-200 hover:text-black dark:hover:bg-neutral-800"
        >
          <CaretLeftIcon className="mr-1 inline-block h-4 w-4 text-neutral-600" />
          Back
        </Button>

        <Button
          className="mb-2 rounded-full border border-gray-300 bg-neutral-100 px-4 py-1 text-sm text-neutral-500 transition-all hover:cursor-pointer hover:bg-neutral-200 hover:text-black dark:hover:bg-neutral-800"
          // onClick={() => setFiles([])}
        >
          <LoopIcon className="mr-1 inline-block h-4 w-4" />
          Reset
        </Button>

        <Button
          // onClick={() => {
          //   setUploadedPortfolio(files[0]);
          // }}
          // disabled={files.length < 1}
          className="mb-2 rounded-full border border-gray-300 bg-neutral-100 px-4 py-1 text-sm text-neutral-500 transition-all hover:cursor-pointer hover:bg-neutral-200 hover:text-black dark:hover:bg-neutral-800"
        >
          <ArrowRightIcon className="mr-1 inline-block h-4 w-4 text-neutral-600" />
          Next
        </Button>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
          {columnLabels.map((label, index) => (
            <FormField
              key={index}
              control={form.control}
              name={label}
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <FormLabel>{label}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-[280px]">
                        <SelectValue placeholder={`Select a ${label} to display`} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sheetData?.data?.[0].map((datum, index) => (
                        <SelectItem key={index} value={datum}>
                          {datum}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          {/* <Button type="submit" className="w-full">
            Validate
          </Button> */}
          <Button
            type="submit"
            className="mb-2 w-full rounded-full border border-gray-300 bg-neutral-100 px-4 py-1 text-sm text-neutral-500 transition-all hover:cursor-pointer hover:bg-neutral-200 hover:text-black dark:hover:bg-neutral-800"
          >
            <ArrowRightIcon className="mr-1 inline-block h-4 w-4 text-neutral-600" />
            Validate
          </Button>
        </form>
      </Form>

      {validationData ? (
        <ValidationBlock validationResult={validationData} onUpload={onUpload} />
      ) : null}
    </div>
  );
};
export default UploadedPortfolioParser;
