import React, { useEffect, useState, useRef } from "react";
import LoremIpsum from "../utils/loremipsum";
import Placeholder from "../components/Placeholder";
import Message from "../components/Message";
import MessageInput from "../components/MessageInput";
import { ChatState } from "../context/ChatProvider";
import { FETCH_MESSAGES } from "../gqloperations/queries";
import { useLazyQuery } from "@apollo/client"; // import useLazyQuery instead of useQuery
import forward from "../forward.svg";

import io from "socket.io-client";
const ENDPOINT = "http://localhost:5001";

var socket, selectedChatCompare;

const LLMChat = () => {
  const { user, selectedChat, message, audioBlob, isSocket, setSocket } =
    ChatState();
  const [messages, setMessages] = useState([]);
  const ref = useRef(null);

  const [fetchMessages, { loading, data }] = useLazyQuery(FETCH_MESSAGES);
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("initialize", user);
    socket.on("connection", () => setSocket(socket));
    // socket.emit("send message", selectedChat, message) // send message to selected chat
    // socket.on("recieve message",)
  }, []);

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
    socket.on("message recieved", (message) => {
      console.log(message);
      if (message.receiver == user) {
        console.log("set mssg");
        setMessages([...messages, message]);
      } else if (!selectedChat || message.receiver != selectedChatCompare) {
        // notifcation
      }
    });
  });

  useEffect(() => {
    if (message) {
      setMessages([...messages, message]);
      socket.emit("send message", message);
    }
  }, [message]);

  useEffect(() => {
    ref.current?.scrollIntoView({
      behaviour: "smooth",
      block: "end",
    });
  }, [messages, audioBlob]);

  const handleForward = (content) => {
    
    localStorage.setItem("forwardedMessage", content);
    window.open('/emt-assist', '_blank'); 
  };

  return (
    <div>
      <div className="single-chat" style={{ overflowX: "hidden"}}>
        {messages.filter(message => message.type === "LLM").map((message, index) =>
        <div>
            <Message
              key={index}
              message={message.content}
              right={message.sender === user}
            />

          {message.sender === selectedChat && (
            <button onClick={() => handleForward(message.content)}>
              <img
              src={forward}
              alt="Forward"
              style={{ width: "25px", height: "25px" }}
            />
            </button>
          )}
         </div>
        )}
        <div ref={ref}></div>
      </div>
    </div>
  );
};

export default LLMChat;

