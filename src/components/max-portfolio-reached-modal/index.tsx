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

type MaxPortfolioReachedModalProps = {
  isShowing: boolean;
  cancel: () => void;
};

const MaxPortfolioReachedModal: FC<MaxPortfolioReachedModalProps> = ({ isShowing, cancel }) => (
  <AlertDialog defaultOpen={false} open={isShowing}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Maximum Portfolios Reached</AlertDialogTitle>
        <AlertDialogDescription>
          You &apos;ve already created the maximum number of portfolios. To create a new one, please
          upgrade your account or delete an existing portfolio.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={cancel}>Cancel</AlertDialogCancel>
        <AlertDialogAction>Upgrade Account!</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

export default MaxPortfolioReachedModal;
