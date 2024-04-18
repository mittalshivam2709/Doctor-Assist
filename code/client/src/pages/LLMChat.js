import React, { useEffect, useState, useRef } from "react";
import LoremIpsum from "../utils/loremipsum";
import Placeholder from "../components/Placeholder";
import Message from "../components/Message";
import MessageInput from "../components/MessageInput";
import { ChatState } from "../context/ChatProvider";
import { FETCH_MESSAGES } from "../gqloperations/queries";
import { useQuery } from "@apollo/client";
import forward from "../forward.svg";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:5001";
var socket, selectedChatCompare;

const LLMChat = () => {
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
      if (message.receiver == user) {
        setChatMessages((prevChatMessages) => ({
          ...prevChatMessages,
          [selectedChat]: [...(prevChatMessages[selectedChat] || []), message],
        }));
      } else if (!selectedChat || message.receiver != selectedChatCompare) {
        // notifcation
      }
    });
  });

  useEffect(() => {
    if (message) {
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
  }, [chatMessages, audioBlob]);

  const handleForward = (content) => {
    localStorage.setItem("forwardedMessage", content);
    window.open('/emt-assist', '_blank');
  };

  return (
    <div>
      <div className="single-chat" style={{ overflowX: "hidden" }}>
        {(chatMessages[selectedChat] || [])
          .filter((message) => message.type === "LLM")
          .map((message, index) => (
            <div key={index}>
              <Message message={message.content} right={message.sender === user} />
              {message.sender === selectedChat && (
                <button onClick={() => handleForward(message.content)}>
                  <img src={forward} alt="Forward" style={{ width: "25px", height: "25px" }} />
                </button>
              )}
            </div>
          ))}
        <div ref={ref}></div>
      </div>
    </div>
  );
};

export default LLMChat;