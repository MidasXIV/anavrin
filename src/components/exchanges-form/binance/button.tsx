import { Button } from "@mantine/core";
import { FC } from "react";
import { UserSettingsExchangeButton } from "../types";

type BinanceButtonProps = UserSettingsExchangeButton;

const BinanceButton: FC<BinanceButtonProps> = ({ onClick }) => (
  <Button onClick={() => onClick("binance")}>Binance</Button>
);

export default BinanceButton;
