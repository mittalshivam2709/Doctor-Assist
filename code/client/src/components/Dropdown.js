import React, { useEffect, useState } from "react";
import "../index.css";
import LoremIpsum from "../utils/loremipsum";
import { ChatState } from "../context/ChatProvider";



const Dropdown = ({ data}) => {
  // const {AmbulanceNo, Problem} = data[0];
  const {
    ambulance_no,
    admit_time,
    problem,
    age,
    age_type,
    gender,
    loc,
    critical_case,
    past_history,
    symptoms,
    ercp_advice,
    event_during_transport,
    emt,
  } = data;
  console.log(data);
  var color = "red";
  // if( critical_case == "yes" ){
  //   color = "red"
  // }
  // else {
  //   color = "blue";
  // }
  const {selectedChat, setSelectedChat} = ChatState();
  const [expanded, setExpanded] = useState(false);

  useEffect(() => { // responsible for minimizing other dropdowns
    const shouldExpand = emt === selectedChat;
    // setExpanded(shouldExpand);
  }, [selectedChat, emt]);

  const handleToggle = (emt) => {
    setSelectedChat(emt);
    // setExpanded(!expanded);
  };

  return (
    <div
      className={` expanding-box bg-${expanded ? color : "white"} text-${expanded ? "white" : "black"}`}
    >
      <div
        className={`expanding-box-header bg-${expanded ? color : "white"} text-${expanded ? "white" : "black"}`}
        onClick={() => {handleToggle(emt)}}
        style={{
          backgroundImage: expanded
            ? `linear-gradient(to right, ${color} 100%, #FFFFFF 100%)`
            : `linear-gradient(to right, ${color} 2.5%, #FFFFFF 2.5%)`,
        }}
      >
        <div className="flex flex-col" style={{ fontFamily:'Inter, sans-serif'}}>
          <div className="ambu_time">
            <p className="ambulance_no"> Ambulance No-{ambulance_no}</p>
            <p className="admit_time"> {admit_time}</p>
          </div>
          <div className="flex py-2 items-center">
            <p className="problem_patient"> {problem}</p>
          </div>
          <div className="flex justify-evenly">
            <p className="age_patient"> Age - {age} years</p>
            <p className="agetype_patient"> Age type - {age_type}</p>
            <p className="gender_patient"> Gender - {gender}</p>
          </div>
        </div>
      </div>

      {/* {expanded && (
        <div
          className="expanding-box-content"
          style={{ backgroundColor: `${color}` }}
        >
          <div className="flex flex-col text-white" style={{paddingBottom:'1%', marginLeft:'2.5%', fontFamily:'Inter, sans-serif'}}> 
            <p className="text-sm"> Loc - {loc}</p>
            <p className="text-sm"> Critical Case - {critical_case}</p>
            <p className="text-sm"> Past History - {past_history}</p>
            <p className="text-sm"> Sign & Symptoms -  {symptoms}</p>
            <p className="text-sm"> ERCP advice - {ercp_advice}</p>
            <p className="text-sm"> Event during transport - {event_during_transport}</p>
            <p className="text-sm"> id - {emt}</p>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Dropdown;
