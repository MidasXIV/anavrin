import { useState } from "react";

const useModal = (initialValue = false): { isShowing: boolean; toggle: () => void } => {
  const [isShowing, setIsShowing] = useState(initialValue);
  const toggle = () => setIsShowing(!isShowing);

  return {
    isShowing,
    toggle
  };
};

export default useModal;
