import { FC } from "react";

const featuresData = [
  {
    title: "Find your audience.",
    body: (
      <>
        <p className="mb-8 text-xl font-normal">
          The right audience, at the right place, and the right time. We’ll index your Ethereum
          contract giving you a holistic view of your audience. Don’t have a contract? No worries.
          Upload a list or create a community with Lens.
        </p>
        <img
          src="https://res.cloudinary.com/dispatchxyz/image/upload/v1667957022/public/homepage/lens_nyyznt.svg"
          alt="Powered by Lens"
        />
      </>
    ),
    img: `https://res.cloudinary.com/dispatchxyz/image/upload/f_auto/v1667953543/public/homepage/how-dispatch-works-1.0_-_Audience_qc8edf.png`
  },
  {
    title: "View instant insights.",
    body: `Our Dashboard compiles actionable data points so you know what's working and what to do next time.`,
    img: `https://res.cloudinary.com/dispatchxyz/image/upload/f_auto/v1667953543/public/homepage/how-dispatch-works-1.0_-_Audience_qc8edf.png`
  },

  {
    title: "Track Profit",
    body: "Keep tabs on your portfolio's income potential. Discover how much income your portfolio is projected to generate this month and throughout the year. Stay informed about your investment returns.",
    img: `https://res.cloudinary.com/dispatchxyz/image/upload/f_auto/v1667953543/public/homepage/how-dispatch-works-1.0_-_Audience_qc8edf.png`
  },

  {
    title: "Analyze Portfolio",
    body: "Gain insights into your dividend income by analyzing your portfolio. Identify the stocks that contribute the most to your annual dividend income. Make informed decisions about your investment strategy.",
    img: `https://res.cloudinary.com/dispatchxyz/image/upload/f_auto/v1667953543/public/homepage/how-dispatch-works-1.0_-_Audience_qc8edf.png`
  },

  {
    title: "Diversify Portfolio",
    body: "Ensure a well-balanced portfolio and manage risk effectively. Evaluate your portfolio's diversification level and identify areas where you may be overexposed. Take steps to diversify your investments and achieve a more balanced portfolio.",
    img: `https://res.cloudinary.com/dispatchxyz/image/upload/f_auto/v1667953543/public/homepage/how-dispatch-works-1.0_-_Audience_qc8edf.png`
  },

  {
    title: "Easy Onboarding",
    body: "Simplify portfolio management with seamless onboarding. Effortlessly import your portfolio data from spreadsheets to quickly update and analyze your investments. Streamline your investment workflow and save time with our user-friendly onboarding process.",
    img: `https://res.cloudinary.com/dispatchxyz/image/upload/f_auto/v1667953543/public/homepage/how-dispatch-works-1.0_-_Audience_qc8edf.png`
  }
];

const FeaturesSection: FC<unknown> = () => (
  <section className="mx-auto w-full overflow-hidden" id="features">
    <img
      className="left-0 top-0 w-full scale-95 sm:left-[-100%] sm:w-[100%] sm:max-w-none"
      src="https://res.cloudinary.com/dispatchxyz/image/upload/f_auto,q_10/v1668033206/public/homepage/how-dispatch-works-bg_hhlb2e.png"
      alt=""
      // style="translate: none; rotate: none; scale: none; transform: translate(0%, -3.8082%) translate3d(0px, 0px, 0px) scale(0.9695, 1);"
    />
    <div className="mx-auto -mt-12 mb-52 w-full max-w-[654px] text-center sm:mb-14 md:-mt-24 lg:-mt-36">
      <h1 className="mb-4 text-5xl font-medium sm:text-[45px]">Unlock your portfolio potential.</h1>
      <h2 className=" text-xl leading-8 sm:text-base">
        Discover hidden patterns, analyze market trends, and leverage the full potential of your
        portfolio. With Anavrin&apos;s advanced tracking, analytics, and simulation capabilities,
        you can make data-driven decisions to optimize your investments, maximize returns, and stay
        ahead of the market.
      </h2>
    </div>
    <div className="mx-auto w-full max-w-6xl">
      {featuresData.map((feature, index) => (
        <div
          key={`feature-${index}`}
          className="group mb-[160px] flex flex-col sm:mb-[120px] sm:flex-row sm:px-6 even:sm:flex-row-reverse"
        >
          <div className="img-container relative mb-8">
            <img className="w-[480px]" src={feature.img} alt="Find Your Audience" />
          </div>
          <div className="rotate-none scale-none my-auto flex-grow translate-x-0 translate-y-0 transform-none items-center text-left opacity-100 group-odd:pl-20">
            <div className="max-w-[400px]">
              <div className="Badge mb-8 flex h-6 w-6 items-center justify-center rounded border border-blue-500 bg-transparent text-sm text-blue-500">
                {index + 1}
              </div>
              <h3 className="mb-2 text-2xl font-medium">{feature.title}</h3>
              <div className="mb-8 text-xl font-normal">{feature.body}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default FeaturesSection;
