import React, { useRef } from "react";
import user from "../user.png";

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
      style={{ width: "100%", alignItems: "center" }}
    >
      {right == 0 && (
        <div
          style={{
            flex: "0 0 7%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <img src={user} style={{ width: "100%", height: "auto" }} alt="User" />
        </div>
      )}
      <div
        className="chat-box"
        style={{ width: "100%", wordBreak: "break-word" }}
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
      {right == 1 && (
        <div
          style={{
            flex: "0 0 7%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <img src={user} style={{ width: "100%", height: "auto" }} alt="User" />
        </div>
      )}
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