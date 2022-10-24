import { FC } from "react";

import DefaultLayout from "../layouts/default";

const Offline: FC = () => (
  <>
    <DefaultLayout
      title="Offline"
      sidebar="dashboard"
      description="You can see your portfolios estimated value & progress below"
    >
      <div className="flex h-full w-full flex-row">
        <div className="dashboard-primary-panel">
          <h1 className="text-2xl">You are currently offline</h1>
        </div>
        <div className="dashboard-secondary-panel">Secondary Panel</div>
      </div>
    </DefaultLayout>
  </>
);

export default Offline;
