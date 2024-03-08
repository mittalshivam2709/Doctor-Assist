import React, { useState} from 'react';
import SingleChat from '../pages/SingleChat';
import { ChatState } from '../context/ChatProvider';
import MessageInput from './MessageInput';
import { ReactComponent as MySVG } from '../Chat.svg';
import Draggable from 'react-draggable';

const ChatWidget = () => {
  const [expanded, setExpanded] = useState(false);
  const {selectedChat, messages}  =  ChatState();
  const [backgroundColor, setBackgroundColor] = useState('transparent');
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const toggleExpansion = () => {
    
    if(expanded) {

      setPosition({ x: 0, y: 0 });
    }

    setExpanded(!expanded);
    setBackgroundColor(backgroundColor === 'transparent' ? ' #5555FB' : 'transparent');
  };

  const widgetStyle = {
    backgroundColor: backgroundColor,
    margin: expanded ? '10px' : '0' 
  };

  const handleDrag = (e, ui) => {
    const {x, y} = position;
    setPosition({
      x: x + ui.deltaX,
      y: y + ui.deltaY,
    });
  };

  if(!selectedChat) return <></>
  
  return (
    <Draggable 
    disabled={!expanded} 
    position={expanded ? position : { x: 0, y: 0 }} 
    onStop={handleDrag} 
  >

    <div className={`chat-widget ${expanded ? 'expanded' : ''}`} style={widgetStyle}>
      <button onClick={toggleExpansion} className="chat-widget-button">
        {expanded ? 
        "Close":  <MySVG/>
      }
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
    </Draggable>
  );
};

export default ChatWidget;

