import React, { useState } from 'react';

function ContactForm() {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    const pattern = /^[A-Za-z\s]+$/;
    setNameError(value.length > 0 && !pattern.test(value));
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    // Simple email regex
    const emailPattern = /^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/;
    setEmailError(value.length > 0 && !emailPattern.test(value));
  };

  const [message, setMessage] = useState('');
  const [messageError, setMessageError] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  // Captcha state
  const [captchaNum1, setCaptchaNum1] = useState(() => Math.floor(Math.random() * 10) + 1);
  const [captchaNum2, setCaptchaNum2] = useState(() => Math.floor(Math.random() * 10) + 1);
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaError, setCaptchaError] = useState(false);

  const maxMessageLength = 300;

  const handleMessageChange = (e) => {
    const value = e.target.value;
    setMessage(value);
    // Allow letters, numbers, spaces, and common punctuation
    const pattern = /^[A-Za-z0-9\s.,!?@#\$%&*()\-_'";:]+$/;
    setMessageError(value.length > 0 && !pattern.test(value));
  };

  const handleCaptchaChange = (e) => {
    setCaptchaInput(e.target.value);
    setCaptchaError(false);
  };

  const regenerateCaptcha = () => {
    setCaptchaNum1(Math.floor(Math.random() * 10) + 1);
    setCaptchaNum2(Math.floor(Math.random() * 10) + 1);
    setCaptchaInput('');
    setCaptchaError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nameError || emailError || !name || !email || !message) {
      setSubmitStatus('Please fill all fields correctly.');
      return;
    }
    // Validate captcha
    if (parseInt(captchaInput, 10) !== captchaNum1 + captchaNum2) {
      setCaptchaError(true);
      setSubmitStatus('Captcha validation failed.');
      return;
    }
    try {
      const response = await fetch('/api/submit-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });
      if (response.ok) {
        setSubmitStatus('Message sent successfully!');
        regenerateCaptcha();
      } else {
        setSubmitStatus('Failed to send message.');
      }
    } catch (err) {
      setSubmitStatus('Error sending message.');
    }
  };

  return (
    <div className="contact_form">
      <h2>Contact Us</h2>
      <p>We would love to hear from you! Please fill out the form below:</p>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={handleNameChange}
          className={nameError ? 'form-error-border' : ''}
        />
        {nameError && (
          <div className="form-error-message">
            Please enter only letters and spaces.
          </div>
        )}
        <br />
        <input
          name="email"
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={handleEmailChange}
          className={emailError ? 'form-error-border' : ''}
        />
        <br />
        {emailError && (
          <div className="form-error-message">
            Please enter a valid email address.
          </div>
        )}
        <textarea
          name="message"
          maxLength={maxMessageLength}
          placeholder="Your Message. Please limit your message to under 300 characters."
          value={message}
          onChange={handleMessageChange}
          className={messageError ? 'form-error-border' : ''}
        />
        <div className="character-counter">
          {message.length} / {maxMessageLength} characters
        </div>
        {messageError && (
          <div className="form-error-message">
            Please enter only valid characters (letters, numbers, spaces, and common punctuation).
          </div>
        )}
        <br />
        {/* Captcha Section */}
        <div className="captcha-container">
          <label htmlFor="captcha" className="captcha-label">
            What is {captchaNum1} + {captchaNum2}?
          </label>
          <input
            id="captcha"
            type="text"
            value={captchaInput}
            onChange={handleCaptchaChange}
            className={`captcha-input ${captchaError ? 'form-error-border' : ''}`}
            autoComplete="off"
          />
          <button type="button" onClick={regenerateCaptcha} className="captcha-refresh-btn">↻</button>
          {captchaError && (
            <div className="form-error-message">
              Incorrect answer. Please try again.
            </div>
          )}
        </div>
        <br />
        <button type="submit" disabled={submitStatus === 'Message sent successfully!'}>Send Message</button>
        {submitStatus && <div className="form_sub_status">{submitStatus}</div>}
      </form>
    </div>
  );
}

export default ContactForm;