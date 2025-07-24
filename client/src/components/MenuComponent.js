import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/menu.css';

function MenuComponent({ currentPage }) {
  const [showQuote, setShowQuote] = useState(false);
  const [quote, setQuote] = useState('');

  const raw_quotes = "The greatest glory in living lies not in never falling, but in rising every time we fall. -Nelson Mandela\n\
                        The way to get started is to quit talking and begin doing. -Walt Disney \n\
                        Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma – which is living with the results of other people's thinking. -Steve Jobs \n\
                        If life were predictable it would cease to be life, and be without flavor. -Eleanor Roosevelt\n\
                        If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough. -Oprah Winfrey\n\
                        If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success. -James Cameron\n\
                        Life is what happens when you're busy making other plans. -John Lennon \n\
                        "
  //write a function to convert the raw_quotes string into an array of objects
  const quotes = raw_quotes.split('\n').filter(quote => quote.trim() !== '').map(quote => {
    const [text, author] = quote.split(' -');
    return { text: text.trim(), author: author ? author.trim() : '' };
  });

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
            <div className="quote-popup-icon">&#10077;</div>
            <div className="quote-popup-text">{quote.text}</div>
            <div className="quote-popup-author">— {quote.author}</div>
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
        </div>
    </>
  );
}

export default MenuComponent;