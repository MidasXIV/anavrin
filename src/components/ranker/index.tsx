import { FC, useState } from "react";

type RankerProps = {
  items: Array<{
    id: string;
    name: string;
    symbol: string;
    anavrin_score: number;
  }>;
};

const Ranker: FC<RankerProps> = ({ items }) => {
  // Sort the items by value in descending order
  const sortedItems = items.sort((a, b) => b.anavrin_score - a.anavrin_score);

  const [hover, setHover] = useState({});

  function handleHover(name, isHover) {
    setHover(prevHover => {
      const newHover = { ...prevHover };
      if (prevHover[name] !== isHover) {
        newHover[name] = isHover;
      }
      return newHover;
    });
  }
  // TODO: item names overlap and are not readable.
  return (
    <div className="relative flex bg-gray-800">
      <div className="fixed h-20 w-full border-b-2" />
      <div className="fixed h-4 w-full bg-gray-200" />
      {items.map((item, index) => (
        <div
          key={index}
          className="relative text-black hover:z-50 hover:bg-gray-50 hover:text-lg hover:text-red-500"
          style={{ left: `${item.anavrin_score}%` }}
        >
          <div
            className="h-4 w-1 bg-blue-500 hover:bg-red-500 "
            onMouseEnter={() => handleHover(item.id, true)}
            onMouseLeave={() => handleHover(item.id, false)}
          />
          <p className="absolute top-8 text-xs font-medium">{item.symbol}</p>
          {/* <p
            className={`absolute top-12 text-xs font-medium text-black ${
              hover[item.id] ? "block" : "hidden"
            }`}
          >
            {item.name}
          </p> */}
        </div>
      ))}
    </div>
  );
};

export default Ranker;
