import { Project } from "./Project";
import { useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";

interface ProjectListProps {
  projects: Project[];
  onSave: (project: Project) => void;
}

export default function ProjectList(props: ProjectListProps) {
  const { projects, onSave } = props;
  const [projectBeingEdited, setProjectBeingEdited] = useState({});

  function handleEdit(project: Project) {
    setProjectBeingEdited(project);
  }

  function cancelEditing() {
    setProjectBeingEdited({});
  }

  return (
    <div className="row">
      {projects.map((project) => (
        <div key={project.id} className="cols_sm">
          {project === projectBeingEdited ? (
            <ProjectForm
              onCancel={cancelEditing}
              onSave={onSave}
              project={project}
            />
          ) : (
            <ProjectCard project={project} onEdit={handleEdit} />
          )}
        </div>
      ))}
    </div>
  );
}
