import React from 'react';
import { Link } from 'react-router-dom';

const ChatbotIcon = () => {
  return (
    <Link 
      to="/chatbot" 
      className="fixed bottom-8 right-8 z-50 hover:scale-110 transition-transform duration-200"
    >
      <img 
        src="/Chatbotimg.png" 
        alt="Chatbot" 
        className="w-16 h-16 rounded-full shadow-lg cursor-pointer"
      />
    </Link>
  );
};

export default ChatbotIcon; 