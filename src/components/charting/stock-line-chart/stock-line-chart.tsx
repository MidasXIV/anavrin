import isEmptyDataItem from "@/utils/type-gaurds";
import { generateRandomColor } from "lib/tremor-color";
import { createChart, ColorType } from "lightweight-charts";
import React, { useEffect, useRef } from "react";

export const StockLineChart = props => {
  const {
    data,
    colors: {
      backgroundColor = "transparent",
      lineColor = "#2962FF",
      textColor = "black",
      areaTopColor = "#2962FF",
      areaBottomColor = "rgba(41, 98, 255, 0.28)"
    } = {}
  } = props;

  const chartData = data.map(item => ({ color: generateRandomColor(), data: item }));
  const chartContainerRef = useRef();

  useEffect(() => {
    const width = (chartContainerRef?.current as any)?.clientWidth;
    const handleResize = () => {
      chart.applyOptions({ width });
    };

    const chart = createChart(chartContainerRef?.current, {
      layout: {
        background: { type: ColorType.Solid, color: backgroundColor },
        textColor
      },
      width,
      height: 300
    });
    chart.timeScale().fitContent();

    chartData.forEach(item => {
      const newSeries = chart.addLineSeries({ color: item.color });
      newSeries.setData(item.data);
    });

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      chart.remove();
    };
  }, [data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]);

  return (
    <div>
      <div className="flex items-center p-2">
        {chartData.map(item => (
          <span
            key={item.data?.[0].ticker}
            className="me-3 flex items-center text-xs font-light text-gray-900 dark:text-white"
          >
            <span
              className="me-1.5 flex h-2.5 w-2.5 flex-shrink-0 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            {item.data?.[0].ticker}
          </span>
        ))}
      </div>

      <div ref={chartContainerRef} />
    </div>
  );
};
