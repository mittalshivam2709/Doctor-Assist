import React, { useEffect, useState } from 'react'
import { ChatState } from '../context/ChatProvider'

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
  const judgeCriticality = () =>
  {
    let criticality = ''
    if (critical_case === "yes")
    {
      criticality = "Critical";
    }
    else 
    {
      let count_critical = 0;
      let count_moderate = 0;
      let count_minor = 0;
      // For body temperature
      if(( body_temperature >= 105) || (body_temperature<=95))
      {
        count_critical=count_critical+1;
      }
      else if((body_temperature >=103) && (body_temperature<105))
      {
        count_moderate = count_moderate+1;
      }
      else if ((body_temperature <103))
      {
        count_minor=count_minor +1;
      }
      // For Spo2
      if(spo2<85)
      {
        count_critical=count_critical+1;
      }
      else if((spo2>=85)&&(spo2<=90))
      {
        count_moderate = count_moderate+1;
      }
      else if ((spo2 >90))
      {
        count_minor=count_minor +1;
      }
      // For Heart rate
      if(( pulse_rate >= 130) || (pulse_rate<=40))
      {
        count_critical=count_critical+1;
      }
      else if((pulse_rate >=110) && (pulse_rate<=60))
      {
        count_moderate = count_moderate+1;
      }
      else if ((pulse_rate <110) && (pulse_rate>60))
      {
        count_minor=count_minor +1;
      }
      // For Systolic blood pressure
      if(( blood_pressure_sys >= 180) || (blood_pressure_sys<=90))
      {
        count_critical=count_critical+1;
      }
      else if((blood_pressure_sys >90) && (blood_pressure_sys<=160))
      {
        count_minor= count_minor+1;
      }
      else if ((blood_pressure_sys <180) && (blood_pressure_sys>160))
      {
        count_moderate=count_moderate +1;
      }
      // for diastolic pressure
      if(( blood_pressure_dys >= 120) || (blood_pressure_dys<=80))
      {
        count_critical=count_critical+1;
      }
      else if((blood_pressure_dys >=90) && (blood_pressure_dys<=120))
      {
        count_moderate= count_moderate+1;
      }
      else if ((blood_pressure_dys <90) && (blood_pressure_dys>80))
      {
        count_minor=count_minor +1;
      }
      if(count_critical>=3)
      {
        criticality= 'Critical';
      }
      else if((count_critical==2)&&(count_moderate>=2))
      {
        criticality='Moderate';
      }
      else if(count_moderate>0)
      {
        criticality='Moderate';
      }
      else
      {
        criticality='Minor'
      }
    }
    return criticality;
  };
  const criticality = judgeCriticality();
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
        onClick={handleToggle}
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
          style={{
            fontFamily: 'Poppins, sans-serif',
          }}
        >
          <div className=" flex flex-col md:flex-row justify-between">
            <div className=" flex items-center">
              
            <div
                className=""
                style={{
                  color: hovered ? hoverColor : 'blue',
                  width: '10px',
                  fontWeight: 600,
                }}
              >
                {firstNameLetter}
              </div>
              <div
                className=""
                style={{
                  color: hovered ? hoverColor : 'blue',
                  width: '10px',
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
