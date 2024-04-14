

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Message from "../components/Message";
import { useMutation } from "@apollo/client";
import { SEND_MESSAGE } from "../gqloperations/mutations";
import { ChatState } from "../context/ChatProvider";
import io from "socket.io-client";
import { GoogleGenerativeAI } from "@google/generative-ai";

const ENDPOINT = "http://localhost:5001";
const genAI = new GoogleGenerativeAI("AIzaSyBsROOsRnI1JopbvCzM2-FpkSre0lFzaXo");
var socket;

const SingleChat = () => {
  const { user, selectedChat, setMessage } = ChatState();
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState(""); 
  const ref = useRef(null);
  const [sendMessage] = useMutation(SEND_MESSAGE);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("initialize", user);
    socket.on("connection", () => {
    });
  }, []);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const newMessage = {
      content: inputText,
      sender: user,
      reciever: selectedChat,
      type: "LLM"
    };
    
    // try {
      sendMessage({
        variables: {
          messageInput: newMessage,
        },
      }).then(() => {
        setMessage(newMessage)
        console.log(newMessage)
        // reset()
        setInputText('')
      })
    }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleSendMessage();

    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    const result = await model.generateContent(inputText);
    const response = await result.response;
    const aiResponse = await response.text();

    const apiResponse = {
      content: aiResponse,
      sender: selectedChat,
      reciever: user,
      type: "LLM"
    };
    setMessages(prev => [...prev, apiResponse]);
  };

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  return (
    <div className="single-chat">
      <div>{user}</div>
      {messages.map((message, index) => (
        <Message key={index} message={message.content} right={message.sender === user} />
      ))}
      <div ref={ref}></div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={inputText} onChange={handleInputChange} placeholder="Type a message..." />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default SingleChat;

