import ContactBar from "../../home/header/ContactBar";
import Navbar from "../../home/header/Navbar";
import headerBg from '../../../assets/shabapics/headerBg.png';

const Header = () => {
    const overlayColor = 'rgba(0, 0, 0, 0.6)';
    return (
        <header className="min-h-[75vh] w-full bg-cover bg-center"
                style={{ backgroundImage: `linear-gradient(${overlayColor}, ${overlayColor}),url(${headerBg})` }} 
        >
            <ContactBar />
            <Navbar />
            <div className="flex flex-col text-white text-center h-90 relative">
                <h1 className='text-4xl/relaxed font-bold lg:text-6xl/relaxed w-3/4 mx-auto mb-5 text-green-300 mt-10'>Shaba's Projects</h1>
                <a href='' className='mt-5'><i className='fas fa-chevron-down text-white text-2xl absolute bottom-5 animate-bounce cursor-pointer' 
                    onClick={(e) => {
                    e.preventDefault();
                    window.scrollBy(0, window.innerHeight)}}>
                    </i>
                </a>
            </div>
        </header>
    )
}

export default Header;