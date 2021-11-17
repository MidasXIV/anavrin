import { Button } from "@mantine/core";
import { FC } from "react";

const BinanceButton: FC<any> = ({ onClick }) => (
  <Button onClick={() => onClick("binance")}>Binance</Button>
);

export default BinanceButton;
