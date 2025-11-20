import Image from "next/image";

const Partner = ({image, title}) => {
    return (
        <div className="mx-auto flex flex-col justify-between h-3/4">
            <Image 
                height={140}
                width={160}
                src={image}
                alt="Partners"
            />
            {/* <img src={image} alt="" className="h-30" /> */}
            <p className="text-center mt-8 text-gray-600">{title}</p>
        </div>
    )
}

export default Partner;