import React, { useEffect, useState } from 'react'
import Dropdown from '../components/Dropdown'
import Dropdown2 from '../components/Dropdown2'
import Placeholder from '../components/Placeholder'
import Template from '../components/Template'
import ChatPage from './ChatPage'
import { ChatState } from '../context/ChatProvider'
import Navbar from '../components/Navbar'
import { FETCH_PATIENTS } from '../gqloperations/queries'
import { useQuery } from '@apollo/client'
import './homepage.css'
import VitalPage from './VitalPage'
import Draggable from 'react-draggable'
import { useLocation } from 'react-router-dom'
const Homepage = () => {
  // const location = useLocation();
  // const queryParams = new URLSearchParams(location.search);
  // const username = queryParams.get('username');

  // // Set the username in the parent component (App)
  // setUsername(username);

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

  const [dropdownVisible, setDropdownVisible] = useState(false)
  const [dropdown2Visible, setDropdown2Visible] = useState(true) // State for Dropdown2 visibility

  const handleToggle = () => {
    setDropdownVisible(!dropdownVisible)
    setDropdown2Visible(!dropdown2Visible) // Toggle Dropdown2 visibility
  }
  const judgeCriticality = (item) => {
    let criticality = ''
    const { critical_case, body_temperature, spo2, pulse_rate, blood_pressure_sys, blood_pressure_dys } = item;

    if (critical_case === "yes") {
      criticality = "Critical";
    } else {
      let count_critical = 0;
      let count_moderate = 0;
      let count_minor = 0;
      
      // For body temperature
      if ((body_temperature >= 105) || (body_temperature <= 95)) {
        count_critical = count_critical + 1;
      } else if ((body_temperature >= 103) && (body_temperature < 105)) {
        count_moderate = count_moderate + 1;
      } else if ((body_temperature < 103)) {
        count_minor = count_minor + 1;
      }

      // For Spo2
      if (spo2 < 85) {
        count_critical = count_critical + 1;
      } else if ((spo2 >= 85) && (spo2 <= 90)) {
        count_moderate = count_moderate + 1;
      } else if ((spo2 > 90)) {
        count_minor = count_minor + 1;
      }

      // For Heart rate
      if ((pulse_rate >= 130) || (pulse_rate <= 40)) {
        count_critical = count_critical + 1;
      } else if ((pulse_rate >= 110) && (pulse_rate <= 60)) {
        count_moderate = count_moderate + 1;
      } else if ((pulse_rate < 110) && (pulse_rate > 60)) {
        count_minor = count_minor + 1;
      }

      // For Systolic blood pressure
      if ((blood_pressure_sys >= 180) || (blood_pressure_sys <= 90)) {
        count_critical = count_critical + 1;
      } else if ((blood_pressure_sys > 90) && (blood_pressure_sys <= 160)) {
        count_minor = count_minor + 1;
      } else if ((blood_pressure_sys < 180) && (blood_pressure_sys > 160)) {
        count_moderate = count_moderate + 1;
      }

      // For Diastolic blood pressure
      if ((blood_pressure_dys >= 120) || (blood_pressure_dys <= 80)) {
        count_critical = count_critical + 1;
      } else if ((blood_pressure_dys >= 90) && (blood_pressure_dys <= 120)) {
        count_moderate = count_moderate + 1;
      } else if ((blood_pressure_dys < 90) && (blood_pressure_dys > 80)) {
        count_minor = count_minor + 1;
      }

      if (count_critical >= 3) {
        criticality = 'Critical';
      } else if ((count_critical === 2) && (count_moderate >= 2)) {
        criticality = 'Moderate';
      } else if (count_moderate > 0) {
        criticality = 'Moderate';
      } else {
        criticality = 'Minor';
      }
    }
    return criticality;
  };

  const sortedPatients = patients.slice().sort((a, b) => {
    const criticalityOrder = { Critical: 0, Moderate: 1, Minor: 2 };
    return criticalityOrder[judgeCriticality(a)] - criticalityOrder[judgeCriticality(b)];
  });
  return (
    <div
      className="flex-container wrapper"
      style={{ background: 'white', padding: '10px' }}
    >
      <div
        className={`column ${dropdownVisible ? 'hidden' : 'visible'}`}
        style={{
          width: 'full',
          overflow: 'hidden',
          background: '#F4F4FF',
          borderRadius: '10px',
        }}
      >
        <Template />
        <div
          style={{
            background: 'white',
            padding: '5px',
            paddingTop: '10px',
            borderRadius: '20px',
            height: '85%',
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
        className={`column ${dropdown2Visible ? 'hidden' : 'visible'}`}
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
            background: 'white',
            padding: '5px',
            paddingTop: '10px',
            borderRadius: '20px',
            height: '85%',
            overflowY: 'scroll',
            overflowX: 'hidden',
          }}
        >
          {sortedPatients.map((item) => (
            <Dropdown2 key={item.id} data={item} />
          ))}
        </div>
      </div>
      {/* the code below this is for button  */}
      <div className="toggle-button-container" data-visible={dropdownVisible}>
        <button className="toggle-button" onClick={handleToggle}>
          {/* You can use a text-based toggle like '>' and '<' if you want */}
          {dropdownVisible ? '>' : '<'}
        </button>
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
}

export default Homepage
