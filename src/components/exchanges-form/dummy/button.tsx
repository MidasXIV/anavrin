import { Button } from "@mantine/core";
import { FC } from "react";
import { ExchangeKeys } from "..";
import { UserSettingsExchangeButton } from "../types";

type DummyButtonProps = UserSettingsExchangeButton;

const DummyButton: FC<DummyButtonProps> = ({ onClick }) => (
  <Button onClick={() => onClick(ExchangeKeys.DUMMY)}>Dummy</Button>
);

export default DummyButton;
