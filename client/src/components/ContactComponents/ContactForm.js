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

  const maxMessageLength = 300;

  const handleMessageChange = (e) => {
    const value = e.target.value;
    setMessage(value);
    // Allow letters, numbers, spaces, and common punctuation
    const pattern = /^[A-Za-z0-9\s.,!?@#\$%&*()\-_'";:]+$/;
    setMessageError(value.length > 0 && !pattern.test(value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nameError || emailError || !name || !email || !message) {
      setSubmitStatus('Please fill all fields correctly.');
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
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={handleNameChange}
          style={{ border: nameError ? '2px solid red' : undefined }}
        />
        {nameError && (
          <div style={{ color: 'red', fontSize: '0.9em' }}>
            Please enter only letters and spaces.
          </div>
        )}
        <br />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={handleEmailChange}
          style={{ border: emailError ? '2px solid red' : undefined }}
        />
        <br />
        {emailError && (
          <div style={{ color: 'red', fontSize: '0.9em' }}>
            Please enter a valid email address.
          </div>
        )}
        <textarea
          maxLength={maxMessageLength}
          placeholder="Your Message. Please limit your message to under 300 characters."
          value={message}
          onChange={handleMessageChange}
          style={{ border: messageError ? '2px solid red' : undefined }}
        />
        <div style={{ fontSize: '0.9em', marginTop: '4px' }}>
          {message.length} / {maxMessageLength} characters
        </div>
        {messageError && (
          <div style={{ color: 'red', fontSize: '0.9em' }}>
            Please enter only valid characters (letters, numbers, spaces, and common punctuation).
          </div>
        )}
        <br />
        <br />
        <button type="submit" disabled={submitStatus === 'Message sent successfully!'}>Send Message</button>
        {submitStatus && <div className="form_sub_status">{submitStatus}</div>}
      </form>
    </div>
  );
}

export default ContactForm;