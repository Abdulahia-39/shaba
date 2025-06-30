import headerBg from '../assets/shabapics/shabapics1.jpg';

const Header = () => {
    const overlayColor = 'rgba(0, 0, 0, 0.5)';
    return (
        <header className="h-screen w-screen bg-cover bg-center flex items-center justify-center m-none"
                style={{ backgroundImage: `linear-gradient(${overlayColor}, ${overlayColor}),url(${headerBg})` }} 
        >
            <h1 className='text-white'>Shaba water company</h1>
        </header>
    )
}

export default Header;