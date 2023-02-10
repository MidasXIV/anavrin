import { FC } from "react";
import cn from "classnames";
import { Transition } from "@mantine/core";
import PortfolioType from "../../lib/portfolio-utils";

type AddNewPortfolioModalProps = {
  isShowing: boolean;
  cancel: () => void;
  onSelection: (portfolioType: PortfolioType) => void;
};

const AddNewPortfolioModal: FC<AddNewPortfolioModalProps> = ({
  isShowing,
  cancel,
  onSelection
}) => (
  <Transition mounted={isShowing} transition="fade" duration={400} timingFunction="ease">
    {styles => (
      <div style={styles}>
        <div
          className={cn("fixed inset-0 z-10 px-4 md:flex md:items-center md:justify-center", {
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
          <div className="fixed inset-x-0 bottom-0 z-50 mx-4 mb-4 rounded-lg bg-white p-2 shadow-lg md:relative md:mx-auto md:w-full md:max-w-lg">
            <div className="flex flex-col px-2 py-5 sm:px-4">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Portfolio type</h3>
            </div>
            <div className="flex justify-center space-x-3 py-6">
              <button
                type="button"
                className="h-24 w-24 rounded-lg border-4 border-gray-500 bg-charcoal-400 text-center font-mono font-semibold text-gray-300 hover:bg-green-300 hover:text-charcoal-900"
                onClick={() => onSelection(PortfolioType.STOCK)}
              >
                Stock
              </button>
              <button
                type="submit"
                className="h-24 w-24 rounded-lg border-4 border-gray-500 px-5 py-3  font-mono font-semibold text-gray-500 hover:bg-yellow-300 hover:text-charcoal-900"
                onClick={() => onSelection(PortfolioType.CRYPTO)}
              >
                Crypto
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
  </Transition>
);

export default AddNewPortfolioModal;
