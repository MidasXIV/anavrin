import { FC } from "react";
import LoremIpsum from "../components/placeholder/lorem-ipsum";

import DefaultLayout from "../layouts/default";

const Dashboard: FC = () => (
  <>
    <DefaultLayout
      title="Dashboard"
      sidebar="dashboard"
      description="You can see your portfolios estimated value & progress below"
    >
      <div className="w-full flex flex-1 flex-row overflow-auto rounded-t-lg">
        <div className="dashboard-primary-panel overflow-y-auto">
          <LoremIpsum />
          <LoremIpsum />
        </div>
        <div className="dashboard-secondary-panel">Secondary Panel</div>
      </div>
    </DefaultLayout>
  </>
);

export default Dashboard;
