import React from "react";

const ProjectList = ({projects, openProject}) => {
    return (
        <div>
            <h2>
                Projects
            </h2>
            <ul>
                {projects.map((project, index) => (
                    <li key={index}>
                        <button onClick={() => openProject(project)}>Open {project}</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ProjectList;