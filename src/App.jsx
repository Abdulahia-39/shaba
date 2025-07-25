import Home from "./components/home/Home";
import Projects from "./components/projects/Projects.jsx";
import NotFound from "./components/notFound/NotFound.jsx";
import ContactUs from "./components/contact/ContactUs.jsx";
import AboutTheCompany from "./components/about/AboutTheCompany.jsx";
import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<AboutTheCompany />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
