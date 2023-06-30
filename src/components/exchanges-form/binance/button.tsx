import { Button } from "@mantine/core";
import { FC } from "react";
import { ExchangeKeys } from "..";
import { UserSettingsExchangeButton } from "../types";

type BinanceButtonProps = UserSettingsExchangeButton;

const BinanceButton: FC<BinanceButtonProps> = ({ onClick }) => (
  <Button key="user-settings-binance-exchange-button" onClick={() => onClick(ExchangeKeys.BINANCE)}>
    Binance
  </Button>
);

export default BinanceButton;
