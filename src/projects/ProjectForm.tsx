import { Project } from "./Project";
import { SyntheticEvent, useState } from "react";

interface ProjectFormProps {
  onCancel: () => void;
  onSave: (project: Project) => void;
  project: Project;
}

export default function ProjectForm(props: ProjectFormProps) {
  const { onCancel, onSave, project: initalProject } = props;
  const [project, setProject] = useState(initalProject);
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    budget: "",
  });

  function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    if (!isValid()) return;
    if (isValid()) {
      console.log(errors.name);
      console.log(errors.description);
      console.log(errors.budget);
    }
    onSave(project);
  }

  function handleChange(event: any) {
    const { type, name, value, checked } = event.target;
    let updatedValue = type === "checkbox" ? checked : value;

    if (type === "number") {
      updatedValue = Number(updatedValue);
    }

    const change = {
      [name]: updatedValue,
    };

    let updatedProject: Project;

    setProject((p) => {
      updatedProject = new Project({ ...p, ...change });
      setErrors(validate(updatedProject));
      return updatedProject;
    });
  }

  function validate(project: Project) {
    let errors: any = { name: "", description: "", budget: "" };
    if (project.name.length === 0) {
      errors.name = "Name is required";
    }
    if (project.name.length > 0 && project.name.length < 3) {
      errors.name = "Name needs to be at least 3 Characters long";
    }
    if (project.description.length === 0) {
      errors.description = "The Project needs a description";
    }
    if (project.budget === 0) {
      errors.budget = "Budget must be greater than 0";
    }
    return errors;
  }

  function isValid() {
    return (
      errors.name.length === 0 &&
      errors.description.length === 0 &&
      errors.budget.length === 0
    );
  }

  return (
    <form className="input-group vertical">
      <label htmlFor="name">Project Name</label>
      <input
        type="text"
        name="name"
        placeholder="enter name"
        value={project.name}
        onChange={handleChange}
      />
      {errors.name.length > 0 && (
        <div className="card error">
          <p>{errors.name}</p>
        </div>
      )}
      <label htmlFor="description">Project Description</label>
      <textarea
        name="description"
        placeholder="enter description"
        value={project.description}
        onChange={handleChange}
      />
      {errors.description.length > 0 && (
        <div className="card error">
          <p>{errors.description}</p>
        </div>
      )}
      <label htmlFor="budget">Project Budget</label>
      <input
        type="number"
        name="budget"
        placeholder="enter budget"
        value={project.budget}
        onChange={handleChange}
      />
      {errors.budget.length > 0 && (
        <div className="card error">
          <p>{errors.budget}</p>
        </div>
      )}
      <label htmlFor="isActive">Active?</label>
      <input
        type="checkbox"
        name="isActive"
        checked={project.isActive}
        onChange={handleChange}
      />
      <div className="input-group">
        <button className="primary bordered medium" onClick={handleSubmit}>
          Save
        </button>
        <span />
        <button type="button" className="bordered medium" onClick={onCancel}>
          cancel
        </button>
      </div>
    </form>
  );
}
