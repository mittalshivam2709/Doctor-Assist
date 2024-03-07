import React, { useState} from 'react';
import SingleChat from '../pages/SingleChat';
import { ChatState } from '../context/ChatProvider';
import MessageInput from './MessageInput';

const ChatWidget = () => {
  const [expanded, setExpanded] = useState(false);
  const {selectedChat, messages}  =  ChatState();

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  if(!selectedChat) return <></>
  
  return (
    <div className={`chat-widget ${expanded ? 'expanded' : ''}`}>
      <button onClick={toggleExpansion} className="chat-widget-button">
        {expanded ? 'Close ' : 'Chat'}
      </button>
      {expanded && (
        <div className="chat-content">
          <SingleChat />
          <div className='bottom-bar'>
          <MessageInput />
          </div>
            
        </div>
      )}
     
    </div>
  );
};

export default ChatWidget;
