import { FC } from "react";
import Link from "next/link";

const Home: FC = () => (
  <div>
    <header className="flex items-center px-10 py-12 lg:px-56">
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
    </div>
  </div>
);

export default Home;
