import React from 'react';
import MenuComponent from '../MenuComponent';
import BlogHighlights from './BlogHighlights';
import BlogGrid from './BlogGrid';
import FooterComponent from '../FooterComponent';

function BlogMain() {
  return (
    <div className="container">
      <MenuComponent currentPage="blogs" />
      
      <div className="blog-main-content">
        <BlogHighlights />
        <BlogGrid />
      </div>
      
      <FooterComponent />
    </div>
  );
}

export default BlogMain;