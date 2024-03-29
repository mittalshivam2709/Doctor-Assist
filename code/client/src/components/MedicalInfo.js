import React from "react";

const MedicalInfo = ({ selectedPatient }) => {
  return (
    <div className="form-section2">
      <div className="form-row2">
        <label>Chief complaint & duration:</label>
        <textarea readOnly>{selectedPatient.problem}</textarea>
      </div>

      <div className="form-row2">
        <label>History of present illness:</label>
        <textarea readOnly>{selectedPatient.event_during_transport}</textarea>
      </div>

      <div className="form-row2">
        <label>Past medical history:</label>
        <textarea readOnly>{selectedPatient.past_history}</textarea>
      </div>

      <div className="form-row2">
        <label>Diagnosis:</label>
        <textarea readOnly>{selectedPatient.symptoms}</textarea>
      </div>

      <div className="form-row2">
        <label>Treatment:</label>
        <textarea readOnly>TBD</textarea>
      </div>
    </div>
  );
};

export default MedicalInfo;
