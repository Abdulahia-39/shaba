import shablogo from '../../../assets/shabapics/shabalogo.png';
import { useState, useEffect, useRef } from 'react';
import SideNavbar from './SideNavbar';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [showDropdown, setShowDropdown] = useState({
        report: false,
        about: false
    });

    const reportDropdownRef = useRef(null);
    const aboutDropdownRef = useRef(null);

    const openNavbar = () => {
        setIsOpen(true);
    }
    const closeNavbar = () => {
        setIsOpen(false);
    }

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 60) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
    // Function to handle clicks outside the dropdown
    const handleClickOutside = (event) => {
      // If the dropdown is open and the click is outside the dropdown container
      if (
        (reportDropdownRef.current && !reportDropdownRef.current.contains(event.target)) || 
        (aboutDropdownRef.current && !aboutDropdownRef.current.contains(event.target))) {
        setShowDropdown((prevState) => {
            const newState = { ...prevState };
            newState.report = false; // Close report dropdown
            newState.about = false; // Close about dropdown
            return newState;
        }); // Close the dropdown
      }
    };

    // Add event listener for clicks when the dropdown is open
    if (showDropdown.about || showDropdown.report) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    // Clean up the event listener when the component unmounts or dropdown closes
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);
    

    const linkStyle = `${isScrolled ? 'text-black' : 'text-white'} text-sm uppercase font-bold font-mulish after:block after:w-0 after:h-1 after:rounded ${isScrolled ? 'after:bg-green-800' : 'after:bg-white'} after:transition-all after:duration-300 hover:after:w-full`;

    const toggleReportDropdown = (event) => {
        event.preventDefault();
        setShowDropdown(prevState => {
            const newState = { ...prevState };
            newState.report = !newState.report; // Toggle report dropdown
            newState.about = false; // Close about dropdown
            return newState;
        });        
    }

    const toggleAboutDropdown = (event) => {
        event.preventDefault();
        setShowDropdown(prevState => {
            const newState = { ...prevState };
            newState.about = !newState.about; // Toggle about dropdown
            newState.report = false; // Close report dropdown
            return newState;
        });
    }
    

    return (
        <>
        <div className={`${!isScrolled ? '': 'h-30'}`}></div>
        <nav className={`${isScrolled ? 'fixed bg-green-300 ': ''} w-full top-0 z-50 shadow-lg flex items-center justify-around gap-50 bg-none text-white p-4 h-30 transition-all duration-300 ease-in-out`}>
                <div>
                    <img src={shablogo} alt="shaaba's logo" className='w-16 h-16 ' />
                </div>

                <ul className='hidden items-center justify-around gap-6 lg:flex'>
                    <li><a href="" className={linkStyle}>Home</a></li>
                    <li><a href="" className={linkStyle}>Projects</a></li>
                    <li><a href="" className={linkStyle}>Blog</a></li>
                    <li className='relative' ref={reportDropdownRef} onClick={toggleReportDropdown}>
                        <a href="" className={linkStyle}>
                            <div className="flex gap-1 items-center justify-center">
                                Report
                                <i className={`fas fa-chevron-down ${isScrolled ? 'text-black' : 'text-white'} text-xs`}></i>
                            </div>
                        </a>
                        {showDropdown.report &&
                        <ul className='absolute bg-white text-black shadow-lg mt-5 z-10 top-10 flex flex-col justify-around items-center gap-2 w-45'>
                            <li className='h-10 flex justify-center items-center border-b-1 w-full border-gray-500 font-medium text-sm'><a href="">2019 report</a></li>
                            <li className='h-10 flex justify-center items-center border-b-1 w-full border-gray-500 font-medium text-sm'><a href="">2020 report</a></li>
                        </ul>}
                    </li>
                    <li><a href="" className={linkStyle}>Contact</a></li>
                    <li className='relative' ref={aboutDropdownRef} onClick={toggleAboutDropdown}>
                        <a href="" className={linkStyle}>
                            <div className="flex gap-1 items-center justify-center">
                                About
                                <i className={`fas fa-chevron-down ${isScrolled ? 'text-black' : 'text-white'} text-xs`}></i>
                            </div>
                        </a>
                        {showDropdown.about &&
                        <ul className='absolute bg-white text-black shadow-lg mt-5 z-10 top-10 -left-12 flex flex-col justify-around items-center gap-2 w-45'>
                            <li className='h-10 flex justify-center items-center border-b-1 w-full border-gray-500 font-medium text-sm'><a href="">About the company</a></li>
                            <li className='h-10 flex justify-center items-center border-b-1 w-full border-gray-500 font-medium text-sm'><a href="">PPP</a></li>
                            <li className='h-10 flex justify-center items-center border-b-1 w-full border-gray-500 font-medium text-sm'><a href="">Our work</a></li>
                        </ul>}
                    </li>
                </ul>
                <div className='lg:hidden flex items-center justify-center'>
                        <button onClick={openNavbar}><i className={`fas fa-bars text-2xl ${isScrolled ? 'text-black' : 'text-white'} cursor-pointer`}></i></button>
                </div>

                <SideNavbar isOpen={isOpen} onClose={closeNavbar} />
        </nav>
        </>
    )
}

export default Navbar;