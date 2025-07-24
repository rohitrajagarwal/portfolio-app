import React, { useState } from "react";
import '../../styles/projects.css';

function linkifyText(text) {
  if (!text) return null;
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);
  return parts.map((part, i) => {
    if (urlRegex.test(part)) {
      // Check for trailing punctuation and remove if present
      let cleanUrl = part;
      let trailing = '';
      const match = part.match(/([.,!?;:]+)$/);
      if (match && match.index === part.length - match[0].length) {
        cleanUrl = part.slice(0, -match[0].length);
        trailing = match[0];
      }
      return [
        <a key={i} href={cleanUrl} target="_blank" rel="noopener noreferrer">{cleanUrl}</a>,
        trailing
      ];
    }
    return part;
  });
}

function ProjectIndividual({ content }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleDescription = () => {
        setIsExpanded(prev => !prev);
    };

    if (!content) {
        return <div></div>;
    }

    return (
        <div className="main-content-body visible">
            <div className="projectimg">
                <img src={`images/projects/${content.image_name}`} alt={content.image_name} />
            </div>

            <div className="sub-component-large">
                <div className="project_details">
                    <h2>{content.short_desc}</h2>
                    <h3>Project Team: {content.team_members}</h3>
                    <div className="project-description-section">
                        <h4 onClick={toggleDescription} className="project-description-toggle">
                            Description
                            <img 
                                src="images/expand-arrow.png" 
                                alt="Expand" 
                                className={`course-expand-img ${isExpanded ? 'expanded' : ''}`}
                            />
                        </h4>
                        <div className={`project-description-container ${isExpanded ? 'expanded' : ''}`}>
                            <p>{linkifyText(content.long_desc)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectIndividual