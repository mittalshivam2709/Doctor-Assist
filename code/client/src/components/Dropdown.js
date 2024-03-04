import React, { useEffect, useState } from "react";
import "../index.css";
import LoremIpsum from "../utils/loremipsum";
import { ChatState } from "../context/ChatProvider";



const Dropdown = ({ data}) => {
  // const {AmbulanceNo, Problem} = data[0];
  const {
    AmbulanceNo,
    Time,
    Problem,
    Age,
    "Age type": AgeType,
    Gender,
    Loc,
    "Critical case": CriticalCase,
    "Past history": PastHistory,
    "Sign & Symptoms": SignSymptoms,
    "ERCP advice": ERCPAdvice,
    "Event during transport": EventDuringTransport,
    id,
  } = data;
  var color = "green";
  if( CriticalCase == "yes" ){
    color = "red"
  }
  else {
    color = "blue";
  }
  const {selectedChat, setSelectedChat} = ChatState();
  const [expanded, setExpanded] = useState(false);

  useEffect(() => { // responsible for minimizing other dropdowns
    const shouldExpand = id === selectedChat;
    setExpanded(shouldExpand);
  }, [selectedChat, id]);

  const handleToggle = (id) => {
    setSelectedChat(id);
    setExpanded(!expanded);
  };

  return (
    <div
      className={`expanding-box bg-${expanded ? color : "white"} text-${expanded ? "white" : "black"}`}
    >
      <div
        className={`expanding-box-header bg-${expanded ? color : "white"} text-${expanded ? "white" : "black"}`}
        onClick={() => {handleToggle(id)}}
        style={{
          backgroundImage: expanded
            ? `linear-gradient(to right, ${color} 100%, #E3EEFE 100%)`
            : `linear-gradient(to right, ${color} 2.5%, #E3EEFE 2.5%)`,
        }}
      >
        <div className="flex flex-col" style={{ fontFamily:'Inter, sans-serif'}}>
          <div className="flex justify-end">
            <p className="text-sm"> Ambulance No-{AmbulanceNo}</p>
            <p className="text-sm"> {Time}</p>
          </div>
          <div className="flex py-2 items-center">
            <p className="text-sm font-bold"> {Problem}</p>
          </div>
          <div className="flex justify-evenly">
            <p className="text-sm"> Age - {Age} years</p>
            <p className="text-sm"> Age type - {AgeType}</p>
            <p className="text-sm"> Gender - {Gender}</p>
          </div>
        </div>
      </div>

      {expanded && (
        <div
          className="expanding-box-content"
          style={{ backgroundColor: `${color}` }}
        >
          <div className="flex flex-col text-white" style={{paddingBottom:'1%', marginLeft:'2.5%', fontFamily:'Inter, sans-serif'}}> 
            <p className="text-sm"> Loc - {Loc} years</p>
            <p className="text-sm"> Critical Case - {CriticalCase}</p>
            <p className="text-sm"> Past History - {PastHistory.join(", ")}</p>
            <p className="text-sm"> Sign & Symptoms - {SignSymptoms.join(", ")}</p>
            <p className="text-sm"> ERCP advice - {ERCPAdvice.join(", ")}</p>
            <p className="text-sm"> Event during transport - {EventDuringTransport}</p>
            <p className="text-sm"> id - {id}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
