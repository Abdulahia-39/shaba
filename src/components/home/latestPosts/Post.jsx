const Post = ({image}) => {
    return (
        <div className="bg-white shadow-2xl flex flex-col gap-1 hover:shadow-md transition-all duration-300 hover:-translate-z-1 max-w-70 sm:min-w-85 sm:max-w-120 mx-auto">
            <div className="h-65 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}></div>

            <div className="flex-2 p-5 sm:p-10 flex flex-col gap-6">
                <h3 className="text-2xl font-semibold">Borama Dam Project Overview</h3>
                <p className="text-gray-600">By: abdilahiabdirahman144@gmail.com on january 3, 2025</p>
                <p className=" text-gray-600">Project Overview Project Title: Construction of a High-Capacity Gravity Dam for Borama Town Water Supply.[…]</p>
                <button className="text-left text-green-600">Read more
                    <i className="fa-solid fa-arrow-right ml-2"></i>
                </button>
            </div>
        </div>
    )
}

export default Post;