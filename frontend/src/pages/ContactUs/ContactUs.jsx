import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import "../../styles/ContactUs.css";
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const Contact = () => {
  const [randomNumber, setRandomNumber] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const generateRandomNumber = () => {
    const areaCode = Math.floor(Math.random() * 900 + 100);
    const firstPart = Math.floor(Math.random() * 900 + 100);
    const secondPart = Math.floor(Math.random() * 9000 + 1000);
    return `+1 (${areaCode}) ${firstPart}-${secondPart}`;
  };

  const handleCallMeClick = () => {
    const number = generateRandomNumber();
    setRandomNumber(number);
  };

  const handleStartChatting = () => {
    navigate('/chatbot'); // Navigate to the chatbot page
  };

  return (
    <>
      <Header />
      <div className="chat-or-call-container">
        <h2>Want to chat now or get a call from us?</h2>
        <div className="card-container">
          <div className="card chat-card">
            <div className="card-icon">💬</div>
            <h3>Chat right now</h3>
            <p>Our messaging assistant can quickly solve many issues or direct you to the right person or place.</p>
            <p>Instant chat and always available.</p>
            <button onClick={handleStartChatting}>Start Chatting</button> {/* Navigate to chatbot */}
          </div>
          <div className="card call-card">
            <div className="card-icon">📞</div>
            <h3>Have us call you</h3>
            <p>We'll first get a few details about your issue and then someone will call you right away.</p>
            <button onClick={handleCallMeClick}>Call Me</button>
            {randomNumber && (
              <div className="random-number">
                <p>Our representative will call you or you can call at:</p>
                <h4>{randomNumber}</h4>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
