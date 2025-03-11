import clsx from "clsx";
import { FC } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { valueFormatter } from "@/utils/timeAndDateHelpers";
import { Separator } from "../ui/separator";

enum CalendarMode {
  OneMonth = "1-month",
  SixMonths = "6-months",
  EntireYear = "entire-year",
  YearToMonth = "year-to-month"
}

interface DashboardCalendarChartProps {
  data: CrptoPortfolioValue;
  mode: CalendarMode;
}

function percentageDifference(valueA: number, valueB: number): number {
  if (valueB === 0) {
    return 0;
  } else {
    const percentageDiff = ((valueA - valueB) / valueB) * 100;
    return percentageDiff;
  }
}

const DashboardCalendarChart: FC<DashboardCalendarChartProps> = ({ data, mode }) => {
  const { quotes } = data;
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const daysOfWeek = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

  const calculateMonthRanges = (mode: CalendarMode) => {
    const months: { year: number; month: number }[] = [];
    if (mode === CalendarMode.OneMonth) {
      months.push({ year: currentYear, month: currentMonth });
    } else if (mode === CalendarMode.SixMonths) {
      for (let i = 0; i < 6; i++) {
        const month = currentMonth - i;
        const year = month < 0 ? currentYear - 1 : currentYear;
        months.push({ year, month: (month + 12) % 12 });
      }
    } else if (mode === CalendarMode.EntireYear) {
      for (let month = 0; month < 12; month++) {
        months.push({ year: currentYear, month });
      }
    } else if (mode === CalendarMode.YearToMonth) {
      for (let month = 0; month <= currentMonth; month++) {
        months.push({ year: currentYear, month });
      }
    }
    // return months.reverse();
    return months;
  };

  const months = calculateMonthRanges(mode);
  const startDate = new Date(currentYear, 0, 1);
  const getQuoteIndex = (date: Date) => {
    const diffTime = Math.abs(date.getTime() - startDate.getTime());
    return Math.floor(diffTime / (1000 * 60 * 60 * 24)); // Difference in days
  };

  return (
    <TooltipProvider>
      <div
        className={clsx({
          "flex w-full flex-wrap items-center justify-center": true,
          "md:grid md:grid-cols-2 lg:grid-cols-3": mode === CalendarMode.EntireYear || mode === CalendarMode.YearToMonth
        })}
      >
        {months.map(({ year, month }) => {
          const firstDayOfMonth = new Date(year, month, 1);
          const daysInMonth = new Date(year, month + 1, 0).getDate();
          const firstDayOfWeek = firstDayOfMonth.getDay() + (1 % 6);

          return (
            <div key={`${year}-${month}`} className="mb-8 w-full overflow-hidden rounded-lg">
              <h2 className="mb-4 text-center font-chakra font-semibold">
                {monthNames[month]} {year}
              </h2>
              <div className="grid grid-cols-7 gap-0 p-4" id="calendar">
                {daysOfWeek.map(day => (
                  <div
                    key={day}
                    className="w-full cursor-pointer rounded-xl px-4 py-3 text-center font-chakra font-semibold"
                  >
                    <span>{day}</span>
                  </div>
                ))}
                {Array.from({ length: firstDayOfWeek }).map((_, index) => (
                  <div
                    key={index}
                    className="w-full cursor-pointer rounded-xl px-4 py-3 text-center font-chakra"
                  ></div>
                ))}
                {Array.from({ length: daysInMonth }).map((_, dayIndex) => {
                  const day = dayIndex + 1;
                  const date = new Date(year, month, day);
                  const quoteIndex = getQuoteIndex(date);
                  const quoteOfDay = quotes[quoteIndex];
                  const quoteOfPreviousDay = quotes[quoteIndex - 1 || 0];
                  const percentageDiff = percentageDifference(quoteOfDay?.value, quoteOfPreviousDay?.value);
                  return (
                    <Tooltip key={dayIndex}>
                      <TooltipTrigger>
                        <div className="w-full cursor-pointer rounded-xl border border-gray-300 text-center font-chakra">
                          <div
                            className={clsx({
                              "h-full w-full rounded-lg border-[3px] px-3 py-2 text-center": true,
                              "border-gray-900": !(day === currentDate.getDate() && month === currentDate.getMonth()),
                              "border-teal-300": day === currentDate.getDate() && month === currentDate.getMonth(),
                              "bg-gray-200": typeof quoteOfDay === "undefined",
                              "bg-green-500": percentageDiff >= 15,
                              "bg-green-400": percentageDiff >= 10,
                              "bg-green-300": percentageDiff >= 5,
                              "bg-green-200": percentageDiff >= 0,
                              "bg-red-200": percentageDiff < 0,
                              "bg-red-300": percentageDiff < -5,
                              "bg-red-400": percentageDiff < -10,
                              "bg-red-500": percentageDiff < -15
                            })}
                          >
                            <span>{day}</span>
                          </div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        {quoteOfDay ? (
                          <>
                            {quoteOfDay?.meta.map((metaItem, metaIndex) => (
                              <p
                                key={metaIndex}
                                className="flex w-48 justify-between font-chakra font-semibold text-gray-400"
                              >
                                <span>{metaItem.item?.toUpperCase()}</span>
                                <span>{valueFormatter(metaItem.value)}</span>
                              </p>
                            ))}
                            <Separator className="my-1 bg-gray-600" />
                            <p className="flex w-48 justify-between font-chakra font-semibold text-gray-400">
                              <span>{"Total".toUpperCase()}</span>
                              <span>{`${valueFormatter(quoteOfDay?.value)} (${percentageDifference(
                                quoteOfDay?.value,
                                quotes[0]?.value
                              ).toPrecision(2)}%)`}</span>
                            </p>
                          </>
                        ) : (
                          <p>No data yet</p>
                        )}
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </TooltipProvider>
  );
};

export default DashboardCalendarChart;
