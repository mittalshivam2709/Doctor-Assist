import React from "react";
import Dropdown from "../components/Dropdown";
import Placeholder from "../components/Placeholder";
import Template from "../components/Template";
import data from "../utils/data";

const Homepage = () => {
  return (
    <div className="flex-container wrapper">
      <div className="column">
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
        <Template />

        {data.map((item) => (
          <Dropdown data={item} />
        ))}
      </div>
      <div className="column">
        <h1 className="text-3xl font-bold underline">Second column</h1>
        <Placeholder />
      </div>
    </div>
  );
};

export default Homepage;
