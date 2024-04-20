import React, { useEffect, useState } from 'react'
import Dropdown from '../components/Dropdown'
import DropdownMinimized from '../components/DropdownMinimized'
import Placeholder from '../components/Placeholder'
import Template from '../components/Template'
import Addfile from '../components/Addfile'
import ChatPage from './ChatPage'
import { ChatState } from '../context/ChatProvider'
import Navbar from '../components/Navbar'
import { FETCH_PATIENTS, FETCH_USER_DETAILS } from '../gqloperations/queries'
import { useQuery } from '@apollo/client'
import './homepage.css'
import VitalPage from './VitalPage'
import Protocol_sheet from './Protocol_sheet'
import { judgeCriticality } from '../utils/criticalityJudgement'
import { fas } from '@fortawesome/free-solid-svg-icons'
import plus from '../plus.png'
import homeicon from '../home.png'

const Homepage = () => {
  const [loadingPage, setLoadingPage] = useState(true)
  const { user, selectedChat, setSelectedChat, setSelectedPatient } =
    ChatState()
  const authdata = JSON.parse(localStorage.getItem('authdata'))
  const email = authdata ? authdata.email : ''
  const userId = authdata ? authdata.id : ''
  const {
    loading: doctorLoading,
    data: doctorData,
    refetch: refetchDoctor,
  } = useQuery(FETCH_USER_DETAILS, {
    variables: { email },
  })
  const [doctor, setDoctor] = useState({})
  useEffect(() => {
    if (!doctorLoading && doctorData && doctorData.getUserByEmail) {
      setDoctor(doctorData.getUserByEmail)
    }
  }, [doctorLoading, doctorData])
  const { privilege } = doctor
  const {
    loading: patientsLoading,
    data: patientsData,
    refetch: refetchPatients,
  } = useQuery(FETCH_PATIENTS, {
    variables: { docId: userId },
  })
  const [patients, setPatients] = useState([])
  useEffect(() => {
    if (!patientsLoading && patientsData) {
      setPatients(patientsData.fetchAmbulancesByDoctorId || []) // Set patients state after fetching data
      setLoadingPage(false)
    }
  }, [patientsLoading, patientsData])
  useEffect(() => {
    // console.log("init fetch");
    refetchPatients().then((response) => {
      const resp = response?.patientsData?.fetchAmbulancesByDoctorId
      // console.log(resp);
      if (resp && resp.length > 0) {
        setPatients(resp)
        setLoadingPage(false)
      }
    })
  }, [])
  useEffect(() => {
    const interval = setInterval(
      () => {
        refetchPatients().then((response) => {
          const resp = response?.patientsData?.fetchAmbulancesByDoctorId
          // console.log(resp);
          if (resp && resp.length > 0) {
            setPatients(resp)
          }
        })
      },
      patients ? 10000 : 0
    )
    return () => clearInterval(interval)
  }, [refetchPatients])
  const [dropdownVisible, setDropdownVisible] = useState(false)
  const [DropdownMinimizedVisible, setDropdownMinimizedVisible] = useState(true) // State for DropdownMinimized visibility

  const handleToggle = () => {
    setDropdownVisible(!dropdownVisible)
    setDropdownMinimizedVisible(!DropdownMinimizedVisible) // Toggle DropdownMinimized visibility
  }
  const sortedPatients = patients.slice().sort((a, b) => {
    const criticalityOrder = { Critical: 0, Moderate: 1, Minor: 2 }
    return (
      criticalityOrder[judgeCriticality(a)] -
      criticalityOrder[judgeCriticality(b)]
    )
  })
  var done = 0
  useEffect(() => {
    setTimeout(() => {
      // console.log("useeffect", sortedPatients[0]);
      if (!sortedPatients[0] || done) return
      const { emt } = sortedPatients[0]
      setSelectedChat(emt)
      setSelectedPatient(sortedPatients[0])
      done = 1
      setLoadingPage(false)
    }, 500)
    return () => {
      done = 1
    }
  }, [loadingPage])

  const [showDocumentComponent, setshowDocumentComponent] = useState(false)
  const [showFormComponent, setshowFormComponent] = useState(false)
  const [showupload, setshowupload] = useState(false)

  const RedirectToHome = () => {
    setshowDocumentComponent(true)
    setshowFormComponent(false)
    setshowupload(false)
  }
  const formtoggleComponent = () => {
    setshowDocumentComponent(false)
    setshowFormComponent(true)
    setshowupload(false)
  }
  const documenttoggleComponent = () => {
    setshowDocumentComponent(true)
    setshowFormComponent(false)
    setshowupload(false)
  }
  const uploadtoggleComponent = () => {
    setshowDocumentComponent(false)
    setshowFormComponent(false)
    setshowupload(true)
  }

  if (loadingPage) return <h1 className="flex justify-center">Loading</h1> // add another page for this?
  if (privilege == 0) {
    return (
      <div
        className="flex-container wrapper custom-scrollbar"
        style={{ background: 'white', padding: '10px', height: 'auto' }}
      >
        <div
          className={` column ${dropdownVisible ? 'hidden' : 'visible'}`}
          style={{
            width: 'full',
            // overflow: "hidden",
            // height : "auto",
            background: '#F4F4FF',
            borderRadius: '10px',
            transition: 'width 5s ease', // CSS transition property
          }}
        >
          <Template />
          <div
            style={{
              background: 'white',
              padding: '5px',
              paddingTop: '10px',
              borderRadius: '20px',
              height: '93%',
              overflowY: 'scroll',
              overflowX: 'hidden',
            }}
          >
            {sortedPatients.map((item) => (
              <Dropdown key={item.id} data={item} />
            ))}
          </div>
        </div>

        <div
          className={`column ${
            DropdownMinimizedVisible ? 'hidden' : 'visible'
          }`}
          style={{
            width: 'full',
            overflow: 'hidden',
            background: '#F4F4FF',
            borderRadius: '10px',
          }}
        >
          {/* <Template /> */}
          <div
            style={{
              background: '#F4F4FF',
              padding: '5px',
              paddingTop: '10px',
              borderRadius: '20px',
              height: '85%',
              overflowY: 'scroll',
              overflowX: 'hidden',
            }}
          >
            {sortedPatients.map((item) => (
              <DropdownMinimized key={item.id} data={item} />
            ))}
          </div>
        </div>
        {/* the code below this is for button  */}
        <div className="toggle-button-container" data-visible={dropdownVisible}>
          <button className="toggle-button" onClick={handleToggle} />
        </div>
        <div
          className="column"
          style={{ backgroundColor: '#F4F4FF', borderRadius: '10px' }}
        >
          {selectedChat && <VitalPage />}
          {/* {!selectedChat && <Placeholder />} */}
        </div>
      </div>
    )
  } else {
    return (
      <div
        className="flex-container wrapper custom-scrollbar"
        style={{ background: 'white', padding: '10px' }}
      >
        <div
          className={` column ${dropdownVisible ? 'hidden' : 'visible'}`}
          style={{
            width: 'full',
            overflow: 'hidden',
            background: '#F4F4FF',
            borderRadius: '10px',
            transition: 'width 5s ease', // CSS transition property
          }}
        >
          <div
            style={{
              background: 'white',
              padding: '5px',
              paddingTop: '10px',
              borderRadius: '20px',
              height: '100%',
              overflowY: 'scroll',
              overflowX: 'hidden',
            }}
          >
            <button onClick={formtoggleComponent}>
              <div
                className="expanding-box-header bg-white text-black"
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  backgroundColor: showFormComponent
                    ? 'rgba(199, 207, 255, 1)'
                    : 'transparent',
                  height: '128px',
                  width: '353px',
                  textAlign: 'left',
                  fontSize: '20px',
                }}
              >
                <p style={{ fontSize: '24px', color: 'rgba(85, 85, 251, 1)' }}>
                  Form
                </p>
                <p style={{ fontSize: '16px', color: 'rgba(93, 94, 102, 1)' }}>
                  Wikipedia is a free content online encyclopedia written and{' '}
                </p>
              </div>
            </button>
            <br />
            <br />
            <button onClick={documenttoggleComponent}>
              <div
                className="expanding-box-header bg-white text-black"
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  backgroundColor: showDocumentComponent
                    ? 'rgba(199, 207, 255, 1)'
                    : 'transparent',
                  height: '128px',
                  width: '353px',
                  textAlign: 'left',
                }}
              >
                <p style={{ fontSize: '24px', color: 'rgba(85, 85, 251, 1)' }}>
                  Document
                </p>
                <p style={{ fontSize: '16px', color: 'rgba(93, 94, 102, 1)' }}>
                  Wikipedia is a free content online encyclopedia written and{' '}
                </p>
              </div>
            </button>

            {/* fix the position of this plus, it must come when document is clicked */}
          </div>
        </div>

        {/* the code below this is for button  */}
        <div className="toggle-button-container" data-visible={dropdownVisible}>
          <button className="toggle-button" onClick={handleToggle} />
        </div>

        {showDocumentComponent && (
          <div
            className="column"
            style={{ backgroundColor: '#F4F4FF', borderRadius: '10px' }}
          >
            <Protocol_sheet />
            <button onClick={uploadtoggleComponent}>
              <div style={{}}>
                <img
                  style={{
                    position: 'absolute',
                    top: '90%',
                    right: '0%',
                    transform: 'translate(-50%, -50%)',
                    width: '127px',
                    height: '127px',
                  }}
                  src={plus}
                  alt=""
                />
              </div>
            </button>
          </div>
        )}
        {/* Code similar to above must be written to render the form component using the showFormComponent variable */}
        {showupload && (
          <>
            <Addfile />

            <button onClick={RedirectToHome}>
              <img
                style={{
                  position: 'absolute',
                  top: '90%',
                  right: '0%',
                  transform: 'translate(-50%, -50%)',
                  width: '127px',
                  height: '127px',
                }}
                src={homeicon}
                alt=""
              />
            </button>
          </>
        )}
      </div>
    )
  }
}
export default Homepage
