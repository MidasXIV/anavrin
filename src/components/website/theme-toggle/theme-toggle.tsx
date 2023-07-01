import { useMantineColorScheme, SegmentedControl, Group, Center, Box } from "@mantine/core";
import PlusIconSVG from "../../icons/AddItemIcon";

const ThemeToggle = () => (
  // const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  <Group position="center" my="xl">
    <SegmentedControl
      // value={colorScheme}
      // onChange={(value: "light" | "dark") => toggleColorScheme(value)}
      data={[
        {
          value: "light",
          label: (
            <Center>
              <PlusIconSVG width={15} height={15} />
              <Box ml={10}>Light</Box>
            </Center>
          )
        },
        {
          value: "dark",
          label: (
            <Center>
              <PlusIconSVG width={15} height={15} />
              <Box ml={10}>Dark</Box>
            </Center>
          )
        }
      ]}
    />
  </Group>
);
export default ThemeToggle;
