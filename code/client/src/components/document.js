import React, { useState, useEffect, useRef } from 'react'
import { useMutation } from '@apollo/client'
import { CHANGE_STATUS } from '../gqloperations/mutations'
import { DELETE_DOCUMENT } from '../gqloperations/mutations'
import docion from '../doc_icon.png'
import deleteicon from '../delete.png'
import '../admin.css'
import threedots from '../threeDots.png'
import axios from 'axios'
const Document = ({ data }) => {
  const { document_url, document_name, active_to_train, admit_time } = data

  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [button1Color, setButton1Color] = useState(
    active_to_train === '1'
      ? 'bg-gray-200 text-gray-900'
      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
  )
  const [button2Color, setButton2Color] = useState(
    active_to_train === '0'
      ? 'bg-gray-200 text-gray-900'
      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
  )

  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownRef])
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }
  const deletedoc = async (document_url) => {
    deletedocument({
      variables: {
        inp: {
          document_url: document_url,
        },
      },
    })

    try {
      const response = await axios.delete(
        `http://localhost:5002/delete_document/${document_name}`
      )
      console.log(response.data)
      alert('Document deleted successfully!')
    } catch (error) {
      console.error('Error deleting document:', error)
      alert('Error deleting document. Please try again.')
    }
  }
  const [changestatus] = useMutation(CHANGE_STATUS)
  const [deletedocument] = useMutation(DELETE_DOCUMENT)
  const change_activity_status1 = (status) => {
    const newStatus = '1'
    if (status == '0') {
      changestatus({
        variables: {
          inp: {
            document_url: document_url,
            active_to_train: newStatus,
          },
        },
      })
    }
    setDropdownOpen(false)
    if (status == '0') {
      setButton1Color('bg-gray-200 text-gray-900')
      setButton2Color('text-gray-700 hover:bg-gray-100 hover:text-gray-900')
    }
  }
  const change_activity_status2 = (status) => {
    const newStatus = '0'
    if (status == '1') {
      changestatus({
        variables: {
          inp: {
            document_url: document_url,
            active_to_train: newStatus,
          },
        },
      })
    }
    setDropdownOpen(false)
    if (status == '1') {
      setButton1Color('text-gray-700 hover:bg-gray-100 hover:text-gray-900')
      setButton2Color('bg-gray-200 text-gray-900')
    }
  }

  return (
    <div className="parentdocument">
      <a
        className="left"
        href={document_url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={docion} alt="Icon" />
        {document_name}
      </a>
      <div className="right">
        {admit_time}
        <button onClick={() => deletedoc(document_url)}>
          <img src={deleteicon} alt="Delete" />
        </button>
        <button onClick={toggleDropdown}>
          <img
            src={threedots}
            alt="Dropdown"
            style={{ width: '50px', height: '80px' }}
          />
        </button>
      </div>
      {dropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10"
        >
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
  )
}

export default Document
