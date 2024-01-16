/* eslint-disable max-len */
import { FC } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import FAQComponent from "@/components/website/FAQ";
import Register from "../components/website/register";
import FeaturesSection from "../components/website/features-section";
import LaunchAppButton from "../components/website/launch-app-button";
import WebsiteHeader from "../components/website/header";
import WebsiteFooter from "../components/website/footer/footer";

const Home: FC = () => (
  <div className="m-0 flex h-full flex-col bg-white">
    <WebsiteHeader />
    <div className="border-b-1 flex justify-center" id="home">
      <div className="flex max-w-6xl flex-col p-8 text-center md:p-16">
        {/* <h6 className="uppercase text-xs text-gray-600">coming soon</h6> */}
        {/* <h3 className="outline-font mb-2 pt-4 text-6xl font-light uppercase">
          ANALYZE YOUR PORTFOLIO
        </h3> */}
        <h2 className="text-rep outline-font mx-auto my-24 flex flex-col py-12 font-wide text-[60px] md:text-[85px] lg:text-[108px]">
          <span className="absolute -translate-y-24 bg-white leading-none">ANAVRIN</span>
          <span className="absolute -translate-y-14 bg-white leading-none ">ANAVRIN</span>
          <span className="absolute -translate-y-7 bg-white leading-none ">ANAVRIN</span>
          <span className="absolute translate-y-24 bg-white leading-none ">ANAVRIN</span>
          <span className="absolute translate-y-14 bg-white leading-none ">ANAVRIN</span>
          <span className="absolute translate-y-7 bg-white leading-none">ANAVRIN</span>
          <span className="relative bg-white leading-none">ANAVRIN</span>
        </h2>
        {/* <p className="pt-5 font-medium">
          Simple tracking & simulation for your portfolio. Make better decisions with real data.
        </p> */}
        <p className="font-mono text-xs">
          Tracking + Analytics + Simulation
          <br />
          <br />
          Track and Optimize Your Portfolio with Ease; Gain control over your investments with our
          simple yet powerful tracking and simulation tools. Make informed decisions backed by real
          data for better portfolio management.
          <br />
          <br />
          Our platform empowers you to effortlessly monitor your dividends and performance, even in
          complex portfolios. Focus on your investment strategy while we handle the details.
        </p>
      </div>
    </div>

    <div className="flex" id="about">
      <div className="mx-auto flex h-full max-w-6xl flex-col justify-center space-y-6 p-6 sm:space-x-6 sm:space-y-0 md:flex-row">
        <div className="block rounded-lg border border-gray-200 bg-white p-6 shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Join Our Exclusive Beta Program
          </h5>
          <p className="mb-4 font-mono text-xs text-gray-700 dark:text-gray-400">
            Be among the first to experience the power of Anavrin. Sign up for our exclusive beta
            program and gain early access to innovative portfolio tracking and management tools. Get
            a firsthand look at our cutting-edge features and help shape the future of Anavrin by
            providing valuable feedback. Don&apos;t miss out on this opportunity to take control of
            your investments with ease and precision. Join us on this exciting journey and unlock
            the full potential of your portfolio.
          </p>
          <Link href="#register" scroll={false}>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg bg-orange-400 px-4 py-3 text-sm font-medium text-gray-900 hover:bg-orange-600 hover:text-white focus:outline-none focus:ring-4"
            >
              Sign up for Beta
            </button>
          </Link>
        </div>

        <div className="block rounded-lg border border-gray-200 bg-white p-6 shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Experience Anavrin Beta
          </h5>
          <p className="mb-4 font-mono text-xs text-gray-700 dark:text-gray-400">
            Discover the cutting-edge features of Anavrin Beta. Our intuitive interface seamlessly
            combines ease of use with advanced integration and analytical capabilities. Explore how
            it can transform your portfolio management experience.
          </p>
          <LaunchAppButton />
        </div>
      </div>
    </div>

    <FeaturesSection />

    <div className="relative border-b border-t border-charcoal-400">
      <section className="relative z-10 flex w-full flex-row p-12 px-16">
        <section className="h-[50vh] w-1/3 rounded-l-xl bg-gradient-to-l from-black via-blue-600 to-sky-100" />
        <section className="h-[50vh] w-1/3 bg-black" />
        <section className="h-[50vh] w-1/3 rounded-r-xl bg-gradient-to-r from-black via-fuchsia-300 to-fuchsia-100" />
      </section>
      <div className="absolute inset-0  z-20 mx-auto flex w-1/2 flex-col items-center justify-center text-center text-gray-100">
        <h1 className="mb-4 text-5xl font-thin">Anavrin is Your Trusted Portfolio Ally</h1>
        <span className="text-md mb-8 w-5/6 text-gray-200/70">
          Elevate your experience with a seamless mobile interface, freeing you from the confines of
          traditional desktop solutions. Our intelligent algorithms provide swift and precise
          portfolio insights, adapting and enhancing with every interaction.
        </span>
        <div className="flex space-x-5">
          <Button
            type="submit"
            className="rounded-full border-2 bg-gray-100 px-10 py-6 font-light text-gray-800 transition duration-300 hover:bg-transparent hover:text-gray-100"
            variant="default"
          >
            Get Started
          </Button>

          <Button
            type="submit"
            className="rounded-full border px-10 py-6 font-light text-gray-400"
            variant="outline"
          >
            Learn More
          </Button>
        </div>
      </div>
    </div>

    <div className="flex h-96 w-full flex-row bg-charcoal-300 px-8 py-4">
      <div className=" h-full w-1/2 p-1">
        <div className="h-full w-full rounded-xl bg-gray-300 shadow-lg">
          Perhaps you identify with one of these situations
        </div>
      </div>
      <div className="grid h-full w-1/2 grid-cols-2 gap-2 p-1">
        <div className="col-span-1 h-full w-full rounded-xl bg-gray-300 shadow-lg">
          Are endless Excel sheets slowing you down?
        </div>
        <div className="col-span-1 h-full w-full rounded-xl bg-gray-300 shadow-lg">
          Struggling to get a clear overview of multiple portfolios simultaneously?
        </div>
        <div className="col-span-1 h-full w-full rounded-xl bg-gray-300 shadow-lg" />
        <div className="col-span-1 h-full w-full rounded-xl bg-gray-300 shadow-lg" />
      </div>
    </div>

    <div className="h-28 rounded-t-full bg-charcoal-900 shadow-lg" />
    <div className="bg-gradient-to-b from-charcoal-900 via-charcoal-400 to-charcoal-300 text-gray-400">
      <div className="container mx-auto p-8">
        <div className="mx-auto w-full lg:w-2/3">
          <FAQComponent />
        </div>
      </div>
    </div>
    <div className="h-48 bg-charcoal-300" />
    <div className="w-full " id="register">
      <div className="h-28 bg-gradient-to-t from-charcoal-900 via-charcoal-400 to-charcoal-300" />
      <div className="w-full bg-charcoal-900">
        <Register />
      </div>
      <div className="h-28 rounded-b-full bg-charcoal-900 shadow-lg" />
    </div>
    <div className="w-full">
      <WebsiteFooter />
    </div>
  </div>
);

export default Home;
