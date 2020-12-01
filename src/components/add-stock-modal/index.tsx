import { FC } from "react";
import cn from "classnames";

type AddStockModalProps = {
  isShowing: boolean;
  cancel: () => void;
};

const AddStockModal: FC<AddStockModalProps> = ({ isShowing, cancel }) => {
  return (
    <div
      className={cn("fixed px-4 md:flex md:items-center md:justify-center z-10 inset-0", {
        hidden: !isShowing,
        "md:hidden": !isShowing
      })}
    >
      <div
        className="bg-black opacity-75 w-full absolute z-10 inset-0"
        onClick={cancel}
        onKeyDown={cancel}
        aria-hidden="true"
      />
      <div className="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative shadow-lg">
        <div className="md:flex items-center">
          <div className="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
            <i className="bx bx-error text-3xl" />
          </div>
          <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
            <p className="font-bold">Delete your account</p>
            <p className="text-sm text-gray-700 mt-1">
              You will lose all of your data by deleting your account. This action cannot be undone.
              undone. undone. undone. undone. undone.
            </p>
          </div>
        </div>
        <div className="text-center md:text-right mt-4 md:flex md:justify-end">
          <button
            type="button"
            className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
          >
            Delete Account
          </button>
          <button
            type="button"
            className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4
          md:mt-0 md:order-1"
            onClick={cancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddStockModal;

// reference
/* https://tailwindcomponents.com/component/modal
   https://codepen.io/iamsahilvhora/pen/LYYxQJw */
