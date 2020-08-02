import { FC } from "react";
import AppHeader from "../components/app-header";

const Dashboard: FC = () => {
  return (
    <main>
      <AppHeader
        title="Hello there"
        description="You can see your portfolios estimated value & progress below:"
        currentPage={{ label: "Home", path: "/dashboard" }}
        otherPages={[{ label: "Portfolio", path: "/dashboard/portfolio" }]}
      />
    </main>
  );
};

export default Dashboard;
