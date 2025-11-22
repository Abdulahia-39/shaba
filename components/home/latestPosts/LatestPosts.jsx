import amoudDam from "@/public/assets/amoudDam.png";
import biyogalin from "@/public/assets/biyogalin.jpg";
import galbeed from "@/public/assets/galbeed.png";
import Post from "./Post";

const postsData = [
  {
    id: 1,
    image: amoudDam,
    title: "Borama Dam Project Overview",
    email: "By: abdilahiabdirahman144@gmail.com on january 3, 2025",
    overview:
      "Project Overview Project Title: Construction of a High-Capacity Gravity Dam for Borama Town Water Supply.",
    url: "/",
  },
  {
    id: 2,
    image: biyogalin,
    title: "Borama Dam Project Overview",
    email: "By: abdilahiabdirahman144@gmail.com on january 3, 2025",
    overview:
      "Project Overview Project Title: Construction of a High-Capacity Gravity Dam for Borama Town Water Supply.",
    url: "/",
  },
  {
    id: 3,
    image: galbeed,
    title: "Borama Dam Project Overview",
    email: "By: abdilahiabdirahman144@gmail.com on january 3, 2025",
    overview:
      "Project Overview Project Title: Construction of a High-Capacity Gravity Dam for Borama Town Water Supply.",
    url: "/",
  },
];

const LatestPosts = () => {
  return (
    <section className="">
      <div className="w-full text-center my-12">
        <h2 className="text-5xl font-semibold my-5">Latest Posts</h2>
        <p className="text-lg text-green-500">See the latest posts</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 w-4/5 mx-auto my-10">
        {postsData.map((post) => (
          <Post
            key={post.id}
            image={post.image}
            title={post.title}
            email={post.email}
            overview={post.overview}
            url={post.url}
          />
        ))}
      </div>
      <div className="w-full lg:w-6/7 flex justify-center lg:justify-end my-10">
        <button className="bg-green-950 text-white text-lg font-light w-46 h-13 rounded-4xl">
          See all publications
        </button>
      </div>
    </section>
  );
};

export default LatestPosts;
