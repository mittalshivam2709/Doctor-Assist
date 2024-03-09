import React, { useEffect, useState } from "react";
import { ChatState } from "../context/ChatProvider";

const Dropdown = ({ data }) => {
  const {
    ambulance_no,
    admit_time,
    problem,
    age,
    age_type,
    gender,
    critical_case,
    emt,
  } = data;

  const [hovered, setHovered] = useState(false);
  const [showProblemDetails, setShowProblemDetails] = useState(false);
  const hoverColor = critical_case === "yes" ? "rgb(244, 183, 183)" : "rgb(169, 235, 169)";
  const hoverC = critical_case === "yes" ? "red" : "green";
  const { selectedChat, setSelectedChat, setSelectedPatient } = ChatState();
  const isSelected = selectedChat === emt;
  var color = "white"
  const handleToggle = () => {
    setSelectedChat(isSelected ? null : emt);
    setSelectedPatient(isSelected ? null : data);
  };

  const handleHover = (isHovered) => {
    setHovered(isHovered);
    setShowProblemDetails(isHovered);
  };

  return (
    <div
      className={`expanding-box bg-${isSelected ? hoverColor : "white"} text-${isSelected ? "white" : "black"}`}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
    >
      <div
        className={`expanding-box-header bg-${isSelected ? "white" : "white"} text-${isSelected ? "white" : "black"}`}
        onClick={handleToggle}
        style={{
          backgroundImage: isSelected
            ? `linear-gradient(to right, ${color} 100%, #FFFFFF 100%)`
            : `linear-gradient(to right, ${color} 2.5%, #FFFFFF 2.5%)`,
          border: isSelected ? "2px solid blue" : "2px solid transparent",
          background: hovered? hoverColor:"white",
          backgroundColor: "transparent"
        }}
      >
        <div
          className="flex-col"
          style={{
            fontFamily: 'Poppins, sans-serif',
            backgroundColor: "transparent",
          }}
        >
          <div className=" flex flex-col md:flex-row justify-between">
            
            <div className=" flex items-center">
            <div  style={{ width: '20px', height: '20px', borderRadius: '50%', position: 'relative', right: '8px',backgroundColor: hoverC }}></div>
            <div className=""  style={{ color: hovered ? hoverC : "blue" ,width :'200px', fontWeight:600}}>Ambulance No: {ambulance_no}</div>
            </div>
            <div className="text-xs" >{admit_time}</div>
          </div>
          <div className="flex py-2 items-center" style={{fontWeight:400}}>
            <span
              className="problem_patient"
            >
              {showProblemDetails ? problem : "What is the problem?"}
            </span>
          </div>
          <div className="flex justify-between text-sm" style={{fontWeight: 400}}>
            <span className="age_patient text-xs"> Age - {age} years</span>
            <span className="agetype_patient text-xs"> Age type - {age_type}</span>
            <span className="gender_patient text-xs"> Gender - {gender}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
