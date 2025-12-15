"use client";

import { FaArrowDown } from "react-icons/fa6";

const ArrowIcon = () => {
  return (
    <a href="" className="mt-5">
      <FaArrowDown
        className="text-white text-2xl absolute bottom-5 animate-bounce cursor-pointer inline"
        onClick={(e) => {
          e.preventDefault();
          window.scrollBy(0, window.innerHeight);
        }}
      ></FaArrowDown>
    </a>
  );
};

export default ArrowIcon;
