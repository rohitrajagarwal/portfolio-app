import React from "react";

function ProjectIndividual({ content }) {
    return (
        content ? (
            <div className="main-content-body visible">
                <div className="projectimg">
                    <img src={"images/projects/" + content.image_name} alt={content.image_name} />
                </div>
                <div className="sub-component-large" id={content.id}>
                    <h2>{content.short_desc}</h2>
                    <p>{content.long_desc}</p>
                </div>
            </div>
        ) : <div></div>
    );
}

export default ProjectIndividual