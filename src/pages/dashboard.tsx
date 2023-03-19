import { Button } from "@mantine/core";
import cn from "classnames";
import { FC, useState } from "react";
import LoremIpsum from "../components/placeholder/lorem-ipsum";

import DefaultLayout from "../layouts/default";

const Dashboard: FC = () => {
  const [hide, setHide] = useState(false);
  return (
    <>
      <DefaultLayout
        title="Dashboard"
        sidebar="dashboard"
        description="You can see your portfolios estimated value & progress below"
      >
        <div className="flex w-full flex-1 flex-row overflow-auto rounded-t-lg">
          <div
            className={cn("dashboard-primary-panel overflow-y-auto", {
              "sm:w-full": hide,
              "sm:w-8/12": !hide
            })}
          >
            <Button onClick={() => setHide(!hide)}>Transistion</Button>
            <LoremIpsum />
            <LoremIpsum />
          </div>
          <div
            className={cn("dashboard-secondary-panel", {
              "sm:w-1/4": hide
            })}
          >
            Secondary Panel
          </div>
        </div>
      </DefaultLayout>
    </>
  );
};
export default Dashboard;
