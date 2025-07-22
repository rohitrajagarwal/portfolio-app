import React from 'react';
import { Link } from 'react-router-dom';
//import portfolio-comms.css

function MenuComponent({ currentPage }) {
  return (
        <div className="menu">

            {currentPage === 'home' ?
                <div className="active-indicator">Home</div>
                :
                <Link to="/">
                    <div className="btn">Home</div>
                </Link>
            }

            {currentPage === 'project' ?
                <div className="active-indicator">Projects</div>
                :
                <Link to="/project">
                    <div className="btn">Projects</div>
                </Link>
            }
            {currentPage === 'contact' ?
                <div className="active-indicator">Contact</div>
                :
                <Link to="/contact">
                    <div className="btn">Contact</div>
                </Link>
            }
        </div>
  );
}

export default MenuComponent;