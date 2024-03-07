// import React, { useEffect, useState } from "react";
// import "../index.css";
// import LoremIpsum from "../utils/loremipsum";
// import { ChatState } from "../context/ChatProvider";



// const Dropdown = ({ data}) => {
//   // const {AmbulanceNo, Problem} = data[0];
//   const {
//     ambulance_no,
//     admit_time,
//     problem,
//     age,
//     age_type,
//     gender,
//     loc,
//     critical_case,
//     past_history,
//     symptoms,
//     ercp_advice,
//     event_during_transport,
//     emt,
//   } = data;
//   console.log(data);
//   var color = "white";
//   const hoverColor = critical_case === "yes" ? "red" : "green";
//   const { selectedChat, setSelectedChat } = ChatState();
//   // Determine if this dropdown is currently selected
//   const isSelected = selectedChat === emt;

//   // Toggle selection state of the current dropdown
//   const handleToggle = () => {
//     setSelectedChat(isSelected ? null : emt);
//   };


//   return (
//     <div
//       className={` expanding-box bg-${isSelected ? color : "white"} text-${isSelected ? "white" : "black"}`}
//       >
//       <div
//         className={`expanding-box-header bg-${isSelected ? color : "white"} text-${isSelected ? "white" : "black"}`}
//         onClick={handleToggle}
//         style={{
//           backgroundImage: isSelected
//           ? `linear-gradient(to right, ${color} 100%, #FFFFFF 100%)`
//           : `linear-gradient(to right, ${color} 2.5%, #FFFFFF 2.5%)`,
//           border: isSelected ? "4px solid blue" : "2px solid transparent"
//         }}
//       >
//         <div className="flex-col" 
//         style={{ fontFamily:'Inter, sans-serif',
//         ":hover": {
//           backgroundColor: hoverColor,
//         }
//         }}
//         >
//           <div className="ambu_time">
//           <div class="circle"></div>
//             <span className="ambulance_no"> Ambulance No-{ambulance_no}</span>
//             <span className="admit_time"> {admit_time}</span>
//           </div>
//           <div className="flex py-2 items-center">
//             <span className="problem_patient"> {problem}</span>
//           </div>
//           <div className="flex justify-evenly">
//             <span className="age_patient"> Age - {age} years</span>
//             <span className="agetype_patient"> Age type - {age_type}</span>
//             <span className="gender_patient"> Gender - {gender}</span>
//           </div>
//         </div>
//       </div>

//       {/* {expanded && (
//         <div
//           className="expanding-box-content"
//           style={{ backgroundColor: `${color}` }}
//         >
//         </div>
//       )} */}
//     </div>
//   );
// };

// export default Dropdown;

// import React, { useEffect, useState } from "react";
// import "../index.css";
// import LoremIpsum from "../utils/loremipsum";
// import { ChatState } from "../context/ChatProvider";

// const Dropdown = ({ data }) => {
//   const {
//     ambulance_no,
//     admit_time,
//     problem,
//     age,
//     age_type,
//     gender,
//     loc,
//     critical_case,
//     past_history,
//     symptoms,
//     ercp_advice,
//     event_during_transport,
//     emt,
//   } = data;

//   const [hovered, setHovered] = useState(false);
//   const hoverColor = critical_case === "yes" ? "rgb(244, 183, 183)" : "rgb(169, 235, 169)";
//   const hoverC = critical_case === "yes" ? "red" : "green";
//   const { selectedChat, setSelectedChat } = ChatState();
//   const isSelected = selectedChat === emt;
//   var color ="white"
//   const handleToggle = () => {
//     setSelectedChat(isSelected ? null : emt);
//   };

//   const handleHover = () => {
//     setHovered(!hovered);
//   };

//   return (
//     <div
//       className={`expanding-box bg-${isSelected ? hoverColor : "white"} text-${isSelected ? "white" : "black"}`}
//     >
//       <div
//         className={`expanding-box-header bg-${isSelected ? "white" : "white"} text-${isSelected ? "white" : "black"}`}
//         onClick={handleToggle}
//         style={{
//           backgroundImage: isSelected
//             ? `linear-gradient(to right, ${color} 100%, #FFFFFF 100%)`
//             : `linear-gradient(to right, ${color} 2.5%, #FFFFFF 2.5%)`,
//           border: isSelected ? "4px solid blue" : "2px solid transparent"
//         }}
//       >
//         <div
//           className="flex-col"
//           style={{
//             fontFamily: 'Inter, sans-serif',
//             backgroundColor: hovered ? hoverColor : "transparent",
//           }}
//           onMouseEnter={handleHover}
//           onMouseLeave={handleHover}
//         >
//           <div className="ambu_time">
//           <div className="circle" style={{ width: '20px', height: '20px', borderRadius: '50%', position: 'relative', left: '-40px', top: '20px' ,backgroundColor: hoverC }}></div>
//             <span className="ambulance_no" style={{ color: hovered ? hoverC : "blue" }}> Ambulance No-{ambulance_no}</span>
//             <span className="admit_time"> {admit_time}</span>
//           </div>
//           <div className="flex py-2 items-center">
//             <span className="problem_patient"> {problem}</span>
//           </div>
//           <div className="flex justify-evenly">
//             <span className="age_patient"> Age - {age} years</span>
//             <span className="agetype_patient"> Age type - {age_type}</span>
//             <span className="gender_patient"> Gender - {gender}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dropdown;

// import React, { useEffect, useState } from "react";
// import "../index.css";
// import LoremIpsum from "../utils/loremipsum";
// import { ChatState } from "../context/ChatProvider";

// const Dropdown = ({ data }) => {
//   const {
//     ambulance_no,
//     admit_time,
//     problem,
//     age,
//     age_type,
//     gender,
//     loc,
//     critical_case,
//     past_history,
//     symptoms,
//     ercp_advice,
//     event_during_transport,
//     emt,
//   } = data;

//   const [hovered, setHovered] = useState(false);
//   const hoverColor = critical_case === "yes" ? "rgb(244, 183, 183)" : "rgb(169, 235, 169)";
//   const hoverC = critical_case === "yes" ? "red" : "green";
//   const { selectedChat, setSelectedChat } = ChatState();
//   const isSelected = selectedChat === emt;
//   const [showProblemDetails, setShowProblemDetails] = useState(false);
//   var color = "white"
//   const handleToggle = () => {
//     setSelectedChat(isSelected ? null : emt);
//   };

//   const handleHover = () => {
//     setHovered(!hovered);
//   };

//   return (
//     <div
//       className={`expanding-box bg-${isSelected ? hoverColor : "white"} text-${isSelected ? "white" : "black"}`}
//     >
//       <div
//         className={`expanding-box-header bg-${isSelected ? "white" : "white"} text-${isSelected ? "white" : "black"}`}
//         onClick={handleToggle}
//         style={{
//           backgroundImage: isSelected
//             ? `linear-gradient(to right, ${color} 100%, #FFFFFF 100%)`
//             : `linear-gradient(to right, ${color} 2.5%, #FFFFFF 2.5%)`,
//           border: isSelected ? "4px solid blue" : "2px solid transparent"
//         }}
//       >
//         <div
//           className="flex-col"
//           style={{
//             fontFamily: 'Inter, sans-serif',
//             backgroundColor: hovered ? hoverColor : "transparent",
//           }}
//           onMouseEnter={handleHover}
//           onMouseLeave={handleHover}
//           onMouseEnter={() => setShowProblemDetails(true)}
//           onMouseLeave={() => setShowProblemDetails(false)}
//         >
//           <div className="ambu_time">
//             <div className="circle" style={{ width: '20px', height: '20px', borderRadius: '50%', position: 'relative', left: '-40px', top: '20px' ,backgroundColor: hoverC }}></div>
//             <span className="ambulance_no" style={{ color: hovered ? hoverC : "blue" }}> Ambulance No-{ambulance_no}</span>
//             <span className="admit_time"> {admit_time}</span>
//           </div>
//           <div className="flex py-2 items-center">
//             <span
//               className="problem_patient"
//             >
//               {showProblemDetails ? problem : "What is the problem?"}
//             </span>
//           </div>
//           <div className="flex justify-evenly">
//             <span className="age_patient"> Age - {age} years</span>
//             <span className="agetype_patient"> Age type - {age_type}</span>
//             <span className="gender_patient"> Gender - {gender}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dropdown;



import React, { useEffect, useState } from "react";
import "../index.css";
import LoremIpsum from "../utils/loremipsum";
import { ChatState } from "../context/ChatProvider";

const Dropdown = ({ data }) => {
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

  const [hovered, setHovered] = useState(false);
  const [showProblemDetails, setShowProblemDetails] = useState(false);
  const hoverColor = critical_case === "yes" ? "rgb(244, 183, 183)" : "rgb(169, 235, 169)";
  const hoverC = critical_case === "yes" ? "red" : "green";
  const { selectedChat, setSelectedChat } = ChatState();
  const isSelected = selectedChat === emt;
  var color = "white"
  const handleToggle = () => {
    setSelectedChat(isSelected ? null : emt);
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
          border: isSelected ? "4px solid blue" : "2px solid transparent"
        }}
      >
        <div
          className="flex-col"
          style={{
            fontFamily: 'Inter, sans-serif',
            backgroundColor: hovered ? hoverColor : "transparent",
          }}
        >
          <div className="ambu_time">
            <div className="circle" style={{ width: '20px', height: '20px', borderRadius: '50%', position: 'relative', left: '-40px', top: '20px' ,backgroundColor: hoverC }}></div>
            <span className="ambulance_no" style={{ color: hovered ? hoverC : "blue" }}> Ambulance No-{ambulance_no}</span>
            <span className="admit_time"> {admit_time}</span>
          </div>
          <div className="flex py-2 items-center">
            <span
              className="problem_patient"
            >
              {showProblemDetails ? problem : "What is the problem?"}
            </span>
          </div>
          <div className="flex justify-evenly">
            <span className="age_patient"> Age - {age} years</span>
            <span className="agetype_patient"> Age type - {age_type}</span>
            <span className="gender_patient"> Gender - {gender}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
