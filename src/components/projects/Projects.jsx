import Header from "./header/Header";
import Description from "./description/Description";
import Footer from "../home/footer/Footer";
import ProjectList from "./project/ProjectList";

const Projects = () => {
  return (
    <div className="bg-[#f8f9fa]">
      <Header />
      <Description />  
      <ProjectList />
      <Footer />
    </div>
  );
}

export default Projects;