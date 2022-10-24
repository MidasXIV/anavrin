import { FC } from "react";

const FeaturesSection: FC<unknown> = () => (
  <div className="bg-gray-50 py-16">
    <div className="container m-auto space-y-8 px-6 text-gray-500 md:px-12">
      <div>
        <span className="text-lg font-semibold text-gray-600">Main features</span>
        <h2 className="mt-4 text-2xl font-bold text-gray-900 md:text-4xl">
          A technology-first approach to payments <br className="lg:block" hidden /> and finance
        </h2>
      </div>
      <div className="mt-16 grid divide-x divide-y overflow-hidden rounded-xl border sm:grid-cols-2 lg:grid-cols-3 lg:divide-y-0 xl:grid-cols-4">
        <div className="group relative bg-white transition hover:z-[1] hover:shadow-2xl">
          <div className="relative space-y-8 p-8">
            <div className="space-y-2">
              <h5 className="text-xl font-medium text-gray-800 transition group-hover:text-yellow-600">
                Track Profit
              </h5>
              <p className="text-sm text-gray-600">
                How much income is my portfolio going to generate this month?
                <br />
                What about the whole year?
              </p>
            </div>
            <a href="#" className="flex items-center justify-between group-hover:text-yellow-600">
              <span className="text-sm">Read more</span>
              <span className="-translate-x-4 text-2xl opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                &RightArrow;
              </span>
            </a>
          </div>
        </div>
        <div className="group relative bg-white transition hover:z-[1] hover:shadow-2xl">
          <div className="relative space-y-8 p-8">
            <div className="space-y-2">
              <h5 className="text-xl font-medium text-gray-800 transition group-hover:text-yellow-600">
                Analyze Portfolio
              </h5>
              <p className="text-sm text-gray-600">
                Which stocks am I depending on the most for my annual dividend income?
              </p>
            </div>
            <a href="#" className="flex items-center justify-between group-hover:text-yellow-600">
              <span className="text-sm">Read more</span>
              <span className="-translate-x-4 text-2xl opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                &RightArrow;
              </span>
            </a>
          </div>
        </div>
        <div className="group relative bg-white transition hover:z-[1] hover:shadow-2xl">
          <div className="relative space-y-8 p-8">
            <div className="space-y-2">
              <h5 className="text-xl font-medium text-gray-800 transition group-hover:text-yellow-600">
                Diversify portfolio
              </h5>
              <p className="text-sm text-gray-600">
                Am I taking on too much risk with my portfolio?
                <br /> Am I diversified enough?
              </p>
            </div>
            <a href="#" className="flex items-center justify-between group-hover:text-yellow-600">
              <span className="text-sm">Read more</span>
              <span className="-translate-x-4 text-2xl opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                &RightArrow;
              </span>
            </a>
          </div>
        </div>
        <div className="group relative bg-gray-100 transition hover:z-[1] hover:shadow-2xl lg:hidden xl:block">
          <div className="relative space-y-8 rounded-lg border-dashed p-8 transition duration-300 group-hover:scale-90 group-hover:border group-hover:bg-white">
            <div className="space-y-2">
              <h5 className="text-xl font-medium text-gray-800 transition group-hover:text-yellow-600">
                Easy Onboarding
              </h5>
              <p className="text-sm text-gray-600">
                Import spreadsheets to quickly update or analyze a portfolio.
              </p>
            </div>
            <a href="#" className="flex items-center justify-between group-hover:text-yellow-600">
              <span className="text-sm">Read more</span>
              <span className="-translate-x-4 text-2xl opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                &RightArrow;
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default FeaturesSection;
