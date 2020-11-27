import { FC } from "react";
import Link from "next/link";

const Home: FC = () => (
  <div className="w-full h-screen bg-gray-200 flex flex-col">
    {/* <header className="flex items-center px-10 py-12 lg:px-56">
      <a href="#about">
        <h4 className="text-xl">Anavrin</h4>
      </a>

      <nav className="ml-auto text-sm">
        <a href="#about" className="mr-6">
          About
        </a>
        <a href="#support" className="mr-6">
          Support
        </a>

        <Link href="/dashboard">
          <a className="btn">Open App</a>
        </Link>
      </nav>
    </header>
    <div className="px-10 py-32 lg:py-42 lg:px-56">
      <h1 className="text-3xl max-w-2xl mb-8">
        Simple tracking & simulation for your portfolio. Make better decisions with real data.
      </h1>
      <div className="flex">
        <Link href="/dashboard">
          <a className="bg-gray-900 hover:bg-gray-800 font-medium py-3 px-5 rounded-full mr-6">
            Open the app
          </a>
        </Link>
        <button
          className="bg-black hover:bg-gray-900 font-medium py-3 px-5 rounded-full"
          type="button"
        >
          Learn More
        </button>
      </div>
    </div> */}
    <div className="bg-gray-100 flex justify-center border border-b-1">
      <div className="flex flex-col text-center p-8 md:p-16 max-w-xl">
        <h6 className="uppercase text-xs text-gray-600">coming soon</h6>
        <p className="pt-5">
          Simple tracking & simulation for your portfolio. Make better decisions with real data.
          Simple tracking & simulation for your portfolio. Make better decisions with real data.
        </p>

        <div className="pt-8">
          <p className="font-semibold text-left">Get notified when we launch</p>
          <div className="flex flex-col md:flex-row md:space-x-3">
            <input
              className="shadow-inner rounded-lg mb-2 p-2 flex-1 w-full md:w-3/4 md:mb-0 border"
              id="email"
              type="email"
              aria-label="email address"
              placeholder="Enter your email address"
            />
            <button
              className="bg-gray-900 hover:bg-gray-800 py-2 rounded-lg text-white w-full md:w-1/4 text-sm"
              type="button"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className="flex-1">
      <div className="flex flex-col md:flex-row h-full">
        <div className="p-8 md:p-12 flex md:w-4/12 flex-col">
          <h3 className="font-semibold">Check out Anavrin Beta</h3>
          <button
            type="button"
            className="block bg-gray-900 rounded-lg p-2 font-semibold text-gray-100"
          >
            <Link href="/dashboard">
              <a>Open Anavrin!</a>
            </Link>
          </button>
        </div>
        <div className="flex flex-row h-8 md:w-2/12 md:h-auto">
          <div className="bg-gray-100 w-1/2 flex justify-center hover:text-white hover:bg-gray-900 cursor-pointer transition-colors ease-in duration-700">
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
          </div>
          <div className="bg-gray-100 w-1/2 flex justify-center hover:text-white hover:bg-gray-900 cursor-pointer transition-colors ease-in duration-700">
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
          </div>
        </div>
        <div className="md:w-6/12 bg-gray-100 grid grid-cols-3">
          <div className="border flex justify-center p-4 pt-8 md:pt-12">
            <p className="text-sm">
              How much income is my portfolio going to generate this month?
              <br />
              What about the whole year?
            </p>
          </div>

          <div className="border flex justify-center p-4 pt-8 md:pt-12">
            <p className="text-sm">
              Which stocks am I depending on the most for my annual dividend income?
            </p>
          </div>

          <div className="border flex justify-center p-4 pt-8 md:pt-12">
            <p className="text-sm">
              Am I taking on too much risk with my portfolio?
              <br /> Am i diversified enough?
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Home;
