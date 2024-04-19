import React from "react";
import user from "../user.png";
import Placeholder from "./Placeholder";
import book from "../book.svg"
import doc from "../doc.svg"

const Message = ({ message, right }) => {
  console.log(right)
  return (
    <div className="flex flex-row chat-parent" style={{ width:"100%", alignItems: "center" }}>
      {right == 0 && (
        <div
          style={{
            flex: "0.05 0 5%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            // backgroundColor:"yellow",
            // margin:"3px"
          }}
        >
          <img
            src={book}
            style={{ width: "100%", height: "40%" }}
            alt="User"
          />
          
        </div>
        
      )}
      
     

      {right == 1 && (
        <div
          style={{
            flex: "0.05 0 5%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            // marginRight:"1px",
            // marginLeft:"3px"
            // backgroundColor:"red"
          }}
        >
          <img
            src={doc}
            style={{ width: "95%", height: "auto" }}
            alt="User"
          />
        </div>
        
      )}
       <div className="chat-box" style={right == 1 ? {wordBreak:"break-word",backgroundColor:"transparent",padding:"10px",paddingLeft:"20px",border: "1.3px solid blue",margin:"5px",borderRadius:"7px" }:{width:"100%", wordBreak:"break-word",backgroundColor:"transparent",padding:"3px",margin:"1px",borderRadius:"7px"}}>
        <div className={`chat-message ${right == 0 ? "left" : "right"}`} style={right == 1 ?{color:"blue"} : {}}>
          {message}
        </div>
      </div>
    </div>
  );
};

export default Message;
