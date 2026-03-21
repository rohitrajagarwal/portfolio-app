import React, { useState, useEffect } from 'react';
import '../../styles/blog.css';

function BlogDetailModal({ blogId, onClose }) {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL || '';
    fetch(`${apiUrl}/api/blogs/${blogId}`)
      .then(res => res.json())
      .then(data => {
        setBlog(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching blog detail:', err);
        setLoading(false);
      });
  }, [blogId]);

  // Close modal when Escape key is pressed
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (loading) {
    return (
      <div className="blog-modal-overlay" onClick={onClose}>
        <div className="blog-modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="blog-modal-loading">Loading article...</div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="blog-modal-overlay" onClick={onClose}>
        <div className="blog-modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="blog-modal-error">Article not found.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-modal-overlay" onClick={onClose}>
      <div className="blog-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="blog-modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        <div className="blog-modal-scroll">
          <div className="blog-modal-header">
            <h1 className="blog-modal-title">{blog.title}</h1>
            
            <div className="blog-modal-meta">
              <span className="blog-modal-author">By {blog.author}</span>
              <span className="blog-modal-separator">•</span>
              <span className="blog-modal-views">👁 {blog.views || 0} views</span>
            </div>
          </div>

          <div className="blog-modal-body">
            {blog.content && (
              <div className="blog-modal-content-text">
                {blog.content}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogDetailModal;
