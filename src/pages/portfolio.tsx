import { FC } from "react";
import DefaultLayout from "../layouts/default";
import Loading from "../components/loading";

const Portfolio: FC = () => {
  // <div className="px-10 py-12 lg:px-56 flex justify-center">
  //   <Loading />
  // </div>
  return (
    <>
      <DefaultLayout
        title="Portfolio"
        sidebar="portfolio"
        description="You can see your portfolios estimated value & progress below"
      >
        <div className="w-full h-full flex flex-row">
          <div className="portfolio-primary-panel" />
        </div>
      </DefaultLayout>
    </>
  );
};

export default Portfolio;
