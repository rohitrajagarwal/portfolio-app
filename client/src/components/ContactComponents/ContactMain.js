import React from 'react';
import ContactForm from './ContactForm';
import MenuComponent from '../MenuComponent';
import FooterComponent from '../FooterComponent';

function ContactMain() {
   
    //console.log("Mainpage components in Container: ", mainpage_components);
    return (
        <>
            
            <div className="container">
                <MenuComponent currentPage="contact" /> 
                 <ContactForm /> 
                <FooterComponent/> 

            </div>

        </>
    );
}

export default ContactMain;