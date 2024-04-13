import React, { useEffect, useState } from 'react'
import { ChatState } from '../context/ChatProvider'
import { judgeCriticality } from '../utils/criticalityJudgement'
import docion from '../docion.png'
import deleteicon from '../deleteicon.png' 

// similar to dropdownjs

const Protocol = ({ data }) => {
  const {
    admin_email,
    document_url,
    protocol_no,
    created_at,
  } = data

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
    <div>
        <img src={docion} alt="document-icon" />
        
        <img src={deleteicon} alt="delete-icon" />

    </div>
  )
}

export default Protocol
