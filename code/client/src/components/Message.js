import React from "react";
import user from "../user.png";
import Placeholder from "./Placeholder";

const Message = ({ message, right }) => {
  console.log(right)
  return (
    <div className="flex flex-row chat-parent" style={{ width:"100%", alignItems: "center" }}>
      {right == 0 && (
        <div
          style={{
            flex: "0 0 7%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            // backgroundColor:"yellow",
            margin:"3px"
          }}
        >
          <img
            src={user}
            style={{ width: "100%", height: "auto" }}
            alt="User"
          />
          
        </div>
        
      )}
      
      <div className="chat-box" style={right == 1 ? {wordBreak:"break-word",backgroundColor:"transparent",padding:"10px",paddingLeft:"20px",border: "1.3px solid blue",margin:"3px",borderRadius:"7px" }:{width:"100%", wordBreak:"break-word",backgroundColor:"transparent",padding:"3px",margin:"1px",borderRadius:"7px"}}>
        <div className={`chat-message ${right == 0 ? "left" : "right"}`} style={right == 1 ?{color:"blue"} : {}}>
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
