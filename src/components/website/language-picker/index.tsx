import { useState } from "react";
import { UnstyledButton, Menu, Group, useMantineTheme } from "@mantine/core";

const data = [
  { label: "English" },
  { label: "German" },
  { label: "Italian" },
  { label: "French" },
  { label: "Polish" }
];

const LanguagePicker = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [selected, setSelected] = useState(data[0]);
  const items = data.map(item => (
    <Menu.Item onClick={() => setSelected(item)} key={item.label}>
      {item.label}
    </Menu.Item>
  ));

  return (
    <Menu
      onOpen={() => setOpened(true)}
      onClose={() => setOpened(false)}
      radius="md"
      withArrow
      width={200}
      zIndex={99}
    >
      <Menu.Target>
        <UnstyledButton
          styles={{
            width: 200,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 15px",
            borderRadius: theme.radius.md,
            border: `1px solid ${
              theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[2]
            }`,
            transition: "background-color 150ms ease",
            backgroundColor:
              // eslint-disable-next-line no-nested-ternary
              theme.colorScheme === "dark"
                ? theme.colors.dark[opened ? 5 : 6]
                : opened
                ? theme.colors.gray[0]
                : theme.white,

            "&:hover": {
              backgroundColor:
                theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[0]
            }
          }}
        >
          <Group spacing="xs">
            <span>{selected.label}</span>
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>{items}</Menu.Dropdown>
    </Menu>
  );
};

export default LanguagePicker;
