import Header from "@/components/home/header/Header";
import About from "@/components/home/about/About";
import Vision from "@/components/home/vision/Vision";
import Mission from "@/components/home/mission/Mission";
import SecretsOfSuccess from "@/components/home/secretsOfSuccess/SecretsOfSuccess";
import Partners from "@/components/home/partners/Partners";
import LatestPosts from "@/components/home/latestPosts/LatestPosts";
import Contact from "@/components/home/contact/Contact";
import Footer from "@/components/home/footer/Footer";

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
      <Contact />
      <Footer />
    </main>
  );
};

export default Home;
