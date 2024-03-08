import React from "react";

const PatientDetails = ({ vitals }) => {
  console.log(vitals.name);
  return (
    <div className="form-section">
      {/* <div className="flex flex-col form-row" style={{ flex: 1 }}> */}
      <div className="form-row">
        <label>Patient's name: {vitals.name}</label>
      </div>
      <div className="form-row">
        <label>Sex: {vitals.name}</label>
      </div>
      {/* </div> */}
      {/* <div className="flex flex-col form-row" style={{ flex: 1 }}> */}
      <div className="form-row">
        <label>Address: {vitals.name}</label>
      </div>
      <div className="form-row">
        <label>Phone: {vitals.name}</label>
      </div>
      {/* </div> */}
      {/* <div className="flex flex-col form-row" style={{ flex: 1 }}> */}
      <div className="form-row">
        <label>Age: {vitals.name}</label>
      </div>
      <div className="form-row">
        <label>Occupation: {vitals.name}</label>
      </div>
    </div>
    // </div>
  );
};

export default PatientDetails;
