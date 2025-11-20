// const successImg = '/assets/success.jpg';
import successImg from "../../../public/assets/success.jpg";
import Image from "next/image";

const SecretsOfSuccess = () => {
    return (
        <section className="w-5/6 min-h-screen flex flex-col gap-10 h-full mx-auto mb-10 mt-45">
            <div className="w-full my-12 h-1/3 text-center lg:text-left">
                <h2 className="text-5xl font-semibold my-5">The secrets of success</h2>
                <p className="text-lg text-green-500">Shaba's secrets to success</p>
            </div>
            <div className="flex flex-col gap-10 xl:flex-row">
                <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="max-w-120 mx-auto lg:mx-0">
                        <i className="fa-solid fa-binoculars text-green-400 text-3xl text-center lg:text-left w-full"></i>
                        <h3 className="text-xl mt-3 text-center lg:text-left">Visionary Leadership and Governance</h3>
                        <p className="text-gray-700 text-center lg:text-left">A transparent and accountable management structure ensures that every decision aligns with our mission of providing reliable, affordable, and sustainable water supply services. Regular stakeholder engagement and a participatory approach have strengthened trust and cooperation.</p>
                    </div>

                    <div className="max-w-120 mx-auto lg:mx-0">
                        <i className="fa-solid fa-trophy text-green-400 text-3xl text-center lg:text-left w-full"></i>
                        <h3 className="text-xl mt-3 text-center lg:text-left">Innovative Public-Private Partnership (PPP) Model</h3>
                        <p className="text-gray-700 text-center lg:text-left">SHABA’s PPP framework, the first of its kind in Somaliland, combines the efficiency of private enterprise with the oversight and support of public institutions. This synergy has enabled us to achieve significant milestones, including increasing daily water production and expanding infrastructure.</p>
                    </div>

                    <div className="max-w-120 mx-auto lg:mx-0">
                        <i className="fa-solid fa-gears text-green-400 text-3xl text-center lg:text-left w-full"></i>
                        <h3 className="text-xl mt-3 text-center lg:text-left">Focus on Infrastructure and Service Expansion</h3>
                        <p className="text-gray-700 text-center lg:text-left">Through strategic investments in boreholes, reservoirs, pipelines, and advanced technologies, we’ve consistently improved water availability and efficiency. These efforts reduced water loss from 60% to just 10%, ensuring reliable services for over 19,675 households as of 2023 and also ensuring 24/7 water availabilty.</p>
                    </div>

                    <div className="max-w-120 mx-auto lg:mx-0">
                        <i className="fa-solid fa-user-group text-green-400 text-3xl text-center lg:text-left w-full"></i>
                        <h3 className="text-xl mt-3 text-center lg:text-left">Commitment to the Community</h3>
                        <p className="text-gray-700 text-center lg:text-left">SHABA’s pro-unwealthy pricing approach and focus on reducing waterborne diseases have directly impacted the health and well-being of Borama’s residents. Our dedication extends beyond water provision, contributing to social development and environmental sustainability.</p>
                    </div>
                </div>

                <div className="flex-1 flex justify-center items-start mt-15 ml-15 ">
                    <div className="bg-green-800 h-50 w-80 sm:h-80 sm:w-100 md:h-100 md:w-150 relative">
                        <div className="h-50 w-80 sm:h-80 sm:w-100 md:h-100 md:w-150 absolute -left-5 -top-5">
                            <Image
                            src={successImg}
                            alt="A descriptive alt text"
                            fill
                            className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SecretsOfSuccess;