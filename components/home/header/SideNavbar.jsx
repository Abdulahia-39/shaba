'use client';

import shabaLogo from '../../../public/assets/shabalogo.png';
import { useEffect, useRef } from 'react';
import SideNavDropdown from './SideNavDropdown';
import Image from 'next/image';

const SideNavbar = ({ isOpen, onClose }) => {
  const navbarRef = useRef(null); // Ref for the navbar element
  const overlayRef = useRef(null); // Ref for the overlay element

  useEffect(() => {
    // Effect to handle body scroll lock and click outside/Escape key
    const body = document.body;

    // Add/remove 'no-scroll' class based on navbar state
    if (isOpen) {
      body.classList.add('overflow-hidden'); // Tailwind's equivalent to 'no-scroll'
    } else {
      body.classList.remove('overflow-hidden');
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
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    // Add event listeners when navbar is open
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    // Cleanup: remove event listeners when component unmounts or navbar closes
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]); // Re-run effect when isOpen or onClose changes


  const linkClass = "text-md font-bold text-md";

  return (
    <>
      {/* Side Navbar */}
      <nav
        ref={navbarRef}
        className={`
          fixed top-0 right-0 w-4/5 max-w-xs h-full bg-white text-gray-800 font-['Mulish'] uppercase
          transform transition-transform duration-300 ease-out z-50 shadow-lg
          flex flex-col p-6 space-y-4 overflow-y-auto rounded-l-lg gap-10
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
          md:w-64
        `}
      >
        <div className="flex items-center justify-around mb-6 mt-6">
            <button onClick={onClose}><i className="fas fa-bars text-2xl text-black cursor-pointer"></i></button>
            <Image src={shabaLogo} alt="shaaba's logo" width={64} height={64}/>
        </div>
        <div>
            <ul className='flex flex-col items-center justify-start gap-6'>
                <li className='text-sm w-full text-left'><a href="" className={linkClass}>Home</a></li>
                <li className='text-sm w-full text-left'><a href="" className={linkClass}>Projects</a></li>
                <li className='text-sm w-full text-left'><a href="" className={linkClass}>Blog</a></li>
                <SideNavDropdown 
                linkName="Report" 
                linkClass={linkClass}
                subLinks={[
                  { name: '2019 report', href: '#' },
                  { name: '2020 report', href: '#' }
                ]}
                iconClassDown="fas fa-chevron-down text-black text-xs"
                iconClassUp="fas fa-chevron-up text-black text-xs"
                />
                <li className='text-sm w-full text-left'><a href="" className={linkClass}>Contact</a></li>
                <SideNavDropdown
                linkName="About" 
                linkClass={linkClass}
                subLinks={[
                  { name: 'About the company', href: '#' },
                  { name: 'PPP', href: '#' },
                  { name: 'Our work', href: '#' }
                ]}
                iconClassDown="fas fa-chevron-down text-black text-xs"
                iconClassUp="fas fa-chevron-up text-black text-xs"
                />
            </ul>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 text-center w-full mb-5 h-20">
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
          ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
        `}
      ></div>
    </>
  );
};

export default SideNavbar;