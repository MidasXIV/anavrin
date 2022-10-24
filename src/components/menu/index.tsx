import React, { useRef, FC, CSSProperties } from "react";
import useOutsideClick from "../../util/useOutsideClick";

type MenuProps = {
  children: JSX.Element[];
  onOutsideClick: () => void;
  style: CSSProperties;
};

const Menu: FC<MenuProps> = ({ children, onOutsideClick, style }) => {
  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, onOutsideClick);

  return (
    <div ref={wrapperRef} className="relative" style={style}>
      <div
        className="absolute rounded-sm bg-gray-900 py-2 shadow-lg"
        style={{ top: "0", right: "2rem" }}
      >
        {children.map(child => (
          <div
            className="m-0 block px-4 py-2 text-sm text-white hover:bg-gray-800"
            key={child.toString()}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
