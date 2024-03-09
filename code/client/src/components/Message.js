import React from "react";
import user from "../user.png";
import Placeholder from "./Placeholder";

const Message = ({ message, right }) => {
  const text = `This is a really really long text`;
  return (
    <div className="flex flex-row chat-parent" style={{ width:"100%", alignItems: "center" }}>
      {right == 0 && (
        <div
          style={{
            flex: "0 0 7%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            // backgroundColor:"green"
          }}
        >
          <img
            src={user}
            style={{ width: "100%", height: "auto" }}
            alt="User"
          />
        </div>
      )}

      <div className="chat-box" style={{width:"100%", wordBreak:"break-word"}}>
        <div className={`chat-message ${right == 0 ? "left" : "right"}`}>
          {message}
        </div>
      </div>

      {right == 1 && (
        <div
          style={{
            flex: "0 0 7%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            // backgroundColor:"red"
          }}
        >
          <img
            src={user}
            style={{ width: "100%", height: "auto" }}
            alt="User"
          />
        </div>
      )}
    </div>
  );
};

export default Message;
