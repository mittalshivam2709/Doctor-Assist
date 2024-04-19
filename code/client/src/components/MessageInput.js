import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { SEND_MESSAGE } from "../gqloperations/mutations";
import { ChatState } from "../context/ChatProvider";
import axios from 'axios'; 
import link from "../link.png";
import send from "../send.png";

import io from "socket.io-client";
import AudioRecorder from "./AudioRecorder";
const ENDPOINT = "http://localhost:5001";
const socket = io(ENDPOINT);

const MessageInput = () => {
  const [inputText, setInputText] = useState("");
  const [data, setData] = useState("");
  const { isSocket } = ChatState();
  // const [selectedFile, setSelectedFile] = useState(null);
  const [placeholderText, setPlaceholderText] = useState(
    "Type a reply to EMT Assist..."
  );

  const clearSelectedFile = () => {
    setSelectedFile(null);
    setInputText("");
    setPlaceholderText("Type a reply to EMT Assist...");
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handlefilechange = (e) => {
    // setSelectedFile(e.target.value);
    const file = e.target.files[0];
    socket.emit("file clicked");

    if (file) {
      setSelectedFile(file);
      setInputText(file.name);
    }
  };

  const { register, handleSubmit, reset } = useForm();
  const [selectedFile, setSelectedFile] = useState(null);
  const { user, selectedChat, setMessage } = ChatState();
  const [sendMessage] = useMutation(SEND_MESSAGE);
  const customSubmit = async (data) => {
    if(selectedFile){
        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            // Make a POST request to your Express server
            const response = await axios.post('http://localhost:5002/upload_files', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            // console.log(response); // Log the response from the server
            alert("File uploaded successfully!");
            setSelectedFile(null); // Clear selected file after upload
            const resp=await axios.get('http://localhost:5002/get_files');
            let fileUrl = null;
            for (const file of resp.data) {
             if (file.name === selectedFile.name) {
               fileUrl = file.url;
               break;
                }
              }
            const messageData = {
              content: fileUrl,
              sender: user,
              receiver: selectedChat,
              type:"image"
            }
            await sendMessage({
              variables: {
                messageInput: messageData,
              },
            }).then(() => {
              setMessage(messageData)
              // console.log(messageData)
              reset()
              setInputText('')
            })
            // console.log("resp.data",resp.data);
        } catch (error) {
            console.error('Error uploading file:', error);
            alert("Error uploading file. Please try again.");
        }
        setSelectedFile(null)
    }else{
      setData(JSON.stringify(data.Message))
      if (data.Message.trim() !== '') {
        const messageData = {
          content: data.Message,
          sender: user,
          receiver: selectedChat,
          type: "message"
        }
        sendMessage({
          variables: {
            messageInput: messageData,
          },
        }).then(() => {
          setMessage(messageData)
          // console.log(messageData)
          reset()
          setInputText('')
        })
      }
    }
  };

  useEffect(() => {
    reset();
  }, [selectedChat]);

  useEffect(() => {
    if (inputText === '') {
      const inputField = document.querySelector(".input-bar.input-submit");
      inputField.value = '';
    }
  }, [inputText]);

  return (
    <form
      onSubmit={handleSubmit((data) => customSubmit(data))}
      style={{ position: "relative", display: "flex", width: "100%" }}
    >
      <input
        className="input-bar input-submit"
        // type="text"
        {...register("Message")}
        placeholder={inputText !=''? inputText: "Type a reply to EMT Assist..."}
        style={{ paddingLeft: "20px", paddingRight: "65px" }}
        onKeyDown={(e) => {
          if (e.key == "Enter") {
            setData(JSON.stringify(e.target.value));
            handleSubmit((data) => customSubmit(data));
          }
          handleInputChange(e);
        }}
        rows={1}
      />

      {inputText.length  == 0 ? (
        <>
          <div style={{ position: "absolute", top: 15, right: 50 }}>
            <button
              type="button"
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
              }}
            >
              <img
                src={link}
                alt="Link"
                style={{ width: "36px", height: "36px" }}
              />
              <input
                type="file"
                onChange={handlefilechange}
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "100%",
                  height: "100%",
                  opacity: 0,
                  cursor: "pointer",
                }}
              />
            </button>
          </div>
          <AudioRecorder/>
        
        </>
      ) : (
        <div style={{ position: "absolute", top: 20.5, right: 20 }}>
          <button
            className="input-submit"
            type="submit"
            style={{
              border: "none",
              background: "transparent",
              cursor: "pointer",
            }}
          >
            <img
              src={send}
              alt="Send"
              style={{ width: "25px", height: "25px" }}
            />
          </button>
        </div>
      )}

      {selectedFile && (
        <button
          type="button"
          onClick={clearSelectedFile}
          style={{
            position: "absolute",
            top: "15px",
            right: "80px",
            border: "none",
            background: "transparent",
            cursor: "pointer",
            fontSize: "24px",
            display: selectedFile ? "block" : "none",
          }}
        >
          &times;
        </button>
      )}
    </form>
  );
};

export default MessageInput;