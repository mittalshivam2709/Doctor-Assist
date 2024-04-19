import React, { useEffect, useState, useRef } from "react";
import LoremIpsum from "../utils/loremipsum";
import Placeholder from "../components/Placeholder";
import Message from "../components/MessageLLM";
import MessageInput from "../components/MessageInput";
import { ChatState } from "../context/ChatProvider";
import { FETCH_MESSAGES } from "../gqloperations/queries";
import { useMutation, useQuery } from "@apollo/client";
import forward from "../forward.svg";
import io from "socket.io-client";
import SingleChat from "./SingleChat";
import LLMInput from "../components/LLMInput";
import { SEND_MESSAGE } from "../gqloperations/mutations";
const ENDPOINT = "http://localhost:5001";
var socket, selectedChatCompare;
// import { useChat } from '../context/ChatContext'; 

const LLMChat = () => {
  const { user, selectedChat, message, audioBlob, activeTab, setActiveTab, setSocket } = ChatState();
  const [chatMessages, setChatMessages] = useState({});
  const ref = useRef(null);
  const { data, refetch } = useQuery(FETCH_MESSAGES, {
    variables: {
      sender: user,
      receiver: selectedChat,
    },
    skip: !selectedChat, // skip the query if selectedChat is not selected
  });
  const [sendMessage] = useMutation(SEND_MESSAGE);

  // const { setTab } = useChat(); 
  // const handleForwardClick = () => {
  //   setTab('SingleChat');
  // };

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

 
  const handleForward = async (content) => {
    console.log(content);
    const messageData = {
      content: content,
      sender: user,
      receiver: selectedChat,
      type: "message",
    }
    await sendMessage({
      variables: {
        messageInput: messageData,
      },
    });
    setActiveTab("SingleChat");
    // localStorage.setItem("forwardedMessage", content);
    // window.open('');
  };

  // console.log(activeTab)
  return (
    // <div>
      <div className="single-chat" style={{ overflowX: "hidden"}}>
        {(chatMessages[selectedChat] || [])
          .filter((message) => message.type === "LLM")
          .map((message, index) => (
            <div key={index} >
              {/* <div className="chat-messages"> */}
              <Message message={message.content} right={message.sender === user}/>
              {message.sender === selectedChat && (
                <button onClick={() => handleForward(message.content)}>
                  <img src={forward} alt="Forward" style={{ width: "25px", height: "25px" , marginLeft:"47px",marginBottom:"10px"}} />
                </button>
              )}
              </div>
            // </div>
          ))}
        
        <div ref={ref}></div>
      </div>
      
    // </div> 
  );
};

export default LLMChat;

