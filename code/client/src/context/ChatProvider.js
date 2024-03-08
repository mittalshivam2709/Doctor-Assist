import { createContext, useContext, useState, useEffect } from "react";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState("65d463dda0b915283dced3dd"); // admin id TODO REMOVE LATER
  const [selectedChat, setSelectedChat] = useState(null); // test id 65d463f3a0b915283dced3e0
  const [message, setMessage] = useState(null);
  const [vitals, setVitals] = useState(null);
  const [selectedPatient,setSelectedPatient] = useState(null);

  useEffect(() => {
    // set for detecting chagnes
    // console.log("INSIDE chat provider", selectedChat);
    // if(selectedChat) console.log(selectedChat);
    
  }, [selectedChat]);

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        message,
        setMessage,
        vitals, 
        setVitals,
        selectedPatient,
        setSelectedPatient
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
