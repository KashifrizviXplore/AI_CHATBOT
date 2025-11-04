import React, { useState } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      message: "Hello! Ask me anything 😊",
      sentTime: "just now",
      sender: "Chatbot",
      direction: "incoming",
      position: "single", // ✅ Required by Chat UI kit
    },
  ]);

  const [typing, setTyping] = useState(false);

  const handleSend = async (text) => {
    if (!text.trim()) return;

    const userMsg = {
      message: text,
      direction: "outgoing",
      sender: "User",
      position: "single",
    };

    setMessages((prev) => [...prev, userMsg]);
    setTyping(true);

    try {
      const res = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const raw = await res.text();
      console.log("Backend raw response:", raw);

      let data = {};
      try {
        data = JSON.parse(raw);
      } catch (err) {
        console.error("JSON parse error:", err);
      }

      const reply =
        data.answer ||
        data.response ||
        data.text ||
        data.message ||
        "⚠️ No valid response from server";

      const botMsg = {
        message: reply,
        direction: "incoming",
        sender: "Chatbot",
        position: "single",
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("API error:", err);
      const errorMsg = {
        message: "❌ Error: could not connect to server.",
        direction: "incoming",
        sender: "Chatbot",
        position: "single",
      };
      setMessages((prev) => [...prev, errorMsg]);
    }

    setTyping(false);
  };

  return (
    <>
      <div className="font-bold text-lg mb-2">ChatBot</div>
      <div style={{ position: "relative", height: "500px" }}>
        <MainContainer>
          <ChatContainer>
            <MessageList
              typingIndicator={
                typing ? (
                  <TypingIndicator content="Chatbot is typing..." />
                ) : null
              }
            >
              {messages.map((msg, i) => (
                <Message key={i} model={msg} />
              ))}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />
          </ChatContainer>
        </MainContainer>
      </div>
    </>
  );
};

export default ChatBot;
