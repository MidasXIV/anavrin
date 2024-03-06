import { useState, useRef, FC } from "react";
import { clsx } from "clsx";

interface SlideToSubmitProps {
  onSubmit: () => void;
}

const SlideToSubmit: FC<SlideToSubmitProps> = ({ onSubmit }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [buttonPosition, setButtonPosition] = useState(0);
  const [allowSubmit, setAllowSubmit] = useState(false);
  const trackRef = useRef(null);
  const buttonRef = useRef(null);

  const handleMouseDown = event => {
    setIsDragging(true);
  };

  const handleMouseUp = event => {
    setIsDragging(false);
    const trackWidth = trackRef.current.offsetWidth;
    const buttonWidth = buttonRef.current.offsetWidth;
    if (allowSubmit) {
      // Trigger submit action here
      onSubmit();
    }
    setButtonPosition(0);
    setAllowSubmit(false);
  };

  const handleMouseMove = event => {
    if (!isDragging) {
      return;
    }
    const trackWidth = trackRef.current.offsetWidth;
    const buttonWidth = buttonRef.current.offsetWidth;
    const maxPosition = trackWidth - buttonWidth;
    // let newLeft = event.clientX - trackRef.current.offsetLeft;
    let newPosition =
      event.clientX - trackRef.current.getBoundingClientRect().left - buttonWidth / 2;
    if (newPosition < 0) {
      newPosition = 0;
    } else if (newPosition > maxPosition) {
      newPosition = maxPosition;
    }
    if (newPosition >= maxPosition * 0.9) {
      setAllowSubmit(true);
    } else {
      setAllowSubmit(false);
    }

    // console.log(trackWidth, buttonWidth, maxPosition, newPosition, allowSubmit);
    setButtonPosition(newPosition);
  };

  return (
    <div
      aria-hidden="true"
      className="relative my-2 flex h-12 flex-row items-center justify-between rounded-lg bg-charcoal-900 p-2 align-middle"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      ref={trackRef}
    >
      <div className="flex-1 text-center text-gray-500">
        {allowSubmit ? `Submitting` : `Drag the button to submit`}
      </div>
      <button
        type="button"
        className="absolute inset-y-0 left-0 inline-block w-auto rounded-lg py-2 pl-1 pr-2 text-xs font-semibold text-gray-500"
        ref={buttonRef}
        style={{ left: `${buttonPosition}px` }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className={clsx("mx-2 inline-flex h-6 w-6 rounded-md p-1 text-charcoal-900", {
            "bg-green-300": allowSubmit,
            "bg-charcoal-300": !allowSubmit
          })}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>

    // <div
    //   className="relative bg-gray-200 h-12"
    //   onMouseDown={handleMouseDown}
    //   onMouseUp={handleMouseUp}
    //   onMouseMove={handleMouseMove}
    //   ref={trackRef}
    // >
    //   <div
    //     className="bg-blue-500 text-white text-center py-2 px-4 rounded-full absolute inset-y-0 left-0"
    //     style={{ left: `${buttonPosition}px` }}
    //     ref={buttonRef}
    //   >
    //     Submit
    //   </div>
    // </div>
  );
};

export default SlideToSubmit;
