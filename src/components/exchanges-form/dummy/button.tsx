import { Button } from "@mantine/core";
import { FC } from "react";
import { UserSettingsExchangeButton } from "../types";

type DummyButtonProps = UserSettingsExchangeButton;

const DummyButton: FC<DummyButtonProps> = ({ onClick }) => (
  <Button onClick={() => onClick("dummy")}>Dummy</Button>
);

export default DummyButton;
