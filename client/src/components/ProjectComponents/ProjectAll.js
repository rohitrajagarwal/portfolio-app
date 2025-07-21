import React, { useEffect } from 'react';
import ProjectIndividual from './ProjectIndividual';

function ProjectAll({content}) {

    
    // Debug logs
    //console.log("In ProjectAll.js: content:", content);

    return (
        <div className="main-content">
            {
                content && content.project_list && content.project_list.map((element, index) => {
                    //console.log("In ProjectAll.js: Element:", element);
                    return <ProjectIndividual key={index} content={element} />;
                })
            }
        </div>
    );

}

export default ProjectAll