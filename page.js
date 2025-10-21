"use client";
import { useState, useRef, useEffect } from "react";

export default function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input) return;

    const userMessage = input;
    setMessages([...messages, { sender: "user", text: userMessage }]);
    setInput("");

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage }),
    });

    const data = await res.json();
    setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>Travel AI Chatbot</h1>

      <div style={{
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "1rem",
        height: "500px",
        overflowY: "auto",
        backgroundColor: "#f7f7f7"
      }}>
        {messages.map((m, i) => (
          <div key={i} style={{
            display: "flex",
            justifyContent: m.sender === "user" ? "flex-end" : "flex-start",
            marginBottom: "0.5rem"
          }}>
            <div style={{
              backgroundColor: m.sender === "user" ? "#0084ff" : "#e5e5ea",
              color: m.sender === "user" ? "white" : "black",
              padding: "0.5rem 1rem",
              borderRadius: "15px",
              maxWidth: "70%",
              wordWrap: "break-word"
            }}>
              {m.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div style={{ display: "flex", marginTop: "0.5rem" }}>
        <input
          style={{ flex: 1, padding: "0.5rem", borderRadius: "20px", border: "1px solid #ccc" }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tulis pesan..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          style={{
            marginLeft: "0.5rem",
            padding: "0.5rem 1rem",
            borderRadius: "20px",
            backgroundColor: "#0084ff",
            color: "white",
            border: "none"
          }}
          onClick={sendMessage}
        >
          Kirim
        </button>
      </div>
    </div>
  );
}
