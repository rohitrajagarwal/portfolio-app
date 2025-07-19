import React from 'react';

function MenuComponent() {
  return (
        <div className="menu">
            <a href="/home">
                <div className="btn">Home</div>
            </a>
            <a href="/project">
                <div className="btn">Projects</div>
            </a>
            <a href="/contact">
                <div className="btn">Contact</div>
            </a>
        </div>
  );
}

export default MenuComponent;