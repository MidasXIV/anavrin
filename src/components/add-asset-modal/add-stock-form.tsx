import { useForm } from "@mantine/form";
import { Input, NumberInput } from "@mantine/core";
import { FC, useState } from "react";
import SlideToSubmit from "../slide-to-submit";
import StockSearchCombobox from "../stock-search-combobox";
import StockInformationTable from "./stock-information-table";
import getStockInformation from "../../util/getStockInformation";

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

  const form = useForm({
    initialValues: {
      ticker: "",
      shares: 0,
      fiat: 0
    }

    // validationRules: {
    //   email: (value) => /^\S+@\S+$/.test(value),
    // },
  });

  const handleFormSubmit = form.onSubmit(values => {
    const asset = { ...values, ...stockInformation };
    console.log(asset);
    onSubmit(asset);
  });

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
    <form>
      <section className="px-2 py-2">
        <Input.Wrapper id="stock-searchbox" required label="Ticker" className="pb-2">
          <StockSearchCombobox
            searchTerm={searchTerm}
            setSearchTerm={ticker => {
              setSearchTerm(ticker);
              updateStockInformation(ticker);
              form.setFieldValue("ticker", ticker);
            }}
            state={searchState}
          />
        </Input.Wrapper>
        <Input.Wrapper id="stock-shares" required label="Shares" className="pb-2">
          <NumberInput
            id="stock-shares"
            placeholder="10"
            variant="filled"
            value={form.values.shares}
            onChange={shares => form.setFieldValue("shares", Number(shares))}
          />
        </Input.Wrapper>

        <Input.Wrapper id="cryptocurrency-fiat" required label="Buy Price" className="pb-2">
          <NumberInput
            id="cryptocurrency-fiat"
            placeholder="500"
            variant="filled"
            value={form.values.fiat}
            onChange={fiat => form.setFieldValue("fiat", Number(fiat))}
          />
        </Input.Wrapper>

        {stockInformation ? <StockInformationTable stock={stockInformation} /> : null}
        <SlideToSubmit onSubmit={handleFormSubmit} />
      </section>
    </form>
  );
};

export default AddStockForm;
