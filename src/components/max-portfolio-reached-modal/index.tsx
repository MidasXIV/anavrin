import { FC } from "react";
import { clsx } from "clsx";
import { Transition } from "@mantine/core";

type MaxPortfolioReachedModalProps = {
  isShowing: boolean;
  cancel: () => void;
};

const MaxPortfolioReachedModal: FC<MaxPortfolioReachedModalProps> = ({ isShowing, cancel }) => (
  <Transition mounted={isShowing} transition="fade" duration={400} timingFunction="ease">
    {styles => (
      <div style={styles}>
        <div
          className={clsx("fixed inset-0 z-10 px-4 md:flex md:items-center md:justify-center", {
            hidden: !isShowing,
            "md:hidden": !isShowing
          })}
        >
          <div
            className="absolute inset-0 z-10 w-full bg-black opacity-75"
            onClick={cancel}
            onKeyDown={cancel}
            aria-hidden="true"
          />
          <div className="fixed inset-x-0 bottom-0 z-50 mx-4 mb-4 flex items-center justify-center rounded-lg bg-white p-2 shadow-lg md:relative md:mx-auto md:w-full md:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="flex flex-row items-center">
                <div className="flex-shrink-0">
                  <svg
                    className="h-10 w-10 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <div className="ml-4 text-center text-2xl font-medium">
                  Maximum Portfolios Reached
                </div>
              </div>
              <p className="mt-2 text-center text-sm text-gray-600">
                You &apos;ve already created the maximum number of portfolios. To create a new one,
                please upgrade your account or delete an existing portfolio.
              </p>
            </div>
          </div>
        </div>
      </div>
    )}
  </Transition>
);

export default MaxPortfolioReachedModal;
