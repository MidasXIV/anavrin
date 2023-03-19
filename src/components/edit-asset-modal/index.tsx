import { FC } from "react";
import cn from "classnames";
import { AssetType, getEditAssetModalTitle } from "../../lib/portfolio-utils";
import EditCryptoForm from "./edit-crypto-form";
import AddStockForm from "../add-asset-modal/add-stock-form";

type EditAssetModalProps = {
  isShowing: boolean;
  cancel: () => void;
  assetType: AssetType;
  onSubmit: (asset) => void;
  asset: any;
};

const EditAssetModal: FC<EditAssetModalProps> = ({
  isShowing,
  cancel,
  assetType,
  onSubmit,
  asset
}) => {
  const modalTitle = getEditAssetModalTitle(assetType);
  const onEditAssetModalSubmit = _asset => {
    onSubmit(_asset);
    cancel();
  };
  const assetTypeToFormMap = {
    [AssetType.CRYPTO]: <EditCryptoForm asset={asset} onSubmit={onEditAssetModalSubmit} />,
    [AssetType.STOCK]: <AddStockForm onSubmit={onEditAssetModalSubmit} />
    // add more mappings as needed
  };

  const ModalContent = assetTypeToFormMap[assetType] || (
    <AddStockForm onSubmit={onEditAssetModalSubmit} />
  );

  return (
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
          <h3 className="text-lg font-medium leading-6 text-gray-900">{modalTitle}</h3>
        </div>
        <div className="border-t border-gray-200 py-2">
          <dl>{ModalContent}</dl>
        </div>
      </div>
    </div>
  );
};

export default EditAssetModal;
