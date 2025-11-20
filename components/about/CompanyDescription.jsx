const CompanyDescription = () => {
    return (
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
    )
}

export default CompanyDescription;