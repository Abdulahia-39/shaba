// import Header from "../projects/header/Header";
import Header from "@/components/projects/header/Header";
// import Contact from "../home/contact/Contact";
import Contact from "@/components/home/contact/Contact";
// import Footer from "../home/footer/Footer";
import Footer from "@/components/home/footer/Footer";
// import ContactMap from "./ContactMap";
import ContactMap from "@/components/contact/ContactMap";

const ContactUs = () => {
    return (
        <div className="bg-[#f8f9fa]">
            <Header
                headerText="Contact us"
            />
            <ContactMap />
            <Contact />
            <Footer />
        </div>
    )
}

export default ContactUs;