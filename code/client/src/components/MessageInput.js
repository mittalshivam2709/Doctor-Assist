import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { SEND_MESSAGE } from "../gqloperations/mutations";
import { ChatState } from "../context/ChatProvider";
import mic from "../mic.png";
import link from "../link.png";
import send from "../send.png";

const MessageInput = () => {
  const [inputText, setInputText] = useState("");
  const [data, setData] = useState("");

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
    if (file) {
      setSelectedFile(file);
      setInputText(file.name);
    }
  };

  const { register, handleSubmit, reset } = useForm();
  const [selectedFile, setSelectedFile] = useState(null);
  const { user, selectedChat, setMessage } = ChatState();
  const [sendMessage] = useMutation(SEND_MESSAGE);
  const customSubmit = (data) => {
    setData(JSON.stringify(data.Message));
    if (data.Message.trim() !== "") {
      const messageData = {
        content: data.Message,
        sender: user,
        receiver: selectedChat,
      };
      sendMessage({
        variables: {
          messageInput: messageData,
        },
      }).then(() => {
        setMessage(messageData);
        console.log(messageData);
        reset();
        setInputText("");
      });
    }
  };

  useEffect(() => {
    reset();
  }, [selectedChat]);

  useEffect(() => {
    console.log(2, inputText);
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

          <div style={{ position: "absolute", top: 15, right: 10 }}>
            <button
              type="button"
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
              }}
            >
              <img
                src={mic}
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
