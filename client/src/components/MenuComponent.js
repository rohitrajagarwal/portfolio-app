import React from 'react';
//import portfolio-comms.css

function MenuComponent({ currentPage }) {
  return (
        <div className="menu">

            {currentPage === 'home' ?
                <a href="#">
                    <div className="active-indicator">Home</div>
                </a>
                :
                <a href="/">
                    <div className="btn">Home</div>
                </a>
            }

            {currentPage === 'project' ?
                <a href="#">
                    <div className="active-indicator">Projects</div>
                </a>
                :
                <a href="/project">
                    <div className="btn">Projects</div>
                </a>
            }
            {currentPage === 'contact' ?
                <a href="#">
                    <div className="active-indicator">Contact</div>
                </a>
                :
                <a href="/contact">
                    <div className="btn">Contact</div>
                </a>
            }
        </div>
  );
}

export default MenuComponent;