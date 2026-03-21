import React, { useState, useEffect } from 'react';
import BlogTile from './BlogTile';
import '../../styles/blog.css';

function BlogGrid() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all blogs (includes both highlighted and non-highlighted)
    const apiUrl = process.env.REACT_APP_API_URL || '';
    fetch(`${apiUrl}/api/blogs`)
      .then(res => res.json())
      .then(data => {
        // Filter out highlighted blogs from the all_blogs list
        const highlightedIds = new Set(data.highlights?.map(b => b.id) || []);
        const regularBlogs = (data.all_blogs || []).filter(blog => !highlightedIds.has(blog.id));
        setBlogs(regularBlogs);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching blogs:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="blog-grid-loading">Loading blogs...</div>;
  }

  if (blogs.length === 0) {
    return <div className="blog-grid-empty">No blogs available yet.</div>;
  }

  return (
    <div className="blog-grid-container">
      <h2 className="blog-grid-title">All Articles</h2>
      
      <div className="blog-grid">
        {blogs.map((blog) => (
          <BlogTile key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
}

export default BlogGrid;
