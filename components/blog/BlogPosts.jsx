import Link from "next/link";
import Image from "next/image";

const BlogPosts = ({
    img,
    category,
    header,
    description,
    postid
}) => {
    return (
        <Link href={`Blog/${postid}`} className="cursor-pointer h-fit shadow-2xl">
            <div className="h-[70vh] max-w-[550px] rounded-xl relative flex flex-col justify-end p-5 mx-auto">
                {/* Background Image Layer */}
                <Image
                src={img}
                alt={header} // Use the header as a descriptive alt text
                fill
                sizes="( max-width: 600px) 100vw, 50vw"
                className="absolute inset-0 object-cover object-center rounded-xl"
                />

                {/* Gradient Overlay Layer */}
                <div className="absolute inset-0 bg-black opacity-50 rounded-xl"></div>

                {/* Content Layer */}
                <div className="relative z-10">
                    {category.map((cat, index) => (
                        <div key={index} className="bg-green-300 text-green-950 flex justify-center items-center h-8 w-fit p-5 mb-5 rounded-md ">{cat.attributes.category}</div>
                    ))}
                    {/* <div className="bg-green-300 text-green-950 flex justify-center items-center h-8 w-fit p-5 mb-5 rounded-md ">{category}</div> */}
                    <p className="text-green-200 font-semibold text-4xl mb-5 max-w-[20rem] overflow-hidden line-clamp-2 py-1 uppercase">{header}</p>
                    <p className="text-white mb-5 max-w-[20rem] overflow-hidden line-clamp-4">{description}</p>
                    <p className="text-green-200">Read More</p>
                </div>
            </div>
        </Link>       
    )
}

export default BlogPosts;


