import { FC, useEffect, useState } from "react";
import { clsx } from "clsx";
import {
  buildEventDate,
  formatDateString,
  getTimeDifferenceString
} from "../../utils/timeAndDateHelpers";
import api from "../../services/create-service";

const VARIANT = {
  compact: "compact",
  default: "default"
} as const;

type VARIANT = keyof typeof VARIANT;

const LoadingListItem = () => (
  <li>
    <a href="#" className="block items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-700 sm:flex">
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
        className={clsx("block items-center hover:bg-gray-100 dark:hover:bg-gray-700 sm:flex", {
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

const EconomicEventDayBlock = ({
  event,
  variant,
  id
}: {
  id: string;
  event: IEcnomicCalandarItem;
  variant: VARIANT;
}) => {
  const { day, events } = event;
  return (
    <div
      id={id}
      className={clsx(
        "mb-4 rounded-lg border border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800",
        {
          "p-2": variant === VARIANT.compact,
          "p-5": variant === VARIANT.default
        }
      )}
    >
      <time
        className={clsx("font-semibold text-gray-900 dark:text-white", {
          "text-md": variant === VARIANT.compact,
          "text-lg": variant === VARIANT.default
        })}
      >
        {day}
      </time>
      <ol className="divider-gray-200 mt-3 divide-y dark:divide-gray-700">
        {events.map((economicEvent, index) => (
          <ListItem
            key={`economic-event-${index + 1}`}
            event={economicEvent}
            day={day}
            variant={variant}
          />
        ))}
      </ol>
    </div>
  );
};

interface IEconomicEventsPanelProps {
  variant?: VARIANT; // Define the variant prop
}

const mockEE = [
  {
    day: "Mon Dec 25",
    events: [
      {
        time: "",
        release: "No economic releases"
      }
    ]
  },
  {
    day: "Tue Dec 26",
    events: [
      {
        time: "9:00 AM",
        release: "FHFA Housing Price Index",
        impact: "1",
        for: "Oct",
        actual: "0.3%",
        expected: "NA",
        prior: "0.7%"
      },
      {
        time: "9:00 AM",
        release: "S&P Case-Shiller Home Price Index",
        impact: "1",
        for: "Oct",
        actual: "4.9%",
        expected: "5.0%",
        prior: "3.9%"
      }
    ]
  },
  {
    day: "Wed Dec 27",
    events: [
      {
        time: "",
        release: "No economic releases"
      }
    ]
  },
  {
    day: "Thu Dec 28",
    events: [
      {
        time: "8:30 AM",
        release: "Initial Claims",
        impact: "2",
        for: "12/23",
        actual: "-",
        expected: "207K",
        prior: "205K"
      },
      {
        time: "8:30 AM",
        release: "Continuing Claims",
        impact: "2",
        for: "12/16",
        actual: "-",
        expected: "NA",
        prior: "1865K"
      },
      {
        time: "8:30 AM",
        release: "Adv. Intl. Trade in Goods",
        impact: "1",
        for: "Nov",
        actual: "-",
        expected: "NA",
        prior: "-$89.8B"
      },
      {
        time: "8:30 AM",
        release: "Adv. Retail Inventories",
        impact: "1",
        for: "Nov",
        actual: "-",
        expected: "NA",
        prior: "0.0%"
      },
      {
        time: "8:30 AM",
        release: "Adv. Wholesale Inventories",
        impact: "1",
        for: "Nov",
        actual: "-",
        expected: "NA",
        prior: "-0.2%"
      },
      {
        time: "10:00 AM",
        release: "Pending Home Sales",
        impact: "2",
        for: "Nov",
        actual: "-",
        expected: "0.5%",
        prior: "-1.5%"
      },
      {
        time: "10:30 AM",
        release: "EIA Natural Gas Inventories",
        impact: "1",
        for: "12/23",
        actual: "-",
        expected: "NA",
        prior: "-87 bcf"
      },
      {
        time: "11:00 AM",
        release: "EIA Crude Oil Inventories",
        impact: "3",
        for: "12/23",
        actual: "-",
        expected: "NA",
        prior: "+2.909M"
      }
    ]
  },
  {
    day: "Fri Dec 29",
    events: [
      {
        time: "9:45 AM",
        release: "Chicago PMI",
        impact: "2",
        for: "Dec",
        actual: "-",
        expected: "50.0",
        prior: "55.8"
      }
    ]
  }
];

const EconomicEventsPanel: FC<IEconomicEventsPanelProps> = ({ variant = VARIANT.default }) => {
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // setLoading(true);

    // api.fetchEconomicEvents().then(({ status, data }) => {
    //   setLoading(false);

    //   if (status === 200) {
    //     setEvents(data.events);
    //     console.log(data.events)
    //   }
    //   // TODO: handle case for error
    // });

    setEvents(mockEE);

    // Mon = 1
    // const currentDayInNumberFormat = new Date().getDay();

    // const targetElement = document.getElementById(
    //   `economic-event-block-${currentDayInNumberFormat}`
    // );
    // console.log(targetElement);
    // if (targetElement) {
    //   const { offsetTop } = targetElement;
    //   window.scrollTo({ top: offsetTop, behavior: "smooth" });
    // }
  }, []);

  return (
    <div>
      {loading ? <LoadingEconomicEventDayBlock /> : null}
      {events
        ? events.map((event, index) => (
            <EconomicEventDayBlock
              id={`economic-event-block-${index + 1}`}
              key={`economic-event-block-${index + 1}`}
              event={event}
              variant={variant}
            />
          ))
        : null}
    </div>
  );
};

export default EconomicEventsPanel;
