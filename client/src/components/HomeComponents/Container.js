import React, {useEffect, useState} from 'react';
import MenuComponent from '../MenuComponent';
import MainContent from './MainContent';
import FooterComponent from '../FooterComponent';


function Container() {
   
    const [message, setMessage] = useState('');
    
      useEffect(() => {
        //console.log("Fetching data from server...");
        fetch('api/home')
          .then(res => res.json())
          .then(data => {
            //console.log("Data received from server: ", data);
              setMessage(data);
          });
      }, []);
      
    //console.log("Mainpage components in Container: ", mainpage_components);
    return (
        <div className="container">
            <MenuComponent currentPage="home" /> 
            <MainContent content={message} />
            <FooterComponent/> 
        </div>
    );
}

export default Container;