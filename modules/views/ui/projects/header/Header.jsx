import ArrowIcon from "@/modules/views/ui/projects/header/ArrowIcon";
import ContactBar from "../../home/header/ContactBar";
import Navbar from "../../home/header/Navbar";
const headerBg = "/assets/headerbg.png";

const Header = ({ headerText }) => {
  const overlayColor = "rgba(0, 0, 0, 0.6)";
  return (
    <header
      className="min-h-[85vh] w-full bg-cover bg-center bg-fixed flex flex-col"
      style={{
        backgroundImage: `linear-gradient(${overlayColor}, ${overlayColor}),url(${headerBg})`,
      }}
    >
      <ContactBar />
      <Navbar />

      <div className="flex-grow flex flex-col items-center justify-center text-white text-center px-1 sm:px-4 py-10 relative">
        <h1 className="text-3xl/snug sm:text-4xl/snug font-bold lg:text-6xl/relaxed max-w-4xl mx-auto mb-5 text-green-300 break-words">
          {headerText}
        </h1>
        <ArrowIcon />
      </div>
    </header>
  );
};

export default Header;
