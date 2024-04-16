import DividendAnalysisCard from "@/components/portfolio-widgets/dividend-analysis-card/dividend-analysis-card";
import DividendBreakdownAnalysisCard from "@/components/portfolio-widgets/dividend-breakdown-analysis-card/dividend-breakdown-analysis-card";
import DividendDistributionCard from "@/components/portfolio-widgets/dividend-distribution-card/dividend-distribution-card";
import GoalsTrackerCard from "@/components/portfolio-widgets/goals-tracker-card/goal-tracker-card";
import RingChartWithListCard from "@/components/portfolio-widgets/ring-chart-with-list/ring-chart-with-list-card";
import Image from "next/image";

import mockDividendDistributionData from "tests/mocks/dividend-distribution-data-1";
import mockDividendDistributionRingChartData from "tests/mocks/dividend-distribution-ring-chart-data-1";
import mockPortfolioBreakdownRingChartData from "tests/mocks/portfolio-breakdown-ring-chart-data-1";
import mockPortfolios from "tests/mocks/mock-portfolios-1";
import PortfolioOverviewCard from "@/components/portfolio-overview-card/portfolio-overview-card";

const Hero = () => (
  <div className="flex min-h-screen" id="home">
    {/* <Image
      className="absolute top-0 z-0 w-fit bg-repeat-x"
      src="/images/backdrop.jpg"
      alt="Find Your Audience"
      width={0}
      height={0}
      sizes="100vw"
    /> */}
    <div className="absolute hidden h-full w-full flex-row justify-evenly overflow-hidden sm:flex">
      <div className="flex h-full w-[14%] flex-col justify-center  px-1">
        {/* <Image
          className="w-full"
          src="/images/widget-2.png"
          alt="Find Your Audience"
          width={0}
          height={0}
          sizes="100vw"
        /> */}
        <div className="h-[18rem] w-full">
          <RingChartWithListCard
            data={mockPortfolioBreakdownRingChartData}
            title="Portfolio breakdown"
          />
        </div>
        <div className="mt-4 h-72 w-full">
          <DividendBreakdownAnalysisCard dividendIncome={924.6} />
        </div>
      </div>
      <div className="flex h-full w-[14%] flex-col justify-center  px-1">
        <div className="mt-12 h-64">
          <DividendAnalysisCard
            dividendIncome={924.6}
            portfolioDividendYield={1.63}
            portfolioDividendEfficiency={3.06}
          />
        </div>
      </div>
      <div className="flex h-full w-[13%] flex-col justify-center  px-1">
        <div className="mt-40 h-[13rem] w-full">
          <GoalsTrackerCard />
        </div>
        {/* <div className="mb-22 h-[20rem] w-full p-2">
          <RingChartWithListCard
            data={mockPortfolioBreakdownRingChartData}
            title="Portfolio breakdown"
          />
        </div> */}
      </div>
      <div className="flex h-full w-[14%] items-end  px-1">
        <div className="mb-28 h-[18rem] w-full ">
          <RingChartWithListCard
            data={mockDividendDistributionRingChartData}
            title="Dividends per stock"
          />
        </div>
      </div>
      <div className="flex h-full w-1/4 flex-col justify-center  px-1">
        <div className="-mt-60 h-fit min-h-[20rem]">
          <DividendDistributionCard data={mockDividendDistributionData} />
        </div>
      </div>
      <div className="flex h-full w-[14%] flex-col justify-center  px-1">
        <div className="-mt-20 h-fit min-h-[16rem]">
          <PortfolioOverviewCard
            key={mockPortfolios[1]._id}
            portfolio={mockPortfolios[1]}
            onPortfolioSelect={() => {
              console.log("Demo purpose only");
            }}
            variant="compact"
          />
        </div>
      </div>
    </div>
    <div className="absolute mt-32 flex h-full w-full flex-row justify-evenly overflow-hidden sm:hidden">
      <div className="flex h-full w-1/2 flex-col justify-center px-2 ">
        <div className="h-[18rem] w-full">
          <RingChartWithListCard
            data={mockPortfolioBreakdownRingChartData}
            title="Portfolio breakdown"
          />
        </div>
        <div className="mt-4 h-72 w-full">
          <DividendBreakdownAnalysisCard dividendIncome={924.6} />
        </div>
      </div>

      <div className="flex h-full w-1/2 flex-col justify-center px-2">
        <div className="h-[16rem] w-full">
          <PortfolioOverviewCard
            key={mockPortfolios[1]._id}
            portfolio={mockPortfolios[1]}
            onPortfolioSelect={() => {
              console.log("Demo purpose only");
            }}
            variant="compact"
          />
        </div>
        <div className="mt-4 h-64 w-full">
          <DividendAnalysisCard
            dividendIncome={924.6}
            portfolioDividendYield={1.63}
            portfolioDividendEfficiency={3.06}
          />
        </div>
      </div>
    </div>
    <div className="relative mt-12 flex max-w-6xl flex-col p-8 font-chakra sm:left-40 sm:m-0 md:p-16 md:px-32">
      <h6 className="relative text-2xl font-bold text-white">Meet</h6>
      <h2 className="flex flex-col text-[60px] md:text-[85px] lg:text-[120px]">
        <span className="relative -mb-5 text-right text-sm leading-none text-white sm:text-lg ">
          Tracking + Analytics + Simulation.
        </span>
        <span className="relative leading-none text-white">Anavrin</span>
      </h2>
      <p className="relative text-xl text-white">
        The modern solution for portfolio analysis on the go!
        {/* Track and Optimize Your Portfolio with Ease; Gain control over your investments with our
        simple yet powerful tracking and simulation tools. Make informed decisions backed by real
        data for better portfolio management. */}
        {/* <br />
        <br />
        Our platform empowers you to effortlessly monitor your dividends and performance, even in
        complex portfolios. Focus on your investment strategy while we handle the details. */}
      </p>
    </div>
  </div>
);

export default Hero;
