import React from 'react';
import MenuComponent from './MenuComponent.js';
import MainContent from './MainContent.js';
import FooterComponent from './FooterComponent.js';


function Container({mainpage_components}) {
   
    //console.log("Mainpage components in Container: ", mainpage_components);
    return (
        <div className="container">
            <MenuComponent /> 
            <MainContent content={mainpage_components} />
            <FooterComponent/> 
        </div>
    );
}

export default Container;