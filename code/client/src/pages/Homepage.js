import React, { useEffect, useState } from 'react'
import Dropdown from '../components/Dropdown'
import Placeholder from '../components/Placeholder'
import Template from '../components/Template'
import ChatPage from './ChatPage'
import { ChatState } from '../context/ChatProvider'
import Navbar from '../components/Navbar'
import { FETCH_PATIENTS } from '../gqloperations/queries'
import { useQuery } from '@apollo/client'
import './homepage.css'
import VitalPage from './VitalPage'
import Draggable from "react-draggable";
const Homepage = () => {
  const { user, selectedChat } = ChatState()

  const { loading, data, refetch } = useQuery(FETCH_PATIENTS, {
    variables: { docId: user },
  })

  const [patients, setPatients] = useState([])
  useEffect(() => {
    console.log('init fetch')
    refetch().then((response) => {
      const resp = response?.data?.fetchAmbulancesByDoctorId
      console.log(resp)
      if (resp && resp.length > 0) {
        setPatients(resp)
      }
    })
  }, [])

  useEffect(() => {
    const interval = setInterval(
      () => {
        refetch().then((response) => {
          const resp = response?.data?.fetchAmbulancesByDoctorId
          console.log(resp)
          if (resp && resp.length > 0) {
            setPatients(resp)
          }
        })
      },
      patients ? 10000 : 0
    )

    return () => clearInterval(interval)
  }, [refetch])

  const [dropdownVisible, setDropdownVisible] = useState(true)

  const handleStop = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="flex-container wrapper" style={{background:"white",padding:"10px"}}>
      <div className={`column ${dropdownVisible ? 'hidden' : 'visible'}`} style={{width:"full", overflow:"hidden", background:"#F4F4FF",borderRadius:"10px"}} >
        <Template />
        <div style={{background:"white", padding:"5px", paddingTop:"10px", borderRadius:"20px", height:"85%", overflowY:"scroll", overflowX:"hidden"}}>
          {patients.map((item) => (
            <Dropdown key={item.id} data={item} />
          ))}
        </div>
      </div>
      {/* the code below this is for button  */}


      <div className="toggle-button-container" data-visible={dropdownVisible}>
        <button
          className="toggle-button"
          onClick={() => setDropdownVisible(!dropdownVisible)}
        >
          {/* {dropdownVisible ? '>' : '<'}  */}
        </button>
      </div>


      <div className="column" style={{backgroundColor:"#F4F4FF",borderRadius:"10px"}}>
        {selectedChat && <VitalPage />}
        {!selectedChat && <Placeholder />}
      </div>
    </div>
  )
} 

export default Homepage
