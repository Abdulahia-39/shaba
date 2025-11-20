"use client";
import { ArrowDown } from "lucide-react";

const ArrowIcon = () => {
  return (
    <a href="" className="">
      <ArrowDown
        className="text-white text-2xl absolute bottom-5 animate-bounce cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          window.scrollBy(0, window.innerHeight);
        }}
      ></ArrowDown>
    </a>
  );
};

export default ArrowIcon;
