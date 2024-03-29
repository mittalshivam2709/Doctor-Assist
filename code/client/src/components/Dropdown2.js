import React, { useEffect, useState } from 'react'
import { ChatState } from '../context/ChatProvider'
import { judgeCriticality } from "../utils/criticalityJudgement";
const Dropdown2 = ({ data }) => {
  const {
    ambulance_no,
    admit_time,
    problem,
    age,
    age_type,
    gender,
    critical_case,
    emt,
    body_temperature,
    blood_pressure_sys,
    blood_pressure_dys,
    pulse_rate,
    spo2,
    name
  } = data
  const criticality = judgeCriticality(data);
  let hoverColor = '';
  let hoverC = '';
  if (criticality == 'Critical')
  {
   hoverColor = "#EB164D";
   hoverC = "#FFD9E2"
  }
  else if (criticality == 'Moderate')
  {
    hoverColor = "#FAA416";
    hoverC = "#FBEBCF"
  }
  else if (criticality == 'Minor')
  {
   hoverColor = "#01B48E";
   hoverC = "#D2FAF1"
  }
  const [hovered, setHovered] = useState(false)
  const { selectedChat, setSelectedChat, setSelectedPatient } = ChatState()
  const isSelected = selectedChat === emt
  var color = "white";
  const handleToggle = () => {
    setSelectedChat(isSelected ? null : emt)
    setSelectedPatient(isSelected ? null : data)
  }
  const [firstNameLetter, lastNameLetter] = name.split(' ').map(namePart => namePart[0])
  const handleHover = (isHovered) => {
    setHovered(isHovered)
  }

  return (
    <div
      className={`expanding-box bg-${isSelected ? hoverC : hoverColor} text-${
        isSelected ? 'white' : 'black'
      }`}
      style={{backgroundColor:hoverColor}}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
    >
      <div
        className={`expanding-box-header bg-${
          isSelected ? hoverC : hoverColor
        } text-${isSelected ? 'white' : 'black'}`}
        onClick={isSelected ? null: handleToggle}
        style={{
          backgroundImage: isSelected
            ? `linear-gradient(to right, ${hoverC} 100%, #FFFFFF 100%)`
            : `linear-gradient(to right, ${hoverC} 2.5%, #FFFFFF 2.5%)`,
          border: isSelected ? '2px solid blue' : '2px solid transparent',
          background: hovered ? hoverC : (isSelected ? hoverC : hoverColor),
          backgroundColor: isSelected ? hoverC : (hovered ? hoverC : hoverColor)     }}
      >
        <div
          className="flex-col"
        >
          <div className=" flex flex-col md:flex-row justify-between">
            <div className=" flex items-center">
              
            <div
                className=""
                style={{
                  color: hovered ? hoverColor : 'black',
                  width: '10px',
                  fontWeight: 600,
                }}
              >
                {firstNameLetter}
              </div>
              <div
                className=""
                style={{
                  color: hovered ? hoverColor : 'black',
                  width: '10px',
                  marginLeft:"2px",
                  fontWeight: 600,
                }}
              >
                {lastNameLetter}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dropdown2
