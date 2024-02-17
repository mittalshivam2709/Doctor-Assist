import React, { useState } from "react";
import { useForm } from "react-hook-form";

const MessageInput = () => {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");
  const customSubmit = (data) => {
    setData(JSON.stringify(data));
    console.log(data);
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit((data) => customSubmit(data))} style={{ display: "flex", alignItems: "center" }}>
        <input className="input-bar" {...register("Message")} placeholder="Enter your message..." style={{ marginRight: "10px" }} />
        <input className="input-submit" type="submit" value="Send" />
      </form>
    </div>
  );
};

export default MessageInput;
