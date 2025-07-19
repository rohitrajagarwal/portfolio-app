import React from 'react';

function MenuComponent() {
  return (
        <div className="menu">
            <div className="btn">
                <a href="/">Home</a>
            </div>
            <div className="btn">
                <a href="/api/projects">Projects</a>
            </div>
            <div className="btn">
                <a href="/api/contact">Contact</a>
            </div>
        </div>
  );
}

export default MenuComponent;