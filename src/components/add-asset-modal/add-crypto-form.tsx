import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import CryptocurrencySearchBox from "../cryptocurrency-search-box";
import SlideToSubmit from "../slide-to-submit";
import { fetchCoinInfo } from "../../utils/cryptocurrencyService";
import CryptoInformationTable from "./crypto-information-table";
import { convertCoinGeckoApiCoinObjectToDTO } from "../../lib/portfolio-asset-utils";

const formSchema = z.object({
  token: z.string().min(1, "Token name is required"),
  holdings: z.number().min(0, "Holdings must be a positive number"),
  fiat: z.number().min(0, "Fiat amount must be a positive number")
});

type FormValues = z.infer<typeof formSchema>;

type AddCryptoFormProps = {
  onSubmit: (asset) => void;
};

const AddCryptoForm: FC<AddCryptoFormProps> = ({ onSubmit }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [tokenInformation, setTokenInformation] = useState<Record<string, unknown>>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      token: "",
      holdings: 0,
      fiat: 0
    }
  });

  const handleFormSubmit = (values: FormValues) => {
    const asset = { ...values, ...tokenInformation };
    const cryptoAssetDTO = convertCoinGeckoApiCoinObjectToDTO(asset);

    // clean form
    form.reset();
    setTokenInformation(undefined);

    onSubmit(cryptoAssetDTO);
  };

  const normalizeToken = (token: string): string => `${token}-USD`;

  const fetchTokenInformation = token => {
    const normalizedToken = normalizeToken(token);
    fetchCoinInfo(normalizedToken)
      .then(tokenInfo => {
        setTokenInformation(tokenInfo);
      })
      .catch(e => {
        console.error(e);
      })
      .finally(() => {
        console.log("request completed");
      });
  };

  return (
    <Form {...form}>
      <form>
        <section className="px-2 py-2">
          <FormField
            control={form.control}
            name="token"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Token name</FormLabel>
                <FormControl>
                  <CryptocurrencySearchBox
                    hideHeader
                    cyptocurrency={searchTerm}
                    setCyptocurrency={token => {
                      setSearchTerm(token);
                      fetchTokenInformation(token);
                      field.onChange(token);
                    }}
                  />
                </FormControl>
                <FormDescription>Select Cryptocurrency</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="holdings"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Token Holdings</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="1000"
                    {...field}
                    onChange={e => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormDescription>Enter the number of tokens you own</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fiat"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fiat</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="500"
                    {...field}
                    onChange={e => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormDescription>Fiat spent on acquiring holdings</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {tokenInformation ? <CryptoInformationTable coin={tokenInformation} /> : null}
          <SlideToSubmit onSubmit={form.handleSubmit(handleFormSubmit)} />
        </section>
      </form>
    </Form>
  );
};

export default AddCryptoForm;
