// // import React, { useEffect, useState } from "react";
// // import { ChatState } from "../context/ChatProvider";
// // const Dropdownadmin = ({ data }) => {
// //   const [hovered, setHovered] = useState(false);                                    // ambulance no color+dot
// //   const { selectedChat, setSelectedChat, setSelectedPatient } = ChatState();
// //   const isSelected = selectedChat === emt;
// //   var color = "white"
// //   const handleToggle = () => {
// //     setSelectedChat(isSelected ? null : emt);
// //     setSelectedPatient(isSelected ? null : data);
// //   };

// //   const handleHover = (isHovered) => {
// //     setHovered(isHovered);
// //     // setShowProblemDetails(isHovered);
// //   };
  
// //   return (
// //     <div
// //       className={`expanding-box bg-${isSelected ? hoverColor : "white"} text-${isSelected ? "white" : "black"}`}
// //       onMouseEnter={() => handleHover(true)}
// //       onMouseLeave={() => handleHover(false)}
// //     >
// //       <div
// //         className={`expanding-box-header bg-${isSelected ? "white" : "white"} text-${isSelected ? "white" : "black"}`}
// //         onClick={isSelected ? null: handleToggle}
// //         style={{
// //           backgroundImage: isSelected
// //             ? `linear-gradient(to right, ${color} 100%, #FFFFFF 100%)`
// //             : `linear-gradient(to right, ${color} 2.5%, #FFFFFF 2.5%)`,
// //           border: isSelected ? "2px solid blue" : "2px solid transparent",
// //           background: hovered? hoverC:"white",
// //           backgroundColor: "transparent"
// //         }}
// //       >
// //         <div
// //           className="flex-col"
// //           style={{
// //             fontFamily: 'Poppins, sans-serif',
// //             backgroundColor: "transparent",
// //           }}
// //         >
// //           <div className=" flex flex-col md:flex-row justify-between">
            
// //             <div className=" flex items-center">
// //             <div  style={{ width: '20px', height: '20px', borderRadius: '50%', position: 'relative', right: '8px',backgroundColor: hoverColor}}></div>
// //             <div className=""  style={{ color: hovered ? hoverColor : "#5555FB" ,width :'200px', fontWeight:600}}>Ambulance No: {ambulance_no}</div>
// //             </div>
// //             <div className="text-xs" style={{color:"#929292"}} >{admit_time}</div>
// //           </div>
// //           <div className="flex py-2 items-center" style={{fontWeight:400}}>
// //             <span
// //               className="problem_patient" style={{color:"#6F6B6B"}}
// //             >
// //               {problem}
// //             </span>
// //           </div>
// //           <div className="flex justify-between text-sm" style={{fontWeight: 400}}>
// //             <span className="age_patient text-xs" style={{color:"#929292"}}> Age - {age} years</span>
// //             <span className="agetype_patient text-xs" style={{color:"#929292"}}> Age type - {age_type}</span>
// //             <span className="gender_patient text-xs" style={{color:"#929292"}}> Gender - {gender}</span>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Dropdownadmin;
// // import React, { useEffect, useState } from "react";
// // import { ChatState } from "../context/ChatProvider";

// // const Dropdownadmin = ({ options }) => {
// //   const [hovered, setHovered] = useState(false);
// //   const { selectedChat, setSelectedChat, setSelectedPatient } = ChatState();
// //   const isSelected = selectedChat === data; // Checking against the received data
// //   // const hoverColor = "#yourHoverColor"; // Define your hover color here
// //   var color = "white";

// //   const handleToggle = () => {
// //     setSelectedChat(isSelected ? null : data);
// //     setSelectedPatient(isSelected ? null : data);
// //   };

// //   const handleHover = (isHovered) => {
// //     setHovered(isHovered);
// //   };
  
// //   return (
// //     <div
// //       className={`expanding-box bg-${isSelected ? hoverColor : "white"} text-${isSelected ? "white" : "black"}`}
// //       onMouseEnter={() => handleHover(true)}
// //       onMouseLeave={() => handleHover(false)}
// //     >
// //       <div
// //         className={`expanding-box-header bg-${isSelected ? "white" : "white"} text-${isSelected ? "white" : "black"}`}
// //         onClick={isSelected ? null : handleToggle}
// //         style={{
// //           backgroundImage: isSelected
// //             ? `linear-gradient(to right, ${color} 100%, #FFFFFF 100%)`
// //             : `linear-gradient(to right, ${color} 2.5%, #FFFFFF 2.5%)`,
// //           border: isSelected ? "2px solid blue" : "2px solid transparent",
// //           background: hovered ? hoverColor : "white",
// //           backgroundColor: "transparent"
// //         }}
// //       >
// //         <div
// //           className="flex-col"
// //           style={{
// //             fontFamily: 'Poppins, sans-serif',
// //             backgroundColor: "transparent",
// //           }}
// //         >
// //           <div className=" flex flex-col md:flex-row justify-between">
            
// //             <div className=" flex items-center">
// //               <div style={{ width: '20px', height: '20px', borderRadius: '50%', position: 'relative', right: '8px', backgroundColor: hoverColor}}></div>
// //               <div className=""  style={{ color: hovered ? hoverColor : "#5555FB" ,width :'200px', fontWeight:600}}>
// //                 {data === 'Form' ? 'Form' : 'Protocol'}
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Dropdownadmin;

// // import React, { useEffect, useState } from "react";
// // import { ChatState } from "../context/ChatProvider";

// // const Dropdownadmin = ({ options }) => {
// //   const [hovered, setHovered] = useState(false);
// //   const { selectedChat, setSelectedChat, setSelectedPatient } = ChatState();
// //   const hoverColor = "#C7CFFF"; // Define your hover color here
// //   var color = "white";

// //   const handleToggle = (data) => {
// //     setSelectedChat(selectedChat === data ? null : data);
// //     setSelectedPatient(selectedChat === data ? null : data);
// //   };

// //   const handleHover = (isHovered) => {
// //     setHovered(isHovered);
// //   };
  
// //   return (
// //     <div>
// //       {options.map((data, index) => (
// //         <div
// //           key={index}
// //           className={`expanding-box bg-${selectedChat === data ? hoverColor : "white"} text-${selectedChat === data ? "white" : "black"}`}
// //           onMouseEnter={() => handleHover(true)}
// //           onMouseLeave={() => handleHover(false)}
// //           onClick={() => handleToggle(data)}
// //           style={{
// //             backgroundImage: selectedChat === data
// //               ? `linear-gradient(to right, ${color} 100%, #FFFFFF 100%)`
// //               : `linear-gradient(to right, ${color} 2.5%, #FFFFFF 2.5%)`,
// //             border: selectedChat === data ? "2px solid blue" : "2px solid transparent",
// //             background: hovered ? hoverColor : "white",
// //             backgroundColor: "transparent"
// //           }}
// //         >
// //           <div
// //             className="expanding-box-header bg-white text-black"
// //             style={{
// //               fontFamily: 'Poppins, sans-serif',
// //               backgroundColor: "transparent",
// //             }}
// //           >
// //             <div className="flex-col">
// //               <div className="flex flex-col md:flex-row justify-between">
// //                 <div className="flex items-center">
// //                   <div style={{ color: hovered ? 'blue' : "#5555FB" ,width :'200px', fontWeight:600}}>
// //                     {data}
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // };

// // export default Dropdownadmin;

// // import React, { useState } from "react";

// // const Dropdownadmin = ({ options }) => {
// //   const [hovered, setHovered] = useState(false);

// //   const handleHover = (isHovered) => {
// //     setHovered(isHovered);
// //   };

// //   const hoverColor = "#C7CFFF"; // Define your hover color here

// //   return (
// //     <div>
// //       {options.map((data, index) => (
// //         <div
// //           key={index}
// //           className={`expanding-box bg-${hovered ? hoverColor : "white"} text-black`}
// //           onMouseEnter={() => handleHover(true)}
// //           onMouseLeave={() => handleHover(false)}
// //           style={{
// //             backgroundColor: "transparent",
// //             border: hovered ? "2px solid blue" : "2px solid transparent",
// //           }}
// //         >
// //           <div
// //             className="expanding-box-header bg-white text-black"
// //             style={{
// //               fontFamily: 'Poppins, sans-serif',
// //               backgroundColor: "transparent",
// //             }}
// //           >
// //             <div className="flex-col">
// //               <div className="flex flex-col md:flex-row justify-between">
// //                 <div className="flex items-center">
// //                   <div style={{ width: '200px', fontWeight: 600 }}>{data}</div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // };

// // export default Dropdownadmin;

import React, { useState } from "react";

// const Dropdownadmin = ({ options }) => {
//   const [hoveredIndexes, setHoveredIndexes] = useState([]);

//   const handleHover = (index, isHovered) => {
//     const newHoveredIndexes = [...hoveredIndexes];
//     if (isHovered) {
//       newHoveredIndexes.push(index);
//     } else {
//       newHoveredIndexes.splice(newHoveredIndexes.indexOf(index), 1);
//     }
//     setHoveredIndexes(newHoveredIndexes);
//   };

//   const hoverColor = "#C7CFFF"; // Define your hover color here

//   return (
//     <div>
//       {options.map((data, index) => (
//         <div
//           key={index}
//           className={`expanding-box bg-${hoveredIndexes.includes(index) ? hoverColor : "white"} text-black`}
//           onMouseEnter={() => handleHover(index, true)}
//           onMouseLeave={() => handleHover(index, false)}
//           style={{
//             backgroundColor: "transparent",
//             border: hoveredIndexes.includes(index) ? "2px solid blue" : "2px solid transparent",
//           }}
//         >
//           <div
//             className="expanding-box-header bg-white text-black"
//             style={{
//               fontFamily: 'Poppins, sans-serif',
//               backgroundColor: "transparent",
//             }}
//           >
//             <div className="flex-col">
//               <div className="flex flex-col md:flex-row justify-between">
//                 <div className="flex items-center">
//                   <div style={{ width: '200px', fontWeight: 600 }}>{data}</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Dropdownadmin;

const Dropdownadmin = ({ options }) => {
  const [hoveredIndexes, setHoveredIndexes] = useState([]);

  const handleHover = (index, isHovered) => {
    const newHoveredIndexes = [...hoveredIndexes];
    if (isHovered) {
      newHoveredIndexes.push(index);
    } else {
      newHoveredIndexes.splice(newHoveredIndexes.indexOf(index), 1);
    }
    setHoveredIndexes(newHoveredIndexes);
  };

  const hoverColor = "#C7CFFF"; // Define your hover color here

  return (
    <div>
      {options.map((data, index) => (
        <div
          key={index}
          className={`expanding-box bg-${hoveredIndexes.includes(index) ? hoverColor : "white"} text-black`}
          onMouseEnter={() => handleHover(index, true)}
          onMouseLeave={() => handleHover(index, false)}
          style={{
            backgroundColor: "transparent",
            border: hoveredIndexes.includes(index) ? "2px solid blue" : "2px solid transparent",
          }}
        >
          <div
            className="expanding-box-header bg-white text-black"
            style={{
              fontFamily: 'Poppins, sans-serif',
              backgroundColor: "transparent",
              height:'128px',
              width:"353px"
            }}
          >
            <div className="flex-col">
              <div className="flex flex-col md:flex-row justify-between">
                <div className="flex items-center">
                  <div style={{ width: '353px', fontWeight: 600 }}>{data}</div>
                  {hoveredIndexes.includes(index) && (
                    <div style={{ fontSize: 12, color: "#999" }}>{data}
                    <p style={{position:'relative',left:'-50px'}}>hello</p>
                    </div>
                    // <div><p>hello</p></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dropdownadmin;
