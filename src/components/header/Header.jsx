import headerBg from '../../assets/shabapics/shabapics1.jpg';
import ContactBar from './ContactBar';
import Navbar from './Navbar';

const Header = () => {
    const overlayColor = 'rgba(0, 0, 0, 0.6)';
    return (
        <header className="h-screen w-full bg-cover bg-center"
                style={{ backgroundImage: `linear-gradient(${overlayColor}, ${overlayColor}),url(${headerBg})` }} 
        >
            <ContactBar />
            <Navbar />
            <div className="h-30"></div>
            <div className="flex flex-col items-center justify-center text-white text-center h-3/4">
                <h1 className='text-4xl font-bold lg:text-6xl w-3/4 mx-auto h-1/3'>Shirkada adeegyada bulshada Awdal SHABA</h1>
                <p className='sm:text-xl text-lg text-wrap'>Shaba provides water services to borama’s community</p>
                <div className="h-1/5 flex justify-center items-center">
                    <button className='h-12 mt-10 border-2 border-white w-40 rounded-4xl hover:bg-green-300 hover:text-black transition duration-300'>Learn More</button>
                </div>
            </div>
        </header>
    )
}

export default Header;