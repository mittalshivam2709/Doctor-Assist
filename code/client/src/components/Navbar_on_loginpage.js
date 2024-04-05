import React, { useState } from 'react'
import '../index.css'
import logo from '../logo.png'
import { ChatState } from '../context/ChatProvider'
const Navbar_on_loginpage = ({}) => {
  const { user, selectedChat } = ChatState()
  return (
    <div className="custom-navbar">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="emri_logo" />
        </div>
      </div>
    </div>
  )
}
export default Navbar_on_loginpage
