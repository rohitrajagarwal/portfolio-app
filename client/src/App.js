import React, { useEffect, useState } from 'react';
import Container from './components/Container.js'; 

function App() {
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
  

  //console.log("In App component, message: ", message);

  return (
    <Container className="main-content" mainpage_components={message}>
    
    </Container>
  );
}

export default App