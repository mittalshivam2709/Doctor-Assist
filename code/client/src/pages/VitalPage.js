import React, { useEffect, useState } from "react";
import {
  FETCH_NUMBER,
  FETCH_VITAL,
  FETCH_PATIENTS,
} from "../gqloperations/queries";
import { useQuery } from "@apollo/client"; // NOT USE lazy QUERY
import { ChatState } from "../context/ChatProvider";
import doc from "../doc.png";
import DoctorLogo from "../components/DoctorLogo";
import PatientDetails from "../components/PatientDetails";
import Vitals from "../components/Vitals";
import MedicalInfo from "../components/MedicalInfo";

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
    <div className="vital-page" style={{ height: "100%" }}>
      <div className="doctor-info" style={{ height: "12%" }}>
        <DoctorLogo />

        <div className="doctor-text">
          <h1>Dr. Mohammad Shafi</h1>
          <p>
            MBBS, MD (Haematology), (Thalassemia, Anemia, Lymphoma, Blood
            Cancer, Jaundice, blood related diseases)
          </p>
          <p>
            Mobile: 01841-122215, Visiting Time: 6 pm to 8 pm (Except Friday &
            Govt Holiday)
          </p>
        </div>
      </div>
      <div className="case-sheet" style={{ height: "80%" }}>
        <div className="headingg">
          <h3>
            <div className="titlee">CASE SHEET</div>
            <div className="datee">Date: DD/MM/YYYY</div>
          </h3>
        </div>
        <>
          <PatientDetails vitals={vitals} />

          <MedicalInfo vitals={vitals} />

          <Vitals vitals={vitals} />
        </>
      </div>
    </div>
  );
};

export default VitalPage;
