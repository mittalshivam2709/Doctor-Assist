import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
// import '../loginpage.css'
// import '../pages/newauth.css'

import { ChatState } from '../context/ChatProvider'
import { useQuery } from '@apollo/client' // NOT USE lazy QUERY
import { FETCH_USER_DETAILS } from '../gqloperations/queries'
import logo from '../logo.png'
import Navbar from '../components/Navbar'

const Profile = () => {
  const { user, selectedChat } = ChatState()
  // const email="doctor1@gmail.com"
  const authdata = JSON.parse(localStorage.getItem('authdata'));
  const email = authdata ? authdata.email : '';
  // Then use the email variable in your code where needed
    const { loading, data, refetch } = useQuery(FETCH_USER_DETAILS, {
    variables: { email },
  })

  const [doctor, setdoctor] = useState([])
  useEffect(() => {
    refetch().then((response) => {
      const resp = response?.data?.getUserByEmail
      setdoctor(resp)
      //   }
    })
  }, [])
  const { doctor_name, doctor_mobile, doctor_visit, doctor_degree } = doctor

  // return (
  //   <div>
  //     <Navbar />
  //     <div className="login-container">
  //       <h2
  //         style={{
  //           color: 'blue',
  //           position: 'relative',
  //           top: '-20px',
  //           fontSize: '30px',
  //         }}
  //       >
  //         Profile Page
  //       </h2>
  //       <ul>
  //         <li>Doctor Name : {doctor_name}</li>
  //         <li>Doctor Mobile: {doctor_mobile}</li>
  //         <li>Doctor Visit : {doctor_visit}</li>
  //         <li>Doctor Degree: {doctor_degree}</li>
  //       </ul>
  //     </div>
  //   </div>
  // )
  return (
    <div>
      <Navbar />
      <div
        // style={{
        //   display: 'flex',
        //   flexDirection: 'column',
        //   alignItems: 'center',
        //   justifyContent: 'center',
        //   minHeight: '100vh',
        //   fontFamily: 'Arial, sans-serif',
        // }}
        style={{
          background: 'linear-gradient(109.19deg, #F4F4FF 0%, #C8C8FE 100%)',
          minHeight: 'calc(100vh - 50px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div style={{ marginTop: '40px', textAlign: 'center', width: '80%' }}>
          <h2
            style={{
              color: '#007bff',
              fontSize: '2em',
              borderBottom: '2px solid #007bff',
              paddingBottom: '10px',
              marginBottom: '30px',
            }}
          >
            Profile Page
          </h2>
          <ul
            style={{ listStyleType: 'none', padding: '0', textAlign: 'left' }}
          >
            <li style={{ marginBottom: '15px' }}>
              <strong>Doctor Name:</strong> {doctor_name}
            </li>
            <li style={{ marginBottom: '15px' }}>
              <strong>Doctor Mobile:</strong> {doctor_mobile}
            </li>
            <li style={{ marginBottom: '15px' }}>
              <strong>Doctor Visit:</strong> {doctor_visit}
            </li>
            <li>
              <strong>Doctor Degree:</strong> {doctor_degree}
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Profile
