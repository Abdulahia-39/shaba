'use client';

const ArrowIcon = () =>{
    return (
        <a href='' className='mt-5'><i className='fas fa-chevron-down text-white text-2xl absolute bottom-5 animate-bounce cursor-pointer' 
            onClick={(e) => {
            e.preventDefault();
            window.scrollBy(0, window.innerHeight)}}>
            </i>
        </a>
    )
}

export default ArrowIcon;