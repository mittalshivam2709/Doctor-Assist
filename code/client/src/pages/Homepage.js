import React from "react";
import Dropdown from "../components/Dropdown";
import Placeholder from "../components/Placeholder";
import Template from "../components/Template";
import data from "../utils/data";
import { selectClickedDropdown, setClickedDropdown } from "../state/dropdownSlice";
import { useDispatch, useSelector } from "react-redux";


const Homepage = () => {
  const dispatch = useDispatch();
  const clickedButton = useSelector(selectClickedDropdown);

  const handleButtonClick = (buttonId) => {
    dispatch(selectClickedDropdown(buttonId));
  };
  return (
    <div className="flex-container wrapper">
      <div className="column">
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
        <Template />

        {/* {data.map((item) => (
          <Dropdown data={item} />
        ))} */}
        {data.map((item) => (
          <button
            key={item.id}
            onClick={() => handleButtonClick(item.id)}
            className={clickedButton === item.id ? 'active-button' : ''}
          >
          BUTTONS   
          </button>
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
