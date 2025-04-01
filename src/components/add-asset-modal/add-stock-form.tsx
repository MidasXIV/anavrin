import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SlideToSubmit from "../slide-to-submit";
import StockSearchCombobox from "../stock-search-combobox";
import StockInformationTable from "./stock-information-table";
import getStockInformation from "../../utils/getStockInformation";
import { convertDividendDataToDTO } from "../../lib/portfolio-asset-utils";

const formSchema = z.object({
  ticker: z.string().min(1, "Ticker is required"),
  shares: z.number().min(0, "Shares must be a positive number"),
  fiat: z.number().min(0, "Buy price must be a positive number")
});

type FormValues = z.infer<typeof formSchema>;

type AddStockFormProps = {
  onSubmit: (asset) => void;
};

const AddStockForm: FC<AddStockFormProps> = ({ onSubmit }) => {
  enum SearchState {
    STABLE = "STABLE",
    SUCCESS = "SUCCESS",
    PENDING = "PENDING",
    FAILURE = "FAILURE"
  }

  const [searchTerm, setSearchTerm] = useState("");
  const [searchState, setSearchState] = useState(SearchState.STABLE);
  const [stockInformation, setStockInformation] = useState<Record<string, unknown>>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ticker: "",
      shares: 0,
      fiat: 0
    }
  });

  const handleFormSubmit = (values: FormValues) => {
    const asset = { ...values, ...stockInformation };
    const dividendAssetDTO = convertDividendDataToDTO(asset);
    onSubmit(dividendAssetDTO);
  };

  const updateStockInformation = async stockTicker => {
    setStockInformation(null);
    setSearchState(SearchState.PENDING);
    try {
      const { status, data: stockData } = await getStockInformation(stockTicker);
      if (status === 200) {
        setStockInformation(stockData);
        setSearchState(SearchState.SUCCESS);
      } else {
        setSearchState(SearchState.FAILURE);
      }
    } catch (e) {
      console.error(e);
      setSearchState(SearchState.FAILURE);
    } finally {
      console.log("request completed");
    }
  };

  return (
    <Form {...form}>
      <form>
        <section className="px-2 py-2">
          <FormField
            control={form.control}
            name="ticker"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ticker</FormLabel>
                <FormControl>
                  <StockSearchCombobox
                    searchTerm={searchTerm}
                    setSearchTerm={ticker => {
                      setSearchTerm(ticker);
                      updateStockInformation(ticker);
                      field.onChange(ticker);
                    }}
                    state={searchState}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="shares"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Shares</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="10"
                    {...field}
                    onChange={e => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fiat"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Buy Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="500"
                    {...field}
                    onChange={e => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {stockInformation ? <StockInformationTable stock={stockInformation} /> : null}
          <SlideToSubmit onSubmit={form.handleSubmit(handleFormSubmit)} />
        </section>
      </form>
    </Form>
  );
};

export default AddStockForm;
