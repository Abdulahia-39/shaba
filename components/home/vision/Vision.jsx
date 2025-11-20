const Vision = () => {
    return (
        <section className="min-h-screen flex flex-col gap-6 h-full w-5/6 m-auto my-10 2xl:w-4/5">
                <div className="w-full text-center my-12">
                    <h2 className="text-5xl font-semibold my-5">Shaba’s core visions</h2>
                    <p className="text-lg text-green-500">The company’s visions</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-10 mx-auto w-full items-center justify-items-center mt-15">
                    <div className="h-100 px-2 shadow-2xl max-w-70 overflow-auto">
                        <div className="flex justify-center my-8">
                            <i className="fa-solid fa-check text-green-300 text-4xl"></i>
                        </div>
                        <div className="px-5">
                            <h3 className="text-xl font-semibold text-center mb-5">Delivering Excellence in Water Services</h3>
                            <p className="text-gray-700 text-center">To provide reliable, affordable, and high-quality water supply services that meet the evolving needs of our growing community.</p>
                        </div>
                    </div>
                    <div className="h-100 px-2 shadow-2xl max-w-70 overflow-auto">
                        <div className="flex justify-center my-8">
                            <i className="fa-solid fa-comment text-green-300 text-4xl"></i>
                        </div>
                        <div className="px-5">
                            <h3 className="text-xl font-semibold text-center mb-5">Empowering the Community</h3>
                            <p className="text-gray-700 text-center">To actively engage with stakeholders, including residents, businesses, and local government, to ensure inclusive decision-making and mutual benefit</p>
                        </div>
                    </div>
                    <div className="h-100 px-2 shadow-2xl max-w-70 overflow-auto">
                        <div className="flex justify-center my-8">
                            <i className="fa-solid fa-flag text-green-300 text-4xl"></i>
                        </div>
                        <div className="px-5">
                            <h3 className="text-xl font-semibold text-center mb-5">Setting a Benchmark for Public-Private Partnerships (PPPs)</h3>
                            <p className="text-gray-700 text-center">To continue being a model for PPP success, inspiring other regions to adopt similar frameworks for effective service delivery.</p>
                        </div>
                    </div>
                    <div className="h-100 px-2 shadow-2xl max-w-70 overflow-auto">
                        <div className="flex justify-center my-8">
                            <i className="fa-solid fa-tree text-green-300 text-4xl"></i>
                        </div>
                        <div className="px-5">
                            <h3 className="text-xl font-semibold text-center mb-5">Championing Innovation and Sustainability</h3>
                            <p className="text-gray-700 text-center">To adopt innovative technologies and renewable energy solutions for sustainable water production and distribution.</p>
                        </div>
                    </div>
                </div>           
        </section>
    );
}

export default Vision;