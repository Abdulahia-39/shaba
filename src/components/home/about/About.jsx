import homeAboutImage from '../../../assets/shabapics/homeaboutpic.jpg';

const About = () => {
    return (
        <section className="flex flex-col lg:flex-row gap-6 min-h-screen w-6/7 m-auto my-10">
            <div className="h-screen flex justify-center items-center px-10 flex-1">
                <img src={homeAboutImage} alt="" className="h-3xl w-xl" />
            </div>
            <div className="flex-1 flex flex-col justify-center items-start gap-6 p-10">
                <div className="w-full px-1">
                    <p className="text-gray-800 text-center lg:text-left">About us</p>
                    <h2 className="text-4xl font-semibold my-5 text-center lg:text-left">Providing Reliable Water Services</h2>
                    <p className="text-center lg:text-left">Established in 2003, SHABA is a Public-Private Partnership (PPP) water supply company in Borama, a rapidly expanding city in Somaliland’s Awdal region. Partnering with the local government, SHABA manages the district’s water supply, addressing the needs of a city that has tripled in size over the past decade and is poised to become one of the region’s most populous urban centers.</p>
                </div>
                <div className="bg-[#fffcf2] shadow-lg rounded-lg p-6 flex gap-4 w-full">
                    <div className="flex-1 flex justify-center items-start">
                        <i className="fa-solid fa-building-columns text-green-300 text-2xl pt-4"></i>
                    </div>
                    <div className="flex-6">
                        <h3 className="font-semibold text-xl my-3">Shaba pioneered PPP in the region</h3>
                        <p className="">The PPP model transformed water service delivery in Borama, addressing the city’s longstanding challenges.</p>
                    </div>
                </div>
                <div className="mt-4 p-4 flex flex-col justify-center items-end w-full">
                    <button className="absolute bg-green-800 text-white w-35 h-12 rounded-lg text-medium font-medium">Learn More</button>
                </div>
            </div>
        </section>
    );
}

export default About;