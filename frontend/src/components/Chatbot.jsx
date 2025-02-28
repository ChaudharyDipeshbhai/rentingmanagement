import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar"; // Import the Navbar component
import './styles/Chatbot.css'

const Chatbot = () => {
  const [messages, setMessages] = useState([]); // Stores all messages
  const [userMessage, setUserMessage] = useState(""); // User input

  const handleSendMessage = async () => {
    if (!userMessage.trim()) return; // Ignore empty input

    // Add user message to the chat
    const newMessage = { text: userMessage, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setUserMessage(""); // Clear input field

    try {
      // Send user message to the backend
      const response = await axios.post("http://localhost:5000/chat", {
        message: userMessage,
      });

      // Extract bot response from the API response
      const botMessageText =
        response?.data?.response || "I'm sorry, I didn't understand that.";

      // Add bot message to the chat
      const botMessage = { text: botMessageText, sender: "bot" };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error sending message", error);
      // Fallback bot response in case of error
      const botMessage = {
        text: "Sorry, I'm having trouble connecting right now.",
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }
  };

  return (
    <div>
      {/* Add Navbar at the top */}
      <Navbar />

      <div className="chat-container">
        <div className="chat-box">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.sender === "bot" ? "bot" : "user"}`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <input
          type="text"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
