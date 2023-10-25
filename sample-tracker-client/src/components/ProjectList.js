import React from "react";

const ProjectList = ({projects, openProject}) => {
    return (
        <div>
            <h2>
                Projects
            </h2>
            <ul>
                {rooms.map((room, index) => (
                    <li key={index}>
                        <button onClick={() => openProject(project)}>Open {room}</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ProjectList;