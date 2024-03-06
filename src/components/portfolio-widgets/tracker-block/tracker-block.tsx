import TrackerChart from "@/components/charting/tracker/tracker";
import TooltipWrapper from "@/components/tooltip-wrapper";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { FC } from "react";

interface TrackerBlockProps {
  title: string;
  current: number;
  goal: number;
  formatter: (x: number) => string;
}

const generateChartData = (
  current: number,
  goal: number,
  formatter
): Array<{ color: string; tooltip: string }> => {
  const percentage = (current / goal) * 100;
  const data = [];

  for (let i = 0; i < 16; i++) {
    // if (i < percentage / 6) {
    //   data.push({ color: "emerald", tooltip: "Operational" });
    // } else {
    //   data.push({ color: "slate", tooltip: "Downtime" });
    // }
    const blockPercentage = (i + 1) * 6; // Calculate the percentage covered by the block
    const value = goal / (16 - i); // Calculate the value for the block

    data.push({
      color: blockPercentage <= percentage ? "emerald" : "slate",
      tooltip: `${formatter(value)}: ${blockPercentage}%`
    });
  }

  return data;
};

const TrackerBlock: FC<TrackerBlockProps> = ({ title, current, goal, formatter }) => {
  const data = generateChartData(current, goal, formatter);
  return (
    <>
      <div className="flex items-center justify-between py-1">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <TooltipWrapper label="edit" color="orange">
          <button type="button" className="rounded-lg px-2 py-1 hover:bg-gray-200">
            <Pencil1Icon />
          </button>
        </TooltipWrapper>
      </div>

      <p className="text-xs text-gray-500">
        {formatter(current)} &bull; {formatter(goal)}
      </p>
      <div className="h-6">
        <TrackerChart data={data} />
      </div>
    </>
  );
};

export default TrackerBlock;
