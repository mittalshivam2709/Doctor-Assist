import React, { useEffect, useState, useRef } from "react";
import LoremIpsum from "../utils/loremipsum";
import Placeholder from "../components/Placeholder";
import Message from "../components/Message";
import MessageInput from "../components/MessageInput";
import { ChatState } from "../context/ChatProvider";
import { FETCH_MESSAGES } from "../gqloperations/queries";
import { useLazyQuery } from "@apollo/client"; // Import useLazyQuery instead of useQuery

import io from "socket.io-client";
const ENDPOINT = "http://localhost:5001";
var socket, selectedChatCompare;

const SingleChat = () => {
  const { user, selectedChat, message, setMessage } = ChatState();
  const [messages, setMessages] = useState([]);
  const [isSocket, setSocket] = useState(false);

  const [fetchMessages, { loading, data }] = useLazyQuery(FETCH_MESSAGES);
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("initialize", user);
    socket.on("connection" , () => setSocket(true));
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
      socket.emit("setChat", (selectedChat));
    });
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message recieved", (message) => {
      console.log(message);
      if(message.receiver == user){
        console.log("set mssg");
        setMessages([...messages, message]);
      }
      else if(!selectedChat || message.receiver != selectedChatCompare){
        // notifcation
      }
    })
  })

  useEffect(() => {
    if(message){
      setMessages([...messages, message]);
      socket.emit("send message", message);
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
