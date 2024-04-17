import React, { useEffect, useState } from 'react'
import { ChatState } from '../context/ChatProvider'
import docion from '../docicon.png'
import { DELETE_DOCUMENT } from '../gqloperations/mutations'
import deleteicon from '../delete.png'
import { useMutation } from '@apollo/client'
import { Link } from 'react-router-dom' // Import Link from react-router-dom

import '../admin.css'
// similar to dropdownjs

// const Document = ({}) => {
const Document = ({ data }) => {
  const { admin_email, document_url, document_no, document_name,active_to_train, admit_time } =
    data

  let hoverColor = ''
  let hoverC = ''
  const [hovered, setHovered] = useState(false)

  // const { selectedChat, setSelectedChat, setSelectedPatient } = ChatState()
  // const isSelected = selectedChat === emt
  var color = 'white'

  const handleToggle = () => {
    setSelectedChat(isSelected ? null : emt)
    setSelectedPatient(isSelected ? null : data)
  }

  const handleHover = (isHovered) => {
    setHovered(isHovered)
    // setShowProblemDetails(isHovered);
  }

  const [dropdownOpen, setDropdownOpen] = useState(false)

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  const changeactivityastatus = (status) => {
    
  }
  const handledelete = () => {}
  return (
    <div className="parentdocument">
      <div className="left">
        <img src={docion} alt="Icon" />
        {document_name}
      </div>
      <div className="right">
        {admit_time}
        <button onClick={handledelete}>
          <img src={deleteicon} alt="Image 1" />
        </button>
        <button>
          <button onClick={toggleDropdown}>
            <div className="threedots">
              <div className="onedot"></div>
              <div className="onedot"></div>
              <div className="onedot"></div>
            </div>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
              <button
                className={`block w-full text-left px-4 py-2 text-sm ${
                  active_to_train === '1'
                    ? 'bg-gray-200 text-gray-900'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
                onClick={changeactivityastatus('1')}
              >
                Active to Train
              </button>
              <button
                className={`block w-full text-left px-4 py-2 text-sm ${
                  active_to_train === '0'
                    ? 'bg-gray-200 text-gray-900'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
                onClick={changeactivityastatus('0')}
              >
                Inactive to Train
              </button>
            </div>
          )}
        </button>
      </div>
    </div>
  )
}

export default Document
