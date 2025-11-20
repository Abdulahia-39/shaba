import Header from "@/components/projects/header/Header";
import Footer from "@/components/home/footer/Footer";
import Sidebar from "@/components/blog/Sidebar";
import Blog from "@/components/blog/Blog";

import blogBg from "../../public/assets/headerbg.png";
import contactbg from "../../public/assets/contactbg.jpg";


export default function BlogPage () {
    return (
        <>
        <Header 
            headerText="Blog"
        />
        <main className="bg-[#f8f9fa] flex w-full min-h-screen">
        <Sidebar />
        <Blog />
        </main>
        <Footer/>
        </>
    )
}
