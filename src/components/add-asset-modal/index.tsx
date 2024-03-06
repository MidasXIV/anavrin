import { FC } from "react";
import { clsx } from "clsx";
import UtilityFooter from "./stock-modal-utility-footer";
import { AssetType, getAddAssetModalTitle } from "../../lib/portfolio-utils";
import AddCryptoForm from "./add-crypto-form";
import AddStockForm from "./add-stock-form";

type AddAssetModalProps = {
  isShowing: boolean;
  cancel: () => void;
  assetType: AssetType;
  onSubmit: (asset) => void;
};

const ButtonPanel = ({ cancel, formState, formValid }) => (
  // <div className="text-center md:text-right mt-4 md:flex md:justify-end">
  <div className="mx-2 flex h-full flex-row items-center justify-between rounded-lg bg-charcoal-900 p-2 align-middle font-light">
    <ul className="nav flex flex-row items-center text-xs">
      <button
        type="button"
        className={clsx(
          "inline-block w-auto rounded-lg py-2 pl-1 pr-2 text-xs font-semibold text-gray-500",
          {
            "animate-bounce": formValid
          }
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="mr-2 inline-flex h-6 w-6 rounded-md bg-charcoal-300 p-1 text-charcoal-900"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
        Click to Proceed{" "}
      </button>
    </ul>
    <ul className="nav flex flex-row space-x-3 text-xs">
      {/* <button
        type="button"
        className="block w-full md:inline-block pr-3 md:w-auto bg-charcoal-400 text-gray-500 hover:bg-green-300 hover:text-charcoal-900 rounded-md font-semibold text-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-8 p-2 mr-2 inline-flex bg-green-300 text-charcoal-900 rounded-md"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
        Add Stock{" "}
      </button> */}
      <button
        type="button"
        className="inline-block w-auto rounded-lg bg-charcoal-400 py-2 pl-1 pr-2 text-center font-semibold text-gray-500 hover:bg-green-300 hover:text-charcoal-900"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="mr-1 inline-flex w-6 rounded-md bg-green-300 p-1 text-charcoal-900"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
        Add Stock{" "}
      </button>
      <button
        type="button"
        className="inline-block w-auto rounded-lg bg-charcoal-400 py-2 pl-1 pr-2 font-semibold text-gray-500 hover:bg-red-300 hover:text-charcoal-900"
        onClick={cancel}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="mr-1 inline-flex w-6 rounded-md bg-red-300 p-1 text-charcoal-900"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>{" "}
        Cancel
      </button>
    </ul>
  </div>
);

const AddAssetModal: FC<AddAssetModalProps> = ({ isShowing, cancel, assetType, onSubmit }) => {
  const modalTitle = getAddAssetModalTitle(assetType);
  const onAddAssetModalSubmit = asset => {
    onSubmit(asset);
    cancel();
  };
  const assetTypeToFormMap = {
    [AssetType.CRYPTO]: <AddCryptoForm onSubmit={onAddAssetModalSubmit} />,
    [AssetType.STOCK]: <AddStockForm onSubmit={onAddAssetModalSubmit} />
    // add more mappings as needed
  };

  const ModalContent = assetTypeToFormMap[assetType] || (
    <AddStockForm onSubmit={onAddAssetModalSubmit} />
  );

  return (
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
      <div className="fixed inset-x-0 bottom-0 z-50 mx-4 mb-4 rounded-lg bg-white p-2 shadow-lg md:relative md:mx-auto md:w-full md:max-w-lg">
        <div className="flex flex-col px-2 py-5 sm:px-4">
          <h3 className="text-lg font-medium leading-6 text-gray-900">{modalTitle}</h3>
        </div>
        <div className="border-t border-gray-200 py-2">
          <dl>{ModalContent}</dl>
        </div>

        {/* <ButtonPanel cancel={cancel} formState={formState} formValid={formValid} /> */}
        <UtilityFooter />
      </div>
    </div>
  );
};

export default AddAssetModal;

// reference
/* https://tailwindcomponents.com/component/modal
   https://codepen.io/iamsahilvhora/pen/LYYxQJw */
