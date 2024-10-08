import React from 'react'
import { ChatState } from '../context/ChatProvider'
import Navbar from '../components/Navbar'
import Placeholder from '../components/Placeholder'
import LoremIpsum from '../utils/loremipsum'
import SingleChat from './SingleChat'
import MessageInput from '../components/MessageInput'
import VitalPage from './VitalPage'
// Depricated ?
const ChatPage = () => {
  const { selectedChat } = ChatState()

  return (
    // <div className="chat-container wrapper">
    <div className="chat">
      <VitalPage />
      {/* </div> */}
      {/* <div  className="chat">

        <div><SingleChat /></div>
      </div> */}
    </div>
  )
}

export default ChatPage