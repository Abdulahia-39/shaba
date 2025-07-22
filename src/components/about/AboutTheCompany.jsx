import Header from "../projects/header/Header";
import aboutPic from "../../assets/shabapics/shabapics1.jpg"
import Vision from "../home/vision/Vision";
import Footer from "../home/footer/Footer";
import Mission from "../home/mission/Mission";

const AboutTheCompany = () => {
    return (
        <div className="bg-[#f8f9fa]">
            <Header 
                headerText="About Us"
            />

            <section className="flex w-full flex-col lg:flex-row mb-15">
                <div className="flex-1 flex justify-center items-end pt-20 gap-6 bg-green-200 min-h-screen p-10">               
                    <div className="w-42 h-[500px] rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300 ease-in-out mb-15">
                        <img
                        src={aboutPic}
                        alt="Mosque"
                        className="w-full h-full object-cover object-left transition-transform duration-500 ease-in-out hover:scale-105"
                        />
                    </div>
                    
                    <div className="w-46 h-[600px] rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300 ease-in-out">
                        <img
                        src={aboutPic}
                        alt="Mosque"
                        className="w-full h-full object-cover object-center transition-transform duration-500 ease-in-out hover:scale-105"
                        />
                    </div>

                    <div className="w-42 h-[500px] rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300 ease-in-out mb-15">
                        <img
                        src={aboutPic}
                        alt="Mosque"
                        className="w-full h-full object-cover object-right transition-transform duration-500 ease-in-out hover:scale-105"
                        />
                    </div>
                </div>
                <div className="flex-1 flex flex-col justify-center items-start gap-6 p-10">
                    <div className="w-full px-1">
                        <p className="text-gray-800 text-center lg:text-left">About us</p>
                        <h2 className="text-4xl font-semibold my-5 text-center lg:text-left">Providing Reliable Water Services</h2>
                        <p className="text-center lg:text-left lg:w-full sm:w-[400px] md:w-[550px] w-[350] mx-auto lg:mx-0">Established in 2003, SHABA is a Public-Private Partnership (PPP) water supply company in Borama, a rapidly expanding city in Somaliland’s Awdal region. Partnering with the local government, SHABA manages the district’s water supply, addressing the needs of a city that has tripled in size over the past decade and is poised to become one of the region’s most populous urban centers.
As Borama’s population grows, so does the demand for clean, reliable water—a challenge SHABA has successfully taken on. The company ensures the production and distribution of safe drinking water to meet the needs of the entire community. Prior to SHABA’s establishment, the local public utility operated four boreholes but struggled to provide adequate water supply to Borama’s residents, leaving many without reliable access.</p>
                    </div>
                    <div className="bg-[#fffcf2] shadow-lg rounded-lg p-6 flex gap-4 lg:w-full sm:w-[400px] md:w-[550px] w-[350] mx-auto mt-5">
                        <div className="flex-1 flex justify-center items-start">
                            <i className="fa-solid fa-building-columns text-green-300 text-2xl pt-4"></i>
                        </div>
                        <div className="flex-6 ">
                            <h3 className="font-semibold text-xl my-3">Shaba pioneered PPP in the region</h3>
                            <p className="">The PPP model transformed water service delivery in Borama, addressing the city’s longstanding challenges.</p>
                        </div>
                    </div>
                </div>
            </section>
            <Vision />
            <Mission />
            <Footer />
        </div>
    )
}

export default AboutTheCompany;