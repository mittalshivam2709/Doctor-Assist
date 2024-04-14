

// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import Message from "../components/Message";
// import { useMutation } from "@apollo/client";
// import { SEND_MESSAGE } from "../gqloperations/mutations";
// import { ChatState } from "../context/ChatProvider";
// import io from "socket.io-client";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// const ENDPOINT = "http://localhost:5001";
// const genAI = new GoogleGenerativeAI("AIzaSyBsROOsRnI1JopbvCzM2-FpkSre0lFzaXo");
// var socket;

// const SingleChat = () => {
//   const { user, selectedChat } = ChatState();
//   const [messages, setMessages] = useState([]);
//   const [inputText, setInputText] = useState("");
//   const ref = useRef(null);

//   useEffect(() => {
//     socket = io(ENDPOINT);
//     socket.emit("initialize", user);
//     socket.on("connection", () => {
//     });
//   }, []);

//   const handleInputChange = (e) => {
//     setInputText(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!inputText.trim()) return;
//     const model = genAI.getGenerativeModel({ model: "gemini-pro" });

//     const prompt = inputText;

//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const resp = response.text();
//     console.log(inputText);



//     const newMessage = {
//       content: inputText,
//       sender: user,
//       reciever: selectedChat,
//       type: "LLM"
//     };
//     console.log(newMessage)
//     setMessages(prev => [...prev, newMessage]);
//     // try {
//     //   const response = await axios.post('https://yourapiendpoint.com/message', { message: inputText });
//     const apiResponse = {
//       content: resp,
//       sender: selectedChat,
//       reciever: user,
//       type: "LLM"
//     };
//     setMessages(prev => [...prev, apiResponse]);
//     // } catch (error) {
//     //   console.error('Error sending message:', error);
//     //   console.log(response.data.message);

//     //   setMessages(prev => [...prev, { content: 'Error fetching response', sender: 'Error', fromUser: false }]);
//     // }
//     setInputText("");
//   };

//   useEffect(() => {
//     ref.current?.scrollIntoView({ behavior: "smooth", block: "end" });
//   }, [messages]);

//   return (
//     <div className="single-chat">
//       <div>{user}</div>
//       {messages.map((message, index) => (
//         <Message key={index} message={message.content} right={message.sender == user} />
//       ))}
//       <div ref={ref}></div>
//       <form onSubmit={handleSubmit}>
//         <input type="text" value={inputText} onChange={handleInputChange} placeholder="Type a message..." />
//         <button type="submit">Send</button>
//       </form>
//     </div>
//   );
// };

// export default SingleChat;


import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Message from "../components/Message";
import { useMutation } from "@apollo/client";
import { SEND_MESSAGE } from "../gqloperations/mutations";
import { FETCH_MESSAGES } from "../gqloperations/queries";
import { useLazyQuery } from "@apollo/client";
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
  const [fetchMessages, { loading, data }] = useLazyQuery(FETCH_MESSAGES);
  useEffect(() => {
    fetchMessages({
      variables: {
        sender: user,
        receiver: selectedChat,
      },
    }).then((result) => {
      if (result.data && result.data.fetchMessage) {
        setMessages(result.data.fetchMessage);
      }
      socket.emit("setChat", selectedChat);
    });
  }, [selectedChat]);
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("initialize", user);
    socket.on("connection", () => {});
  }, []);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const inputMessage = {
      content: inputText,
      sender: user,
      receiver: selectedChat,
      type: "LLM"
    };

    await sendMessage({
      variables: {
        messageInput: inputMessage,
      },
    });

    setMessages(prev => [...prev, inputMessage]);
    setMessage(inputMessage);

    // Handle AI response
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = inputText;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const resp = await response.text();

    const aiResponse = {
      content: resp,
      sender: selectedChat,
      receiver: user,
      type: "LLM"
    };

    await sendMessage({
      variables: {
        messageInput: aiResponse,
      },
    });

    setMessages(prev => [...prev, aiResponse]);
    setMessage(aiResponse);


    setInputText("");
  };

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  return (
    <div className="single-chat">
      <div>{user}</div>
      {messages.map((message, index) => 
      message.type === "LLM" ? (
        <Message key={index} message={message.content} right={message.sender === user} />
      ): "")}
      <div ref={ref}></div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={inputText} onChange={handleInputChange} placeholder="Type a message..." />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default SingleChat;
