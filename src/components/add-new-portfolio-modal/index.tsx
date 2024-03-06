import { FC, useEffect, useState } from "react";
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
import isEmptyDataItem from "@/utils/type-gaurds";
import { AssetType } from "../../lib/portfolio-utils";
import { Separator } from "../ui/separator";
import ImportPortfolioDialog from "./upload-xlsx";
import UploadedPortfolioParser from "./uploaded-portfolio-parser";
import Stepper from "../stepper";

type AddNewPortfolioModalProps = {
  isShowing: boolean;
  cancel: () => void;
  onSelection: (portfolioType: AssetType) => void;
};

const AssetSelectionBlock = ({ title, onSelect, hasImport, onImport }) => (
  <div className="h-fit w-fit rounded-xl border border-gray-300 bg-neutral-100 p-1">
    <AlertDialogAction
      onClick={onSelect}
      className="h-fit w-fit rounded-t-xl bg-transparent px-4 py-2 text-charcoal-400 shadow-none hover:bg-neutral-200"
    >
      <div className="flex h-24 w-24 items-center justify-center">
        <div>{title}</div>
      </div>
    </AlertDialogAction>
    {hasImport ? (
      <>
        <Separator className="my-1 bg-gray-300" />

        <AlertDialogAction
          onClick={onImport}
          className="h-fit w-full rounded-b-xl  bg-transparent px-4 py-2 text-charcoal-400 shadow-none hover:bg-neutral-200"
        >
          <div className="flex items-center justify-center">
            <span>Import</span>
          </div>
        </AlertDialogAction>
      </>
    ) : null}
  </div>
);

const AssetSelectionPanel = ({ onSelection, setAssetType, setIsImporting }) => (
  <div className="flex h-full flex-col items-center justify-center space-y-3 py-4">
    <div className="flex h-fit flex-row justify-center gap-4">
      <AssetSelectionBlock
        title="Stock"
        hasImport
        onSelect={() => onSelection(AssetType.STOCK, [])}
        onImport={() => {
          setAssetType(AssetType.STOCK);
          setIsImporting(true);
        }}
      />
      <AssetSelectionBlock
        title="Crypto"
        hasImport
        onSelect={() => onSelection(AssetType.CRYPTO, [])}
        onImport={() => {
          setAssetType(AssetType.CRYPTO);
          setIsImporting(true);
        }}
      />
      <AssetSelectionBlock
        title="DFM"
        hasImport
        onSelect={() => onSelection(AssetType.DFM, [])}
        onImport={() => {
          setAssetType(AssetType.DFM);
          setIsImporting(true);
        }}
      />
    </div>
  </div>
);

const AddNewPortfolioModal: FC<AddNewPortfolioModalProps> = ({
  isShowing,
  cancel,
  onSelection
}) => {
  const [isImporting, setIsImporting] = useState<boolean>(false);
  const [uploadedPortfolio, setUploadedPortfolio] = useState(undefined);
  const [assetType, setAssetType] = useState<AssetType>(AssetType.STOCK);
  const [header, setHeader] = useState<string>("Portfolio type");
  const [description, setDescription] = useState<string>(
    "Please select the type of portfolio you want to create"
  );

  let Content = null;
  if (isImporting) {
    Content = (
      <ImportPortfolioDialog
        cancel={() => {
          setIsImporting(false);
        }}
        setUploadedPortfolio={files => {
          setUploadedPortfolio(files);
          setIsImporting(false);
          console.log(files);
        }}
      />
    );
  } else if (uploadedPortfolio) {
    Content = (
      <UploadedPortfolioParser
        file={uploadedPortfolio}
        columnLabels={["Token", "Fiat", "Coins"]}
        onUpload={onSelection}
      />
    );
  } else {
    Content = (
      <AssetSelectionPanel
        // onSelection={(vr) => {console.log(vr)}
        onSelection={onSelection}
        setAssetType={setAssetType}
        setIsImporting={setIsImporting}
      />
    );
  }

  useEffect(() => {
    if (isImporting) {
      setHeader(`Import Your ${assetType} Portfolio!`);
      setDescription(
        `Upload your investment portfolio file to easily transfer your investments to the Anavrin platform.`
      );
      // Content = (
      //   <ImportPortfolioDialog
      //     cancel={() => {
      //       setIsImporting(false);
      //     }}
      //     setUploadedPortfolio={files => {
      //       setUploadedPortfolio(files);
      //       setIsImporting(false);
      //     }}
      //   />
      // );
    } else if (uploadedPortfolio) {
      // Content = <UploadedPortfolioParser file={uploadedPortfolio} />;
      setHeader("Configure Portfolio");
      setDescription("Please port uploaded portfolio ti anavrin compatible portfolio");
    } else {
      setHeader("Portfolio type");
      setDescription("Please select the type of portfolio you want to create");
      // Content = (
      //   <AssetSelectionPanel
      //     // onSelection={(vr) => {console.log(vr)}
      //     onSelection={onSelection}
      //     setAssetType={setAssetType}
      //     setIsImporting={setIsImporting}
      //   />
      // );
    }
  }, [isImporting, assetType]);

  return (
    <>
      <AlertDialog defaultOpen={false} open={isShowing}>
        <AlertDialogContent className="p-0">
          <AlertDialogHeader className="sticky top-0 mb-0 border-b bg-white/30 p-6 pb-4 backdrop-blur-md">
            <AlertDialogTitle className="inline-flex justify-between">
              <span className="text-lg font-medium leading-6 text-gray-900">{`${header}`}</span>
            </AlertDialogTitle>
            <AlertDialogDescription>{`${description}`}</AlertDialogDescription>
            <AlertDialogCancel
              onClick={cancel}
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
            >
              <Cross1Icon className="h-4 w-4" />
            </AlertDialogCancel>
          </AlertDialogHeader>
          <div className="max-h-[400px] overflow-auto px-6 pb-4">{Content}</div>
          {/* <div className="h-64 px-6 py-4">
            <Stepper
              steps={[
                {
                  showFooter: true,
                  content: (
                    <AssetSelectionPanel
                      // onSelection={(vr) => {console.log(vr)}
                      onSelection={onSelection}
                      setAssetType={setAssetType}
                      setIsImporting={setIsImporting}
                    />
                  ),
                  cancel: () => {
                    console.log("cancel");
                  },
                  next: () => {
                    console.log("next");
                  }
                },
                {
                  showFooter: false,
                  content: (
                    <ImportPortfolioDialog
                      cancel={() => {
                        setIsImporting(false);
                      }}
                      setUploadedPortfolio={files => {
                        setUploadedPortfolio(files);
                        setIsImporting(false);
                        console.log(files);
                      }}
                    />
                  ),
                  cancel: () => {
                    console.log("cancel");
                  },
                  next: () => {
                    console.log("next");
                  }
                },
                { content: "Customer Info" },
                { content: "Shipping Info" },
                { content: "Payment" },
                { content: "Step 4" }
              ]}
            />
          </div> */}
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AddNewPortfolioModal;
