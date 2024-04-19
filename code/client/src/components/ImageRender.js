import React from "react";
import user from "../user.png";
import doc from '../doc.svg';
import person from "../person.svg"

const ImageRender = ({ message, right }) => {
  const handleImageClick = (imageURL) => {
    const imageWindow = window.open("");
    imageWindow.document.write(`<img src="${imageURL}" style="max-width: 100%; max-height: 100vh;">`);
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
            src={doc}
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
          style={{ width: "100%", wordBreak: "break-word" ,margin:"7px",padding:"10px"}}
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