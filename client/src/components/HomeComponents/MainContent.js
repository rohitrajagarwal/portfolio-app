import React, { useEffect } from 'react';
import MainContentBody from './MainContentBody';


function MainContent({content}) {
    
    //console.log("In MainContent.js:", content);
    useEffect(() => {
       // console.log("MainContent.js:", content);
    }, [content]);

    return (
        <div className="main-content">
            {
                content && content.homepage && content.homepage.map((element, index) => {
                    //console.log("Element:", element);
                    return (
                        <MainContentBody key={index} index={index} content={element} />
                    );
                })
            }
        </div>
    );

}

export default MainContent