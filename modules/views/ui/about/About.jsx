import Header from "@/modules/views/ui/projects/header/Header";
import aboutPic from "@/public/assets/shabapics1.jpg";
import Vision from "@/modules/views/ui/home/vision/Vision";
import Footer from "@/modules/views/ui/home/footer/Footer";
import Mission from "@/modules/views/ui/home/mission/Mission";
import Contact from "@/modules/views/ui/home/contact/Contact";
import AboutPic from "@/modules/views/ui/about/AboutPic";
import CompanyDescription from "@/modules/views/ui/about/CompanyDescription";
import Partners from "@/modules/views/ui/home/partners/Partners";

const AboutTheCompany = () => {
  return (
    <div className="bg-[#f8f9fa]">
      <Header headerText="About Us" />
      <section className="flex w-full flex-col lg:flex-row mb-15">
        <AboutPic image={aboutPic} />
        <CompanyDescription />
      </section>
      <Vision />
      <Mission />
      <Partners />
      <Contact />
      <Footer />
    </div>
  );
};

export default AboutTheCompany;
