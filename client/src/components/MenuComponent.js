import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/menu.css';

function MenuComponent({ currentPage }) {
  const [showQuote, setShowQuote] = useState(false);
  const [quote, setQuote] = useState('');

  // Hilarious dad jokes instead of quotes
  const dadJokes = [
    { text: "Why don't scientists trust atoms? Because they make up everything!" },
    { text: "I used to hate facial hair, but then it grew on me." },
    { text: "Why did the scarecrow win an award? He was outstanding in his field!" },
    { text: "What do you call a fake noodle? An impasta!" },
    { text: "Why don't eggs tell jokes? They'd crack each other up!" },
    { text: "I'm reading a book about anti-gravity. It's impossible to put down!" },
    { text: "Why did the cookie go to the doctor? Because it felt crumbly!" },
    { text: "What did the ocean say to the beach? Nothing, it just waved." },
    { text: "Why don't skeletons fight each other? They don't have the guts!" },
    { text: "I told my computer I needed a break, and now it won't stop sending me Kit-Kat ads." },
    { text: "What's the best thing about Switzerland? I don't know, but their flag is a big plus." },
    { text: "Why did the math book look so sad? Because it had too many problems!" },
    { text: "I'm afraid for the calendar. Its days are numbered." },
    { text: "What did one wall say to the other wall? I'll meet you at the corner!" },
    { text: "Why don't we ever tell secrets on a farm? Because the potatoes have eyes, the corn has ears, and the beans stalk!" }
  ];

  // Pick a random dad joke (no author needed)
  const quotes = dadJokes;

  useEffect(() => {
    // Quote pop-up logic
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    const lastShown = localStorage.getItem('quotePopupLastShown');

    if (lastShown !== today) {
      // Pick a random quote
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      setQuote(randomQuote);
      setShowQuote(true);
      localStorage.setItem('quotePopupLastShown', today);
    }
  }, []);

  const handleCloseQuote = () => {
    setShowQuote(false);
  };

  return (
    <>
      {showQuote && quote && (
        <div className="quote-popup-overlay">
          <div className="quote-popup">
            {/* X mark close button */}
            <button
              className="quote-popup-close"
              onClick={handleCloseQuote}
              aria-label="Close"
            >
              &#10005;
            </button>
            <div className="quote-popup-icon">😄</div>
            <div className="quote-popup-text">{quote.text}</div>
          </div>
        </div>
      )}
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
             {currentPage === 'education' ?
                <div className="active-indicator">Education</div>
                :
                <Link to="/education">
                    <div className="btn">Education</div>
                </Link>
            }
            {currentPage === 'contact' ?
                <div className="active-indicator">Contact</div>
                :
                <Link to="/contact">
                    <div className="btn">Contact</div>
                </Link>
            }
            {currentPage === 'blogs' ?
                <div className="active-indicator">Blogs</div>
                :
                <Link to="/blogs">
                    <div className="btn">Blogs</div>
                </Link>
            }
        </div>
    </>
  );
}

export default MenuComponent;