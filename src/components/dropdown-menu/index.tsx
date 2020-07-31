const DropdownMenu = ({ button, menu, opened }) => {
  return (
    <>
      {button}
      {opened ? menu : null}
    </>
  );
};

export default DropdownMenu;
