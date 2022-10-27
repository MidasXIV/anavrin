export { default as BinanceButton } from "./binance/button";
export { default as DummyButton } from "./dummy/button";

export const list = ["BinanceButton", "DummyButton"];

export enum ExchangeKeys {
  BINANCE = "binance",
  DUMMY = "dummy"
}
