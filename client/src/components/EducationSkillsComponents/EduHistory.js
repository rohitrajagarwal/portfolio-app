import React, { useState, useEffect, useRef } from 'react';
import '../../styles/education.css';

function EduHistory({content}) {
  const cardRefs = useRef([]);
  const [expandedSections, setExpandedSections] = useState({});

  const toggleCourseSection = (index) => {
    setExpandedSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  useEffect(() => {
    // Add visible class to all cards with staggered timing
    cardRefs.current.forEach((ref, index) => {
      if (ref) {
        setTimeout(() => {
          ref.classList.add('visible');
        }, index * 200); // Stagger each card by 200ms
      }
    });
  }, [content]);
  
  return (
    content ? (
      <div className="main-content">
        {
            content.education.map((element, index) => {
                const isExpanded = expandedSections[index];
                
                return (
                  <div 
                    className="main-content-body education-card" 
                    key={index}
                    ref={el => cardRefs.current[index] = el}
                  >
                    <div className="education-card-content">
                      <h3>{element.degree}</h3>
                      <p><strong>{element.institution}</strong></p>
                      <p>{element.location}</p>
                      <p>{element.start} - {element.end}</p>
                      
                      {/* Course tags section */}
                      {element.courses && element.courses.length > 0 && (
                        <div className="course-tags-section">  
                          <h4 onClick={() => toggleCourseSection(index)}>
                            Courses
                            <img 
                              src="images/expand-arrow.png" 
                              alt="Expand" 
                              className={`course-expand-img ${isExpanded ? 'expanded' : ''}`} 
                              id="expand-arrow"
                            />
                          </h4>
                          <div className={`course-tags-container ${isExpanded ? 'expanded' : ''}`}>
                            {element.courses.map(course => (
                              <span 
                                key={course.course_id} 
                                className="course-tag"
                                title={course.course_description ? `${course.course_description}\n\nSkills: ${course.course_skills.join(', ')}` : `Skills: ${course.course_skills.join(', ')}`}
                              >
                                {course.course_title}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
            })
        }
      </div>
    ) : (
      <div>Loading...</div>
    )
  );
}

export default EduHistory;
