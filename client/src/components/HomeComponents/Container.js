import React, {useEffect, useState} from 'react';
import MenuComponent from '../MenuComponent';
import MainContent from './MainContent';
import FooterComponent from '../FooterComponent';


function Container() {

    const [message, setMessage] = useState('');
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

    /*const quotes = [
      { text: "Success is not the key to happiness. Happiness is the key to success.", author: "Albert Schweitzer" },
      { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
      { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
      { text: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs" },
      { text: "The best way to predict the future is to invent it.", author: "Alan Kay" }
    ];  */

    useEffect(() => {
      // Fetch main content
      fetch('api/home')
        .then(res => res.json())
        .then(data => {
          setMessage(data);
        });

      // Quote pop-up logic
      const today = new Date('2025-01-08').toISOString().slice(0, 10); // YYYY-MM-DD
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
      <div className="container">
        <MenuComponent currentPage="home" />
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
        <MainContent content={message} />
        <FooterComponent/>
      </div>
    );
}

export default Container;