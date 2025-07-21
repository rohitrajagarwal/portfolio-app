import React, {useEffect, useState} from 'react';
import MenuComponent from '../MenuComponent';
import ProjectAll from './ProjectAll';
import FooterComponent from '../FooterComponent';


function ProjectMain() {
   
    const [message, setMessage] = useState('');
    
      useEffect(() => {
        //console.log("Fetching data from server...");
        fetch('api/project')
          .then(res => res.json())
          .then(data => {
            //console.log("Data received from server: ", data);
              setMessage(data);
          });
      }, []);
      
    //console.log("ProjectMain.js: ", message);
    return (
        <div className="container">
            <MenuComponent currentPage="project" /> 
            <ProjectAll content={message} />
            <FooterComponent/> 
        </div>
    );
}

export default ProjectMain