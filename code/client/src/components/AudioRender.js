import React, { useRef } from "react";
import user from "../user.png";
import doc from "../doc.svg"
import person from "../person.svg"

const AudioRender = ({ message, right }) => {
  const audioRef = useRef(null);

  const handleAudioClick = (audioURL) => {
    const audio = audioRef.current;
    if (audio.src !== audioURL) {
      audio.src = audioURL;
      audio.load();
    }
    audio.play();
  };

  return (
    <div
      className="flex flex-row chat-parent"
      style={{ width: "100%" }}
    >
      {right == 0 && (
        <div
          style={{
            flex: "0.05 0 5%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            // alignItems: "flex-start"
            // backgroundColor:"yellow",
            marginTop:"0px"
            // margin:"3px"
          }}
        >
          
          <img
            src={person}
            style={{ width: "100%", height: "40%" }}
            alt="User"
          />
          
        </div>
        
      )}
    
    {right == 1 && (
        <div
          style={{
            flex: "0.05 0 5%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginRight:"5px",
            marginLeft:"3px"
            // backgroundColor:"red"
          }}
        >
          <img
            src={doc}
            style={{ width: "95%", height: "auto" }}
            alt="User"
          />
        </div>
        
      )}
        <div
        className="chat-box"
        style={{ width: "100%", wordBreak: "break-word",margin:"5px" }}
      >
        <div className={`chat-message ${right == 0 ? "left" : "right"}`}>
          {isValidURL(message) ? (
            <div
              style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
              onClick={() => handleAudioClick(message)}
            >
              <audio ref={audioRef} controls>
                <source src={message} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          ) : (
            message
          )}
        </div>
      </div>
    </div>
  );
};

const isValidURL = (string) => {
  try {
    new URL(string);
  } catch (_) {
    return false;
  }
  return true;
};

export default AudioRender;