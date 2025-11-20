const Sidebar = () => {
    return (
        <section className="flex-1 min-h-full bg-green-300 p-2 hidden md:flex flex-col">
            <div className="w-full flex items-center relative h-20">
            <input type="text" className="w-full border-none outline-none bg-green-400 h-12 rounded-3xl p-2" placeholder="Search..." />
            <button className="absolute right-0 bg-green-700 text-white w-24 h-12 rounded-r-3xl cursor-pointer">Search</button>
            </div>
            <div className="p-2">
            <p className="text-black text-2xl mb-4">Latest Comments</p>
            <p className="">No comments yet</p>
            </div>
        </section>
    )
}

export default Sidebar;