import { FC } from "react";

const featuresData = [
  {
    title: "Tailored investment strategy",
    body: (
      <>
        <p className="mb-8 text-xl font-normal">
          Provide personalized recommendations for adjusting the investment strategy based on the
          analysis of the portfolio. This can include suggestions on asset allocation,
          diversification, and risk management.
        </p>
        <img
          src="https://res.cloudinary.com/dispatchxyz/image/upload/v1667957022/public/homepage/lens_nyyznt.svg"
          alt="Powered by Lens"
        />
      </>
    ),
    images: (
      <>
        <div className="mx-auto flex justify-center px-4 py-16">
          <div className="flex w-full max-w-md flex-col space-y-8 px-16">
            <img
              className="w-[480px]"
              src="https://github.com/MidasXIV/anavrin/assets/24829816/4f525776-7570-4240-913f-83bb193e43be"
              alt="Find Your Audience"
            />

            <div className="relative">
              <div className="absolute left-20 -mt-80 w-full max-w-md rounded-lg border-2 border-gray-500 shadow-2xl">
                <img
                  className="w-[480px]"
                  src="https://github.com/MidasXIV/anavrin/assets/24829816/9c53563e-5e02-43fb-95af-7b17624402c3"
                  alt="Find Your Audience"
                />
              </div>
            </div>
          </div>
        </div>
      </>
    )
  },
  {
    title: "View instant insights.",
    body: `Our Dashboard compiles actionable data points so you know what's working and what to do next time.`,
    img: `https://res.cloudinary.com/dispatchxyz/image/upload/f_auto/v1667953543/public/homepage/how-dispatch-works-1.0_-_Audience_qc8edf.png`,
    images: (
      <>
        <div className="mx-auto flex justify-center px-4 py-16">
          <div className="flex w-full max-w-xl flex-col space-y-8 px-16">
            <img
              className="w-[480px]"
              src="https://res.cloudinary.com/dispatchxyz/image/upload/f_auto/v1667953543/public/homepage/how-dispatch-works-1.0_-_Audience_qc8edf.png"
              alt="Find Your Audience"
            />

            <div className="relative">
              <div className="absolute right-10 -mt-16 flex w-72 items-start space-x-2 rounded-lg border-gray-200 bg-white px-2 py-3 text-gray-900 shadow-2xl">
                <div className="flex-initial">
                  <div className="bg-gradient-tl inline-flex items-center justify-center rounded-lg bg-green-300 from-green-400 via-green-400">
                    <div className="p-2">
                      <svg
                        className="h-4 w-4 text-white opacity-90"
                        width="24"
                        height="24"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M15 8.5C14.315 7.81501 13.1087 7.33855 12 7.30872M9 15C9.64448 15.8593 10.8428 16.3494 12 16.391M12 7.30872C10.6809 7.27322 9.5 7.86998 9.5 9.50001C9.5 12.5 15 11 15 14C15 15.711 13.5362 16.4462 12 16.391M12 7.30872V5.5M12 16.391V18.5"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="inline-flex flex-1 items-start justify-between">
                  <div>
                    <h2 className="text-xs font-semibold tracking-tight">Loyalty program</h2>
                    <p className="text-xs font-light text-gray-500">You received $5 credit</p>
                  </div>

                  <div className="text-xs text-gray-400">17:15</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  },

  {
    title: "Track Profit",
    body: "Keep tabs on your portfolio's income potential. Discover how much income your portfolio is projected to generate this month and throughout the year. Stay informed about your investment returns.",
    img: `https://res.cloudinary.com/dispatchxyz/image/upload/f_auto/v1667953543/public/homepage/how-dispatch-works-1.0_-_Audience_qc8edf.png`,
    images: (
      <>
        <div className="img-container relative mb-8">
          <img
            className="w-[480px]"
            src="https://res.cloudinary.com/dispatchxyz/image/upload/f_auto/v1667953543/public/homepage/how-dispatch-works-1.0_-_Audience_qc8edf.png"
            alt="Find Your Audience"
          />
        </div>
      </>
    )
  },

  {
    title: "Analyze Portfolio",
    body: "Gain insights into your dividend income by analyzing your portfolio. Identify the stocks that contribute the most to your annual dividend income. Make informed decisions about your investment strategy.",
    img: `https://res.cloudinary.com/dispatchxyz/image/upload/f_auto/v1667953543/public/homepage/how-dispatch-works-1.0_-_Audience_qc8edf.png`,
    images: (
      <>
        <div className="img-container relative mb-8">
          <img
            className="w-[480px]"
            src="https://res.cloudinary.com/dispatchxyz/image/upload/f_auto/v1667953543/public/homepage/how-dispatch-works-1.0_-_Audience_qc8edf.png"
            alt="Find Your Audience"
          />
        </div>
      </>
    )
  },

  {
    title: "Diversify Portfolio",
    body: "Ensure a well-balanced portfolio and manage risk effectively. Evaluate your portfolio's diversification level and identify areas where you may be overexposed. Take steps to diversify your investments and achieve a more balanced portfolio.",
    img: `https://res.cloudinary.com/dispatchxyz/image/upload/f_auto/v1667953543/public/homepage/how-dispatch-works-1.0_-_Audience_qc8edf.png`,
    images: (
      <>
        <div className="img-container relative mb-8">
          <img
            className="w-[480px]"
            src="https://res.cloudinary.com/dispatchxyz/image/upload/f_auto/v1667953543/public/homepage/how-dispatch-works-1.0_-_Audience_qc8edf.png"
            alt="Find Your Audience"
          />
        </div>
      </>
    )
  },

  {
    title: "Easy Onboarding",
    body: "Simplify portfolio management with seamless onboarding. Effortlessly import your portfolio data from spreadsheets to quickly update and analyze your investments. Streamline your investment workflow and save time with our user-friendly onboarding process.",
    img: `https://res.cloudinary.com/dispatchxyz/image/upload/f_auto/v1667953543/public/homepage/how-dispatch-works-1.0_-_Audience_qc8edf.png`,
    images: (
      <>
        <div className="img-container relative mb-8">
          <img
            className="w-[480px]"
            src="https://res.cloudinary.com/dispatchxyz/image/upload/f_auto/v1667953543/public/homepage/how-dispatch-works-1.0_-_Audience_qc8edf.png"
            alt="Find Your Audience"
          />
        </div>
      </>
    )
  }
];

const FeaturesSection: FC<unknown> = () => (
  <section className="mx-auto w-full" id="features">
    {/* <p>dddd</p> */}
    <img
      className="left-0 top-0 w-full scale-95 sm:left-[-100%] sm:w-[100%] sm:max-w-none"
      src="https://res.cloudinary.com/dispatchxyz/image/upload/f_auto,q_10/v1668033206/public/homepage/how-dispatch-works-bg_hhlb2e.png"
      alt=""
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
          {feature.images}
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
