import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { FC, useState } from "react";

interface CategoryChipGroupProps {
  categories: Array<string>;
}

const CategoryChipGroup: FC<CategoryChipGroupProps> = ({ categories }) => {
  // string value when multiple is false (default)
  const [value, setValue] = useState(categories?.[0]);

  return (
    <ToggleGroup
      type="single"
      variant="outline"
      value={value}
      onValueChange={setValue}
      className="flex w-full flex-wrap"
    >
      {categories.map(category => (
        <ToggleGroupItem color="dark" key={category} value={category} className="bg-gray-200">
          <span className="text-xs">{category}</span>
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};

export default CategoryChipGroup;
