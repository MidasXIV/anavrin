import { FC, useEffect, useState } from "react";
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
import SlideToSubmit from "../slide-to-submit";
import { fetchCoinInfo } from "../../utils/cryptocurrencyService";
import CryptoInformationTable from "../add-asset-modal/crypto-information-table";
import { convertYahooFinanceCoinInfoObjectToDTO } from "../../lib/portfolio-asset-utils";

const formSchema = z.object({
  token: z.string().min(1, "Token name is required"),
  holdings: z.number().min(0, "Holdings must be a positive number"),
  fiat: z.number().min(0, "Fiat amount must be a positive number")
});

type FormValues = z.infer<typeof formSchema>;

type EditCryptoFormProps = {
  asset: CryptoAssetDTO;
  onSubmit: (assetDTO) => void;
};

const EditCryptoForm: FC<EditCryptoFormProps> = ({ asset, onSubmit }) => {
  const [tokenInformation, setTokenInformation] = useState<Record<string, unknown>>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      token: asset.token,
      holdings: asset.holdings,
      fiat: asset.fiat
    }
  });

  const handleFormSubmit = (values: FormValues) => {
    const _asset = { ...tokenInformation, ...values };
    const cryptoAssetDTO = convertYahooFinanceCoinInfoObjectToDTO(_asset);
    onSubmit(cryptoAssetDTO);
  };

  const fetchTokenInformation = _token => {
    fetchCoinInfo(_token)
      .then(tokenInfo => {
        const dto = convertYahooFinanceCoinInfoObjectToDTO(tokenInfo);
        setTokenInformation(dto as unknown as Record<string, unknown>);
      })
      .catch(e => {
        console.error(e);
      })
      .finally(() => {
        console.log("request completed");
      });
  };

  useEffect(() => {
    form.reset();
    fetchTokenInformation(asset.token);

    return () => {
      console.log("resetting form");
      setTokenInformation(null);
      form.reset();
    };
  }, [asset]);

  return (
    <Form {...form}>
      <form>
        <section className="px-2 py-2">
          {tokenInformation ? <CryptoInformationTable coin={tokenInformation} /> : null}
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

          <SlideToSubmit onSubmit={form.handleSubmit(handleFormSubmit)} />
        </section>
      </form>
    </Form>
  );
};

export default EditCryptoForm;
