import Stepper from "../stepper";
import ImportPortfolioDialog from "./upload-xlsx";

const UploadWorkflowStepper = () => {
  const a = 3 + 5;
  return (
    <>
      {/* <Stepper
        steps={[
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
    </> */}
  );
};

export default UploadWorkflowStepper;
