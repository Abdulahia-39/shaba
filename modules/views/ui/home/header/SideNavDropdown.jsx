"use client";

import Link from "next/link";
import { useState } from "react";

const SideNavDropdown = ({
  linkName,
  linkClass,
  subLinks,
  IconDown,
  IconUp,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = (event) => {
    event.preventDefault(); // Prevent default anchor behavior
    setShowDropdown((prevState) => !prevState);
  };

  return (
    <li className="w-full text-sm overflow-visible" onClick={toggleDropdown}>
      <div className="flex justify-between gap-2 items-center w-full">
        <Link href="#" className={linkClass + ""}>
          <span className="mx-auto text-left">{linkName}</span>
        </Link>
        {showDropdown ? (
          <IconUp className="text-xs text-black" />
        ) : (
          <IconDown className="text-xs text-black" />
        )}
      </div>
      {showDropdown && (
        <ul className="text-black mt-5 z-10 w-full">
          {subLinks.map((link) => (
            <li
              key={link.name}
              className="text-center font-medium text-sm text-nowrap"
            >
              <Link
                href={link.href}
                className="inline-block my-1 w-full p-1 text-right"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default SideNavDropdown;
