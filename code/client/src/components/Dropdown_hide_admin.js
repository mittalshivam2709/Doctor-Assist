// import React, { useEffect, useState } from 'react'
// import { ChatState } from '../context/ChatProvider'
// const Dropdown_hide_admin = ({ options }) => {
//   const [hovered, setHovered] = useState(false)
//   const { selectedChat, setSelectedChat, setSelectedPatient } = ChatState()
//   const isSelected = selectedChat === emt
//   var color = "white";
//   const handleToggle = () => {
//     setSelectedChat(isSelected ? null : emt)
//     setSelectedPatient(isSelected ? null : data)
//   }
//   // const [firstNameLetter] = name.split(' ').map(namePart => namePart[0])
//   const handleHover = (isHovered) => {
//     setHovered(isHovered)
//   }

//   return (
//     <div
//       className={`expanding-box bg-${isSelected ? hoverC : hoverColor} text-${
//         isSelected ? 'white' : 'black'
//       }`}
//       style={{backgroundColor:hoverColor}}
//       onMouseEnter={() => handleHover(true)}
//       onMouseLeave={() => handleHover(false)}
//     >
//       <div
//         className={`expanding-box-header bg-${
//           isSelected ? hoverC : hoverColor
//         } text-${isSelected ? 'white' : 'black'}`}
//         onClick={isSelected ? null: handleToggle}
//         style={{
//           backgroundImage: isSelected
//             ? `linear-gradient(to right, ${hoverC} 100%, #FFFFFF 100%)`
//             : `linear-gradient(to right, ${hoverC} 2.5%, #FFFFFF 2.5%)`,
//           border: isSelected ? '2px solid blue' : '2px solid transparent',
//           background: hovered ? hoverC : (isSelected ? hoverC : hoverColor),
//           backgroundColor: isSelected ? hoverC : (hovered ? hoverC : hoverColor)     }}
//       >
//         <div
//           className="flex-col"
//         >
//           <div className=" flex flex-col md:flex-row justify-between">
//             <div className=" flex items-center">
              
//             <div
//                 className=""
//                 style={{
//                   color: hovered ? hoverColor : 'black',
//                   width: '10px',
//                   fontWeight: 600,
//                 }}
//               >
//                 {"F"}
//               </div>
//               <div
//                 className=""
//                 style={{
//                   color: hovered ? hoverColor : 'black',
//                   width: '10px',
//                   marginLeft:"2px",
//                   fontWeight: 600,
//                 }}
//               >
//                 {"P"}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Dropdown_hide_admin
// import React, { useEffect, useState } from 'react'
// import { ChatState } from '../context/ChatProvider'

// const Dropdown_hide_admin = ({ options }) => {
//   const [hovered, setHovered] = useState(false)
//   const { selectedChat, setSelectedChat, setSelectedPatient } = ChatState()
//   const isSelected = selectedChat === emt
//   const hoverColor = "#yourHoverColor"; // Define your hover color here
//   const hoverC = "#yourHoverColor"; // Define your hover color here
//   var color = "white";
  
//   const handleToggle = () => {
//     setSelectedChat(isSelected ? null : emt)
//     setSelectedPatient(isSelected ? null : data)
//   }
  
//   const handleHover = (isHovered) => {
//     setHovered(isHovered)
//   }

//   return (
//     <div
//       className={`expanding-box bg-${isSelected ? hoverC : hoverColor} text-${
//         isSelected ? 'white' : 'black'
//       }`}
//       style={{backgroundColor:hoverColor}}
//       onMouseEnter={() => handleHover(true)}
//       onMouseLeave={() => handleHover(false)}
//     >
//       <div
//         className={`expanding-box-header bg-${
//           isSelected ? hoverC : hoverColor
//         } text-${isSelected ? 'white' : 'black'}`}
//         onClick={isSelected ? null: handleToggle}
//         style={{
//           backgroundImage: isSelected
//             ? `linear-gradient(to right, ${hoverC} 100%, #FFFFFF 100%)`
//             : `linear-gradient(to right, ${hoverC} 2.5%, #FFFFFF 2.5%)`,
//           border: isSelected ? '2px solid blue' : '2px solid transparent',
//           background: hovered ? hoverC : (isSelected ? hoverC : hoverColor),
//           backgroundColor: isSelected ? hoverC : (hovered ? hoverC : hoverColor)     }}
//       >
//         <div
//           className="flex-col"
//         >
//           <div className=" flex flex-col md:flex-row justify-between">
//             <div className=" flex items-center">
//               {options.map((option, index) => (
//                 <div
//                   key={index}
//                   style={{
//                     display: 'inline-block',
//                     width: '20px',
//                     height: '20px',
//                     borderRadius: '50%',
//                     backgroundColor: isSelected ? hoverC : (hovered ? hoverC : hoverColor),
//                     marginRight: '5px',
//                     textAlign: 'center',
//                     lineHeight: '20px',
//                     fontWeight: '600',
//                     color: hovered ? hoverColor : 'black',
//                   }}
//                 >
//                   {option.charAt(0)}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Dropdown_hide_admin
// import React, { useEffect, useState } from 'react'
// import { ChatState } from '../context/ChatProvider'

// const Dropdown_hide_admin = ({ options }) => {
//   const [hovered, setHovered] = useState(false)
//   const { selectedChat, setSelectedChat, setSelectedPatient } = ChatState()
//   const hoverColor = "#yourHoverColor"; // Define your hover color here
//   const hoverC = "#yourHoverColor"; // Define your hover color here
//   var color = "white";
  
//   const handleToggle = (data) => {
//     setSelectedChat(selectedChat === data ? null : data)
//     setSelectedPatient(selectedChat === data ? null : data)
//   }
  
//   const handleHover = (isHovered) => {
//     setHovered(isHovered)
//   }

//   return (
//     <div
//       className={`expanding-box bg-${selectedChat ? hoverC : hoverColor} text-${
//         selectedChat ? 'white' : 'black'
//       }`}
//       style={{backgroundColor:hoverColor}}
//       onMouseEnter={() => handleHover(true)}
//       onMouseLeave={() => handleHover(false)}
//     >
//       <div
//         className={`expanding-box-header bg-${
//           selectedChat ? hoverC : hoverColor
//         } text-${selectedChat ? 'white' : 'black'}`}
//         onClick={() => handleToggle(null)}
//         style={{
//           backgroundImage: selectedChat
//             ? `linear-gradient(to right, ${hoverC} 100%, #FFFFFF 100%)`
//             : `linear-gradient(to right, ${hoverC} 2.5%, #FFFFFF 2.5%)`,
//           border: selectedChat ? '2px solid blue' : '2px solid transparent',
//           background: hovered ? hoverC : (selectedChat ? hoverC : hoverColor),
//           backgroundColor: selectedChat ? hoverC : (hovered ? hoverC : hoverColor)     }}
//       >
//         <div
//           className="flex-col"
//         >
//           <div className=" flex flex-col md:flex-row justify-between">
//             <div className=" flex items-center">
//               {options.map((option, index) => (
//                 <div
//                   key={index}
//                   style={{
//                     display: 'inline-block',
//                     width: '20px',
//                     height: '20px',
//                     borderRadius: '50%',
//                     backgroundColor: selectedChat ? hoverC : (hovered ? hoverC : hoverColor),
//                     marginRight: '5px',
//                     textAlign: 'center',
//                     lineHeight: '20px',
//                     fontWeight: '600',
//                     color: hovered ? hoverColor : 'black',
//                   }}
//                   onClick={() => handleToggle(option)}
//                 >
//                   {option.charAt(0)}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Dropdown_hide_admin
import React, { useState } from "react";

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
    <div className="flex space-x-4"> {/* Added flexbox for spacing */}
      {options.map((data, index) => (
        <div
          key={index}
          className={`flex items-center justify-center rounded-full h-12 w-12 bg-${
            hoveredIndexes.includes(index) ? hoverColor : "white"
          } text-black`}
          onMouseEnter={() => handleHover(index, true)}
          onMouseLeave={() => handleHover(index, false)}
          style={{ border: "2px solid transparent" }}
        >
          {hoveredIndexes.includes(index) && (
            <span className="text-white font-bold text-lg">
              {data.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default Dropdownadmin;
