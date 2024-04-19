import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { RESET_PASSWORD } from '../gqloperations/mutations'
import { useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import '../loginpage.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import Navbar from '../components/Navbar'





// import { Viewer, Worker } from '@react-pdf-viewer/core'
// import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
// import '@react-pdf-viewer/core/lib/styles/index.css'
// import '@react-pdf-viewer/default-layout/lib/styles/index.css'

//   const [numPages, setNumPages] = useState(0)
//   const [pageNumber, setPageNumber] = useState(1)
//   function onDocumentLoadSuccess({ numPages }) {
//     setNumPages(numPages)
//   }

//   useEffect(() => {
//     pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`
//   }, [])

// <div className="container">
//   <form onSubmit={handles}>
//     <input type="file" className="form-control" onChange={handlechange} />
//     <button type="submit" className="btn btn-success">
//       view pdf
//     </button>
//   </form>
//   <h2>View pdf</h2>
//   <div>
//     <Worker workerUrl="https://tto-asset.s3.amazonaws.com/EMRI_audio_files/DASS_39/Document_query/Mom_6th_March_2024.pdf">
//       {/* <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js"> */}
//       {viewPdf && (
//         <>
//           <Viewer fileUrl={viewPdf} plugins={[newplugin]} />
//         </>
//       )}
//       {!viewPdf && <>No PDF</>}
//     </Worker>
//   </div>
// </div>

{
  /* <div>
        <Document
          file="https://tto-asset.s3.amazonaws.com/EMRI_audio_files/DASS_39/Document_query/Mom_6th_March_2024.pdf"
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <p>
          Page {pageNumber} of {numPages}
        </p>
      </div> */
}




const Password_Reset = () => {
  const { register, handleSubmit, reset, watch, setError, clearErrors } =
    useForm()
  const [data, setData] = useState('')
  const [showPassword1, setShowPassword1] = useState(false)
  const [showPassword2, setShowPassword2] = useState(false)
  const [showPassword3, setShowPassword3] = useState(false)
  const navigate = useNavigate()
  const newpassword = watch('newpassword')
  const renewpassword = watch('renewpassword')

  const [passwordrst, { error, loading, formdata }] = useMutation(
    RESET_PASSWORD,
    {
      onCompleted: (formdata) => {
        console.log(formdata.loginUser)
        // localStorage.setItem("token",formdata.user.token)
        // console.log(formdata.user.token);
        alert('Password updated successfully')
        navigate('/')
      },
      onError: (error) => {
        alert(error.message)
        reset()
      },
    }
  )
  const onSubmit = (data) => {
    // console.log('Form data submitted:', data)
    if (!data.email && !data.oldpassword) {
      alert('Please enter both Email and Old Password')
      reset()
      return
    } else if (!data.email && data.oldpassword) {
      alert('Please enter Email')
      reset()
      return
    } else if (data.email && !data.oldpassword) {
      alert('Please enter Email')
      reset()
      return
    } else if (data.email && data.oldpassword && !data.newpassword) {
      alert('Please enter new password also')
      return
    } else if (
      data.email &&
      data.oldpassword &&
      data.newpassword &&
      !renewpassword
    ) {
      alert('Please enter renew password also')
      return
    } else if (newpassword !== renewpassword) {
      alert('New and Renew passwords do not match')
      // setError('renewpassword', {
      //   type: 'manual',
      //   message: 'Passwords do not match',
      // })
      return
    }
    // clearErrors('renewpassword')
    // console.log('', data)
    setData(JSON.stringify(data))
    passwordrst({
      variables: {
        userInput: {
          username: data.username,
          password: data.newpassword,
          doctor_name: data.oldpassword,
        },
      },
    })
  }
  const togglePasswordVisibility1 = () => {
    setShowPassword1(!showPassword1)
  }
  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2)
  }
  const togglePasswordVisibility3 = () => {
    setShowPassword3(!showPassword3)
  }
  return (
    <div>
      <Navbar />
      <div
        style={{
          background: 'linear-gradient(109.19deg, #F4F4FF 0%, #C8C8FE 100%)',
          minHeight: 'calc(100vh - 50px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div className="login-container">
          <h2
            style={{
              color: 'blue',
              position: 'relative',
              top: '-20px',
              fontSize: '30px',
            }}
          >
            Reset Password
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('email')} placeholder="Email" type="email" />
            <br />
            <input
              {...register('oldpassword')}
              type={showPassword3 ? 'text' : 'password'}
              placeholder="Enter old password"
            />
            <FontAwesomeIcon
              icon={showPassword3 ? faEyeSlash : faEye} // Use FontAwesome icon based on showPassword state
              onClick={togglePasswordVisibility3}
              style={{ position: 'relative', top: '-55px', left: '170px' }}
            />
            <input
              {...register('newpassword')}
              type={showPassword1 ? 'text' : 'password'}
              placeholder="Enter new password"
            />
            <FontAwesomeIcon
              icon={showPassword1 ? faEyeSlash : faEye} // Use FontAwesome icon based on showPassword state
              onClick={togglePasswordVisibility1}
              style={{ position: 'relative', top: '-55px', left: '170px' }}
            />
            <input
              {...register('renewpassword')}
              type={showPassword2 ? 'text' : 'password'}
              placeholder="Re-enter new password"
            />
            <FontAwesomeIcon
              icon={showPassword2 ? faEyeSlash : faEye} // Use FontAwesome icon based on showPassword state
              onClick={togglePasswordVisibility2}
              style={{ position: 'relative', top: '-55px', left: '170px' }}
            />
            <br />
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </div>
  )
}

export default Password_Reset
