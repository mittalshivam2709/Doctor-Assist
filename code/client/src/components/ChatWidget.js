import React, { useState, useRef, useEffect } from 'react';
import SingleChat from '../pages/SingleChat';
import { ChatState } from '../context/ChatProvider';
import MessageInput from './MessageInput';

const ChatWidget = () => {
  const [expanded, setExpanded] = useState(false);
  const {selectedChat, messages}  =  ChatState();
  const ref = useRef(null);

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };
  
  useEffect(() => {
    ref.current?.scrollIntoView({
      behaviour:"smooth",
      block:"end",
    })
    
  
  }, [messages]);
  
  if(!selectedChat) return <></>
  
  return (
    <div className={`chat-widget ${expanded ? 'expanded' : ''}`}>
      <button onClick={toggleExpansion} className="chat-widget-button">
        {expanded ? 'Close ' : 'Chat'}
      </button>
      {expanded && (
        <div className="chat-content">
          <SingleChat />
          <div ref={ref} /> 
          <div className='bottom-bar'>
          <MessageInput />
          </div>
            
        </div>
      )}
     
      
    </div>
  );
};

export default ChatWidget;
