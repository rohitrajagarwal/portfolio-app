import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MenuComponent from '../MenuComponent';
import FooterComponent from '../FooterComponent';
import '../../styles/blog.css';

function BlogDetailPage() {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL || '';
    fetch(`${apiUrl}/api/blogs/${blogId}`)
      .then(res => {
        if (!res.ok) throw new Error('Blog not found');
        return res.json();
      })
      .then(data => {
        setBlog(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching blog:', err);
        setError('Blog not found');
        setLoading(false);
      });
  }, [blogId]);

  const handleCopyUrl = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleShareLinkedIn = () => {
    const url = window.location.href;
    const title = blog?.title || 'Check out this article';
    const summary = blog?.summary || 'I found this interesting article';
    
    // Create a message with proper formatting
    const message = `Check out this article:\n\n"${title}"\n\n${url}\n\n${summary}`;
    
    // Use LinkedIn's official share URL with the link as parameter
    // This will show a preview card with the article's metadata
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    
    // Open in new window
    const popup = window.open(linkedInUrl, 'linkedin-share', 'width=550,height=680');
    
    // Copy the full message to clipboard as backup for user
    navigator.clipboard.writeText(message).then(() => {
      console.log('Message copied to clipboard - you can paste in your LinkedIn post');
    }).catch(err => {
      console.log('Message to share:', message);
    });
  };

  const handleBackToBlog = () => {
    const scrollData = sessionStorage.getItem('blogScrollPosition');
    navigate('/blogs');
    
    if (scrollData) {
      const { scrollY, tileY } = JSON.parse(scrollData);
      // Use setTimeout to ensure the DOM is ready before scrolling
      setTimeout(() => {
        window.scrollTo({ top: tileY, behavior: 'smooth' });
      }, 100);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <MenuComponent currentPage="blogs" />
        <div className="blog-detail-loading">Loading article...</div>
        <FooterComponent />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <MenuComponent currentPage="blogs" />
        <div className="blog-detail-error">
          <h2>Article Not Found</h2>
          <p>{error}</p>
          <button onClick={handleBackToBlog} className="blog-back-button">
            ← Back to Blogs
          </button>
        </div>
        <FooterComponent />
      </div>
    );
  }

  return (
    <div className="container">
      <MenuComponent currentPage="blogs" />
      
      <div className="blog-detail-page">
        <button onClick={handleBackToBlog} className="blog-back-button">
          ← Back to Blogs
        </button>

        <article className="blog-detail-article">
          <div className="blog-detail-header">
            <h1 className="blog-detail-title">{blog.title}</h1>
            
            <div className="blog-detail-meta">
              <span className="blog-detail-author">By {blog.author}</span>
              <span className="blog-detail-separator">•</span>
              <span className="blog-detail-views">👁 {blog.views || 0} views</span>
            </div>
          </div>

          <div className="blog-detail-actions">
            <button 
              onClick={handleCopyUrl} 
              className="blog-action-button copy-button"
              title="Copy URL to clipboard"
            >
              <span>{copied ? 'Copied!' : 'Copy Link'}</span>
            </button>
            
            <button 
              onClick={handleShareLinkedIn} 
              className="blog-action-button share-button"
              title="Share on LinkedIn - Add your thoughts"
            >
              <span>Share on LinkedIn</span>
            </button>
          </div>

          <div className="blog-detail-content">
            {blog.content}
          </div>
        </article>
      </div>

      <FooterComponent />
    </div>
  );
}

export default BlogDetailPage;
