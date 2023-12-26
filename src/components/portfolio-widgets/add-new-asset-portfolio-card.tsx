import { CardStackPlusIcon } from "@radix-ui/react-icons";

const AddNewAssetPortfolioCard = ({ handleAssetTypeSelection }): JSX.Element => (
  <button
    type="button"
    className="block h-72 rounded-xl bg-charcoal-400 outline hover:cursor-pointer hover:bg-charcoal-300"
    onClick={handleAssetTypeSelection}
  >
    <div className="h-full w-full rounded-xl">
      <h5 className="flex h-1/2 w-full justify-between rounded-xl bg-gray-100 p-4 py-6 shadow-md">
        <CardStackPlusIcon className="mx-auto my-auto h-12 w-12" />
      </h5>
      <p className="px-4 py-6 pt-6 font-mono text-gray-200">Create New Portfolio</p>
    </div>
  </button>
);

export default AddNewAssetPortfolioCard;
