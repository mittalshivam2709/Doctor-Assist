import React, { useEffect, useState } from "react";
import LoremIpsum from "../utils/loremipsum";
import Placeholder from "../components/Placeholder";
import Message from "../components/Message";
import MessageInput from "../components/MessageInput";
import { ChatState } from "../context/ChatProvider";
import { FETCH_MESSAGES } from "../gqloperations/queries";
import { useLazyQuery } from '@apollo/client'; // Import useLazyQuery instead of useQuery

const SingleChat = () => {
  const { user, selectedChat } = ChatState();
  const [messages, setMessages] = useState([]);
  
  const [fetchMessages, { loading, data }] = useLazyQuery(FETCH_MESSAGES);

  useEffect(() => {
    if (data && data.fetchMessage) {
      setMessages(data.fetchMessage);
    }
  }, [data]);

  useEffect(() => {
    fetchMessages({
      variables: {
        sender: user,
        receiver: selectedChat
      },
    });
  }, [fetchMessages, user, selectedChat]);

  // console.log(messages);
  messages.forEach((message) => {
    console.log(message.content);
  })
  return (
    <div>
      <div className="single-chat">
        <div>{user}</div>
        {messages.map((message, index) => (
        <Message key={index} message={message.content} right={message.sender == user} />
      ))}
        <MessageInput />
      </div>
    </div>
  );
};

export default SingleChat;
