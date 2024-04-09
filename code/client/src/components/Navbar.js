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
  const navigate = useNavigate()
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  const { user, selectedChat } = ChatState()
  // const email="doctor1@gmail.com"
  const authdata = JSON.parse(localStorage.getItem('authdata'));
  const email = authdata ? authdata.email : '';
  // Then use the email variable in your code where needed
    const { loading, data, refetch } = useQuery(FETCH_USER_DETAILS, {
    variables: { email },
  })

  const [doctor, setdoctor] = useState([])
  useEffect(() => {
    refetch().then((response) => {
      const resp = response?.data?.getUserByEmail
      setdoctor(resp)
      //   }
    })
  }, [])
  const { doctor_name} = doctor
  const handleLogout = () => {
    localStorage.removeItem('authdata');
    navigate('/');
  };
  return (
    <div className="custom-navbar">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="emri_logo" />
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
              <Link to="/home">
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                  Home
                </button>
              </Link>
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
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
