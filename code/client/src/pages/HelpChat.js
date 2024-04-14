import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Message from "../components/Message";
import { ChatState } from "../context/ChatProvider";
import io from "socket.io-client";
import { GoogleGenerativeAI } from "@google/generative-ai";

const ENDPOINT = "http://localhost:5001";
const genAI = new GoogleGenerativeAI("AIzaSyBsROOsRnI1JopbvCzM2-FpkSre0lFzaXo");
var socket;

// async function run() {
//   const model = genAI.getGenerativeModel({ model: "gemini-pro"});

//   const prompt = "Write a story about a magic backpack."

//   const result = await model.generateContent(prompt);
//   const response = await result.response;
//   const text = response.text();
//   console.log(text);
// }

// run();

const SingleChat = () => {
  const { user, selectedChat } = ChatState();
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState(""); 
  const ref = useRef(null);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("initialize", user);
    socket.on("connection", () => {
    });
  }, []);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;  
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const prompt =inputText;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const resp = response.text();
  console.log(inputText);

    const newMessage = {
      content: inputText,
      sender: user,
      fromUser: true 
    };
    setMessages(prev => [...prev, newMessage]);  
    // try {
    //   const response = await axios.post('https://yourapiendpoint.com/message', { message: inputText });
      const apiResponse = {
        content: resp, 
        sender: 'API Response',
        fromUser: false
      };
      setMessages(prev => [...prev, apiResponse]); 
    // } catch (error) {
    //   console.error('Error sending message:', error);
    //   console.log(response.data.message);

    //   setMessages(prev => [...prev, { content: 'Error fetching response', sender: 'Error', fromUser: false }]);
    // }
    setInputText(""); 
  };

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  return (
    <div className="single-chat">
      <div>{user}</div>
      {messages.map((message, index) => (
        <Message key={index} message={message.content} right={message.sender == user} />
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
