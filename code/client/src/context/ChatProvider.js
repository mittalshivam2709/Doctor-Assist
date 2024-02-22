import { createContext, useContext, useState, useEffect } from "react";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState("65d463dda0b915283dced3dd") // admin id TODO REMOVE LATER
  const [selectedChat, setSelectedChat] = useState("65d463f3a0b915283dced3e0"); // test id
  useEffect(() =>{ // set for detecting chagnes
    // console.log("INSIDE chat provider", selectedChat);
    // if(selectedChat) console.log(selectedChat);
  }, [selectedChat])

  return (
    <ChatContext.Provider value={{ selectedChat, setSelectedChat, user, setUser }}>
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
