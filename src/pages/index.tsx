import { FC } from "react";
import Link from "next/link";

const Home: FC = () => (
  <div className="w-full h-screen bg-gray-200">
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
    <div className="bg-gray-100 flex justify-center">
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
  </div>
);

export default Home;
