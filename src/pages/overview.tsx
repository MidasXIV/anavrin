import { FC } from "react";
import DefaultLayout from "../layouts/default";

const Overview: FC = () => (
  <>
    <DefaultLayout
      title="Overview"
      sidebar="overview"
      description="You can see your portfolios estimated value & progress below"
    />
  </>
);

export default Overview;
