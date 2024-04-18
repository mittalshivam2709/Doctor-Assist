import React, { useEffect, useState, useRef } from "react";
import LoremIpsum from "../utils/loremipsum";
import Placeholder from "../components/Placeholder";
import Message from "../components/Message";
import MessageInput from "../components/MessageInput";
import { ChatState } from "../context/ChatProvider";
import { FETCH_MESSAGES } from "../gqloperations/queries";
import { useLazyQuery, useQuery } from "@apollo/client"; // import useLazyQuery instead of useQuery
import io from "socket.io-client";
import ImageRender from "../components/ImageRender";
import AudioRender from "../components/AudioRender";
const ENDPOINT = "http://localhost:5001";
var socket, selectedChatCompare;

const SingleChat = () => {
  const { user, selectedChat, message, audioBlob, isSocket, setSocket } =
    ChatState();
  const [messages, setMessages] = useState([]);
  const ref = useRef(null);
  const { loading, data, refetch } = useQuery(FETCH_MESSAGES, {
    variables: {
      sender: user,
      receiver: selectedChat,
    },
    skip: !selectedChat, // skip the query if selectedChat is not there
  });


  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("initialize", user);
    socket.on("connection", () => setSocket(socket));
  }, []);

  useEffect(() => {
    if (selectedChat) {
      refetch();
      socket.emit("setChat", selectedChat);
    }
  }, [selectedChat, refetch]);
  
  useEffect(() => {
    if (data && data.fetchMessage) {
      setMessages(data.fetchMessage);
    }
  }, [data]);

  useEffect(() => {
    socket.on("message recieved", (message) => {
      if (message.receiver == user) {
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
  return (
    <div>
      <div className="single-chat" style={{ overflowX: "hidden"}}>
        {messages.filter(message => message.type !== "LLM").map((message, index) =>
          message.type === null || message.type === "message" ? (
          
            <Message
              key={index}
              message={message.content}
              right={+(message.sender == user)}
              
            />

          ) :  message.type === "image"? (
            <ImageRender
            key={index}
            message={message.content}
            right={+(message.sender == user)}
          />        
        ):
        (
          <AudioRender
          key={index}
          message={message.content}
          right={+(message.sender == user)}
        />
        )
        )}
        <div ref={ref}></div>
      </div>
    </div>
  );
};

export default SingleChat;