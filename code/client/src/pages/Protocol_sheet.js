import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios' // Import Axios for making HTTP requests
import drag from '../drag.png'
import plus from '../plus.png'
import { SEND_DOCUMENT } from '../gqloperations/mutations'
import { useMutation } from '@apollo/client'
import { useQuery } from '@apollo/client'
import Documentcomp from '../components/document'
import { FETCH_DOCUMENTS } from '../gqloperations/queries'
import Addfile from '../components/Addfile'
const Protocol_sheet = () => {
  const [selectedFile, setSelectedFile] = useState(null)

  const fileInputRef = useRef()
  const [fileInputVisible, setFileInputVisible] = useState(false)
  const authdata = JSON.parse(localStorage.getItem('authdata'))
  const email = authdata ? authdata.email : ''
  const [sendDocument] = useMutation(SEND_DOCUMENT)
  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0])
    console.log(e.target.files[0].name)
  }

  const handleButtonClick = () => {
    fileInputRef.current.click()
  }

  const handlebuttonClick = () => {
    setFileInputVisible(true)
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file to upload.')
      return
    }

    const formData = new FormData()
    formData.append('image', selectedFile)

    try {
      // Make a POST request to your Express server
      const response = await axios.post(
        'http://localhost:5002/upload_documents',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      console.log(response.data) // Log the response from the server
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
        last_update_time: `${formattedTime}/${formattedDate}`, // Store the current date and time
      }
      console.log('Sent document data:', DocData)
      const sendDocResponse = await sendDocument({
        variables: {
          messageInputDoc: DocData,
        },
      })
      console.log(sendDocResponse)
      setSelectedFile(null) // Clear selected file after upload
    } catch (error) {
      console.error('Error uploading file:', error)
      alert('Error uploading file. Please try again.')
    }
  }

  const [dragging, setDragging] = useState(false)

  const { loading, data, refetch } = useQuery(FETCH_DOCUMENTS, {
    variables: { doc_no: '1' },
  })

  // /////////////////////////////
  // below is the code for fetching all the documents
  const [docs, setdocs] = useState([])

  useEffect(() => {
    console.log('init fetch')
    refetch().then((response) => {
      const resp = response?.data?.fetchdocumentbydocumentid
      console.log(resp)
      if (resp && resp.length > 0) {
        setdocs(resp)
      }
    })
  }, [])

  useEffect(() => {
    const interval = setInterval(
      () => {
        refetch().then((response) => {
          const resp = response?.data?.fetchdocumentbydocumentid
          console.log(resp)
          if (resp && resp.length > 0) {
            setdocs(resp)
          }
        })
      },
      docs ? 10000 : 0
    )
    return () => clearInterval(interval)
  }, [refetch])

  // const handleDragEnter = (e) => {
  //   e.preventDefault()
  //   setDragging(true)
  // }

  // const handleDragOver = (e) => {
  //   e.preventDefault()
  // }

  // const handleDragLeave = () => {
  //   setDragging(false)
  // }

  // const handleDrop = (e) => {
  //   e.preventDefault()
  //   setDragging(false)

  //   const files = Array.from(e.dataTransfer.files)
  //   // Handle dropped files here, e.g., upload or read them
  //   console.log('f',files)
  //   setSelectedFile(files[0]) // Set the selected file
  // }

  // const [files, setFiles] = useState(null)
  // const inputRef = useRef()

  const handleDragOver = (event) => {
    event.preventDefault()
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setSelectedFile(event.dataTransfer.files[0])
  }

  const [showplus, setshowplus] = useState(false)
  const ShowAddFilePage = () => {
    setshowplus(!showplus)
  }

  return (
    <div>
      {docs.map((item) => (
        <Documentcomp key={item.id} data={item} />
      ))}

      {/* <div>
        <br />
        <br />
        <div
          style={{
            fontFamily: 'Arial',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '0',
            backgroundColor: '#f8f9fa',
          }}
        >
          <div>
            {!fileInputVisible && (
              <div
                style={{
                  position: 'relative', // Add this to make positioning of the plus button relative to the container
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start', // Align items to the start (left) of the container
                  justifyContent: 'flex-start', // Align content to the start (top) of the container
                  width: '1056px',
                  height: '444px',
                  border: '2px dashed #ccc',
                  borderRadius: '20px',
                  padding: '20px',
                  margin: '10px auto',
                  cursor: 'pointer',
                }}
              >
                <button onClick={handlebuttonClick}>
                  <img
                    src={plus}
                    alt=""
                    style={{
                      position: 'absolute', // Position the plus button absolutely within the container
                      top: 10, // Place it at the top
                      left: 10, // Place it at the left
                    }}
                  />
                </button>
              </div>
            )}
            {fileInputVisible && (
              <>
                <button onClick={() => fileInputRef.current.click()}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '544px',
                      height: '444px',
                      border: '2px dashed #ccc',
                      borderRadius: '20px',
                      padding: '20px',
                      margin: '10px auto',
                      cursor: 'pointer',
                    }}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                  >
                    <img src={drag} alt="image" />
                    <h1>Drag and Drop Files to Upload</h1>
                    <h1>Or</h1>
                    <input
                      type="file"
                      multiple
                      onChange={(event) =>
                        setSelectedFile(event.target.files[0])
                      }
                      hidden
                      accept="image/png, image/jpeg"
                      ref={fileInputRef}
                    />
                    Select Files
                  </div>
                </button>
              </>
              // <button onClick={handleButtonClick}>
              //   <div
              //     style={{
              //       display: 'flex',
              //       flexDirection: 'column',
              //       alignItems: 'center',
              //       justifyContent: 'center',
              //       width: '544px',
              //       height: '444px',
              //       border: '2px dashed #ccc',
              //       borderRadius: '20px',
              //       padding: '20px',
              //       margin: '10px auto',
              //       cursor: 'pointer',
              //     }}
              //     className={`drop-zone ${dragging ? 'dragging' : ''}`}
              //   >
              //     <img src={drag} alt="image" />
              //     <input
              //       type="file"
              //       ref={fileInputRef}
              //       onChange={handleFileInput}
              //       style={{ display: 'none' }} // Hide the file input
              //     />
              //     <div
              //       style={{
              //         fontSize: '26px',
              //         width: '235px',
              //         height: '36px',
              //         top: '479px',
              //         left: '449px',
              //       }}
              //     >
              //       Drag files to upload
              //     </div>
              //   </div>
              // </button>
            )}
            {selectedFile && <div>Selected File: {selectedFile.name}</div>}
            <br />
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
          </div>
        </div>
      </div>  */}
    </div>
  )
}

export default Protocol_sheet
