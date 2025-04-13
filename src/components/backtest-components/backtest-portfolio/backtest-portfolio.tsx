import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

function Row({ assetName, numberOfPortfolios }) {
  return (
    <div className="mb-2 flex w-full items-center rounded-md border border-gray-300  p-2">
      <span className="w-full border-r-2 border-gray-300 font-medium">{assetName}</span>
      <Input placeholder="Ticker Symbol" className="mx-2 w-full" />
      {Array.from({ length: numberOfPortfolios }).map((_, index) => (
        <div
          key={index.toString()}
          className="flex w-full items-center border-l-2 border-gray-300 px-2"
        >
          <Input max="100" min="0" step="0.01" type="number" className="mr-2" />
          <span className="text-gray-500 dark:text-gray-300">%</span>
        </div>
      ))}
    </div>
  );
}

const BacktestPortfolio = () => {
  const [rowCount, setRowCount] = useState(10);
  const numberOfPortfolios = 5;

  const addRow = () => {
    setRowCount(rowCount + 1);
  };

  return (
    <div>
      {Array.from({ length: rowCount }).map((_, index) => (
        <Row
          key={index.toString()}
          assetName={`Asset ${index + 1}`}
          numberOfPortfolios={numberOfPortfolios}
        />
      ))}
      <Button type="button" onClick={addRow}>
        Add Row
      </Button>
    </div>
  );
};

export default BacktestPortfolio;
