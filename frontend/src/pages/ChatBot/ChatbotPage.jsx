import React from "react";
import "./ChatbotPage.css";

const ChatbotPage = () => {
  return (
    <div className="chatbot-page">
      {/* Header Section */}
      <header className="chatbot-header">
        <h1>
          <i className="fas fa-robot"></i> Welcome to Shop & Drop Assistant
        </h1>
        <p>Your virtual assistant is here to help you 24/7!</p>
      </header>

      {/* Chatbot Embed Section */}
      <div className="chatbot-container">
        <iframe
          src="https://cdn.botpress.cloud/webchat/v2.2/shareable.html?configUrl=https://files.bpcontent.cloud/2024/12/09/05/20241209054642-QWSUR8YW.json"
          title="Chatbot"
          className="chatbot-frame"
          allow="fullscreen"
        ></iframe>
      </div>

      {/* Footer Section */}
      <footer className="chatbot-footer">
        <p>
          <i className="fas fa-heart"></i> Powered by Shop & Drop
        </p>
      </footer>
    </div>
  );
};

export default ChatbotPage;
