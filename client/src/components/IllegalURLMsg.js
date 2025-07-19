import React, { useEffect } from 'react';

function IllegalURLMsg() {
   useEffect(() => {
    //alert("You are not allowed to be here. Please go back to the <a href=\"/\">Home</a> page.");
  }, []);

  return (
    <div className="container">
        <div id="customInfoBox">
            <div className="info-box-content">
                <p id="infoBoxMessage">You are not allowed to be here. Please go back to the <a href="/">Home</a> page.</p>
            </div>
        </div>
    </div>
  );
}

export default IllegalURLMsg