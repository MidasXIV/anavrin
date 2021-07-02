import { useState } from "react";

type useModalType = { isShowing: boolean; open: () => void; close: () => void; toggle: () => void };
const useModal = (initialValue = false): useModalType => {
  const [isShowing, setIsShowing] = useState(initialValue);
  const toggle = () => setIsShowing(!isShowing);
  const open = () => setIsShowing(true);
  const close = () => setIsShowing(false);

  return {
    isShowing,
    open,
    close,
    toggle
  };
};

export default useModal;
