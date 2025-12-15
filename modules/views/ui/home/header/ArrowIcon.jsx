"use client";
import Link from "next/link";
import { FaArrowDown } from "react-icons/fa";

const ArrowIcon = () => {
  return (
    <Link href="#" className="">
      <FaArrowDown
        className="text-white text-2xl absolute sm:bottom-8 bottom-2 animate-bounce cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          window.scrollBy(0, window.innerHeight);
        }}
      ></FaArrowDown>
    </Link>
  );
};

export default ArrowIcon;
