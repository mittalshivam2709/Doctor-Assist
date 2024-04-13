import React, { useEffect, useState } from 'react'
import { ChatState } from '../context/ChatProvider'
import docion from '../docicon.png'
import deleteicon from '../delete.png'

// similar to dropdownjs

const Protocol = ({ data }) => {
  const { admin_email, document_url, document_no, created_at } = data

  let hoverColor = ''
  let hoverC = ''
  const [hovered, setHovered] = useState(false)
  const { selectedChat, setSelectedChat, setSelectedPatient } = ChatState()
  const isSelected = selectedChat === emt
  var color = 'white'

  const handleToggle = () => {
    setSelectedChat(isSelected ? null : emt)
    setSelectedPatient(isSelected ? null : data)
  }

  const handleHover = (isHovered) => {
    setHovered(isHovered)
    // setShowProblemDetails(isHovered);
  }

  return (
    <div
      style=
      {{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '844px',
        height: '100px',
        border: '2px dashed #ccc',
        borderRadius: '20px',
        padding: '20px',
        margin: '10px auto',
        cursor: 'pointer',
      }}>
      <img src={docion} alt="document-icon" />

      <img src={deleteicon} alt="delete-icon" />
    </div>
  )
}

export default Protocol
