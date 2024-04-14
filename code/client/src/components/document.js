import React, { useEffect, useState } from 'react'
import { ChatState } from '../context/ChatProvider'
import docion from '../docicon.png'
import deleteicon from '../delete.png'
import '../admin.css'
import { DELETE_DOCUMENT } from './file'
// similar to dropdownjs

const Document = ({}) => {
  // const Document = ({ data }) => {
  // const { admin_email, document_url, document_no, created_at } = data

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

  const handledelete = () => {
    const { loading, data, refetch } = useQuery(DELETE_DOCUMENT, {
      variables: { document_url: data }, // data will be the document_url
    })

    useEffect(() => {
      console.log('init fetch')
      refetch().then((response) => {
        const resp = response?.data?.deletedocumentbydocumenturl
        console.log(resp)
        if (resp && resp.length > 0) {
          // setdocs(resp)
        }
      })
    }, [])

    useEffect(() => {
      const interval = setInterval(
        () => {
          refetch().then((response) => {
            const resp = response?.data?.deletedocumentbydocumenturl
            console.log(resp)
            if (resp && resp.length > 0) {
              // setdocs(resp)
            }
          })
        },
        // docs ? 10000 : 0
      )

      return () => clearInterval(interval)
    }, [refetch])
  }

  const handletoggleforactive = () => {
    


  }
  return (
    <div className="parentdocument">
      <img
        style={{ width: '40px', height: '40px' }}
        src={docion}
        alt="document-icon"
      />

      <p> {/* name should come here */}</p>

      {/* <p>{created_at}</p> */}

      <button
        onClick={handledelete}
        style={{
          marginLeft: '950px',
        }}
      >
        <img
          style={{
            width: '40px',
            height: '40px',
          }}
          src={deleteicon}
          alt="delete-icon"
        />
      </button>

      {/* button for 1 and 0 */}
      <div
        className="threedots"
        onClick={handletoggleforactive} // Add onClick event to handle button click
      >
        <div className="onedot"></div>
        <div className="onedot"></div>
        <div className="onedot"></div>
      </div>
    </div>
  )
}

export default Document
