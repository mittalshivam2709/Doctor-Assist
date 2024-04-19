import React from "react";
import user from "../user.png";
import Placeholder from "./Placeholder";
import book from "../book.svg"
import doc from "../doc.svg"

const Message = ({ message, right }) => {
  console.log(right)
  return (
    <div className="flex flex-row chat-parent" style={{ width:"100%" }}>
      {right == 0 && (
        <div
          style={{
            flex: "0.05 0 5%",
            display: "flex",
            flexDirection: "column",
            // justifyContent: "flex-start",
            // alignItems: "flex-start"
            // backgroundColor:"yellow",
            // marginTop:"0px"
            // margin:"3px"
          }}
        >
          <img
            src={book}
            style={{ width: "100%", height: "40%" }}
            alt="User"
          />
          
        </div>
        // </div>
      )}
      
     

      {right == 1 && (
        <div
          style={{
            flex: "0.05 0 5%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            marginRight:"5px",
            marginLeft:"3px",
            // marginTop:"10px"
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
       <div className="chat-box" style={right == 1 ? {wordBreak:"break-word",backgroundColor:"transparent" }:{width:"100%", wordBreak:"break-word",backgroundColor:"transparent",padding:"3px",margin:"1px",marginTop:"15px",borderRadius:"7px"}}>
        {right == 0 ? <p style={{marginLeft:"15px",marginBottom:"5px"}}>Knowledge Base</p>: <p style={{marginLeft:"15px",marginBottom:"5px"}}>You</p>}
        
        <div className={`chat-message ${right == 0 ? "left" : "right"}`} style={right == 1 ?{color:"blue",border: "1.3px solid blue",padding:"10px",paddingLeft:"20px",margin:"5px",borderRadius:"7px"} : {}}>
          {message}
        </div>
      </div>
    </div>
  );
};

export default Message;
