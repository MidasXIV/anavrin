import { FC } from "react";
import Register from "../components/website/register";
import FeaturesSection from "../components/website/features-section";
import LaunchAppButton from "../components/website/launch-app-button";
import WebsiteHeader from "../components/website/header";

const Home: FC = () => (
  <div className="w-full flex flex-col">
    <WebsiteHeader />
    <div className="bg-gray-100 flex justify-center border border-b-1">
      <div className="flex flex-col text-center p-8 md:p-16 max-w-xl">
        {/* <h6 className="uppercase text-xs text-gray-600">coming soon</h6> */}
        <h3 className="pt-4 mb-2 text-6xl font-medium font-mono uppercase">
          Analyse your portfolio
        </h3>
        <p className="pt-5 font-medium">
          Simple tracking & simulation for your portfolio. Make better decisions with real data.
        </p>
      </div>
    </div>

    <div className="flex">
      <div className="flex flex-col md:flex-row h-full justify-center">
        <div className="p-8 md:p-12 flex md:w-4/12 flex-col">
          <h1 className="m-0 text-3xl font-medium leading-10 tracking-tight text-white sm:leading-none md:text-5xl lg:text-7xl">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-emerald-400 to-green-500 md:inline-block uppercase">
              {" "}
              Make Better
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-500 via-cyon-400 to-purple-300 uppercase">
                {" "}
                Decisions
              </span>{" "}
            </span>
          </h1>
        </div>
        <div className="p-8 md:p-12 flex md:w-4/12 flex-col">
          <h3 className="font-semibold mb-2">Check out Anavrin Beta</h3>
          <p className="text-sm mb-2">
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
    <div className="bg-gray-50 border border-t-1">
      <Register />
    </div>
  </div>
);

export default Home;
