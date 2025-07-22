import React, {useEffect, useState} from 'react';
import MenuComponent from '../MenuComponent';
import MainContent from './MainContent';
import FooterComponent from '../FooterComponent';


function Container() {

    const [message, setMessage] = useState('');

    useEffect(() => {
      // Fetch main content
      fetch('api/home')
        .then(res => res.json())
        .then(data => {
          setMessage(data);
        });
    }, []);

    return (
      <div className="container">
        <MenuComponent currentPage="home" />
        <MainContent content={message} />
        <FooterComponent/>
      </div>
    );
}

export default Container;