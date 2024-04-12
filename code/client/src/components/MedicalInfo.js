import React from "react";

const MedicalInfo = ({ selectedPatient }) => {
  return (
    <div className="form-section2">
      <div className="form-row2">
        <div style={{width:"200px"}}>Chief complaint & duration:</div>
        <div className="vital-display">{selectedPatient.problem}</div>
      </div>

      <div className="form-row2">
        <div style={{width:"200px"}}>History of present illness:</div>
        <div className="vital-display">{selectedPatient.event_during_transport}</div>
      </div>

      <div className="form-row2">
        <div style={{width:"200px"}}>Past medical history:</div>
        <div className="vital-display">{selectedPatient.past_history}</div>
      </div>

      <div className="form-row2">
        <div style={{width:"200px"}}>Diagnosis:</div>
        <div className="vital-display">{selectedPatient.symptoms}</div>
      </div>

      <div className="form-row2">
        <div style={{width:"200px"}}>Treatment:</div>
        <div className="vital-display">TBD</div>
      </div>
    </div>
  );
};

export default MedicalInfo;
