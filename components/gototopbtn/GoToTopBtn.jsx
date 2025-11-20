"use client";

const GoToTopBtn = () => {
    const GoToTop = () => {
        window.scrollTo(0, 0);
    }

    return (
        <button 
            className="fixed bottom-5 right-10 w-12 h-12 rounded-full bg-green-800 opacity-80 hover:opacity-100 flex justify-center items-center cursor-pointer"
            onClick={GoToTop}
        >
            <i className='fas fa-chevron-up text-white text-lg'></i>
        </button>
    )
}

export default GoToTopBtn;