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
        className="bg-gray-900 shadow-lg rounded-sm absolute py-2"
        style={{ top: "0", right: "2rem" }}
      >
        {children.map(child => (
          <div
            className="px-4 py-2 m-0 text-white text-sm block hover:bg-gray-800"
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
