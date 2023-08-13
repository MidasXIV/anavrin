import { Chip, Group } from "@mantine/core";
import { FC, useState } from "react";

interface CategoryChipGroupProps {
  categories: Array<string>;
}

const CategoryChipGroup: FC<CategoryChipGroupProps> = ({ categories }) => {
  // string value when multiple is false (default)
  const [value, setValue] = useState(categories[0]);

  return (
    <Chip.Group multiple={false} value={value} onChange={setValue}>
      <Group position="left" spacing="xs">
        {categories.map(category => (
          <Chip color="dark" size="sm" radius="md" variant="filled" key={category} value={category}>
            <span className="text-xs">{category}</span>
          </Chip>
        ))}
      </Group>
    </Chip.Group>
  );
};

export default CategoryChipGroup;
