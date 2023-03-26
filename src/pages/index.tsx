import { FC } from "react";
import Register from "../components/website/register";
import FeaturesSection from "../components/website/features-section";
import LaunchAppButton from "../components/website/launch-app-button";
import WebsiteHeader from "../components/website/header";

const Home: FC = () => (
  <div className="flex w-full flex-col">
    <WebsiteHeader />
    <div className="border-b-1 flex justify-center border bg-gray-100">
      <div className="flex max-w-xl flex-col p-8 text-center md:p-16">
        {/* <h6 className="uppercase text-xs text-gray-600">coming soon</h6> */}
        <h3 className="mb-2 pt-4 font-mono text-6xl font-medium uppercase">
          Analyse your portfolio
        </h3>
        <p className="pt-5 font-medium">
          Simple tracking & simulation for your portfolio. Make better decisions with real data.
        </p>
      </div>
    </div>

    <div className="flex">
      <div className="flex h-full flex-col justify-center md:flex-row">
        <div className="flex flex-col p-8 md:w-4/12 md:p-12">
          <h1 className="m-0 text-3xl font-medium leading-10 tracking-tight text-white sm:leading-none md:text-5xl lg:text-7xl">
            <span className="bg-gradient-to-r from-purple-400 via-emerald-400 to-green-500 bg-clip-text uppercase text-transparent md:inline-block">
              {" "}
              Make Better
              <span className="via-cyon-400 bg-gradient-to-r from-teal-500 to-purple-300 bg-clip-text uppercase text-transparent">
                {" "}
                Decisions
              </span>{" "}
            </span>
          </h1>
        </div>
        <div className="flex flex-col p-8 md:w-4/12 md:p-12">
          <h3 className="mb-2 font-semibold">Check out Anavrin Beta</h3>
          <p className="mb-2 text-sm">
            The interface balances ease of use with powerful integration and analytical features
            that help you automate your tracking process smoothly.
            <br />
            Anavrin helps You track your dividends even in the most sophisticated of portfolios with
            ease.
          </p>
          <LaunchAppButton />
        </div>
      </div>
    </div>

    <FeaturesSection />
    <div className="border-t-1 border bg-gray-50">
      <Register />
    </div>
  </div>
);

export default Home;
