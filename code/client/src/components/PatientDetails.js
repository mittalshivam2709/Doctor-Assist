import React from "react";

const PatientDetails = ({ selectedPatient }) => {
  console.log(selectedPatient.name);
  return (
    <div className="form-section">
      {/* <div className="flex flex-col form-row" style={{ flex: 1 }}> */}
      <div className="form-row">
        <label>Patient's name: {selectedPatient.name}</label>
      </div>
      <div className="form-row">
        <label>Sex: {selectedPatient.gender}</label>
      </div>
      {/* </div> */}
      {/* <div className="flex flex-col form-row" style={{ flex: 1 }}> */}
      <div className="form-row">
        <label>Address: {selectedPatient.address}</label>
      </div>
      <div className="form-row">
        <label>Phone: {selectedPatient.phone}</label>
      </div>
      {/* </div> */}
      {/* <div className="flex flex-col form-row" style={{ flex: 1 }}> */}
      <div className="form-row">
        <label>Age: {selectedPatient.age}</label>
      </div>
      <div className="form-row">
        <label>Occupation: {selectedPatient.occupation}</label>
      </div>
    </div>
    // </div>
  );
};

export default PatientDetails;
