// import Header from "../projects/header/Header";
import Header from "@/components/projects/header/Header";
// import aboutPic from "../../assets/shabapics/shabapics1.jpg"
import aboutPic from "@/public/assets/shabapics1.jpg";
// import Vision from "../home/vision/Vision";
import Vision from "@/components/home/vision/Vision";
// import Footer from "../home/footer/Footer";
import Footer from "@/components/home/footer/Footer";
// import Mission from "../home/mission/Mission";
import Mission from "@/components/home/mission/Mission";
// import Contact from "../home/contact/Contact";
import Contact from "@/components/home/contact/Contact";
import AboutPic from "@/components/about/AboutPic";
import CompanyDescription from "@/components/about/CompanyDescription";
import Partners from "@/components/home/partners/Partners";

const AboutTheCompany = () => {
    return (
        <div className="bg-[#f8f9fa]">
            <Header 
                headerText="About Us"
            />
            <section className="flex w-full flex-col lg:flex-row mb-15">
                <AboutPic 
                    image={aboutPic}
                />
                <CompanyDescription />
            </section>
            <Vision />
            <Mission />
            <Partners />
            <Contact />
            <Footer />
        </div>
    )
}

export default AboutTheCompany;