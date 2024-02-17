import React, { useState } from "react";
import ReactDom from "react-dom/client";
import App from "./App";
import ChatProvider from "./context/ChatProvider";
// import {chatProvider} from "./context/chatProvider";
// chatProvider

const root = ReactDom.createRoot(document.getElementById("root"));
root.render(
  <ChatProvider>
    <App />
  </ChatProvider>
);
