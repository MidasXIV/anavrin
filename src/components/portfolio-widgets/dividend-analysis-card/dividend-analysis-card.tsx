import InfoIcon from "@/components/icons/InfoIcon";
import { valueFormatter } from "@/utils/timeAndDateHelpers";
import Card from "../Card/card";

const DividendAnalysisCard = ({
  dividendIncome,
  portfolioDividendYield,
  portfolioDividendEfficiency
}) => (
  <Card showHeader headerTitle="Dividend analysis">
    <div className="flex h-full w-full flex-col">
      <div className="flex h-full w-full flex-col justify-between p-1 px-2">
        <span className="font-sans text-3xl font-bold text-gray-900">
          {valueFormatter(dividendIncome)}
        </span>
        <div className="inline-flex justify-between py-1 text-xs font-semibold text-gray-800">
          <span>
            Annual
            <br />
            dividends
          </span>
          <button type="button" className="rounded-lg px-2 py-1 hover:bg-gray-200">
            <InfoIcon />
          </button>
        </div>
      </div>
      <div className="flex h-full w-full flex-row">
        <div className="border-1 border-success flex h-full w-full flex-col justify-between border-r-2 border-t-2 p-1 px-2">
          <div className="font-sans text-lg font-bold text-gray-900 sm:text-2xl">
            {portfolioDividendYield}%
          </div>
          <div className="inline-flex flex-col-reverse justify-between py-1 text-xs font-semibold  text-gray-800 sm:flex-row">
            <span>Dividend yield</span>
            <button type="button" className="w-fit rounded-lg px-2 py-1 hover:bg-gray-200">
              <InfoIcon />
            </button>
          </div>
        </div>
        <div className="border-1 border-success flex h-full w-full flex-col justify-between border-t-2 p-1 px-2">
          <div className="font-sans text-lg font-bold text-gray-900 sm:text-2xl">
            {portfolioDividendEfficiency}%
          </div>
          <div className="inline-flex flex-col-reverse justify-between py-1 text-xs font-semibold  text-gray-800 sm:flex-row">
            <span>Dividend efficiency</span>
            <button type="button" className="w-fit rounded-lg px-2 py-1 hover:bg-gray-200">
              <InfoIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  </Card>
);

export default DividendAnalysisCard;
