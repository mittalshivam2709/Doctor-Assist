import React from "react";

const MedicalInfo = ({ selectedPatient }) => {
  return (
    <div className="form-section2">
      <div className="form-row2">
        <div style={{width:"200px"}}>Chief complaint & duration:</div>
        <textarea readOnly>{selectedPatient.problem}</textarea>
      </div>

      <div className="form-row2">
        <div  style={{width:"200px"}}>History of present illness:</div>
        <textarea readOnly>{selectedPatient.event_during_transport}</textarea>
      </div>

      <div className="form-row2">
        <div  style={{width:"200px"}}>Past medical history:</div>
        <textarea readOnly>{selectedPatient.past_history}</textarea>
      </div>

      <div className="form-row2">
        <div style={{width:"200px"}}>Diagnosis:</div>
        <textarea readOnly>{selectedPatient.symptoms}</textarea>
      </div>

      <div className="form-row2">
        <div style={{width:"200px"}}>Treatment:</div>
        <textarea readOnly>TBD</textarea>
      </div>
    </div>
  );
};

export default MedicalInfo;
