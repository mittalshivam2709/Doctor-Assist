import React, { useState } from "react";
import ReactDom from "react-dom/client";
import App from "./App";
import ChatProvider from "./context/ChatProvider";
import { BrowserRouter } from "react-router-dom";

const root = ReactDom.createRoot(document.getElementById("root"));
root.render(
  <ChatProvider>
      <App />
  </ChatProvider>
);
