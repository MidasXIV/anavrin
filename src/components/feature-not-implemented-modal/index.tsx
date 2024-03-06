import React, { FC } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Cross1Icon } from "@radix-ui/react-icons";

type NotYetImplementedModalProps = {
  isShowing: boolean;
  cancel: () => void;
};

const NotYetImplementedModal: FC<NotYetImplementedModalProps> = ({ isShowing, cancel }) => (
  <AlertDialog defaultOpen={false} open={isShowing}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle className="inline-flex justify-between">
          <span className="text-lg font-medium leading-6 text-gray-900">
            Feature Not Yet Implemented
          </span>
          <AlertDialogCancel onClick={cancel}>
            <Cross1Icon />
          </AlertDialogCancel>
        </AlertDialogTitle>
        <AlertDialogDescription>
          Whoops! This feature is still in the works and hasn&apos;t made it to the party yet. Stay
          tuned for updates!
        </AlertDialogDescription>
      </AlertDialogHeader>
    </AlertDialogContent>
  </AlertDialog>
);

export default NotYetImplementedModal;
