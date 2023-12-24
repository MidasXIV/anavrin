import { FC } from "react";
import EconomicEventsPanel from "../components/economic-events-panel";
import DefaultLayout from "../layouts/default";

const Overview: FC = () => (
  <>
    <DefaultLayout
      title="Overview"
      sidebar="overview"
      description="You can see your portfolios estimated value & progress below"
    >
      <div className="flex w-full flex-1 flex-row overflow-auto rounded-lg bg-gray-200">
        <div className="w-full overflow-y-auto border border-r-2 p-4 md:w-1/3">
          <EconomicEventsPanel />
        </div>
      </div>
    </DefaultLayout>
  </>
);

export default Overview;
