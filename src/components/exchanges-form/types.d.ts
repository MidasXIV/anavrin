import { ExchangeKeys } from ".";

export type UserSettingsExchangeButton = {
  onClick: (exchangeKey: ExchangeKeys) => void;
};
