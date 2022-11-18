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
      <div className="w-full p-4 md:w-1/3">
        <EconomicEventsPanel />
      </div>
    </DefaultLayout>
  </>
);

export default Overview;
