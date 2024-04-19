
import { createContext, useContext, useState, useEffect } from "react";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  //NOTE BELOW IS THE DEVELOPMENT DEFAULT logged in ID, its of doctor
  // FOR DEPLOYMENT, PLEASE UNCOMMENT LINES 36 and 37 ON LoginPage.js
  const [user, setUser] = useState("65d463dda0b915283dced3dd"); // admin id TODO REMOVE LATER, by default this is logged in for development
  const [selectedChat, setSelectedChat] = useState(null); // test id 65d463f3a0b915283dced3e0
  const [message, setMessage] = useState(null);
  const [vitals, setVitals] = useState(null);
  const [selectedPatient,setSelectedPatient] = useState(null);
  const [isSocket, setSocket] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [activeTab, setActiveTab] = useState("SingleChat");

  useEffect(() => {
    // set for detecting chagnes
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
        setSelectedPatient,
        isSocket,
        setSocket,
        audioBlob,
        setAudioBlob, 
        activeTab, 
        setActiveTab,
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
