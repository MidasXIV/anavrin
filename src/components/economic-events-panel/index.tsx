import { FC, useEffect, useState } from "react";
import { clsx } from "clsx";
import {
  buildEventDate,
  formatDateString,
  getTimeDifferenceString
} from "../../util/timeAndDateHelpers";
import api from "../../services/create-service";

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

const ListItem = ({ event, day }: { event: IEcnomicEvent; day: IEcnomicCalandarItemDay }) => {
  const { actual, expected, for: _for, impact, prior, release, time } = event;
  const eventDate = buildEventDate(day, time);
  const eventDateString = formatDateString(eventDate);
  const currentDate = new Date();
  const timeDifferenceString = getTimeDifferenceString(eventDate, currentDate);
  return (
    <li>
      <a
        href="#"
        className="block items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-700 sm:flex"
      >
        <div className="w-full">
          <div className="text-left text-xs font-semibold">
            {/* TODO: make the time remaining dynamic */}
            {eventDateString} <span>( {timeDifferenceString} )</span>
          </div>
          <div className="flex flex-row justify-between py-2 text-base font-normal text-gray-600 dark:text-gray-400">
            <span className="text-2xl font-medium text-gray-900 dark:text-white">{release} </span>
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

const EconomicEventDayBlock = ({ event }: { event: IEcnomicCalandarItem }) => {
  const { day, events } = event;
  return (
    <div className="mb-4 rounded-lg border border-gray-100 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-800">
      <time className="text-lg font-semibold text-gray-900 dark:text-white">{day}</time>
      <ol className="divider-gray-200 mt-3 divide-y dark:divide-gray-700">
        {events.map((economicEvent, index) => (
          <ListItem key={`economic-event-${index + 1}`} event={economicEvent} day={day} />
        ))}
      </ol>
    </div>
  );
};

const EconomicEventsPanel: FC<any> = () => {
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setLoading(true);

    api.fetchEconomicEvents().then(({ status, data }) => {
      setLoading(false);

      if (status === 200) {
        setEvents(data.events);
      }
      // TODO: handle case for error
    });
  }, []);

  return (
    <div>
      {loading ? <LoadingEconomicEventDayBlock /> : null}
      {events
        ? events.map((event, index) => (
            <EconomicEventDayBlock key={`economic-event-block-${index + 1}`} event={event} />
          ))
        : null}
    </div>
  );
};

export default EconomicEventsPanel;
