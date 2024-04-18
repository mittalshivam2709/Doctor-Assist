import React from "react";
function getLatestVital(vitalArray) {
  return vitalArray.length > 0 ? vitalArray[vitalArray.length - 1] : "N/A";
}

const VitalDisplay = ({ label, value, unit }) => (
  <div className="form-row3">
    <div style={{ width: "200px" }}>{label}:</div>
    <div style={{ whiteSpace: "pre-wrap" }}>
      {`${value} ${unit}`}
    </div>
  </div>
);

const Vitals = ({ vitals }) => {
  return (
    // <div className="form-row3">
    //   {/* <label className="">Vitals:</label> */}
    //   {/* <div className="contain-vitals"> */}
    //   <div className="flex flex-row justify-between" style={{ flex: 1 }}>
    //     <div className="flex flex-col" style={{ flex: 1 }}>
    //       <div className="vital-item">
    //         Blood Pressure: {getLatestVital(vitals.blood_pressure_sys)} /{" "}
    //         {getLatestVital(vitals.blood_pressure_dys)} mmHg
    //       </div>
    //       <div className="vital-item">
    //         Body Temperature: {getLatestVital(vitals.body_temperature)}°F
    //       </div>
    //     </div>
    //     <div className="flex flex-col" style={{ flex: 1 }}>
    //       <div className="vital-item">
    //         Pulse Rate: {getLatestVital(vitals.pulse_rate)} BPM
    //       </div>
    //       <div className="vital-item">
    //         Spo2: {getLatestVital(vitals.spo2)}%
    //       </div>
    //     </div>
    //     <div className="flex flex-col" style={{ flex: 1 }}>
    //       <div className="vital-item">
    //         RBS: {getLatestVital(vitals.rbs)} mg/dL
    //       </div>
    //     </div>
    //   </div>
    //   {/* </div> */}
    // </div>
    <div className="form-section3">
      <VitalDisplay
        label="Blood Pressure (sys)"
        value={getLatestVital(vitals.blood_pressure_sys)}
        unit="mmHg"
      />
      <VitalDisplay
        label="Blood Pressure (dys)"
        value={getLatestVital(vitals.blood_pressure_dys)}
        unit="mmHg"
      />
      <VitalDisplay
        label="Body Temperature"
        value={getLatestVital(vitals.body_temperature)}
        unit="°F"
      />
      <VitalDisplay
        label="Pulse Rate"
        value={getLatestVital(vitals.pulse_rate)}
        unit="bpm"
      />
      <VitalDisplay
        label="RBS"
        value={getLatestVital(vitals.rbs)}
        unit="mg/dL"
      />
      <VitalDisplay
        label="spO2"
        value={getLatestVital(vitals.spo2)}
        unit="%"
      />
      <VitalDisplay
        label="Pupil Size"
        value={vitals.pupil_size}
        unit=""
      />
      <VitalDisplay
        label="Reaction To Light"
        value={vitals.reaction_to_light}
        unit=""
      />
      
      <VitalDisplay
        label="Skin Colour"
        value={vitals.skin_color}
        unit=""
      />
      <VitalDisplay
        label="Skin Temperature"
        value={vitals.skin_temperature}
        unit=""
      />
      <VitalDisplay
        label="Condition"
        value={vitals.condition}
        unit=""
      />
      <VitalDisplay
        label="Capillary Refill"
        value={vitals.capillary_refill}
        unit=""
      />
      <VitalDisplay
        label="Rhythm"
        value={vitals.rhythm}
        unit=""
      />
      <VitalDisplay
        label="Volume"
        value={vitals.volume}
        unit=""
      />
      <VitalDisplay
        label="Adventitious Sounds"
        value={vitals.adventitious_sounds}
        unit=""
      />
    </div>
  );
};

export default Vitals;
