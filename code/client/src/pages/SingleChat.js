import React, { useEffect, useState, useRef } from "react";
import LoremIpsum from "../utils/loremipsum";
import Placeholder from "../components/Placeholder";
import Message from "../components/Message";
import MessageInput from "../components/MessageInput";
import { ChatState } from "../context/ChatProvider";
import { FETCH_MESSAGES } from "../gqloperations/queries";
import { useQuery } from "@apollo/client";
import io from "socket.io-client";
import ImageRender from "../components/ImageRender";
import AudioRender from "../components/AudioRender";

const ENDPOINT = "http://localhost:5001";
var socket, selectedChatCompare;

const SingleChat = () => {
  const { user, selectedChat, message, audioBlob, isSocket, setSocket } = ChatState();
  const [chatMessages, setChatMessages] = useState({});
  const ref = useRef(null);
  const { data, refetch } = useQuery(FETCH_MESSAGES, {
    variables: {
      sender: user,
      receiver: selectedChat,
    },
    skip: !selectedChat, // skip the query if selectedChat is not selected
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
      setChatMessages((prevChatMessages) => ({
        ...prevChatMessages,
        [selectedChat]: data.fetchMessage,
      }));
    }
  }, [data, selectedChat]);

  useEffect(() => {
    socket.on("message recieved", (message) => {
      if (message.receiver === user) {
        setChatMessages((prevChatMessages) => {
          const existingMessages = prevChatMessages[selectedChat] || [];
          const messageExists = existingMessages.some(
            (m) => m.content === message.content && m.sender === message.sender
          );

          if (!messageExists && message.sender !== user) {
            return {
              ...prevChatMessages,
              [selectedChat]: [...existingMessages, message],
            };
          }

          return prevChatMessages;
        });
      }
      if (message.receiver === user && ( message.receiver !== selectedChatCompare)) {
        // send notificaiton
        // uncomment for deployment
        // console.log("Notification Recieved !"); 
        // alert("notifcation from ", selectedChatCompare)
      }
    });
  }, [user, selectedChat, selectedChatCompare]);

  useEffect(() => {
    if (message) {
      // console.log(message);
      console.log(message.content, message.type);
      // if(message.type !== "audio" || message.type !== "image"){
      //   message.type = "message";
      // }
      setChatMessages((prevChatMessages) => {
        const existingMessages = prevChatMessages[selectedChat] || [];
        const messageExists = existingMessages.some(
          (m) => m.content === message.content && m.sender === message.sender
        );

        if (!messageExists) {
          return {
            ...prevChatMessages,
            [selectedChat]: [...existingMessages, message],
          };
        }

        return prevChatMessages;
      });
      socket.emit("send message", message);
    }
  }, [message, selectedChat]);

  useEffect(() => {
    ref.current?.scrollIntoView({
      behaviour: "smooth",
      block: "end",
    });
  }, [chatMessages, audioBlob, setChatMessages]);

  return (
    <div>
      <div className="single-chat" style={{ overflowX: "hidden" ,backgroundColor:"#D8D8E2"}}>
        {(chatMessages[selectedChat] || [])
          .filter((message) => message.type !== "LLM" && (message.receiver == selectedChat || message.sender == selectedChat ))
          .map((message, index) =>
            message.type === "message" ? (
              <Message key={index} message={message.content} right={+(message.sender == user)} />
            ) : message.type === "image" ? (
              <ImageRender key={index} message={message.content} right={+(message.sender == user)} />
            ) : (
              <AudioRender key={index} message={message.content} right={+(message.sender == user)} />
            )
          )}
        <div ref={ref}></div>
      </div>
    </div>
  );
};

export default SingleChat;