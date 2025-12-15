"use client";

import damImg from "@/public/assets/amoudDam.png";
import ProjectCard from "./ProjectCard";
import BlogContext from "@/store/BlogContext";
import { useContext, useEffect, useState } from "react";
import LoadingSpinner from "../../blog/LoadingSpinner";

const projectsData = [
  {
    id: 1,
    title: "Borama Dam proposal",
    description:
      "Construction of a High-Capacity Gravity Dam for Borama Town Water Supply.",
    imageUrl: damImg,
    projectNo: "1",
  },
  {
    id: 2,
    title: "Borama Dam proposal",
    description:
      "Construction of a High-Capacity Gravity Dam for Borama Town Water Supply.",
    imageUrl: damImg,
    projectNo: "1",
  },
  {
    id: 3,
    title: "Borama Dam proposal",
    description:
      "Construction of a High-Capacity Gravity Dam for Borama Town Water Supply.",
    imageUrl: damImg,
    projectNo: "1",
  },
  {
    id: 4,
    title: "Borama Dam proposal",
    description:
      "Construction of a High-Capacity Gravity Dam for Borama Town Water Supply.",
    imageUrl: damImg,
    projectNo: "1",
  },
];

const ProjectList = () => {
  const blog = useContext(BlogContext);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const projectsList = blog.blogPosts.filter(
      (post) =>
        post.attributes.categories.data[0].attributes.category === "projects"
    );
    setProjects(projectsList);
  }, [blog]);

  if (blog.loading) {
    return (
      <div className="bg-green-300 flex-3 h-screen w-full mx-auto my-auto flex flex-col justify-center items-center">
        <div className="w-full text-center py-20">
          <h2 className="text-5xl font-semibold my-5 text black">
            Shaba’s Projects and Proposals
          </h2>
          <p className="text-lg text-green-900">Some of Our Projects</p>
        </div>
        <section className="h-full w-full flex justify-center items-center">
          <LoadingSpinner />
        </section>
      </div>
    );
  }

  if (blog.error) {
    return (
      <section className="bg-green-300 pb-15">
        <div className="w-full text-center py-20">
          <h2 className="text-5xl font-semibold my-5 text black">
            Shaba’s Projects and Proposals
          </h2>
          <p className="text-lg text-green-900">Some of Our Projects</p>
        </div>

        {projectsData.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            description={project.description}
            imageUrl={project.imageUrl}
            projectNo={project.projectNo}
            url={"#"}
          />
        ))}
      </section>
    );
  }

  return (
    <section className="bg-green-300 pb-15">
      <div className="w-full text-center py-20">
        <h2 className="text-5xl font-semibold my-5 text black">
          Shaba’s Projects and Proposals
        </h2>
        <p className="text-lg text-green-900">Some of Our Projects</p>
      </div>

      {projects.map((project, index) => (
        <ProjectCard
          key={project.id}
          title={project.attributes.title}
          description={project.attributes.description}
          imageUrl={project.attributes.postimg.data.attributes.url}
          url={`Blog/${project.id}`}
          projectNo={index + 1}
        />
      ))}
    </section>
  );
};

export default ProjectList;
