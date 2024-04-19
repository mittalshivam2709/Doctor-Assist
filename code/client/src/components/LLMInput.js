import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { SEND_MESSAGE } from "../gqloperations/mutations";
import { ChatState } from "../context/ChatProvider";
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";
import link from "../link.png";
import send from "../send.png";

// const genAI = new GoogleGenerativeAI("AIzaSyBsROOsRnI1JopbvCzM2-FpkSre0lFzaXo");

// const LLMInput = () => {
//   const [inputText, setInputText] = useState("");
//   const [data, setData] = useState("");

//   const { register, handleSubmit, reset } = useForm();
//   const { user, selectedChat, setMessage } = ChatState();
//   const [sendMessage] = useMutation(SEND_MESSAGE);
//   const [messages, setMessages] = useState([]);

//   const handleInputChange = (event) => {
//     setInputText(event.target.value);
//   };

//   const customSubmit = async (data) => {
//     if (data.Message.trim() !== "") {
//       if (!inputText.trim()) return;

//       const inputMessage = {
//         content: inputText,
//         sender: user,
//         receiver: selectedChat,
//         type: "LLM",
//       };

//       await sendMessage({
//         variables: {
//           messageInput: inputMessage,
//         },
//       });

//       setMessages((prev) => [...prev, inputMessage]);
//       setMessage(inputMessage);
//     //   console.log(messages);
//       // Handle AI response
//       const model = genAI.getGenerativeModel({ model: "gemini-pro" });
//       const prompt = inputText;
//       const result = await model.generateContent(prompt);
//       const response = await result.response;
//       const resp = await response.text();
//     //   console.log("resp- >", resp);
//       const aiResponse = {
//         content: resp,
//         sender: selectedChat,
//         receiver: user,
//         type: "LLM",
//       };
//     //   console.log(aiResponse);
//       await sendMessage({
//         variables: {
//           messageInput: aiResponse,
//         },
//       });

//       setMessages((prev) => [...prev, aiResponse]);
//       setMessage(aiResponse);
//       // console.log("input text before ->", inputText);
//       // setInputText('');
//       // console.log("input text after ->", inputText); // wtf?
//     }
//     setInputText("");
//   };

//   // useEffect(() => {
//   //   reset();
//   // }, [selectedChat]);

//   useEffect(() => {
//     if (inputText === "") {
//       const inputField = document.querySelector(".input-bar.input-submit");
//       inputField.value = "";
//     }
//   }, [inputText]);

//   return (
//     <form
//       onSubmit={handleSubmit((data) => {
//         customSubmit(data);
//         setInputText("");
//       })}
//       style={{ position: "relative", display: "flex", width: "100%" }}
//     >
//       <input
//         className="input-bar input-submit"
//         // type="text"
//         {...register("Message")}
//         placeholder={inputText != "" ? inputText : "Query Manuals..."}
//         style={{ paddingLeft: "20px", paddingRight: "65px" }}
//         onKeyDown={(e) => {
//           if (e.key == "Enter") {
//             setData(JSON.stringify(e.target.value));
//             handleSubmit((data) => customSubmit(data));
//           }
//           handleInputChange(e);
//         }}
//         rows={1}
//       />
//       {inputText.length > 0 && (
//         <>
//         <div style={{ position: "absolute", top: 20.5, right: 20 }}>
//           <button
//             className="input-submit"
//             type="submit"
//             style={{
//               border: "none",
//               background: "transparent",
//               cursor: "pointer",
//             }}
//           >
//             <img
//               src={send}
//               alt="Send"
//               style={{ width: "25px", height: "25px" }}
//             />
//           </button>
//         </div>
//       </>
//       )}
//     </form>
//   );
// };

// export default LLMInput;

const LLMInput = () => {
  const [inputText, setInputText] = useState("");
  const [data, setData] = useState("");

  const { register, handleSubmit, reset } = useForm();
  const { user, selectedChat, setMessage } = ChatState();
  const [sendMessage] = useMutation(SEND_MESSAGE);
  const [messages, setMessages] = useState([]);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const customSubmit = async (data) => {
    if (data.Message.trim() !== "") {
      if (!inputText.trim()) return;

      const inputMessage = {
        content: inputText,
        sender: user,
        receiver: selectedChat,
        type: "LLM",
      };

      await sendMessage({
        variables: {
          messageInput: inputMessage,
        },
      });

      setMessages((prev) => [...prev, inputMessage]);
      setMessage(inputMessage);

      try {
        const resp = await axios.post("http://10.2.8.18:5000/doctor_assistant", { input: inputText });
        const aiResponseText = resp.data.response;

        const aiResponse = {
          content: aiResponseText,
          sender: selectedChat,
          receiver: user,
          type: "LLM",
        };

        await sendMessage({
          variables: {
            messageInput: aiResponse,
          },
        });

        setMessages((prev) => [...prev, aiResponse]);
        setMessage(aiResponse);
      } catch (error) {
        console.error('Failed to get AI response:', error);
        // to handle error some features
        const fallbackMessage = {
          content: "Sorry, I can't help you with that.",
          sender: selectedChat,
          receiver: user,
          type: "LLM",
        };
        await sendMessage({
          variables: {
            messageInput: fallbackMessage,
          },
        });
        setMessages((prev) => [...prev, fallbackMessage]);
        setMessage(fallbackMessage);
      }

      setInputText("");
    }
  };

  useEffect(() => {
    if (inputText === "") {
      const inputField = document.querySelector(".input-bar.input-submit");
      inputField.value = "";
    }
  }, [inputText]);

  return (
    <form
      onSubmit={handleSubmit((data) => {
        customSubmit(data);
        setInputText("");
      })}
      style={{ position: "relative", display: "flex", width: "100%" }}
    >
      <input
        className="input-bar input-submit"
        {...register("Message")}
        placeholder={inputText !== "" ? inputText : "Query Manuals..."}
        style={{ paddingLeft: "20px", paddingRight: "65px" }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setData(JSON.stringify(e.target.value));
            handleSubmit((data) => customSubmit(data));
          }
          handleInputChange(e);
        }}
        rows={1}
      />
      {inputText.length > 0 && (
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
    </form>
  );
};

export default LLMInput;

