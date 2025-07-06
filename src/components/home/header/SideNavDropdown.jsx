import { useState } from 'react';

const SideNavDropdown = ({linkName, linkClass, subLinks, iconClassDown, iconClassUp}) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = (event) => {
        event.preventDefault(); // Prevent default anchor behavior
        setShowDropdown((prevState) => !prevState);
    }

    return (
        <li className='' onClick={toggleDropdown}>
            <a href="" className={linkClass}>
            <div className="flex gap-2 items-center">
                {linkName}
                {showDropdown ? <i className={iconClassUp}></i> : <i className={iconClassDown}></i>}
            </div>  
            </a>
            {showDropdown && <ul className='text-black mt-5 z-10 flex flex-col justify-around items-center w-20'>
            {subLinks.map((link) => (
                <li key={link.name} className='h-15 content-evenly text-center font-medium text-sm text-nowrap'>
                    <a href={link.href}>{link.name}</a>
                </li>
            ))}
           </ul>
           }
        </li>
    )
}

export default SideNavDropdown;