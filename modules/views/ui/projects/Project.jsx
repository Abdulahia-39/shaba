import Header from "@/modules/views/ui/projects/header/Header";
import Description from "@/modules/views/ui/projects/description/Description";
import Footer from "@/modules/views/ui/home/footer/Footer";
import ProjectList from "@/modules/views/ui/projects/project/ProjectList";

const Projects = () => {
  return (
    <div className="bg-[#f8f9fa]">
      <Header headerText="Shaba's Projects" />
      <Description />
      <ProjectList />
      <Footer />
    </div>
  );
};

export default Projects;
