import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import drag from '../drag.png'
import { SEND_DOCUMENT } from '../gqloperations/mutations'
import { useMutation } from '@apollo/client'
import doc from '../doc_progress.png'
import '../admin.css'

const Addfile = () => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [dragging, setDragging] = useState(false) // To indicate drag state for UI feedback

  const fileInputRef = useRef()
  const authdata = JSON.parse(localStorage.getItem('authdata'))
  const email = authdata ? authdata.email : ''
  const [sendDocument] = useMutation(SEND_DOCUMENT)

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0])
    console.log(e.target.files[0].name)
  }

  const handleDragOver = (event) => {
    event.preventDefault()
    setDragging(true)
  }

  const handleDragEnter = (event) => {
    event.preventDefault()
    setDragging(true)
  }

  const handleDragLeave = (event) => {
    event.preventDefault()
    setDragging(false)
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setDragging(false)
    setSelectedFile(event.dataTransfer.files[0])
    console.log(event.dataTransfer.files[0].name)
  }
  const [progress, setProgress] = useState(0)
  const [showProgressBar, setShowProgressBar] = useState(false)

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file to upload.')
      return
    }
    setShowProgressBar(true)

    const formData = new FormData()
    formData.append('image', selectedFile)

    try {
      const response = await axios.post(
        'http://localhost:5002/upload_documents',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      console.log(response.data)
      alert('File uploaded successfully!')

      const filename = selectedFile.name
      const resp = await axios.get('http://localhost:5002/get_documents')
      let fileUrl = null
      for (const file of resp.data) {
        if (file.name === filename) {
          fileUrl = file.url
          break
        }
      }
      console.log(fileUrl)

      const date = new Date()
      const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(
        date.getMonth() + 1
      )
        .toString()
        .padStart(2, '0')}-${date.getFullYear()}`
      const formattedTime = `${date
        .getHours()
        .toString()
        .padStart(2, '0')}:${date
        .getMinutes()
        .toString()
        .padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`
      const DocData = {
        admin_email: email,
        document_url: fileUrl,
        document_name: filename,
        document_no: '1',
        active_to_train: '1',
        admit_time: `${formattedTime}/${formattedDate}`,
        last_update_time: `${formattedTime}/${formattedDate}`,
      }
      console.log('Sent document data:', DocData)
      const sendDocResponse = await sendDocument({
        variables: {
          messageInputDoc: DocData,
        },
      })
      console.log(sendDocResponse)
      setSelectedFile(null)
    } catch (error) {
      console.error('Error uploading file:', error)
      alert('Error uploading file. Please try again.')
    }
  }

  useEffect(() => {
    // Simulating progress increment every second
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval)
          return 100
        }
        return prevProgress + 10 // Increase by 10% every second
      })
    }, 1000)

    return () => clearInterval(interval)
  }, []) // Empty dependency array, so it runs only once on component mount

  return (
    <div>
      <br />
      <br />
      <div>
        <div>
          <h1
            style={{
              color: 'rgba(85,85,251,1)',
              fontWeight: 'bold',
              fontSize: '30px',
              position: 'absolute',
              left: '59%',
              transform: 'translateX(-50%)',
            }}
          >
            File Upload
          </h1>
          <br />
          <br />
          <div style={{ position: 'absolute', top: '30%', left: '45%' }}>
            {!selectedFile && (
              <>
                <div
                  style={{
                    fontFamily: 'Arial',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '0',
                  }}
                >
                  <button onClick={() => fileInputRef.current.click()}>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '544px',
                        height: '444px',
                        border: `2px dashed ${dragging ? '#000' : '#ccc'}`,
                        borderRadius: '20px',
                        padding: '20px',
                        margin: '10px auto',
                        cursor: 'pointer',
                      }}
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onDragEnter={handleDragEnter}
                      onDragLeave={handleDragLeave}
                    >
                      <img src={drag} alt="Drag files here" />
                      <div
                        style={{
                          fontSize: '17px',
                          width: '235px',
                          height: '36px',
                          top: '479px',
                          left: '449px',
                        }}
                      >
                        <br />
                        <h1>Drag files to Upload</h1>
                        <input
                          type="file"
                          onChange={handleFileInput}
                          hidden
                          ref={fileInputRef}
                        />
                      </div>
                    </div>
                  </button>
                </div>

                <br />
                <button
                  onClick={handleUpload}
                  style={{
                    padding: '20px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(2,73,255,1)',
                    color: 'rgba(255,255,255,1)',
                    height: '67px',
                    top: '642px',
                    width: '205px',
                    border: 'none',
                    cursor: 'pointer',
                    marginLeft: '170px',
                  }}
                >
                  SAVE
                </button>
              </>
            )}
          </div>
          <br />
          <br />
        </div>
        {selectedFile && (
          <>
            <div
              style={{
                position: 'absolute',
                top: '40%',
                left: '50%',
                // transform: 'translate(-50%, -50%)',
              }}
            >
              <img src={doc} alt="" />
              <br />
              <div className="progress-container">
                <div
                  className="progress-bar"
                  style={{
                    width: `${progress}%`,
                  }}
                />
              </div>
              <div
                style={{
                  color: 'rgba(2, 73, 255, 1)',
                  marginLeft: '86%',
                  fontWeight: 'bold',
                  fontSize: '23px',
                }}
              >
                {progress}%
              </div>
              <div>Selected File: {selectedFile.name}</div>
              <br />
              <button
                onClick={handleUpload}
                style={{
                  padding: '20px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(2,73,255,1)',
                  color: 'rgba(255,255,255,1)',
                  height: '67px',
                  top: '642px',
                  width: '205px',
                  border: 'none',
                  cursor: 'pointer',
                  marginLeft: '30%',
                }}
              >
                SAVE
              </button>

            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Addfile
