import { useForm } from "@mantine/hooks";
import { InputWrapper, Input } from "@mantine/core";
import { FC, useState } from "react";
import SlideToSubmit from "../slide-to-submit";
import StockSearchCombobox from "../stock-search-combobox";
import StockInformationTable from "./stock-information-table";
import getStockInformation from "../../util/getStockInformation";

const AddStockForm: FC<unknown> = () => {
  enum SearchState {
    STABLE = "STABLE",
    SUCCESS = "SUCCESS",
    PENDING = "PENDING",
    FAILURE = "FAILURE"
  }

  const [searchTerm, setSearchTerm] = useState("");
  const [searchState, setSearchState] = useState(SearchState.STABLE);
  const [stockInformation, setStockInformation] = useState(null);

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
      <section className="py-2 px-2">
        <InputWrapper id="stock-searchbox" required label="Ticker" className="pb-2">
          <StockSearchCombobox
            searchTerm={searchTerm}
            setSearchTerm={ticker => {
              setSearchTerm(ticker);
              updateStockInformation(ticker);
              form.setFieldValue("ticker", ticker);
            }}
            state={searchState}
          />
        </InputWrapper>
        <InputWrapper id="stock-shares" required label="Shares" className="pb-2">
          <Input
            id="stock-shares"
            placeholder="10"
            variant="filled"
            value={form.values.shares}
            onChange={event => form.setFieldValue("shares", parseFloat(event.currentTarget.value))}
          />
        </InputWrapper>

        <InputWrapper id="cryptocurrency-fiat" required label="Buy Price" className="pb-2">
          <Input
            id="cryptocurrency-fiat"
            placeholder="500"
            variant="filled"
            value={form.values.fiat}
            onChange={event => form.setFieldValue("fiat", parseFloat(event.currentTarget.value))}
          />
        </InputWrapper>

        {stockInformation ? <StockInformationTable stock={stockInformation} /> : null}
        <SlideToSubmit
          onSubmit={form.onSubmit(values => {
            console.log({ ...values, stockInformation });
          })}
        />
      </section>
    </form>
  );
};

export default AddStockForm;
