import { FC } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Cross1Icon } from "@radix-ui/react-icons";
import { AssetType } from "../../lib/portfolio-utils";

type AddNewPortfolioModalProps = {
  isShowing: boolean;
  cancel: () => void;
  onSelection: (portfolioType: AssetType) => void;
};

const AddNewPortfolioModal: FC<AddNewPortfolioModalProps> = ({
  isShowing,
  cancel,
  onSelection
}) => (
  <AlertDialog defaultOpen={false} open={isShowing}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle className="inline-flex justify-between">
          <span className="text-lg font-medium leading-6 text-gray-900">Portfolio type</span>
          <AlertDialogCancel onClick={cancel}>
            <Cross1Icon />
          </AlertDialogCancel>
        </AlertDialogTitle>
        <AlertDialogDescription>
          <div className="flex justify-center space-x-3 py-6">
            <AlertDialogAction
              className="h-24 w-24 rounded-xl border-2 border-gray-300 text-center font-mono font-semibold shadow-md hover:bg-green-300 hover:text-charcoal-900"
              onClick={() => onSelection(AssetType.STOCK)}
            >
              Stock
            </AlertDialogAction>
            <AlertDialogAction
              className="h-24 w-24 rounded-xl border-2 border-gray-300 text-center font-mono font-semibold shadow-md hover:bg-yellow-300 hover:text-charcoal-900"
              onClick={() => onSelection(AssetType.CRYPTO)}
            >
              Crypto
            </AlertDialogAction>
          </div>
        </AlertDialogDescription>
      </AlertDialogHeader>
    </AlertDialogContent>
  </AlertDialog>
);

export default AddNewPortfolioModal;
