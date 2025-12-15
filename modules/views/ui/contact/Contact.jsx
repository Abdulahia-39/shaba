import Header from "@/modules/views/ui/projects/header/Header";
import Contact from "@/modules/views/ui/home/contact/Contact";
import Footer from "@/modules/views/ui/home/footer/Footer";
import ContactMap from "@/modules/views/ui/contact/ContactMap";

const ContactUs = () => {
  return (
    <div className="bg-[#f8f9fa]">
      <Header headerText="Contact us" />
      <ContactMap />
      <Contact />
      <Footer />
    </div>
  );
};

export default ContactUs;
