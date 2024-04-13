import React from "react";
import user from "../user.png";

const ImageRender = ({ message, right }) => {
  const handleImageClick = (imageURL) => {
    const imageWindow = window.open("");
    imageWindow.document.write(`<img src="${imageURL}" style="max-width: 100%; max-height: 100vh;">`);
  };

  return (
    <div
      className="flex flex-row chat-parent"
      style={{ width: "100%", alignItems: "center" }}
    >
      {right === 0 && (
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
        <div className={`chat-message ${right === 0 ? "left" : "right"}`}>
          {isValidURL(message) ? (
            <img
              src={message}
              alt="Uploaded"
              style={{ maxWidth: "100%", cursor: "pointer" }}
              onClick={() => handleImageClick(message)}
            />
          ) : (
            message
          )}
        </div>
      </div>
      {right === 1 && (
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

export default ImageRender;