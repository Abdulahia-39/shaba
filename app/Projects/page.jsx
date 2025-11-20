// import Header from "./header/Header";
import Header from "@/components/projects/header/Header";
// import Description from "./description/Description";
import Description from "@/components/projects/description/Description";
// import Footer from "../home/footer/Footer";
import Footer from "@/components/home/footer/Footer";
// import ProjectList from "./project/ProjectList";
import ProjectList from "@/components/projects/project/ProjectList";

const Projects = () => {
  return (
    <div className="bg-[#f8f9fa]">
      <Header
        headerText="Shaba's Projects"
      />
      <Description />  
      <ProjectList />
      <Footer />
    </div>
  );
}

export default Projects;