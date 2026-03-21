import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/blog.css';

function BlogTile({ blog }) {
  const navigate = useNavigate();
  const tileRef = useRef(null);

  const handleReadMore = () => {
    // Store the scroll position and blog tile element position
    const scrollPosition = window.scrollY;
    const tilePosition = tileRef.current?.getBoundingClientRect().top + window.scrollY;
    
    sessionStorage.setItem('blogScrollPosition', JSON.stringify({
      scrollY: scrollPosition,
      tileY: tilePosition,
      blogId: blog.id
    }));

    navigate(`/blog/${blog.id}`);
  };

  return (
    <div className="blog-tile" ref={tileRef}>
      <div className="blog-tile-header">
        <h3 className="blog-tile-title">{blog.title}</h3>
      </div>
      
      <p className="blog-tile-summary">{blog.summary}</p>
      
      <div className="blog-tile-footer">
        <span className="blog-tile-views">👁 {blog.views || 0}</span>
        <button 
          onClick={handleReadMore} 
          className="blog-tile-link"
        >
          Read More →
        </button>
      </div>
    </div>
  );
}

export default BlogTile;
