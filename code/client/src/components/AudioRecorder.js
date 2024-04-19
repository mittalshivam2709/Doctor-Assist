import React, { useState, useRef, useEffect } from "react";
import mic from "../mic.png";
import play from "../play.svg"
import axios from "axios";
import { useMutation } from "@apollo/client";
import { SEND_MESSAGE } from "../gqloperations/mutations";
import { ChatState } from "../context/ChatProvider";
import { useForm } from "react-hook-form";
import send from "../send.png"

const AudioRecorder = () => {

  const { user, selectedChat, setMessage, setSelectedChat, audioBlob, setAudioBlob } = ChatState();
  const { register, handleSubmit, reset } = useForm();
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const [sendMessage] = useMutation(SEND_MESSAGE);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const chunks = [];
      mediaRecorder.addEventListener("dataavailable", (event) => {
        chunks.push(event.data);
      });

      mediaRecorder.addEventListener("stop", () => {
        const blob = new Blob(chunks, { type: "audio/mp3" });
        setAudioBlob(blob);
      });

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    const mediaRecorder = mediaRecorderRef.current;
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const playAudio = () => {
    if (audioBlob) {
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();
    }
  };

  const customSubmit = async () => {
    if (audioBlob) {
      const formData = new FormData();
      const timestamp = Date.now();
      formData.append("image", audioBlob, `recording_${timestamp}.mp3`);

      try {
        const response = await axios.post(
          "http://localhost:5002/upload_files",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // console.log(response);
        const resp = await axios.get("http://localhost:5002/get_files");
        // console.log("resp",resp);
        // console.log("resp.data",);
        let fileUrl = null;
        for (const file of resp.data) {
          if (file.name === `recording_${timestamp}.mp3`) {
            fileUrl = file.url;
            break;
          }
        }
        const messageData = {
          content: fileUrl,
          sender: user,
          receiver: selectedChat,
          type: "audio",
        };
        sendMessage({
          variables: {
            messageInput: messageData,
          },
        }).then(() => {
          // console.log(messageData);
          reset();
        });
        alert("Audio file uploaded successfully!");
        setAudioBlob(null);
        setMessage(messageData)
        setSelectedChat(selectedChat);
      } catch (error) {
        console.error("Error uploading audio file:", error);
        alert("Error uploading audio file. Please try again.");
      }
    } else {
      alert("No audio recorded. Please record an audio first.");
    }
  };
  useEffect(() => {

  }, [audioBlob])

  return (
    <div style={{ position: "absolute", top: 15, right: 10 }}>
      <button
        type="button"
        style={{
          border: "none",
          background: "transparent",
          cursor: "pointer",
        }}
        onClick={isRecording ? stopRecording : startRecording}
      >
        {/* <img
          src={audioBlob ? link : mic}
          alt="Record Audio"
          style={{ width: "36px", height: "36px" }}
        /> */}
        <div style={{ display: "flex", alignItems: "center" }}>
        {
          audioBlob ? (
            <>
              <img
                src={play}
                alt="Recorded Audio"
                style={{ width: "36px", height: "36px" ,marginRight:"10px",backgroundColor:"white"}}
                onClick={playAudio}
              />
              <img
                src={send}
                alt="Microphone"
                style={{ width: "30px", height: "30px" }}
                onClick={customSubmit}
              />
            </>
          ) : (
            <img
              src={mic}
              alt="Record Audio"
              style={{ width: "36px", height: "36px" }}
            />
          )
        }
        </div>

      </button>
      {/* {audioBlob && (
        <div>
          <button onClick={playAudio}>Play Recording</button>
          <button onClick={customSubmit}>Upload Recording</button>
        </div>
      )} */}
       {/* <div>
          <button onClick={playAudio}>Play Recording</button>
          <button onClick={customSubmit}>Upload Recording</button>
        </div> */}
    </div>
  );
};

export default AudioRecorder;
