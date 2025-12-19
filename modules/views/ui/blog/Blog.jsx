import Header from "@/modules/views/ui/projects/header/Header";
import Footer from "@/modules/views/ui/home/footer/Footer";
import Sidebar from "@/modules/views/ui/blog/Sidebar";
import BlogBody from "@/modules/views/ui/blog/BlogBody";
import { BlogProvider } from "@/contexts/BlogContext";

export default function Blog() {
  return (
    <>
      <Header headerText="Blog" />
      <main className="bg-[#f8f9fa] flex w-full min-h-screen">
        <Sidebar />
        <BlogBody />
      </main>
      <Footer />
    </>
  );
}
