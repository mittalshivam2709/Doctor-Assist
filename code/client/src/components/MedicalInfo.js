import React from "react";

const MedicalInfo = ({ vitals }) => {
  return (
    <div className="form-section2">
      <div className="form-row2">
        <label>Chief complaint & duration:</label>
        <textarea readOnly>{vitals.treatment}</textarea>
      </div>

      <div className="form-row2">
        <label>History of present illness:</label>
        <textarea readOnly>{vitals.treatment}</textarea>
      </div>

      <div className="form-row2">
        <label>Past medical history:</label>
        <textarea readOnly>{vitals.treatment}</textarea>
      </div>

      <div className="form-row2">
        <label>Diagnosis:</label>
        <textarea readOnly>{vitals.diagnosis}</textarea>
      </div>

      <div className="form-row2">
        <label>Treatment:</label>
        <textarea readOnly>{vitals.treatment}</textarea>
      </div>
    </div>
  );
};

export default MedicalInfo;
