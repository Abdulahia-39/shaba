import shablogo from '../../assets/shabapics/shabalogo.png';
import { useState, useEffect } from 'react';
import SideNavbar from './SideNavbar';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

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

    const linkStyle = `${isScrolled ? 'text-black' : 'text-white'} text-sm uppercase font-bold font-mulish after:block after:w-0 after:h-1 after:rounded after:bg-white after:transition-all after:duration-300 hover:after:w-full`;


    return (
        <>
        <div className={`${!isScrolled ? '': 'h-30'}`}></div>
        <nav className={`${isScrolled ? 'fixed bg-green-300 ': ''} w-full top-0 z-50 shadow-lg flex items-center justify-around gap-50 bg-none text-white p-4 h-30 my-6`}>
                <div>
                    <img src={shablogo} alt="shaaba's logo" className='w-16 h-16 ' />
                </div>

                <ul className='hidden items-center justify-around gap-6 lg:flex'>
                    <li><a href="" className={linkStyle}>Home</a></li>
                    <li><a href="" className={linkStyle}>Projects</a></li>
                    <li><a href="" className={linkStyle}>Blog</a></li>
                    <li><a href="" className={linkStyle}>Report</a></li>
                    <li><a href="" className={linkStyle}>Contact</a></li>
                    <li><a href="" className={linkStyle}>About</a></li>
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