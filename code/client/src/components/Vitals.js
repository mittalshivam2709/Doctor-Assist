import React from "react";
function getLatestVital(vitalArray) {
  return vitalArray.length > 0 ? vitalArray[vitalArray.length - 1] : "N/A";
}
const Vitals = ({ vitals }) => {
  return (
    <div className="form-row3">
      <label className="">Vitals:</label>
      {/* <div className="contain-vitals"> */}
      <div className="flex flex-row justify-between" style={{ flex: 1 }}>
        <div className="flex flex-col" style={{ flex: 1 }}>
          <div className="vital-item">
            Blood Pressure: {getLatestVital(vitals.blood_pressure_sys)} /{" "}
            {getLatestVital(vitals.blood_pressure_dys)} mmHg
          </div>
          <div className="vital-item">
            Body Temperature: {getLatestVital(vitals.body_temperature)}°F
          </div>
        </div>
        <div className="flex flex-col" style={{ flex: 1 }}>
          <div className="vital-item">
            Pulse Rate: {getLatestVital(vitals.pulse_rate)} BPM
          </div>
          <div className="vital-item">
            Spo2: {getLatestVital(vitals.spo2)}%
          </div>
        </div>
        <div className="flex flex-col" style={{ flex: 1 }}>
          <div className="vital-item">
            RBS: {getLatestVital(vitals.rbs)} mg/dL
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default Vitals;
