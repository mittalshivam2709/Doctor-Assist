import React, { useState, useEffect } from "react";
import SingleChat from "../pages/SingleChat";
import HelpChat from "../pages/HelpChat";
import { ChatState } from "../context/ChatProvider";
import MessageInput from "./MessageInput";
import { ReactComponent as MySVG } from "../Chat.svg";
import Draggable from "react-draggable";
import { Resizable } from "re-resizable";
import { ReactComponent as MySign } from "../sign.svg";
import LLMInput from "./LLMInput";
import LLMChat from "../pages/LLMChat";

const ChatWidget = () => {
  const [expanded, setExpanded] = useState(false);
  const { selectedChat, activeTab, setActiveTab } = ChatState();
  const [backgroundColor, setBackgroundColor] = useState("transparent");
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [newMessages, setNewMessages] = useState({
    SingleChat: false,
    HelpChat: false,
    LLMChat: false,
  });

  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    right: window.innerWidth,
    bottom: window.innerHeight,
  });

  const onNewSingleChatMessage = () => {
    setNewMessages((prev) => ({ ...prev, SingleChat: true }));
  };

  const onNewHelpChatMessage = () => {
    setNewMessages((prev) => ({ ...prev, HelpChat: true }));
  };

  const toggleExpansion = () => {
    if (expanded) {
      setPosition({ x: 0, y: 0 });
    }

    setExpanded(!expanded);
    setBackgroundColor(
      backgroundColor === "transparent" ? " #5555FB" : "transparent"
    );
  };

  const widgetStyle = {
    backgroundColor: backgroundColor,
    margin: expanded ? "10px" : "0",
  };

  const handleDrag = (e, data) => {
    setPosition({ x: data.x, y: data.y });
  };

  if (!selectedChat) return <></>;

  const renderContent = () => {
    switch (activeTab) {
      case "SingleChat":
        return <SingleChat />;
      case "HelpChat":
        return <LLMChat />;
      default:
        return <SingleChat />;
    }
  };

  return (
    <Draggable
      disabled={!expanded}
      position={position}
      handle=".close"
      // bounds={bounds}
      onStop={handleDrag}
    >
      <div
        className={`chat-widget ${expanded ? "expanded" : ""}`}
        style={widgetStyle}
      >
        {expanded ? (
          <div className="close">
            <button
              onClick={() => {
                setActiveTab("SingleChat");
                setNewMessages((prev) => ({ ...prev, SingleChat: false }));
              }}
              style={{
                backgroundColor: 
                  activeTab === "SingleChat"
                    ? "rgba(120, 120, 255, 1)"
                    : "rgba(95, 95, 255, 1)",
                padding: "10px 20px 10px 20px",
                borderRadius: "15px 15px 0 0",
                marginRight: "10px",
                width:"150%"
              }}
            >
              EMT Assist{" "}
              {newMessages.SingleChat && <span className="notif-dot"></span>}
            </button>
            <button
              onClick={() => {
                setActiveTab("HelpChat");
                setNewMessages((prev) => ({ ...prev, HelpChat: false }));
              }}
              style={{
                backgroundColor:
                  activeTab === "HelpChat"
                    ? "rgba(120, 120, 255, 1)"
                    : "rgba(95, 95, 255, 1)",
                padding: "5px 15px 5px 15px",
                borderRadius: "15px 15px 0 0",
                marginRight: "24%",
                width:"200%"
              }}
            >
              Knowledge Base{" "}
              {newMessages.HelpChat && <span className="notif-dot"></span>}{" "}
            </button>
            <button onClick={toggleExpansion} className="chat-widget-button">
              <MySign />
            </button>
          </div>
        ) : (
          <button onClick={toggleExpansion} className="chat-widget-button">
            <MySVG />
          </button>
        )}

        {/* {expanded && (
         <div className='close'style={{color:"white"}}>
           <button onClick={() => setActiveTab('SingleChat')}>EMT Assist</button>
          <button onClick={() => setActiveTab('HelpChat')}>Help Centre</button>
          <button onClick={toggleExpansion} className="chat-widget-button">Close</button>
         </div>
      )} */}
        {expanded && (
          <div className="chat-content"  style={{
            backgroundColor: activeTab === "SingleChat" ? "#D8D8E2" :"#DBDBFF" 
          }}>
            {/* <SingleChat /> */}

            {renderContent()}
            <div className="bottom-bar">
              {
                activeTab === "SingleChat"?
                  <MessageInput />:
                  <LLMInput />
              }
              
            </div>
          </div>
        )}
      </div>
    </Draggable>
  );
};

export default ChatWidget;
