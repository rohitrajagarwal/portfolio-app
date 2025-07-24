import React, { useEffect, useRef } from 'react';
import MainContentSubcomponent from './MainContentSubcomponent';

function MainContentBody({ index, content }) {
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      // Add sequential delay based on index (500ms between each section)
      setTimeout(() => {
        ref.current.classList.add('visible');
      }, index * 500);
    }
  }, [index]);

  //console.log("MaintContentBody.js: index value: ", index);
  return (
    <div className="main-content-body" ref={ref}> 
              <MainContentSubcomponent content={content.mainpage_component[0]} />
              <MainContentSubcomponent content={content.mainpage_component[1]} />
    </div> 
  );
}

export default MainContentBody
