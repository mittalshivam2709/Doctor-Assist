import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import '../loginpage.css'
import { ChatState } from '../context/ChatProvider'
import { useQuery } from '@apollo/client' // NOT USE lazy QUERY
import { FETCH_USER_DETAILS } from '../gqloperations/queries'

const Profile = () => {
  const { user, selectedChat } = ChatState()

  const { loading, data, refetch } = useQuery(FETCH_USER_DETAILS, {
    variables: { id: user },
  })

  const [doctor, setdoctor] = useState([])
  useEffect(() => {
    console.log('init fetch')
    refetch().then((response) => {
      const resp = response?.data?.getUserByUsername
      console.log('hi', resp)
      //   if (resp && resp.length > 0) {
      console.log(resp.length)
      console.log('inside')
      setdoctor(resp)
      //   }
    })
  }, [])
  const { doctor_name, doctor_mobile, doctor_visit, doctor_degree } = doctor

  return (
    <div className="outerlogin">
      <div className="login-container">
        <h2
          style={{
            color: 'blue',
            position: 'relative',
            top: '-20px',
            fontSize: '30px',
          }}
        >
          Profile Page
        </h2>
        <ul>
          <li>Doctor Name : {doctor_name}</li>
          <li>Doctor Mobile: {doctor_mobile}</li>
          <li>Doctor Visit : {doctor_visit}</li>
          <li>Doctor Degree: {doctor_degree}</li>
        </ul>
        {/* <h2>Doctor Name: {doctor.doctor_name}</h2>
        <h2>Doctor Mobile: {doctor.doctor_mobile}</h2>
        <h2>Doctor Visit: {doctor.doctor_visit}</h2> */}
        {/* <h2>Doctor Degree: {doctor.doctor_degree}</h2> */}
      </div>
    </div>
  )
}

export default Profile
