import React, { useRef } from "react";
import useOutsideClick from "../../util/useOutsideClick";

const Menu = ({ children, onOutsideClick, ...props }) => {
  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, onOutsideClick);

  return (
    <div ref={wrapperRef} className="container" {...props}>
      <div className="menu">
        {children.map((child, index) => (
          <div className="menu-item" key={index}>
            {child}
          </div>
        ))}
      </div>
      <style jsx>
        {`
          .container {
            position: relative;
          }

          .menu {
            background-color: #0e0f13;
            box-shadow: 1rem 3rem 4rem 1rem rgba(0, 0, 0, 0.2);
            border-radius: 0.25rem;
            position: absolute;
            top: 1rem;
            right: 2rem;
            padding: 0.5rem 0;
          }

          .menu-item {
            display: block;
            padding: 0.4rem 1rem;
            background-image: none;
            margin: 0;
            color: #fff;
            font-size: 0.9rem;
          }

          .menu-item:hover {
            background-color: #141519;
            background-image: none;
          }
        `}
      </style>
    </div>
  );
};

export default Menu;
