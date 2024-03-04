import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SEND_MESSAGE } from "../gqloperations/mutations";
import { useMutation } from "@apollo/client";
import { ChatState } from "../context/ChatProvider";



const MessageInput = () => {
  const { register, handleSubmit, reset } = useForm();
  const { user, selectedChat , setMessage} = ChatState();
  const [data, setData] = useState("");
  const [sendMessage, { error, loading, formdata }] = useMutation(SEND_MESSAGE);
  const customSubmit = (data) => {
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

  };
  useEffect(() => {
    reset(); 
  }, [selectedChat]);
  return (
    <div className="">
      <form onSubmit={handleSubmit((data) => customSubmit(data))} style={{ display: "flex", alignItems: "center" }}>
        <input className="input-bar" {...register("Message")} placeholder="Enter your message..." style={{ marginRight: "10px" }} />
        <input className="input-submit" type="submit" value="Send" />
      </form>
    </div>
  );
};

export default MessageInput;
