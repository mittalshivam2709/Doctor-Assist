// // import "../index.css";
// // import logo from "../logo.png"
// // import DoctorLogo from "../components/DoctorLogo";

// // const Navbar = ({username}) => {
// //     return (
// //       <div className="custom-navbar">
// //         {/* <div>p</div> */}
// //         <div className="flex items-center">
// //         <img src={logo} alt="Logo" className = "emri_logo" />
// //         </div>
// //       </div>
// //     );
// //   };

// //   export default Navbar;

// import React, { useState } from 'react'
// import '../index.css'
// import logo from '../logo.png'
// import DoctorLogo from '../components/DoctorLogo'
// import { Link } from 'react-router-dom'

// const Navbar = ({ username }) => {
//   const [dropdownOpen, setDropdownOpen] = useState(false)

//   const toggleDropdown = () => {
//     setDropdownOpen(!dropdownOpen)
//   }

//   return (
//     <div className="custom-navbar">
//       <div className="flex justify-between items-center">
//         <div className="flex items-center">
//           <img src={logo} alt="Logo" className="emri_logo" />
//           <h2>{username}</h2>
//         </div>
//         {/* <div className="relative"> */}
//         <div className="absolute right-5">
//           <button
//             onClick={toggleDropdown}
//             className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
//           >
//             Menu
//           </button>
//           {dropdownOpen && (
//             <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
//               <Link to="/profile">
//                 <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
//                   Profile
//                 </button>
//               </Link>
//               <Link to="/passwordreset">
//                 <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"></button>
//                 Reset Password
//               </Link>
//               <Link to="/">
//                 <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
//                   Logout
//                 </button>
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Navbar

import React, { useState } from 'react'
import { Link } from 'react-router-dom' // Import Link from react-router-dom
import '../index.css'
import logo from '../logo.png'
import DoctorLogo from '../components/DoctorLogo'
import { useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import '../loginpage.css'
import { ChatState } from '../context/ChatProvider'
import { useQuery } from '@apollo/client' // NOT USE lazy QUERY
import { FETCH_USER_DETAILS } from '../gqloperations/queries'

const Navbar = ({ username }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  const { user, selectedChat } = ChatState()

  const { loading, data, refetch } = useQuery(FETCH_USER_DETAILS, {
    variables: { id: user },
  })

  const [doctor, setdoctor] = useState([])
  useEffect(() => {
    console.log('init fetch')
    refetch().then((response) => {
      const resp = response?.data?.getUserByUsername
      console.log('hi', resp)
      //   if (resp && resp.length > 0) {
      console.log(resp.length)
      console.log('inside')
      setdoctor(resp)
      //   }
    })
  }, [])
  const { doctor_name, doctor_mobile, doctor_visit, doctor_degree } = doctor

  return (
    <div className="custom-navbar">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="emri_logo" />
          <h2>{username}</h2>
        </div>
        <div className="absolute right-5">
          <button
            onClick={toggleDropdown}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            {doctor_name}
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
              <Link to="/profile">
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                  Profile
                </button>
              </Link>
              <Link to="/passwordreset">
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                  Reset Password
                </button>
              </Link>
              <Link to="/">
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                  Logout
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
