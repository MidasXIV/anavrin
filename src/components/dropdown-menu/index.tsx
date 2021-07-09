import { FC } from "react";

type DropdownMenuProps = {
  button: JSX.Element;
  menu: JSX.Element;
  opened: boolean;
};

const DropdownMenu: FC<DropdownMenuProps> = ({ button, menu, opened }) => {
  return (
    <>
      {button}
      {opened ? menu : null}
    </>
  );
};

export default DropdownMenu;
