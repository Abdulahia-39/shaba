'use client';

import { useState } from 'react';

const SideNavDropdown = ({linkName, linkClass, subLinks, iconClassDown, iconClassUp}) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = (event) => {
        event.preventDefault(); // Prevent default anchor behavior
        setShowDropdown((prevState) => !prevState);
    }

    return (
        <li className='w-full text-sm ' onClick={toggleDropdown}>
            <a href="" className={linkClass + " w-full"}>
            <div className="flex gap-2 items-center w-full">
                <span className='w-full mx-auto text-left'>{linkName}</span>
                {showDropdown ? <i className={iconClassUp}></i> : <i className={iconClassDown}></i>}
            </div>  
            </a>
            {showDropdown && <ul className='text-black mt-5 z-10 w-full'>
            {subLinks.map((link) => (  
                <li key={link.name} className='text-center font-medium text-sm text-nowrap'>
                    <a href={link.href} className='inline-block my-1 w-full p-1 text-right'>{link.name}</a>
                </li>
            ))}
           </ul>
           }
        </li>
    )
}

export default SideNavDropdown;