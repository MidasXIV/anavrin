import React, { useState } from "react";
import "./index.module.css";
import { ArrowRightIcon, CaretLeftIcon, HomeIcon, LoopIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";

const Stepper = ({ steps }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const goToNextStepInternal = () => {
    steps[currentStep]?.next?.();
    if (currentStep === steps.length - 1) {
      setIsCompleted(true);
    } else {
      setCurrentStep(prevStep => prevStep + 1);
    }
  };

  const goToPreviousStepInternal = () => {
    steps[currentStep]?.cancel?.();
    setCurrentStep(prevStep => prevStep - 1);
  };

  return (
    <>
      <div className="flex h-full w-full flex-col justify-between bg-neutral-200">
        {/* {steps.map((step, index) => (
          <div
            key={index}
            className={`step-item ${currentStep === index && "active"} ${
              index < currentStep || (isCompleted && "complete")
            }`}
          >
            <div className="step">
              {index < currentStep || isCompleted ? <HomeIcon className="h-4 w-4" /> : index + 1}
            </div>
            <p className="h-full w-full bg-neutral-100 text-gray-500">{step}</p>
          </div>
        ))} */}
        <div className="step-item w-full">
          <p className="h-full w-full bg-neutral-100 text-gray-500">{steps[currentStep].content}</p>
        </div>
        {steps[currentStep]?.showFooter === true ? (
          <div className="flex items-center justify-between">
            <Button
              onClick={goToPreviousStepInternal}
              disabled={currentStep === 0}
              className="mb-2 rounded-full border border-gray-300 bg-neutral-100 px-4 py-1 text-sm text-neutral-500 transition-all hover:cursor-pointer hover:bg-neutral-200 hover:text-black dark:hover:bg-neutral-800"
            >
              <CaretLeftIcon className="mr-1 inline-block h-4 w-4 text-neutral-600" />
              Back
            </Button>

            <Button
              className="mb-2 rounded-full border border-gray-300 bg-neutral-100 px-4 py-1 text-sm text-neutral-500 transition-all hover:cursor-pointer hover:bg-neutral-200 hover:text-black dark:hover:bg-neutral-800"
              // onClick={() => setFiles([])}
            >
              <LoopIcon className="mr-1 inline-block h-4 w-4" />
              Reset
            </Button>

            <Button
              onClick={goToNextStepInternal}
              disabled={currentStep === steps.length - 1}
              className="mb-2 rounded-full border border-gray-300 bg-neutral-100 px-4 py-1 text-sm text-neutral-500 transition-all hover:cursor-pointer hover:bg-neutral-200 hover:text-black dark:hover:bg-neutral-800"
            >
              <ArrowRightIcon className="mr-1 inline-block h-4 w-4 text-neutral-600" />
              Next
            </Button>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Stepper;
