import { valueFormatter } from "@/utils/timeAndDateHelpers";
import InfoIcon from "@/components/icons/InfoIcon";
import Card from "../Card/card";

const DividendBreakdownAnalysisCard = ({ dividendIncome }) => (
  <Card showHeader headerTitle="Dividend breakdown">
    <div className="flex h-full w-full flex-col">
      <div className="flex h-full w-full flex-col justify-between p-1 px-2">
        <span className="font-sans text-3xl font-bold text-gray-900">
          {valueFormatter(dividendIncome / 12)}
        </span>
        <div className="inline-flex justify-between py-1 text-xs font-semibold text-gray-800">
          <span>
            Monthly average
            <br />
            dividend
          </span>
          <button type="button" className="rounded-lg px-2 py-1 hover:bg-gray-200">
            <InfoIcon />
          </button>
        </div>
      </div>

      <div className="border-1 border-success flex h-full w-full flex-col justify-between border-r-2 border-t-2 p-1 px-2">
        <div className="font-sans text-2xl font-bold text-gray-900">
          {valueFormatter(dividendIncome / 52)}
        </div>
        <div className="inline-flex justify-between py-1  text-xs  font-semibold text-gray-800">
          <span>
            Weekly average
            <br />
            dividend
          </span>
          <button type="button" className="rounded-lg px-2 py-1 hover:bg-gray-200">
            <InfoIcon />
          </button>
        </div>
      </div>
      <div className="border-1 border-success flex h-full w-full flex-col justify-between border-t-2 p-1 px-2">
        <div className="font-sans text-2xl font-bold text-gray-900">
          {valueFormatter(dividendIncome / 365)}
        </div>
        <div className="inline-flex justify-between py-1  text-xs  font-semibold text-gray-800">
          <span>
            Daily average
            <br />
            dividend
          </span>
          <button type="button" className="rounded-lg px-2 py-1 hover:bg-gray-200">
            <InfoIcon />
          </button>
        </div>
      </div>
    </div>
  </Card>
);

export default DividendBreakdownAnalysisCard;
