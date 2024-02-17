import React from "react";
import user from "../user.png";
import Placeholder from "./Placeholder";

const Message = () => {
  const text = `This is a really really long text`;
  return (
    <div className="flex flex-row chat-parent">
      <div
        style={{
          flex: "0 0 5%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <img src={user} style={{ width: "100%", height: "auto" }} alt="User" />
      </div>
      <div style={{ flex: "1", flexDirection: "column",
          justifyContent: "flex-end", }}>
        <div className="chat-message ">
          <Placeholder />
        </div>
      </div>
    </div>
  );
};

export default Message;
