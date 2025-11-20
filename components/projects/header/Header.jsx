import ArrowIcon from "@/components/projects/header/ArrowIcon";
import ContactBar from "../../home/header/ContactBar";
import Navbar from "../../home/header/Navbar";
const headerBg = "/assets/headerbg.png";

const Header = ({headerText}) => {
    const overlayColor = 'rgba(0, 0, 0, 0.6)';
    return (
        <header className="min-h-[75vh] w-full bg-cover bg-center bg-fixed"
                style={{ backgroundImage: `linear-gradient(${overlayColor}, ${overlayColor}),url(${headerBg})` }} 
        >
            <ContactBar />
            <Navbar />
            <div className="flex flex-col text-white text-center h-90 relative">
                <h1 className='text-4xl/relaxed font-bold lg:text-6xl/relaxed w-3/4 mx-auto mb-5 text-green-300 mt-10'>{headerText}</h1>
                <ArrowIcon />
            </div>
        </header>
    )
}

export default Header;