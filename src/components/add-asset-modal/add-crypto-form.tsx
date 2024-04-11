import { useForm } from "@mantine/form";
import { Input, NumberInput } from "@mantine/core";
import { FC, useState } from "react";
import CryptocurrencySearchBox from "../cryptocurrency-search-box";
import SlideToSubmit from "../slide-to-submit";
import { fetchCoinInfo } from "../../utils/cryptocurrencyService";
import CryptoInformationTable from "./crypto-information-table";
import { convertCoinGeckoApiCoinObjectToDTO } from "../../lib/portfolio-asset-utils";

type AddCryptoFormProps = {
  onSubmit: (asset) => void;
};

const AddCryptoForm: FC<AddCryptoFormProps> = ({ onSubmit }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [tokenInformation, setTokenInformation] = useState<Record<string, unknown>>(null);
  const form = useForm({
    initialValues: {
      token: "",
      holdings: 0,
      fiat: 0
    }

    // validationRules: {
    //   email: (value) => /^\S+@\S+$/.test(value),
    // },
  });

  const handleFormSubmit = form.onSubmit(values => {
    const asset = { ...values, ...tokenInformation };
    const cryptoAssetDTO = convertCoinGeckoApiCoinObjectToDTO(asset);

    // clean form
    // TODO: reset cryptocurrency searchbox
    form.reset();
    setTokenInformation(undefined);

    onSubmit(cryptoAssetDTO);
  });
  const fetchTokenInformation = token => {
    fetchCoinInfo(token)
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
    <form>
      <section className="px-2 py-2">
        <Input.Wrapper
          id="cryptocurrency-searchbox"
          required
          label="Token name"
          description="Select Cryptocurrency"
          className="pb-2"
        >
          <CryptocurrencySearchBox
            hideHeader
            cyptocurrency={searchTerm}
            setCyptocurrency={token => {
              setSearchTerm(token);
              fetchTokenInformation(token);
              form.setFieldValue("token", token);
            }}
          />
        </Input.Wrapper>
        <NumberInput
          id="cryptocurrency-holdings"
          required
          label="Token Holdings"
          description="Enter the number of tokens you own"
          className="pb-2"
          placeholder="1000"
          variant="filled"
          value={form.values.holdings}
          onChange={value => form.setFieldValue("holdings", Number(value))}
        />

        <NumberInput
          id="cryptocurrency-fiat"
          required
          label="Fiat"
          description="Fiat spent on acquiring holdings"
          className="pb-2"
          placeholder="500"
          variant="filled"
          value={form.values.fiat}
          onChange={value => form.setFieldValue("fiat", Number(value))}
        />

        {tokenInformation ? <CryptoInformationTable coin={tokenInformation} /> : null}
        <SlideToSubmit onSubmit={handleFormSubmit} />
      </section>
    </form>
  );
};

export default AddCryptoForm;
