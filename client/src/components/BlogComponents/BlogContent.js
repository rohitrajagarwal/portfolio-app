import React, {useEffect, useState} from 'react';
import MenuComponent from '../MenuComponent';
import MainContent from './MainContent';
import FooterComponent from '../FooterComponent';


function Container() {

    const [message, setMessage] = useState('');

    //call blogs api and assign to message variable
    useEffect(() => {
      // Fetch blogs content
        fetch('/api/blogs')
        .then(res => res.json())
        .then(data => {
          setMessage(data);
        });
    }, []);

    return (
      <div className="container">
        <MenuComponent currentPage="home" />
        {/*

        1. Have a carasouel for highlighted blogs here.
        */}
        <BlogHighlights content={message.highlights} />
        {
         /*   2. Below that, is a list of all blogs in a 3-column grid.
         */
        }
        <BlogGrid content={message.all_blogs} />
        <FooterComponent/>
      </div>
    );
}

export default Container;