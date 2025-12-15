"use client";

import { FaArrowUp } from "react-icons/fa6";

const GoToTopBtn = () => {
  const GoToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <button
      className="fixed bottom-5 right-10 w-12 h-12 rounded-full bg-green-800 opacity-80 hover:opacity-100 flex justify-center items-center cursor-pointer"
      onClick={GoToTop}
    >
      <FaArrowUp className="text-white text-lg" />
    </button>
  );
};

export default GoToTopBtn;
