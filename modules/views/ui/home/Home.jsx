import Header from "@/modules/views/ui/home/header/Header";
import About from "@/modules/views/ui/home/about/About";
import Vision from "@/modules/views/ui/home/vision/Vision";
import Mission from "@/modules/views/ui/home/mission/Mission";
import SecretsOfSuccess from "@/modules/views/ui/home/secretsOfSuccess/SecretsOfSuccess";
import Partners from "@/modules/views/ui/home/partners/Partners";
import LatestPosts from "@/modules/views/ui/home/latestPosts/LatestPosts";
import Contact from "@/modules/views/ui/home/contact/Contact";
import Footer from "@/modules/views/ui/home/footer/Footer";
import ProjectVideos from "./sdf/Sdf";

const Home = () => {
  return (
    <main className="bg-[#f8f9fa]">
      <Header />
      <About />
      <Vision />
      <Mission />
      <SecretsOfSuccess />
      <Partners />
      <LatestPosts />
      <ProjectVideos />
      <Contact />
      <Footer />
    </main>
  );
};

export default Home;
