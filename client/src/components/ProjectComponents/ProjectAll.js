import React, { useEffect } from 'react';
import ProjectIndividual from './ProjectIndividual';

function ProjectAll({content}) {


    //console.log("In ProjectAll.js:", content);
    return (
        <div className="main-content">
            {
                content && content.map((element, index) => {
                    //console.log("In ProjectAll: Element:", element);
                    return (
                        <ProjectIndividual key={index} content={element} />
                    );
                })
            }
        </div>
    );

}

export default ProjectAll