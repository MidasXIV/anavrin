import { FC } from "react";
import { ExchangeKeys, ExchangeFormComponentMapping } from "../exchanges-form";

interface ExchangeFormFactoryProps {
  exchange: ExchangeKeys;
}

const ExchangeFormFactory: FC<ExchangeFormFactoryProps> = ({ exchange }) => {
  if (!exchange) {
    return null;
  }
  const ExchangeForm = ExchangeFormComponentMapping.get(exchange);
  return <ExchangeForm />;
};

export default ExchangeFormFactory;
