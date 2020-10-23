import { FC } from "react";
import AppHeader from "../components/app-header";
import DefaultLayout from "../layouts/default";

const Dashboard: FC = () => {
  return (
    <>
      <DefaultLayout
        title="Dashbord"
        description="You can see your portfolios estimated value & progress below:"
      />
    </>
  );
};

export default Dashboard;
