import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SEND_MESSAGE } from "../gqloperations/mutations";
import { useMutation } from "@apollo/client";
import { ChatState } from "../context/ChatProvider";
import mic from "../mic.png"
import link from "../link.png"



const MessageInput = () => {
  const { register, handleSubmit, reset } = useForm();
  const { user, selectedChat , setMessage} = ChatState();
  const [data, setData] = useState("");
  const [sendMessage, { error, loading, formdata }] = useMutation(SEND_MESSAGE);
  const customSubmit = (data) => {
    if (data.Message.trim() !== ""){
    setData(JSON.stringify(data.Message));
    const messageData = {
      content: data.Message,
      sender: user,
      receiver: selectedChat
    };
    sendMessage({
      variables:{
        messageInput: messageData
        }
    }).then(() =>{
      setMessage(messageData);
      console.log(messageData);
      reset();
    })
  }
  };
  useEffect(() => {
    reset(); 
  }, [selectedChat]);
  return (
    // <div className="chat-content" style={{backgroundColor:"red"}}>
       <form onSubmit={handleSubmit((data) => customSubmit(data))} style={{ display: "flex", alignItems: "center"}}>

        
        <input className="input-bar" {...register("Message")} placeholder="Type a reply to EMT Assist..."  />
         
        {/* <input className="input-submit" type="submit" value="Send" /> */}
      </form> 



    // </div>
  );
};

export default MessageInput;
