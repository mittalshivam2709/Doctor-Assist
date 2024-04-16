import React, { useEffect, useState } from 'react'
import { ChatState } from '../context/ChatProvider'
import docion from '../docicon.png'
import { DELETE_DOCUMENT } from '../gqloperations/mutations'
import deleteicon from '../delete.png'
import { useMutation } from '@apollo/client'

import '../admin.css'
// similar to dropdownjs

// const Document = ({}) => {
const Document = ({ data }) => {
  const { admin_email, document_url, document_no, document_name, admit_time } =
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


  const handletoggleforactive = () => {}
  
  const handledelete = () => {
  
  }
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
          <div
            className="threedots"
            onClick={handletoggleforactive} // Add onClick event to handle button click
          >
            <div className="onedot"></div>
            <div className="onedot"></div>
            <div className="onedot"></div>
          </div>
        </button>
      </div>
    </div>

    // <div className="parentdocument">
    //   <img
    //     style={{ width: '40px', height: '40px' }}
    //     src={docion}
    //     alt="document-icon"
    //   />
    //   <p style={{ whiteSpace: 'nowrap' }}>
    //     {document_name} {admit_time}
    //   </p>
    //   {/* Remove single quotes around placeholders */}
    //   <button
    //     onClick={handledelete}
    //     style={{
    //       marginLeft: '950px',
    //     }}
    //   >
    //     <img
    //       style={{
    //         width: '40px',
    //         height: '40px',
    //       }}
    //       src={deleteicon}
    //       alt="delete-icon"
    //     />
    //   </button>
    //   {/* button for 1 and 0 */}
    //   <div
    //     className="threedots"
    //     onClick={handletoggleforactive} // Add onClick event to handle button click
    //   >
    //     <div className="onedot"></div>
    //     <div className="onedot"></div>
    //     <div className="onedot"></div>
    //   </div>
    // </div>
  )
}

export default Document
