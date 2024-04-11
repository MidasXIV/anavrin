import { Tracker, Color } from "@tremor/react";

interface Tracker {
  color: any;
  tooltip: string;
}

// const data: Tracker[] = [
//   { color: "emerald", tooltip: "Operational" },
//   { color: "emerald", tooltip: "Operational" },
//   { color: "emerald", tooltip: "Operational" },
//   { color: "emerald", tooltip: "Operational" },
//   { color: "emerald", tooltip: "Operational" },
//   { color: "emerald", tooltip: "Operational" },
//   { color: "emerald", tooltip: "Operational" },
//   { color: "emerald", tooltip: "Operational" },
//   { color: "emerald", tooltip: "Operational" },
//   { color: "emerald", tooltip: "Operational" },
//   { color: "emerald", tooltip: "Operational" },
//   { color: "emerald", tooltip: "Operational" },
//   { color: "emerald", tooltip: "Operational" },
//   { color: "emerald", tooltip: "Operational" },
//   { color: "rose", tooltip: "Downtime" },
//   { color: "emerald", tooltip: "Operational" },
//   { color: "emerald", tooltip: "Operational" },
//   { color: "emerald", tooltip: "Operational" },
//   { color: "emerald", tooltip: "Operational" },
//   { color: "gray", tooltip: "Maintenance" },
//   { color: "emerald", tooltip: "Operational" },
//   { color: "emerald", tooltip: "Operational" },
//   { color: "emerald", tooltip: "Operational" },
//   { color: "yellow", tooltip: "Degraded" },
//   { color: "emerald", tooltip: "Operational" }
// ];

const TrackerChart = ({ data }: { data: Tracker[] }) => (
  <Tracker data={data} className="h-full w-full" />
);

export default TrackerChart;
