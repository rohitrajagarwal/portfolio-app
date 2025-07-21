import React from "react";

function ProjectIndividual({ content }) {
    return (
        content ? (
            content.id % 2 === 1 ? (
                <div className="main-content-body visible">
                    <div className="projectimg">
                        <img src={"images/projects/" + content.image_name} alt={content.image_name} />
                    </div>
                    <div className="sub-component-large" id={content.id}>
                        <div className="project_details">
                            <h2>{content.short_desc}</h2>
                            <h3>Project Team: {content.team_members}</h3>
                            <p>{content.long_desc}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="main-content-body visible">
                    <div className="sub-component-large" id={content.id}>
                        <div className="project_details">
                            <h2>{content.short_desc}</h2>
                            <h3>Project Team: {content.team_members}</h3>
                            <p>{content.long_desc}</p>
                        </div>
                    </div>
                    <div className="projectimg">
                        <img src={"images/projects/" + content.image_name} alt={content.image_name} />
                    </div>
                </div>
            )
        ) : <div></div>
    );
}

export default ProjectIndividual