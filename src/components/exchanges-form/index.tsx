import dynamic from "next/dynamic";
import { ComponentType } from "react";
import LoadingForm from "./loading";

const BinanceForm = dynamic(() => import("./binance"), { loading: LoadingForm });
const DummyForm = dynamic(() => import("./dummy"), { loading: LoadingForm });

export { default as BinanceButton } from "./binance/button";
export { default as DummyButton } from "./dummy/button";

export const list = ["BinanceButton", "DummyButton"];

export enum ExchangeKeys {
  BINANCE = "binance",
  DUMMY = "dummy"
}

export const ExchangeFormComponentMapping = new Map<ExchangeKeys, ComponentType<unknown>>([
  [ExchangeKeys.BINANCE, BinanceForm],
  [ExchangeKeys.DUMMY, DummyForm]
]);
