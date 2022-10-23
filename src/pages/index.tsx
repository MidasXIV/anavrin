import React, { FC, useRef } from "react";
import Slider from "react-slick";
import Link from "next/link";
import Image from "next/image";
import Register from "../components/website/register";
import FeaturesSection from "../components/website/features-section";
import LaunchAppButton from "../components/website/launch-app-button";
import WebsiteHeader from "../components/website/header";

const Home: FC = () => {
  const sliderRef = useRef(null);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false
  };
  return (
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
              Anavrin helps You track your dividends even in the most sophisticated of portfolios
              with ease.
            </p>
            <LaunchAppButton />
          </div>
        </div>
      </div>

      {/* <div className="flex-1">
        <div className="flex flex-col md:flex-row h-full">
          <div className="flex flex-row h-8 md:w-3/12 md:h-auto">
            <button
              type="button"
              className="bg-gray-100 w-1/2 flex justify-center hover:text-white hover:bg-gray-900 cursor-pointer transition-colors ease-in duration-700"
              onClick={() => sliderRef.current.slickPrev()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-8"
              >
                <path
                  fillRule="evenodd"
                  d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button
              type="button"
              className="bg-gray-100 w-1/2 flex justify-center hover:text-white hover:bg-gray-900 cursor-pointer transition-colors ease-in duration-700"
              onClick={() => sliderRef.current.slickNext()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-8"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="md:w-9/12 bg-gray-100">
            <Slider {...settings} ref={sliderRef}>
              <div className="border flex justify-center p-4 pt-8 md:pt-12">
                <h3 className="font-semibold mb-2">Track Profit</h3>
                <p className="text-sm">
                  How much income is my portfolio going to generate this month?
                  <br />
                  What about the whole year?
                </p>
              </div>

              <div className="border flex justify-center p-4 pt-8 md:pt-12">
                <h3 className="font-semibold mb-2">Analyze Portfolio</h3>
                <p className="text-sm">
                  Which stocks am I depending on the most for my annual dividend income?
                </p>
              </div>

              <div className="border flex justify-center p-4 pt-8 md:pt-12">
                <h3 className="font-semibold mb-2">Diversify portfolio</h3>
                <p className="text-sm">
                  Am I taking on too much risk with my portfolio?
                  <br /> Am I diversified enough?
                </p>
              </div>

              <div className="border flex justify-center p-4 pt-8 md:pt-12">
                <h3 className="font-semibold mb-2">Simulation tool</h3>
                <p className="text-sm">Research new oppurtunities with the simulation tool.</p>
              </div>

              <div className="border flex justify-center p-4 pt-8 md:pt-12">
                <h3 className="font-semibold mb-2">Easy Onboarding</h3>
                <p className="text-sm">
                  Import spreadsheets to quickly update or analyze a portfolio.
                </p>
              </div>
            </Slider>
          </div>
        </div>
      </div> */}
      <FeaturesSection />
      <div className="bg-gray-50 border border-t-1">
        <Register />
      </div>
    </div>
  );
};

export default Home;
