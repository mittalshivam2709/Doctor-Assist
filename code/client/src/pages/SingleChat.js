import React from "react";
import LoremIpsum from "../utils/loremipsum";
import Placeholder from "../components/Placeholder";
import Message from "../components/Message";
import MessageInput from "../components/MessageInput";

const SingleChat = () => {
  return (
    <div>
      <div className="single-chat">
        <Message />
        <Message />
        <Message />
        <MessageInput />
      </div>
    </div>
  );
};

export default SingleChat;
