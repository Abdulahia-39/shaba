import shabaLogo from '../../../assets/shabapics/shabalogo.png';

const Footer = () => {
    return (
        <footer className="">
            <div className="flex flex-col sm:flex-row items-center p-10 w-11/12 mx-auto gap-10">
                <div className="flex-1 flex flex-col gap-5 ">
                    <div className="flex-1 flex flex-col items-center sm:items-start gap-3">
                        <img src={shabaLogo} alt="" className="h-15" />
                        <p className="font-bold">SHABA</p>
                    </div>
                    <div className="flex-1 flex flex-col md:flex-row gap-6">
                        <div className="flex flex-col items-center sm:items-start gap-3">
                            <p className="text-gray-700">Email</p>
                            <p className="text-sm text-gray-700">shabaco@gmail.com</p>
                        </div>
                        <div className="flex flex-col items-center sm:items-start gap-3 ">
                            <p className="text-gray-700">Phone number</p>
                            <p className="text-sm text-gray-700 text-center">+252 63 4456478 / +252 63 4456522</p>
                        </div>                      
                    </div>
                </div>
                <div className="flex-1 flex flex-col sm:flex-row justify-center gap-10 lg:gap-20 text-gray-800 p-4">
                    <div className='flex-1'>
                        <ul className="flex flex-col gap-2">
                            <li className='text-black font-medium text-lg'>Pages</li>
                            <a><li>Home</li></a>
                            <a><li>Projects</li></a>
                            <a><li>Blog</li></a>
                            <a><li>Report</li></a>
                            <a><li>Contact</li></a>
                            <a><li>About</li></a>
                        </ul>
                    </div>
                    <div className='flex-1'>
                        <ul className="flex flex-col gap-2">
                            <li className='text-black font-medium text-lg'>Resources</li>
                            <a><li>Blog</li></a>
                            <a><li className='text-nowrap'>2019 report</li></a>
                            <a><li className='text-nowrap'>2020 report</li></a>
                            <a><li>Careers</li></a>
                        </ul>
                    </div>
                    <div className='flex-1'>
                        <ul className="flex flex-col gap-2">
                            <li className='text-black font-medium text-lg'>Company</li>
                            <a><li>About us</li></a>
                            <a><li>Our work</li></a>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-10 sm:flex-row items-center bg-green-300 px-20 py-5">
                <div className="flex-1">
                    &copy; 2025 Shaba. All rights reserved.
                </div>
                <div className="flex-1 flex justify-end gap-4 text-2xl">
                    <div className="flex justify-center items-center border-2 border-green-950 rounded-full w-10 h-10">
                        <i className="fa-brands fa-linkedin text-green-950"></i>
                    </div>
                    <div className="flex justify-center items-center border-2 border-green-950 rounded-full w-10 h-10">
                        <i className="fa-brands fa-facebook text-green-950"></i>
                    </div>
                    <div className="flex justify-center items-center border-2 border-green-950 rounded-full w-10 h-10">
                        <i className="fa-brands fa-youtube text-green-950"></i>
                    </div>
                    <div className="flex justify-center items-center border-2 border-green-950 rounded-full w-10 h-10">
                        <i className="fa-brands fa-twitter text-green-950"></i>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;