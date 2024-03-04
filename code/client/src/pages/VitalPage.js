import React, { useEffect, useState } from "react";
import { FETCH_NUMBER, FETCH_VITAL } from "../gqloperations/queries";
import { useQuery } from "@apollo/client"; // NOT USE lazy QUERY
import { ChatState } from "../context/ChatProvider";

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
    }, 5000);

    return () => clearInterval(interval);
  }, [refetch]);

  if (loading || !vitals) return <p>Loading...</p>;

  return (
    <div>
      <div>Patient Name - {vitals.name}</div>
      <div>
        Blood Pressure Dys -{" "}
        {vitals.blood_pressure_dys.length > 0
          ? vitals.blood_pressure_dys[vitals.blood_pressure_dys.length - 1]
          : "N/A"}
      </div>
      <div>
        Blood Pressure Sys -{" "}
        {vitals.blood_pressure_sys.length > 0
          ? vitals.blood_pressure_sys[vitals.blood_pressure_sys.length - 1]
          : "N/A"}
      </div>
      <div>
        Body Temperature -{" "}
        {vitals.body_temperature.length > 0
          ? vitals.body_temperature[vitals.body_temperature.length - 1]
          : "N/A"}
      </div>
      <div>
        Pulse Rate -{" "}
        {vitals.pulse_rate.length > 0
          ? vitals.pulse_rate[vitals.pulse_rate.length - 1]
          : "N/A"}
      </div>
      <div>
        Spo2 -{" "}
        {vitals.spo2.length > 0 ? vitals.spo2[vitals.spo2.length - 1] : "N/A"}
      </div>
      <div>
        RBS - {vitals.rbs.length > 0 ? vitals.rbs[vitals.rbs.length - 1] : "N/A"}
      </div>
    </div>
  );
};

export default VitalPage;
