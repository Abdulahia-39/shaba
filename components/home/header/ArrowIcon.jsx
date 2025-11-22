"use client";
import { FaArrowDown } from "react-icons/fa";

const ArrowIcon = () => {
  return (
    <a href="" className="">
      <FaArrowDown
        className="text-white text-2xl absolute bottom-8 animate-bounce cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          window.scrollBy(0, window.innerHeight);
        }}
      ></FaArrowDown>
    </a>
  );
};

export default ArrowIcon;
