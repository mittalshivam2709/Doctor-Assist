import { createContext, useContext, useState, useEffect } from "react";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState(null);
  useEffect(() =>{ // set for detecting chagnes
    // console.log("INSIDE chat provider", selectedChat);
    // if(selectedChat) console.log(selectedChat);
  }, [selectedChat])

  return (
    <ChatContext.Provider value={{ selectedChat, setSelectedChat }}>
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
