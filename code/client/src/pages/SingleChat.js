import React, { useEffect, useState, useRef } from "react";
import LoremIpsum from "../utils/loremipsum";
import Placeholder from "../components/Placeholder";
import Message from "../components/Message";
import MessageInput from "../components/MessageInput";
import { ChatState } from "../context/ChatProvider";
import { FETCH_MESSAGES } from "../gqloperations/queries";
import { useLazyQuery } from "@apollo/client"; // Import useLazyQuery instead of useQuery

import io from "socket.io-client";
const ENDPOINT = "http://localhost:5000";
var socket, selectedChatCompare;

const SingleChat = () => {
  const { user, selectedChat, message, setMessage } = ChatState();
  const [messages, setMessages] = useState([]);
  const chatRef = useRef(null);
  const [fetchMessages, { loading, data }] = useLazyQuery(FETCH_MESSAGES);
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("initialize", user);
    // socket.emit("send message", selectedChat, message) // send message to selected chat
    // socket.on("recieve message",)
  }, [message]);
  
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
    });
  }, [selectedChat]);

  useEffect(() => {
    if(message){
      setMessages([...messages, message]);
    }

  
  }, [message]);
 
  return (
    <div>
      <div  className="single-chat">
        <div>{user}</div>
        {messages.map((message, index) => (
          <Message
            key={index}
            message={message.content}
            right={message.sender == user}
          />
        ))}
      </div>
      <MessageInput />
    </div>
  );
};

export default SingleChat;
