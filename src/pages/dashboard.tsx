import { FC } from "react";

import DefaultLayout from "../layouts/default";

const Dashboard: FC = () => {
  return (
    <>
      <DefaultLayout
        title="Dashboard"
        sidebar="dashboard"
        description="You can see your portfolios estimated value & progress below"
      >
        <div className="w-full h-full flex flex-row">
          <div className="dashboard-primary-panel" />
          <div className="dashboard-secondary-panel">Secondary Panel</div>
        </div>
      </DefaultLayout>
    </>
  );
};

export default Dashboard;
