import amoudDam from "../../../public/assets/amoudDam.png";
import biyogalin from "../../../public/assets/biyogalin.jpg";
import galbeed from "../../../public/assets/galbeed.png";
import Post from './Post';

const LatestPosts = () => {
    return (
        <section className="">
            <div className="w-full text-center my-12">
                <h2 className="text-5xl font-semibold my-5">Latest Posts</h2>
                <p className="text-lg text-green-500">See the latest posts</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 w-4/5 mx-auto my-10">
                <Post image={amoudDam} />
                <Post image={biyogalin} />
                <Post image={galbeed} />
            </div>
            <div className="w-full lg:w-6/7 flex justify-center lg:justify-end my-10">
                <button className="bg-green-950 text-white text-lg font-light w-46 h-13 rounded-4xl">See all publications</button>
            </div>
        </section>
    )
}

export default LatestPosts;