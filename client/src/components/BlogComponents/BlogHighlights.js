import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/blog.css';

function BlogHighlights() {
  const navigate = useNavigate();
  const [highlights, setHighlights] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch highlighted blogs
    const apiUrl = process.env.REACT_APP_API_URL || '';
    fetch(`${apiUrl}/api/blogs`)
      .then(res => res.json())
      .then(data => {
        setHighlights(data.highlights || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching highlights:', err);
        setLoading(false);
      });
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? highlights.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === highlights.length - 1 ? 0 : prev + 1));
  };

  if (loading) {
    return <div className="blog-highlights-loading">Loading highlights...</div>;
  }

  if (highlights.length === 0) {
    return null; // Don't render if no highlights
  }

  const currentBlog = highlights[currentIndex];

  return (
    <div className="blog-highlights-container">
      <h2 className="blog-highlights-title">Featured Articles</h2>
      
      <div className="carousel-wrapper">
        <button className="carousel-button prev" onClick={handlePrev} aria-label="Previous">
          &#10094;
        </button>

        <div className="carousel-slide">
          <div className="highlight-card">
            <h3 className="highlight-title">{currentBlog.title}</h3>
            <p className="highlight-summary">{currentBlog.summary}</p>
            <div className="highlight-footer">
              <span className="highlight-views">👁 {currentBlog.views || 0} views</span>
              <button 
                onClick={() => navigate(`/blog/${currentBlog.id}`)} 
                className="read-more-btn"
              >
                Read More →
              </button>
            </div>
          </div>
        </div>

        <button className="carousel-button next" onClick={handleNext} aria-label="Next">
          &#10095;
        </button>
      </div>

      {/* Carousel indicators */}
      <div className="carousel-indicators">
        {highlights.map((_, index) => (
          <div
            key={index}
            className={`indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default BlogHighlights;
