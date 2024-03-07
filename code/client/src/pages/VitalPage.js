import React, { useEffect, useState } from "react";
import { FETCH_NUMBER, FETCH_VITAL, FETCH_PATIENTS } from "../gqloperations/queries";
import { useQuery } from "@apollo/client"; // NOT USE lazy QUERY
import { ChatState } from "../context/ChatProvider";
import doc from '../doc.png'

const VitalPage = () => {
  const { vitals, setVitals, selectedChat } = ChatState();

  const { loading, data, refetch } = useQuery(FETCH_VITAL, {
    variables: { emtId: selectedChat },
  });

  useEffect(() => {
    refetch().then((response) => {
      const curr_vitals = response?.data?.fetchVitals;
      if (curr_vitals) {
        setVitals(curr_vitals);
      }

    });

  }, [selectedChat]);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch().then((response) => {
        const curr_vitals = response?.data?.fetchVitals;
        if (curr_vitals) {
          setVitals(curr_vitals);
          console.log(curr_vitals);
        }

      });
    }, 5001);

    return () => clearInterval(interval);
  }, [refetch]);

  if (loading || !vitals) return <p>Loading...</p>;

  return (
    <div className="vital-page">
      <div className="doctor-info">
        <img src={doc} className="doctor-logo" />
        <div className="doctor-text">
          <h1>Dr. Mohammad Shafi</h1>
          <p>MBBS, MD (Haematology), (Thalassemia, Anemia, Lymphoma, Blood Cancer, Jaundice, blood related diseases)</p>
          <p>Mobile: 01841-122215, Visiting Time: 6 pm to 8 pm (Except Friday & Govt Holiday)</p>
        </div>
      </div>
      <div className="case-sheet">
        <div className="headingg">
          <h3>
            CASE SHEET
            <div className="datee">
              Date: DD/MM/YYYY
            </div>
          </h3>
        </div>
        <form>
          <div className="form-section">
            <div className="form-row">
              <label>
                Patient's name:
                <input type="text" value={vitals.name} readOnly />
              </label>

            </div>
            <div className="form-row">
              <label>
                Sex:
                <input type="text" value={vitals.name} readOnly />
              </label>
            </div>
            <div className="form-row">
              <label>
                Address:
                <input type="text" value={vitals.name} readOnly />
              </label>
            </div>
            <div className="form-row">
              <label>
                Phone:
                <input type="text" value={vitals.name} readOnly />
              </label>
            </div>
            <div className="form-row">
              <label>
                Age:
                <input type="text" value={vitals.name} readOnly />
              </label>
            </div>
            <div className="form-row">
              <label>
                Occupation:
                <input type="text" value={vitals.name} readOnly />
              </label>
            </div>
          </div>
          <div className="form-section2">

            <div className="form-row2">
              <label>
                Chief complaint & duration:
              </label>
              <textarea readOnly>{vitals.treatment}</textarea>
            </div>

            <div className="form-row2">
              <label>
                History of present illness:
              </label>
              <textarea readOnly>{vitals.treatment}</textarea>
            </div>

            <div className="form-row2">
              <label>
                Past medical history:
              </label>
              <textarea readOnly>{vitals.treatment}</textarea>
            </div>

            <div className="form-row2">
              <label>
                Diagnosis:
              </label>
              <textarea readOnly>{vitals.diagnosis}</textarea>
            </div>

            <div className="form-row2">
              <label>
                Treatment:
              </label>
              <textarea readOnly>{vitals.treatment}</textarea>
            </div>
          </div>

          {/* <div className="form-row">
            <label>Vitals:</label>
            <div className="vitals-grid">
              <div>Blood Pressure: {getLatestVital(vitals.blood_pressure_sys)} / {getLatestVital(vitals.blood_pressure_dys)}</div>
              <div>Body Temperature: {getLatestVital(vitals.body_temperature)}</div>
              <div>Pulse Rate: {getLatestVital(vitals.pulse_rate)}</div>
              <div>Spo2: {getLatestVital(vitals.spo2)}</div>
              <div>RBS: {getLatestVital(vitals.rbs)}</div>
            </div>
          </div> */}
          <div className="form-section3">
            <div className="form-row3">
              <label>Vitals:</label>
              <div className="vitals-grid">
                <div className="vital-item">Blood Pressure: {getLatestVital(vitals.blood_pressure_sys)} / {getLatestVital(vitals.blood_pressure_dys)} unit</div>
                <div className="vital-item">Body Temperature: {getLatestVital(vitals.body_temperature)} unit</div>
                <div className="vital-item">Pulse Rate: {getLatestVital(vitals.pulse_rate)} unit</div>
                <div className="vital-item">Spo2: {getLatestVital(vitals.spo2)} unit</div>
                <div className="vital-item">RBS: {getLatestVital(vitals.rbs)} unit</div>
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};

// Helper function to get the latest vital sign
function getLatestVital(vitalArray) {
  return vitalArray.length > 0 ? vitalArray[vitalArray.length - 1] : 'N/A';
}

export default VitalPage;
