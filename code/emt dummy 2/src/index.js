import React, { useState } from "react";
import ReactDom from "react-dom/client";
import App from "./App";
import ChatProvider from "./context/ChatProvider";
// import { BrowserRouter } from "react-router-dom";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

const client = new ApolloClient({
  uri: 'http://localhost:5001/graphql',
  cache: new InMemoryCache(),
  headers:{
    authorization:localStorage.getItem("token") || ""
  }
});




const root = ReactDom.createRoot(document.getElementById("root"));
root.render(
  <ChatProvider>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </ChatProvider>
);
