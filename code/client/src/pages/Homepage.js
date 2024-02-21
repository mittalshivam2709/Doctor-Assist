import React from "react";
import Dropdown from "../components/Dropdown";
import Placeholder from "../components/Placeholder";
import Template from "../components/Template";
import data from "../utils/data";
import ChatPage from "./ChatPage";
import { ChatState } from "../context/ChatProvider";
import Navbar from "../components/Navbar";

const Homepage = () => {
  const {selectedChat} = ChatState();
  return (
    <div className="flex-container wrapper">
      <div className="column">
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
        <Template />

        {data.map((item) => (
          <Dropdown
            key={item.id}
            data={item}
          />
        ))}
      </div>
      <div className="column">
        <h1 className="text-3xl font-bold underline">{`Rendering ${selectedChat}`}</h1>
        <ChatPage />
        {/* <Placeholder /> */}
      </div>
    </div>
  );
};

export default Homepage;
