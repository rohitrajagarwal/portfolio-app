import React, { useEffect, useRef } from 'react';
import MainContentSubcomponent from './MainContentSubcomponent.js';

function MainContentBody({ index, content }) {
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      ref.current.classList.add('visible');
    }
  }, []);

  console.log("MaintContentBody.js: index value: ", index);
  return (
    <div className="main-content-body" ref={ref}> 
      {index % 2 === 0 ? (
          <>
              <MainContentSubcomponent content={content.mainpage_component[0]} />
              <MainContentSubcomponent content={content.mainpage_component[1]} />
          </>
      ) : (
          <>
              <MainContentSubcomponent content={content.mainpage_component[1]} />
              <MainContentSubcomponent content={content.mainpage_component[0]} />
          </>
      )}
    </div> 
  );
}

export default MainContentBody
