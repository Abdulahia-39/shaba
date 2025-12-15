"use client";

import shabaLogo from "@/public/assets/shabalogo.png";
import SideNavbar from "./SideNavbar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useNavigationMenu } from "@/hooks/navigation/useNavigationMenu";
import { FaChevronDown } from "react-icons/fa6";
import { ImMenu } from "react-icons/im";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const {
    isOpen,
    openNavbar,
    closeNavbar,
    isScrolled,
    showDropdown,
    toggleReportDropdown,
    toggleAboutDropdown,
    reportDropdownRef,
    aboutDropdownRef,
  } = useNavigationMenu();

  const linkStyle = `${
    isScrolled ? "text-black" : "text-white"
  } text-sm uppercase font-bold font-mulish after:block after:w-0 after:h-1 after:rounded ${
    isScrolled ? "after:bg-green-800" : "after:bg-white"
  } after:transition-all after:duration-300 hover:after:w-full cursor-pointer`;

  const pathname = usePathname();

  return (
    <>
      <div className={`${!isScrolled ? "hidden" : "block h-23"}`}></div>
      <nav
        className={`${
          isScrolled ? "fixed bg-green-300 " : ""
        } w-full top-0 z-50 shadow-lg flex items-center justify-around gap-50 bg-none text-white p-4 h-23 transition-all duration-300 ease-in-out`}
      >
        <div>
          <Link href="/" className="">
            <Image src={shabaLogo} alt="shaaba's logo" width={64} height={64} />
          </Link>
        </div>

        <ul className="hidden items-center justify-around gap-6 lg:flex">
          <li
            className={`${
              isScrolled ? "text-black" : "text-white"
            } text-sm uppercase font-bold font-mulish after:block ${
              pathname === "/" ? "w-full" : "after:w-0"
            } after:h-1 after:rounded ${
              isScrolled ? "after:bg-green-800" : "after:bg-white"
            } after:transition-all after:duration-300 hover:after:w-full cursor-pointer`}
          >
            <Link href="/">Home</Link>
          </li>
          <li
            className={`${
              isScrolled ? "text-black" : "text-white"
            } text-sm uppercase font-bold font-mulish after:block ${
              pathname === "/Projects" ? "w-full" : "after:w-0"
            } after:h-1 after:rounded ${
              isScrolled ? "after:bg-green-800" : "after:bg-white"
            } after:transition-all after:duration-300 hover:after:w-full cursor-pointer`}
          >
            <Link href="/Projects">Projects</Link>
          </li>
          <li
            className={`${
              isScrolled ? "text-black" : "text-white"
            } text-sm uppercase font-bold font-mulish after:block ${
              pathname === "/Blog" ? "w-full" : "after:w-0"
            } after:h-1 after:rounded ${
              isScrolled ? "after:bg-green-800" : "after:bg-white"
            } after:transition-all after:duration-300 hover:after:w-full cursor-pointer`}
          >
            <Link href="/Blog">Blog</Link>
          </li>
          <li
            className={cn(linkStyle, "relative")}
            ref={reportDropdownRef}
            onClick={toggleReportDropdown}
          >
            <div className="flex gap-1 items-center justify-center">
              About
              <FaChevronDown
                className={cn(
                  isScrolled ? "text-black" : "text-white",
                  "text-xs font-bold"
                )}
              ></FaChevronDown>
            </div>
            {showDropdown.report && (
              <ul className="absolute bg-white text-black shadow-lg mt-5 z-10 top-10 flex flex-col justify-around items-center w-45">
                <li className="h-10 flex justify-center items-center border-b-1 w-full border-gray-500 font-medium text-sm transition-all duration-300 ease-in-out hover:bg-green-400 hover:text-white">
                  <a href="">2019 report</a>
                </li>
                <li className="h-10 flex justify-center items-center border-b-1 w-full border-gray-500 font-medium text-sm transition-all duration-300 ease-in-out hover:bg-green-400 hover:text-white">
                  <a href="">2020 report</a>
                </li>
              </ul>
            )}
          </li>
          <li
            className={`${
              isScrolled ? "text-black" : "text-white"
            } text-sm uppercase font-bold font-mulish after:block ${
              pathname === "/Contact" ? "w-full" : "after:w-0"
            } after:h-1 after:rounded ${
              isScrolled ? "after:bg-green-800" : "after:bg-white"
            } after:transition-all after:duration-300 hover:after:w-full cursor-pointer`}
          >
            <Link href="/Contact">Contact</Link>
          </li>
          <li
            className={cn(linkStyle, "relative")}
            ref={aboutDropdownRef}
            onClick={toggleAboutDropdown}
          >
            <div className="flex gap-1 items-center justify-center">
              About
              <FaChevronDown
                className={cn(
                  isScrolled ? "text-black" : "text-white",
                  "text-xs font-bold"
                )}
              ></FaChevronDown>
            </div>
            {showDropdown.about && (
              <ul
                className="absolute bg-white text-black shadow-lg mt-5 z-10 top-10 -left-12 flex flex-col justify-around items-center w-45"
                onClick={(e) => e.stopPropagation()}
              >
                <li className="h-10 flex justify-center items-center border-b-1 w-full border-gray-500 font-medium text-sm transition-all duration-300 ease-in-out hover:bg-green-400 hover:text-white">
                  <Link href="/About">About the Company</Link>
                </li>
                <li className="h-10 flex justify-center items-center border-b-1 w-full border-gray-500 font-medium text-sm transition-all duration-300 ease-in-out hover:bg-green-400 hover:text-white">
                  <Link href="Blog/2">PPP</Link>
                </li>
                <li className="h-10 flex justify-center items-center border-b-1 w-full border-gray-500 font-medium text-sm transition-all duration-300 ease-in-out hover:bg-green-400 hover:text-white">
                  Our work
                </li>
              </ul>
            )}
          </li>
        </ul>
        <div className="lg:hidden flex items-center justify-center">
          <button onClick={openNavbar}>
            <ImMenu
              className={`text-2xl ${
                isScrolled ? "text-black" : "text-white"
              } cursor-pointer`}
            />
          </button>
        </div>

        <SideNavbar isOpen={isOpen} onClose={closeNavbar} />
      </nav>
    </>
  );
};

export default Navbar;
