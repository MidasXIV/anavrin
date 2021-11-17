import { Button } from "@mantine/core";
import { FC } from "react";

const DummyButton: FC<any> = ({ onClick }) => (
  <Button onClick={() => onClick("dummy")}>Dummy</Button>
);

export default DummyButton;
