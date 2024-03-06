import { useForm } from "@mantine/form";
import { NumberInput } from "@mantine/core";
import { FC, useEffect, useState } from "react";
import SlideToSubmit from "../slide-to-submit";
import { fetchCoinInfo } from "../../utils/cryptocurrencyService";
import CryptoInformationTable from "../add-asset-modal/crypto-information-table";
import { convertCoinGeckoApiCoinObjectToDTO } from "../../lib/portfolio-asset-utils";

type EditCryptoFormProps = {
  asset: CryptoAssetDTO;
  onSubmit: (assetDTO) => void;
};

const EditCryptoForm: FC<EditCryptoFormProps> = ({ asset, onSubmit }) => {
  const [tokenInformation, setTokenInformation] = useState<Record<string, unknown>>(null);

  const form = useForm({
    initialValues: {
      token: asset.token,
      holdings: asset.holdings,
      fiat: asset.fiat
    }

    // validationRules: {
    //   email: (value) => /^\S+@\S+$/.test(value),
    // },
  });

  const handleFormSubmit = form.onSubmit(values => {
    const _asset = { ...values, ...tokenInformation };
    const cryptoAssetDTO = convertCoinGeckoApiCoinObjectToDTO(_asset);
    onSubmit(cryptoAssetDTO);
  });

  const fetchTokenInformation = _token => {
    fetchCoinInfo(_token)
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
    <form>
      <section className="px-2 py-2">
        {tokenInformation ? <CryptoInformationTable coin={tokenInformation} /> : null}
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
        <SlideToSubmit onSubmit={handleFormSubmit} />
      </section>
    </form>
  );
};

export default EditCryptoForm;
