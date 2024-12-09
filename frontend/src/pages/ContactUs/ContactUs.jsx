import React, { useState } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import "../../styles/ContactUs.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const ChatbotPage = () => {
  return (
    <div className="chatbot-container">
      <iframe
        src="https://cdn.botpress.cloud/webchat/v2.2/shareable.html?configUrl=https://files.bpcontent.cloud/2024/12/09/05/20241209054642-QWSUR8YW.json"
        title="Chatbot"
        style={{
          width: "100%",
          height: "100vh",
          border: "none",
        }}
      ></iframe>
    </div>
  );
};

const Contact = () => {
  const [randomNumber, setRandomNumber] = useState('');
  const navigate = useNavigate();

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
    navigate('/chatbot'); // Navigate to chatbot page dynamically
  };

  return (
    <>
      <Header />
      <Routes>
        <Route path="/chatbot" element={<ChatbotPage />} />
        <Route
          path="/"
          element={
            <div className="chat-or-call-container">
              <h2>Want to chat now or get a call from us?</h2>
              <div className="card-container">
                <div className="card chat-card">
                  <div className="card-icon">💬</div>
                  <h3>Chat right now</h3>
                  <p>
                    Our messaging assistant can quickly solve many issues or direct you to the right person or place.
                  </p>
                  <p>Instant chat and always available.</p>
                  <button onClick={handleStartChatting}>Start Chatting</button>
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
          }
        />
      </Routes>
      <Footer />
    </>
  );
};

export default Contact;
