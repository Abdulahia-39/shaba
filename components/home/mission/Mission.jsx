const shabaLogo = '/assets/shabalogo.png';

const Mission = () => {
    return (
        <section className="w-5/6 min-h-screen flex flex-col gap-2 h-full mx-auto my-10">
                <div className="w-full text-center mt-20 h-1/3">
                    <h2 className="text-5xl font-semibold my-5">Shaba’s missions</h2>
                    <p className="text-lg text-green-500">The company’s missions drive it's work</p>
                </div>
                <div className="flex flex-col xl:flex-row h-2/3 mt-10 gap-10">
                    <div className="flex-1 flex flex-col px-10 gap-10">
                        <div className="flex flex-col justify-center items-center flex-1">
                            <h3 className="text-green-500 text-lg my-5 font-semibold">Mission</h3>
                            <p className="text-lg text-center max-w-150">To manage the Borama water supply and resources with a long-term vision that prioritizes the common good of all citizens—ensuring that water access remains uninterrupted, stable, and resilient against future challenges.</p>
                        </div>
                        <div className="flex flex-col justify-center items-center flex-1">
                            <h3 className="text-green-500 text-lg my-5 font-semibold">Mission</h3>
                            <p className="text-lg text-center max-w-150">To ensure a reliable and continuous water supply system in Borama that serves the community consistently, through sustainable practices and a citizen-first approach to resource management.</p>
                        </div>                 
                    </div>
                    
                    <div className="hidden flex-2 xl:flex justify-center items-center border-x-5 border-green-900">
                        <div className="h-80 w-80 bg-green-300 rounded-full flex flex-col gap-6 justify-center items-center shadow-2xl hover:shadow-xl transition-all duration-300 hover:-translate-z-1">
                            <img src={shabaLogo} className="w-25" />
                            <p className="text-3xl font-semibold ">Shaba's missions</p>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col justify-center items-center px-10 gap-10">
                        <div className="flex flex-col justify-center items-center flex-1">
                            <h3 className="text-green-500 text-lg my-5 font-semibold">Mission</h3>
                            <p className="text-lg text-center max-w-150">To collaborate with local authorities, institutions, and international partners in strengthening water infrastructure and enhancing community access to safe and sufficient water supply.</p>
                        </div>
                        <div className="flex flex-col justify-center items-center flex-1">
                            <h3 className="text-green-500 text-lg my-5 font-semibold">Mission</h3>
                            <p className="text-lg text-center max-w-150">To promote community awareness and participation in water conservation, ensuring citizens understand their role in sustaining Borama’s water resources for present and future needs.</p>
                        </div>
                    </div>
                </div>
        </section>
    );
}

export default Mission;