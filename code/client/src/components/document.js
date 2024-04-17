// import React, { useEffect, useState } from 'react'
// import { ChatState } from '../context/ChatProvider'
// import { useForm } from 'react-hook-form'
// import docion from '../doc_icon.png'
// import { DELETE_DOCUMENT } from '../gqloperations/mutations'
// import { CHANGE_STATUS } from '../gqloperations/mutations'
// import deleteicon from '../delete.png'
// import { useMutation } from '@apollo/client'
// import { Link } from 'react-router-dom'
// import '../admin.css'
// // similar to dropdownjs
// // const Document = ({}) => {
// const Document = ({ data }) => {
//   const {document_url,document_name,active_to_train, admit_time} =
//     data
//   const [hovered, setHovered] = useState(false)
//   // console.log(active_to_train)
//   const handleHover = (isHovered) => {
//     setHovered(isHovered)
//   }

//   const [dropdownOpen, setDropdownOpen] = useState(false)

//   const toggleDropdown = () => {
//     setDropdownOpen(!dropdownOpen)
//   }

//   const [changestatus] = useMutation(CHANGE_STATUS)
//   const change_activity_status_to_1 = () => {
//   const newStatus = active_to_train === '0' ? '1' : '0'; 
//    changestatus({
//      variables: {
//        inp: {
//          document_url: document_url,
//          active_to_train: newStatus,
//        },
//      },
//    })
//   }
//   const change_activity_status_to_0 = () => {
//   const newStatus = active_to_train === '1' ? '0' : '1'; 
//    changestatus({
//      variables: {
//        inp: {
//          document_url: document_url,
//          active_to_train: newStatus,
//        },
//      },
//    })
//   }
//   return (
//     <div className="parentdocument">
//       <div className="left">
//         <img src={docion} alt="Icon" />
//         {document_name}
//       </div>
//       <div className="right">
//         {admit_time}
//         <button>
//           <img src={deleteicon} alt="Image 1" />
//         </button>

//           <button onClick={toggleDropdown}>
//             <div className="threedots">
//               <div className="onedot"></div>
//               <div className="onedot"></div>
//               <div className="onedot"></div>
//             </div>
//           </button>
//           </div>
//           {dropdownOpen && (
//             <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
//               <button
//                 className={`block w-full text-left px-4 py-2 text-sm ${
//                   active_to_train === '1'
//                     ? 'bg-gray-200 text-gray-900'
//                     : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
//                 }`}
//                 onClick={change_activity_status_to_1}
//               >
//                 Active to Train
//               </button>
//               <button
//                 className={`block w-full text-left px-4 py-2 text-sm ${
//                   active_to_train === '0'
//                     ? 'bg-gray-200 text-gray-900'
//                     : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
//                 }`}
//                 onClick={change_activity_status_to_0}
//               >
//                 Inactive to Train
//               </button>
//             </div>
//           )}
//     </div>
//   )
// }

// export default Document
// import React, { useState } from 'react';
// import { useMutation } from '@apollo/client';
// import { CHANGE_STATUS } from '../gqloperations/mutations';
// import docion from '../doc_icon.png';
// import deleteicon from '../delete.png';
// import '../admin.css';

// const Document = ({ data }) => {
//   const { document_url, document_name, active_to_train, admit_time } = data;

//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [button1Color, setButton1Color] = useState(active_to_train === '1' ? 'bg-gray-200 text-gray-900' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900');
//   const [button2Color, setButton2Color] = useState(active_to_train === '0' ? 'bg-gray-200 text-gray-900' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900');

//   const toggleDropdown = () => {
//     setDropdownOpen(!dropdownOpen);
//   };

//   const [changestatus] = useMutation(CHANGE_STATUS);

//   const change_activity_status = (status) => {
//     const newStatus = status === '1' ? '0' : '1';
//     changestatus({
//       variables: {
//         inp: {
//           document_url: document_url,
//           active_to_train: newStatus,
//         },
//       },
//     });
//     // Close dropdown after clicking
//     setDropdownOpen(false);
//     // Change button colors
//     if (newStatus === '1') {
//       setButton1Color('bg-gray-200 text-gray-900');
//       setButton2Color('text-gray-700 hover:bg-gray-100 hover:text-gray-900');
//     } else {
//       setButton1Color('text-gray-700 hover:bg-gray-100 hover:text-gray-900');
//       setButton2Color('bg-gray-200 text-gray-900');
//     }
//   };

//   return (
//     <div className="parentdocument">
//       <div className="left">
//         <img src={docion} alt="Icon" />
//         {document_name}
//       </div>
//       <div className="right">
//         {admit_time}
//         <button>
//           <img src={deleteicon} alt="Delete" />
//         </button>

//         <button onClick={toggleDropdown}>
//           <div className="threedots">
//             <div className="onedot"></div>
//             <div className="onedot"></div>
//             <div className="onedot"></div>
//           </div>
//         </button>
//       </div>
//       {dropdownOpen && (
//         <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
//           <button
//             className={`block w-full text-left px-4 py-2 text-sm ${button1Color}`}
//             onClick={() => change_activity_status('1')}
//           >
//             Active to Train
//           </button>
//           <button
//             className={`block w-full text-left px-4 py-2 text-sm ${button2Color}`}
//             onClick={() => change_activity_status('0')}
//           >
//             Inactive to Train
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Document;

import React, { useState, useEffect, useRef } from 'react';
import { useMutation } from '@apollo/client';
import { CHANGE_STATUS } from '../gqloperations/mutations';
import docion from '../doc_icon.png';
import deleteicon from '../delete.png';
import '../admin.css';
import threedots from '../threeDots.png';
const Document = ({ data }) => {
  const { document_url, document_name, active_to_train, admit_time,last_update_time } = data;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [button1Color, setButton1Color] = useState(active_to_train === '1' ? 'bg-gray-200 text-gray-900' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900');
  const [button2Color, setButton2Color] = useState(active_to_train === '0' ? 'bg-gray-200 text-gray-900' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900');

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const [changestatus] = useMutation(CHANGE_STATUS);

  const change_activity_status1 = (status) => {
    const newStatus = '1';
    if (status == '0'){
    changestatus({
      variables: {
        inp: {
          document_url: document_url,
          active_to_train: newStatus,
        },
      },
    });
  }
    setDropdownOpen(false);
    if(status == '0')
    {
      setButton1Color('bg-gray-200 text-gray-900');
      setButton2Color('text-gray-700 hover:bg-gray-100 hover:text-gray-900');
    }
  };
  const change_activity_status2 = (status) => {
    const newStatus = '0';
    if (status == '1'){
    changestatus({
      variables: {
        inp: {
          document_url: document_url,
          active_to_train: newStatus,
        },
      },
    });
  }
    setDropdownOpen(false);
    if(status == '1'){
      setButton1Color('text-gray-700 hover:bg-gray-100 hover:text-gray-900');
      setButton2Color('bg-gray-200 text-gray-900');
    }
  };
  function extractDate(dateString) {
    const parts = dateString.split('/');
    const datePart = parts[1];
    const dateParts = datePart.split('-');
    const day = dateParts[0];
    const month = dateParts[1];
    const year = dateParts[2];
    const formattedDate = `${day}th ${getMonthName(parseInt(month, 10))}, ${year}`;
    return formattedDate;
  }
  function getMonthName(monthNumber) {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[monthNumber - 1];
  }  
  return (
    <div className="parentdocument">
      <div className="left">
        <img src={docion} alt="Icon" />
        {document_name}
      </div>
      <div className="right">
        {admit_time === last_update_time ? (
        <p>{extractDate(admit_time)}</p>) : (
        <p>Opened {extractDate(last_update_time)}</p>)}
        <button>
          <img src={deleteicon} alt="Delete" />
        </button>
        <button onClick={toggleDropdown}>
        <img src={threedots} alt="Dropdown" />
        </button>
      </div>
      {dropdownOpen && (
        <div ref={dropdownRef} className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
          <button
            className={`block w-full text-left px-4 py-2 text-sm ${button1Color}`}
            onClick={() => change_activity_status1(active_to_train)}
          >
            Active to Train
          </button>
          <button
            className={`block w-full text-left px-4 py-2 text-sm ${button2Color}`}
            onClick={() => change_activity_status2(active_to_train)}
          >
            Inactive to Train
          </button>
        </div>
      )}
    </div>
  );
};

export default Document;
