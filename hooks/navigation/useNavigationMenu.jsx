import { useRef } from "react";
import { useNavbarScroll } from "./useScroll";
import { useDropdown } from "./useDropdown";
import { useOutsideClick } from "./useClickOutside";
import { useState } from "react";

export const useNavigationMenu = () => {
  const isScrolled = useNavbarScroll();

  const { dropdown, toggle, closeAll } = useDropdown({
    report: false,
    about: false,
  });

  const reportRef = useRef(null);
  const aboutRef = useRef(null);

  useOutsideClick([reportRef, aboutRef], closeAll);

  // nav open/close
  const [isOpen, setIsOpen] = useState(false);

  return {
    isOpen,
    openNavbar: () => setIsOpen(true),
    closeNavbar: () => setIsOpen(false),

    isScrolled,
    showDropdown: dropdown,
    toggleReportDropdown: () => toggle("report"),
    toggleAboutDropdown: () => toggle("about"),

    reportDropdownRef: reportRef,
    aboutDropdownRef: aboutRef,
  };
};
