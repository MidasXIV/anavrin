import { valueFormatter } from "@/utils/timeAndDateHelpers";
import Card from "../Card/card";
import TrackerBlock from "../tracker-block/tracker-block";

const GoalsTrackerCard = () => (
  <Card showHeader headerTitle="Goals">
    <div className="h-full w-full">
      <section className="h-1/2 px-2">
        <TrackerBlock title="Investment" current={30983} goal={50000} formatter={valueFormatter} />
      </section>
      <section className="h-1/2 px-2">
        <TrackerBlock title="Dividend" current={805} goal={2000} formatter={valueFormatter} />
      </section>
    </div>
  </Card>
);

export default GoalsTrackerCard;
