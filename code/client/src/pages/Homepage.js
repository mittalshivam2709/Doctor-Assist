import React, { useEffect, useState } from "react";
import Dropdown from "../components/Dropdown";
import Dropdown2 from "../components/Dropdown2";
import Placeholder from "../components/Placeholder";
import Template from "../components/Template";
import ChatPage from "./ChatPage";
import { ChatState } from "../context/ChatProvider";
import Navbar from "../components/Navbar";
import { FETCH_PATIENTS } from "../gqloperations/queries";
import { useQuery } from "@apollo/client";
import "./homepage.css";
import VitalPage from "./VitalPage";
import Draggable from "react-draggable";
import { useLocation } from "react-router-dom";
import { judgeCriticality } from "../utils/criticalityJudgement";
const Homepage = () => {
  // const location = useLocation();
  // const queryParams = new URLSearchParams(location.search);
  // const username = queryParams.get('username');

  // // Set the username in the parent component (App)
  // setUsername(username);

  const { user, selectedChat, setSelectedChat, setSelectedPatient } =
    ChatState();

  const { loading, data, refetch } = useQuery(FETCH_PATIENTS, {
    variables: { docId: user },
  });

  const [patients, setPatients] = useState([]);
  useEffect(() => {
    console.log("init fetch");
    refetch().then((response) => {
      const resp = response?.data?.fetchAmbulancesByDoctorId;
      console.log(resp);
      if (resp && resp.length > 0) {
        setPatients(resp);
      }
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(
      () => {
        refetch().then((response) => {
          const resp = response?.data?.fetchAmbulancesByDoctorId;
          console.log(resp);
          if (resp && resp.length > 0) {
            setPatients(resp);
          }
        });
      },
      patients ? 10000 : 0
    );

    return () => clearInterval(interval);
  }, [refetch]);

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdown2Visible, setDropdown2Visible] = useState(true); // State for Dropdown2 visibility

  const handleToggle = () => {
    setDropdownVisible(!dropdownVisible);
    setDropdown2Visible(!dropdown2Visible); // Toggle Dropdown2 visibility
  };
  const sortedPatients = patients.slice().sort((a, b) => {
    const criticalityOrder = { Critical: 0, Moderate: 1, Minor: 2 };
    return (
      criticalityOrder[judgeCriticality(a)] -
      criticalityOrder[judgeCriticality(b)]
    );
  });
  useEffect(() => {
    setTimeout(() => {
      if(!sortedPatients[0]) return;
      const { emt } = sortedPatients[0];
      console.log("useeffect", emt);
      setSelectedChat(emt);
      setSelectedPatient(sortedPatients[0]);
    }, 1000);
  }, []);

  return (
    <div
      className="flex-container wrapper"
      style={{ background: "white", padding: "10px" }}
    >
      <div
        className={`column ${dropdownVisible ? "hidden" : "visible"}`}
        style={{
          width: "full",
          overflow: "hidden",
          background: "#F4F4FF",
          borderRadius: "10px",
          transition: "width 5s ease", // CSS transition property
        }}
      >
        <Template />
        <div
          style={{
            background: "white",
            padding: "5px",
            paddingTop: "10px",
            borderRadius: "20px",
            height: "85%",
            overflowY: "scroll",
            overflowX: "hidden",
          }}
        >
          {sortedPatients.map((item) => (
            <Dropdown key={item.id} data={item} />
          ))}
        </div>
      </div>

      <div
        className={`column ${dropdown2Visible ? "hidden" : "visible"}`}
        style={{
          width: "full",
          overflow: "hidden",
          background: "#F4F4FF",
          borderRadius: "10px",
        }}
      >
        {/* <Template /> */}
        <div
          style={{
            background: "#F4F4FF",
            padding: "5px",
            paddingTop: "10px",
            borderRadius: "20px",
            height: "85%",
            overflowY: "scroll",
            overflowX: "hidden",
          }}
        >
          {sortedPatients.map((item) => (
            <Dropdown2 key={item.id} data={item} />
          ))}
        </div>
      </div>
      {/* the code below this is for button  */}
      <div className="toggle-button-container" data-visible={dropdownVisible}>
        <button className="toggle-button" onClick={handleToggle}>
          {/* You can use a text-based toggle like '>' and '<' if you want */}
          {dropdownVisible ? ">" : "<"}
        </button>
      </div>
      <div
        className="column"
        style={{ backgroundColor: "#F4F4FF", borderRadius: "10px" }}
      >
        {selectedChat && <VitalPage />}
        {/* {!selectedChat && <Placeholder />} */}
      </div>
    </div>
  );
};

export default Homepage;
