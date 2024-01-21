"use client";

/* eslint-disable max-len */
import { FC } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import FAQComponent from "@/components/website/FAQ";
import Image from "next/image";
import Card from "@/components/portfolio-widgets/Card/card";
import InfoIcon from "@/components/icons/InfoIcon";
import { valueFormatter } from "@/utils/timeAndDateHelpers";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import DividendDistributionBlock from "@/components/portfolio-widgets/portfolio-dividend-distribution-block";
import mockDividendDistributionData from "tests/mocks/dividend-distribution-data-1";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BarChartWrapper from "@/components/charting/bar-chart/bar-chart";
import { twMerge } from "tailwind-merge";
import Register from "../components/website/register";
import FeaturesSection from "../components/website/features-section";
import LaunchAppButton from "../components/website/launch-app-button";
import WebsiteHeader from "../components/website/header";
import WebsiteFooter from "../components/website/footer/footer";

type ParallaxImageProps = {
  smallImage: string;
  largeImage: string;
  smallImageSide: "left" | "right";
  parallaxDistance: string;
};

const ParallaxImage = ({
  smallImage,
  largeImage,
  smallImageSide,
  parallaxDistance
}: ParallaxImageProps) => (
  <div
    className={twMerge(
      "col-[wide] my-20 grid gap-3 [view-timeline-name:--parallax-wrapper]",
      smallImageSide === "left" ? "md:grid-cols-[1fr_2fr]" : "md:grid-cols-[2fr_1fr]"
    )}
  >
    <div className="self-start">
      <div
        className="md:supports-[animation-timeline]:parallax-image relative"
        style={{ "--movement": parallaxDistance } as React.CSSProperties}
      >
        <div className="absolute bottom-full pb-5 text-[8px] uppercase">
          <p>Teenie-tiny.</p>
          <p className="text-gray-400">
            The Tadpole is just a tad taller than a gummy bear. It fits in your hand and rests
            nicely on your laptop display.
          </p>
        </div>
        <img src={smallImage} className="rounded-md" />
      </div>
    </div>

    <img
      src={largeImage}
      className={twMerge("rounded-md", smallImageSide === "right" && "md:-order-1")}
    />
  </div>
);

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

    {/* <div className="flex" id="about">
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
    </div> */}

    {/* <FeaturesSection /> */}

    {/* <h1 className="mx-auto mb-4 text-5xl font-thin">
      Perhaps you identify with one of these situations
    </h1> */}
    {/* <section className="h-[35rem] w-full p-12 px-16">
      <div className="grid h-full w-full grid-cols-4 grid-rows-4 rounded-xl bg-gray-200 shadow-sm">
        <div className="col-span-2 row-span-2  border-b border-gray-300 px-4 py-6">
          <h1 className="ml-4 text-5xl font-thin">Tired of managing portfolios in Excel sheets?</h1>
        </div>
        <div className="col-span-2 col-start-1 row-span-2 row-start-3 px-4 py-6">
          <h1 className="ml-4 text-5xl font-thin">Are endless Excel sheets slowing you down?</h1>
        </div>
        <div className="col-span-2 row-span-4 row-start-1 border-l border-gray-300 px-4 py-6">
          <h1 className="ml-4 text-5xl font-thin">
            Struggling to get a clear overview of multiple portfolios simultaneously?
          </h1>
        </div>
      </div>
    </section> */}

    <div className="grid h-[30rem] w-full grid-cols-3 grid-rows-1 gap-4 p-12 px-16">
      <div className=" rounded-xl bg-gray-200 px-4 py-6 shadow-xl">
        <h1 className="ml-4 text-5xl font-thin">Tired of managing portfolios in Excel sheets?</h1>
      </div>
      <div className="rounded-xl bg-gray-200 px-4 py-6 shadow-xl">
        <h1 className="ml-4 text-5xl font-thin">Are endless Excel sheets slowing you down?</h1>
      </div>
      <div className="rounded-xl bg-gray-200 px-4 py-6 shadow-xl">
        <h1 className="ml-4 text-5xl font-thin">
          Struggling to get a clear overview of multiple portfolios simultaneously?
        </h1>
      </div>
    </div>

    <div className="mx-auto h-[400vh] max-w-3xl [view-timeline-name:--reveal-wrapper]">
      <div className="sticky top-0 flex min-h-screen flex-col items-center justify-center">
        <h1 className="mx-auto mb-4 text-5xl font-thin">
          Perhaps you identify with one of these situations
        </h1>
        <div>
          <p className="supports-[animation-timeline]:reveal-text text-xl text-black md:text-4xl lg:text-[50px] lg:leading-[1]">
            Introducing the Tadpole the smallest webcam ever built. With a category-first
            directional microphone, a mirrorless Sony sensor, and the easiest way to mute your call
            with a tap it’s the perfect webcam to take with you everywhere
          </p>
        </div>
      </div>
    </div>

    <section className="mx-auto max-w-4xl">
      <ParallaxImage
        smallImage="/images/image-1.webp"
        largeImage="/images/image-2.webp"
        smallImageSide="left"
        parallaxDistance="100%"
      />

      <ParallaxImage
        smallImage="/images/image-1.webp"
        largeImage="/images/image-2.webp"
        smallImageSide="right"
        parallaxDistance="100%"
      />
    </section>

    {/* features */}
    <section className="outlline-test" id="cards">
      <div className="outline-test card sticky top-0 h-screen px-16 py-16">
        <div className="card__content h-full w-full rounded-xl bg-slate-100 shadow-xl">
          <div className="border-b border-charcoal-400 p-4">
            <h1 className="ml-4 text-5xl font-thin">
              Tired of managing portfolios in Excel sheets?
            </h1>
            <span> streamlines portfolio analysis, eliminating Excel chaos</span>
          </div>
          <div className="outline-test h-full w-full">
            {/* <Image
              className="h-full w-full"
              src="https://github.com/MidasXIV/anavrin/assets/24829816/8b94aef8-c497-4398-ac8a-4512c86bbdff"
              alt="Profile"
              width={0}
              height={0}
              sizes="100vw"
            /> */}
          </div>
        </div>
      </div>
      <div className="outline-test card sticky top-0 h-screen px-16 py-16">
        <div className="card__content h-full w-full overflow-hidden rounded-xl bg-blue-100 shadow-xl">
          {/* <div className="border-b border-charcoal-400 p-4">
            <h1 className="ml-4 text-5xl font-thin">Are endless Excel sheets slowing you down?</h1>
          </div> */}

          <div className="flex h-full justify-center">
            <div className="flex h-full w-full max-w-4xl flex-col justify-end">
              <Image
                className="w-full"
                src="/images/73shots_so.png"
                alt="Find Your Audience"
                width={0}
                height={0}
                sizes="100vw"
              />

              <div className="relative">
                <div className="absolute right-20 -mt-[17rem] flex h-64 w-52 items-start rounded-lg border-gray-200 bg-white text-gray-900 shadow-2xl outline">
                  <Card showHeader headerTitle="Dividend analysis">
                    <div className="flex h-full w-full flex-col">
                      <div className="flex h-full w-full flex-col justify-between p-1 px-2">
                        <span className="font-sans text-3xl font-bold text-gray-900">
                          {valueFormatter(924.6)}
                        </span>
                        <div className="inline-flex justify-between py-1 text-xs font-semibold text-gray-800">
                          <span>
                            Annual
                            <br />
                            dividends
                          </span>
                          <button type="button" className="rounded-lg px-2 py-1 hover:bg-gray-200">
                            <InfoIcon />
                          </button>
                        </div>
                      </div>
                      <div className="flex h-full w-full flex-row">
                        <div className="border-1 border-success flex h-full w-full flex-col justify-between border-r-2 border-t-2 p-1 px-2">
                          <div className="font-sans text-2xl font-bold text-gray-900">1.63%</div>
                          <div className="inline-flex justify-between py-1  text-xs  font-semibold text-gray-800">
                            <span>Dividend yield</span>
                            <button
                              type="button"
                              className="rounded-lg px-2 py-1 hover:bg-gray-200"
                            >
                              <InfoIcon />
                            </button>
                          </div>
                        </div>
                        <div className="border-1 border-success flex h-full w-full flex-col justify-between border-t-2 p-1 px-2">
                          <div className="font-sans text-2xl font-bold text-gray-900">{3.06}%</div>
                          <div className="inline-flex justify-between py-1  text-xs  font-semibold text-gray-800">
                            <span>Dividend efficiency</span>
                            <button
                              type="button"
                              className="rounded-lg px-2 py-1 hover:bg-gray-200"
                            >
                              <InfoIcon />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -left-20 -mt-[20rem] flex h-64 w-96 items-start rounded-lg border-gray-200 bg-white text-gray-900 shadow-2xl outline">
                  <Card showHeader headerTitle="Dividend distribution">
                    <div className="h-full w-full">
                      <Tabs
                        defaultValue="monthly"
                        // onValueChange={handleTabChange}
                        className="flex h-fit flex-col"
                      >
                        <TabsList className="">
                          <TabsTrigger value="monthly">Monthly</TabsTrigger>
                          <TabsTrigger value="quaterly">Quaterly</TabsTrigger>
                        </TabsList>
                      </Tabs>

                      <div className="my-3 h-44 w-full">
                        <BarChartWrapper
                          title="Dividends in year"
                          data={[
                            {
                              month: "January",
                              dividends: 300
                            },
                            {
                              month: "February",
                              dividends: 600
                            },
                            {
                              month: "March",
                              dividends: 400
                            },
                            {
                              month: "April",
                              dividends: 400
                            },
                            {
                              month: "May",
                              dividends: 400
                            },
                            {
                              month: "June",
                              dividends: 800
                            },
                            {
                              month: "July",
                              dividends: 400
                            },
                            {
                              month: "August",
                              dividends: 500
                            },
                            {
                              month: "September",
                              dividends: 600
                            },
                            {
                              month: "October",
                              dividends: 100
                            },
                            {
                              month: "November",
                              dividends: 200
                            },
                            {
                              month: "December",
                              dividends: 250
                            }
                          ]}
                          index="month"
                          categories={["dividends"]}
                          colors={["blue"]}
                        />
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
              {/* <div className="relative">
                <div className="absolute left-12 -mt-[38rem] flex h-64 w-44 items-start overflow-hidden rounded-lg border-gray-200 bg-white text-gray-900 shadow-2xl outline">
                  <Image
                    className="h-full w-full"
                    src="/images/widget-2.png"
                    alt="Profile"
                    width={0}
                    height={0}
                    sizes="100vw"
                  />
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <div className="outline-test card card__content sticky top-0 h-screen px-16 py-16">
        <div className="h-full w-full rounded-xl bg-fuchsia-100 shadow-xl">
          {/* <div className="border-b border-charcoal-400 p-4">
            <h1 className="ml-4 text-5xl font-thin">
              Struggling to get a clear overview of multiple portfolios simultaneously?
            </h1>
            <span>Effortlessly manage and view multiple portfolios anytime, anywhere.</span>
          </div> */}
          <div className="flex h-full justify-center">
            <div className="flex h-full w-full max-w-4xl flex-col justify-start">
              <Image
                className="w-full"
                src="/images/601shots_so.png"
                alt="Find Your Audience"
                width={0}
                height={0}
                sizes="100vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* <div className="relative border-b border-t border-charcoal-400"> */}
    <div className="relative">
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

    <div className="h-14 rounded-t-full bg-charcoal-900 shadow-lg sm:h-28" />
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
      <div className="h-14 rounded-b-full bg-charcoal-900 shadow-lg sm:h-28" />
    </div>
    <div className="w-full">
      <WebsiteFooter />
    </div>
  </div>
);

export default Home;
