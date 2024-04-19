import React, { useEffect, useState } from 'react'
import { FETCH_VITAL, FETCH_PATIENTS } from '../gqloperations/queries'
import { useQuery } from '@apollo/client' // NOT USE lazy QUERY
import { ChatState } from '../context/ChatProvider'
import doc from '../doc.png'
import DoctorLogo from '../components/DoctorLogo'
import PatientDetails from '../components/PatientDetails'
import Vitals from '../components/Vitals'
import MedicalInfo from '../components/MedicalInfo'
import { FETCH_USER_DETAILS } from '../gqloperations/queries'
import RealTimeDate from '../components/RealTimeDate';

const VitalPage = () => {
  const { vitals, setVitals, selectedChat, selectedPatient, user, setUser } =
    ChatState()
  // const email ="doctor1@gmail.com"
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
  const {
    loading: loadingVitals,
    data: dataVitals,
    refetch: refetchVitals,
  } = useQuery(FETCH_VITAL, {
    variables: { emtId: selectedChat },
  })

  useEffect(() => {
    refetchVitals().then((response) => {
      const curr_vitals = response?.data?.fetchVitals
      if (curr_vitals) {
        setVitals(curr_vitals)
      }
    })
    // console.log(user)
    // console.log(setUser)
    // console.log(selectedPatient)
  }, [selectedChat])

  useEffect(() => {
    const interval = setInterval(() => {
      refetchVitals().then((response) => {
        const curr_vitals = response?.data?.fetchVitals
        if (curr_vitals) {
          setVitals(curr_vitals)
          // console.log(curr_vitals)
        }
      })
    }, 5001)

    return () => clearInterval(interval)
  }, [refetchVitals])

  if (loadingVitals || !vitals) return <p>Loading...</p>

  return (
    <div className="vital-page">
      <div className="doctor-info" style={{ height: '12%' }}>
        <DoctorLogo />

        <div className="doctor-text">
          <h1>{doctor_name}</h1>
          <p>{doctor_degree}</p>
          <p>Mobile: {doctor_mobile}, Visit Time: {doctor_visit}</p>
          {/* <p>{doctor_visit}</p> */}
        </div>
      </div>
      <div className="case-sheet" style={{ height: '90vh', overflow:'scroll' }}>
        <div className="headingg">
          <h3>
            <div className="titlee">CASE SHEET</div>
            {/* <div className="datee">Date: DD/MM/YYYY</div> */}
            <RealTimeDate />
          </h3>
        </div>
        {/* <> */}
          <h2 className="boxx">Personal details</h2>
          <PatientDetails selectedPatient={selectedPatient} />
          <h2 className="boxx">Medical diagnosis</h2>
          <MedicalInfo selectedPatient={selectedPatient} />
          <h2 className="boxx">Vitals</h2>
          <Vitals vitals={vitals} />
        {/* </> */}
      </div>
    </div>
  )
}

export default VitalPage
