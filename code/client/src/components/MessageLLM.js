import React from "react";
import user from "../user.png";
import Placeholder from "./Placeholder";
import book from "../book.svg"
import doc from "../doc.svg"
import person from "../person.svg"
import forward from "../forward.svg";
import { ChatState } from "../context/ChatProvider";

const Message = ({ message, right }) => {
  // console.log(right)
  const { user, selectedChat, messages, audioBlob, activeTab, setActiveTab, setSocket } = ChatState();

  console.log(message);
  return (
    <div className="flex flex-row chat-parent" style={{ width:"100%",marginTop:"5px" }}>
      {right == 0 && (
        <div
          style={{
            flex: "0.05 0 5%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            // alignItems: "flex-start"
            // backgroundColor:"yellow",
            marginTop:"0px"
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
            marginRight:"5px",
            marginLeft:"3px"
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
       <div className="chat-box" style={right == 1 ? {wordBreak:"break-word",backgroundColor:"transparent" }:{width:"100%", wordBreak:"break-word",backgroundColor:"transparent",padding:"3px",margin:"1px",borderRadius:"7px"}}>
        <div className={`chat-message ${right == 0 ? "left" : "right"}`} style={right == 1 ?{color:"blue",padding:"10px",paddingLeft:"20px",border: "1.3px solid blue",margin:"5px",borderRadius:"7px"} : {}}>
          {message}
        </div>
        {/* {right == 0 &&(
            <button style ={{marginBottom:"15px"}} >
            <img src={forward} alt="Forward" style={{ width: "25px", height: "25px" }} />
            </button> 
        )} */}
          
      </div>
    </div>
  );
};

export default Message;
