import { FC, useState } from "react";

type RankerProps = {
  items: Array<{
    id: string;
    name: string;
    anavrin_score: number;
  }>;
};

const Ranker: FC<RankerProps> = ({ items }) => {
  // Sort the items by value in descending order
  const sortedItems = items.sort((a, b) => b.anavrin_score - a.anavrin_score);

  return (
    <div className="flex bg-gray-800">
      <div className="fixed h-4 w-full bg-gray-200" />
      {items.map((item, index) => (
        <div
          key={index}
          className="relative h-4 w-4 rounded-full bg-blue-500"
          style={{ left: `${item.anavrin_score}%` }}
        >
          <p className="absolute text-xs font-medium text-white">{item.id}</p>
        </div>
      ))}
    </div>
  );
};

export default Ranker;
