import React, { useEffect } from 'react';
import MenuComponent from '../MenuComponent';
import FooterComponent from '../FooterComponent';
import EduHistory from './EduHistory.js';

function EduContainer({  }) {

    const [content, setContent] = React.useState('');

    useEffect(() => {
        // Any side effects or data fetching can be done here
        
        fetch('api/education')
            .then(res => res.json())
            .then(data => {
                console.log("EduContainer.js: API response: ", data);
                setContent(data);
            })
            .catch(error => {
                console.error("EduContainer.js: API error: ", error);
            });
    }, []); // Empty dependency array to run only once on mount

    // Separate useEffect to log content changes
    useEffect(() => {
        console.log("EduContainer.js: content state updated: ", content);
    }, [content]);

  return (
    <div className="container">
      <MenuComponent currentPage="education" />
      <EduHistory content={content} />
      <FooterComponent />
    </div>
  );
}


export default EduContainer;