"use client";

import shabaLogo from "@/public/assets/shabalogo.png";
import { useEffect, useRef } from "react";
import SideNavDropdown from "./SideNavDropdown";
import Image from "next/image";
import { FaBars, FaChevronUp, FaChevronDown } from "react-icons/fa6";
import Link from "next/link";

const SideNavbar = ({ isOpen, onClose }) => {
  const navbarRef = useRef(null); // Ref for the navbar element
  const overlayRef = useRef(null); // Ref for the overlay element

  useEffect(() => {
    // Effect to handle body scroll lock and click outside/Escape key
    const body = document.body;

    // Add/remove 'no-scroll' class based on navbar state
    if (isOpen) {
      body.classList.add("overflow-hidden"); // Tailwind's equivalent to 'no-scroll'
    } else {
      body.classList.remove("overflow-hidden");
    }

    // Handle clicks outside the navbar
    const handleClickOutside = (event) => {
      // If navbar is open and click is outside the navbar and not on the overlay itself
      if (
        isOpen &&
        navbarRef.current &&
        !navbarRef.current.contains(event.target) &&
        overlayRef.current &&
        overlayRef.current.contains(event.target) // Ensure click is on the overlay
      ) {
        onClose();
      }
    };

    // Handle Escape key press
    const handleEscapeKey = (event) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    // Add event listeners when navbar is open
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
    }

    // Cleanup: remove event listeners when component unmounts or navbar closes
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose]); // Re-run effect when isOpen or onClose changes

  const linkClass = "text-md font-bold text-md";

  return (
    <>
      {/* Side Navbar */}
      <nav
        ref={navbarRef}
        className={`
        fixed top-0 right-0 w-4/5 max-w-xs h-screen bg-white text-gray-800 uppercase
        transform transition-transform duration-300 ease-out z-50 shadow-lg
        flex flex-col p-6 space-y-4 rounded-l-lg gap-10
        ${isOpen ? "translate-x-0" : "translate-x-full"}
        md:w-64 overflow-y-auto overscroll-contain
      `}
      >
        <div className="flex items-center justify-around mb-6 mt-6">
          <button onClick={onClose}>
            <FaBars className="text-2xl text-black cursor-pointer" />
          </button>
          <Image src={shabaLogo} alt="shaaba's logo" width={64} height={64} />
        </div>
        <nav className="">
          <ul className="flex flex-col items-center justify-start gap-6">
            <li className="text-sm w-full text-left">
              <Link href="/" className={linkClass}>
                Home
              </Link>
            </li>
            <li className="text-sm w-full text-left">
              <Link href="/Projects" className={linkClass}>
                Projects
              </Link>
            </li>
            <li className="text-sm w-full text-left">
              <Link href="/Blog" className={linkClass}>
                Blog
              </Link>
            </li>
            <SideNavDropdown
              linkName="Report"
              linkClass={linkClass}
              subLinks={[
                { name: "2019 report", href: "#" },
                { name: "2020 report", href: "#" },
              ]}
              IconDown={FaChevronUp}
              IconUp={FaChevronDown}
            />
            <li className="text-sm w-full text-left">
              <Link href="/Contact" className={linkClass}>
                Contact
              </Link>
            </li>
            <SideNavDropdown
              linkName="About"
              linkClass={linkClass}
              subLinks={[
                { name: "About the company", href: "/About" },
                { name: "PPP", href: "#" },
                { name: "Our work", href: "#" },
              ]}
              IconDown={FaChevronUp}
              IconUp={FaChevronDown}
            />
          </ul>
        </nav>
        <div className="p-4 text-center w-full mb-5 h-20">
          <p className="text-sm text-gray-500">
            © 2025 Shaba water company. Created by abdullahi tech solutions.
          </p>
        </div>
      </nav>

      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={onClose} // Clicking the overlay closes the navbar
        className={`
          fixed top-0 left-0 w-full h-full bg-none bg-opacity-50
          transition-opacity duration-300 ease-out z-40
          ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
      ></div>
    </>
  );
};

export default SideNavbar;
