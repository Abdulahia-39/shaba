// import damImg from "../../../assets/shabapics/amoudDam.png";
import damImg from "@/public/assets/amoudDam.png";
import ProjectCard from "./ProjectCard";

const ProjectList = () => {
  return (
    <section className="bg-green-300 pb-15">
        <div className="w-full text-center py-20">
            <h2 className="text-5xl font-semibold my-5 text black">Shaba’s Projects and Proposals</h2>
            <p className="text-lg text-green-900">Some of Our Projects</p>
        </div>
        <ProjectCard
            title="Borama Dam Proposal"
            description="Construction of a High-Capacity Gravity Dam for Borama Town Water Supply."
            imageUrl={damImg}
            projectNo="1"
        />

        <ProjectCard
            title="Borama Dam Proposal"
            description="Construction of a High-Capacity Gravity Dam for Borama Town Water Supply."
            imageUrl={damImg}
            projectNo="1"
        />

        <ProjectCard
            title="Borama Dam Proposal"
            description="Construction of a High-Capacity Gravity Dam for Borama Town Water Supply."
            imageUrl={damImg}
            projectNo="1"
        />

        <ProjectCard
            title="Borama Dam Proposal"
            description="Construction of a High-Capacity Gravity Dam for Borama Town Water Supply."
            imageUrl={damImg}
            projectNo="1"
        />
    </section>
  );
}

export default ProjectList;