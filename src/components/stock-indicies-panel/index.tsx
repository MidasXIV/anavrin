import { FC, useEffect, useRef, useState } from "react";
import { clsx } from "clsx";
import {
  buildEventDate,
  formatDateString,
  getTimeDifferenceString
} from "../../utils/timeAndDateHelpers";
import api from "../../services/create-service";
import { ScrollArea } from "../ui/scroll-area";

const VARIANT = {
  compact: "compact",
  default: "default"
} as const;

type VARIANT = keyof typeof VARIANT;

const LoadingListItem = () => (
  <li>
    <a href="#" className="block items-center p-3 hover:bg-gray-100 sm:flex dark:hover:bg-gray-700">
      <div className="w-full">
        <div className="mb-2 h-6 w-3/4 animate-pulse rounded-md bg-gray-600 dark:text-gray-400" />
        <div className="mb-2 h-12 w-full animate-pulse rounded-md bg-gray-400" />

        <div className="flex w-full text-xs">
          <div className="flex w-4/12 border-r-2 px-2 pl-0">
            <div className="mb-2 h-4 w-full animate-pulse rounded-md bg-gray-400" />
          </div>
          <div className="flex w-4/12 border-r-2 px-2">
            <div className="mb-2 h-4 w-full animate-pulse rounded-md bg-gray-400" />
          </div>
          <div className="flex w-4/12 border-r-2 px-2">
            <div className="mb-2 h-4 w-full animate-pulse rounded-md bg-gray-400" />
          </div>
          <div className="flex w-4/12 px-2 pr-0">
            <div className="mb-2 h-4 w-full animate-pulse rounded-md bg-gray-400" />
          </div>
        </div>
      </div>
    </a>
  </li>
);

const LoadingEconomicEventDayBlock = () => (
  <div className="mb-4 rounded-lg border border-gray-100 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-800">
    <div className="mb-2 h-6 w-1/2 animate-pulse rounded-md bg-gray-600 dark:text-gray-400" />
    <ol className="divider-gray-200 mt-3 divide-y dark:divide-gray-700">
      <LoadingListItem />
      <LoadingListItem />
    </ol>
  </div>
);

const ListItem = ({
  event,
  day,
  variant
}: {
  event: IEcnomicEvent;
  day: IEcnomicCalandarItemDay;
  variant: VARIANT;
}) => {
  const { actual, expected, for: _for, impact, prior, release, time } = event;
  const eventDate = buildEventDate(day, time);
  const eventDateString = formatDateString(eventDate);
  const currentDate = new Date();
  const timeDifferenceString = getTimeDifferenceString(eventDate, currentDate);
  return (
    <li>
      <a
        href="#"
        className={clsx("block items-center hover:bg-gray-100 sm:flex dark:hover:bg-gray-700", {
          "px-2 py-2": variant === VARIANT.compact,
          "p-3": variant === VARIANT.default
        })}
      >
        <div className="w-full">
          <div className="text-left text-xs font-semibold">
            {/* TODO: make the time remaining dynamic */}
            {eventDateString} <span>( {timeDifferenceString} )</span>
          </div>
          <div className="flex flex-row justify-between py-2 text-base font-normal text-gray-600 dark:text-gray-400">
            <span
              className={clsx("font-medium text-gray-900 dark:text-white", {
                "text-lg": variant === VARIANT.compact,
                "text-2xl": variant === VARIANT.default
              })}
            >
              {release}{" "}
            </span>
            <div
              className={clsx("h-6 w-6 rounded-md border-2 border-black", {
                "bg-red-500": impact === "3",
                "bg-yellow-500": impact === "2",
                "bg-yellow-200": impact === "1"
              })}
            />
          </div>

          <div className="flex w-full text-xs">
            <div className="flex w-4/12 border-r-2 px-2 pl-0">
              <div className="flex-1 text-left font-semibold">For</div>
              <div className="flex-1 text-right">{_for}</div>
            </div>
            <div className="flex w-4/12 border-r-2 px-2">
              <div className="flex-1 text-left font-semibold">Actual</div>
              <div className="flex-1 text-right">{actual}</div>
            </div>
            <div className="flex w-4/12 border-r-2 px-2">
              <div className="flex-1 text-left font-semibold">Expected</div>
              <div className="flex-1 text-right">{expected}</div>
            </div>
            <div className="flex w-4/12 px-2 pr-0">
              <div className="flex-1 text-left font-semibold">Prior</div>
              <div className="flex-1 text-right">{prior}</div>
            </div>
          </div>
        </div>
      </a>
    </li>
  );
};

function TradingViewWidget22() {
  const container = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
        {
          "symbols": [
            [
              "OANDA:SPX500USD|1D"
            ]
          ],
          "chartOnly": true,
          "width": "100%",
          "height": "90%",
          "locale": "en",
          "colorTheme": "light",
          "autosize": true,
          "showVolume": false,
          "showMA": false,
          "hideDateRanges": false,
          "hideMarketStatus": false,
          "hideSymbolLogo": false,
          "scalePosition": "right",
          "scaleMode": "Normal",
          "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
          "fontSize": "10",
          "noTimeScale": false,
          "valuesTracking": "1",
          "changeMode": "price-and-percent",
          "chartType": "area",
          "maLineColor": "#2962FF",
          "maLineWidth": 1,
          "maLength": 9,
          "backgroundColor": "rgba(255, 255, 255, 0)",
          "lineWidth": 1,
          "lineType": 0,
          "dateRanges": [
            "1d|1",
            "1m|30",
            "3m|60",
            "12m|1D",
            "60m|1W",
            "all|1M"
          ]
        }`;
    container.current.appendChild(script);
  }, []);

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget" />
      {/* <div className="tradingview-widget-copyright"><a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"><span className="blue-text">Track all markets on TradingView</span></a></div> */}
    </div>
  );
}

const EconomicEventDayBlock = ({ event, variant = "compact" }) => {
  const {
    change,
    dayChart,
    intradayHighLow,
    lastPrice,
    name,
    percentageChange,
    symbol,
    volume,
    yearlyRange
  } = event;
  return (
    <div
      role="button"
      className={clsx(
        "block h-72 overflow-hidden rounded-xl bg-charcoal-400 text-sm outline duration-300 hover:cursor-pointer hover:bg-charcoal-900 hover:shadow-xl",
        {
          "text-xs": variant === "compact"
        }
      )}
      // onClick={() => onPortfolioSelect(portfolio._id)}
    >
      <div className="rounded-xl bg-gray-300">
        <h5
          className={clsx(
            "rounded-xl bg-gray-100 font-mono text-sm font-bold tracking-tight text-gray-800 shadow-md",
            {
              "text-xl": variant === "default"
            }
          )}
        >
          <TradingViewWidget22 />
          {/* <p
            className={clsx("mt-2 text-sm text-gray-700", {
              "text-xs": variant === "compact"
            })}
          >
            {name}
            <br />
            {symbol}
          </p> */}
        </h5>
        <p
          className={clsx(" text-gray-800", {
            "px-4 py-2": variant === "compact",
            "px-4 py-6 pt-6": variant === "default"
          })}
        >
          {/* Asset Type: {portfolio.assetType} */}
          {lastPrice} : {change} : {percentageChange}%
        </p>
      </div>

      <section className="px-4 py-2">
        <ScrollArea
          className={clsx({
            "h-[200px]": variant === "default",
            "h-[120px]": variant === "compact"
          })}
        >
          {/* {portfolio.items.map((item, index) => (
            <div key={`portfolio-item-${index + 1}`} className="mb-4">
              <p className="font-medium text-white">
                {isCryptoPortfolioItem(item) ? item.token : item.ticker}
              </p>
              <p className="text-gray-400">
                Holdings: {isCryptoPortfolioItem(item) ? item.holdings : item.shares}{" "}
                {isCryptoPortfolioItem(item) ? item.token : item.ticker}
              </p>
              <p className="text-gray-400">Fiat Value: {item.fiat} USD</p>
            </div>
          ))} */}
        </ScrollArea>
      </section>
    </div>
  );
};

interface IEconomicEventsPanelProps {
  variant?: VARIANT; // Define the variant prop
}

const StockIndiciesPanel: FC<IEconomicEventsPanelProps> = ({ variant = VARIANT.default }) => {
  const [loading, setLoading] = useState(false);
  const [indicies, setIndicies] = useState([]);

  useEffect(() => {
    setLoading(true);

    api.fetchWorldStockIndiciesData().then(({ status, data }) => {
      setLoading(false);

      if (status === 200) {
        setIndicies(data.worldIndiciesData);
        console.log(data);
      }
      // TODO: handle case for error
    });
  }, []);

  return (
    <div>
      {loading ? <LoadingEconomicEventDayBlock /> : null}
      {indicies ? (
        <section className="grid gap-4 py-4 md:grid-cols-3 lg:grid-cols-4">
          {indicies.map((event, index) => (
            <EconomicEventDayBlock
              id={`economic-event-block-${index + 1}`}
              key={`economic-event-block-${index + 1}`}
              event={event}
              variant={variant}
            />
          ))}
        </section>
      ) : null}
    </div>
  );
};

export default StockIndiciesPanel;
