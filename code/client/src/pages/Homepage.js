import React, { useEffect, useState } from "react";
import Dropdown from "../components/Dropdown";
import Placeholder from "../components/Placeholder";
import Template from "../components/Template";
import ChatPage from "./ChatPage";
import { ChatState } from "../context/ChatProvider";
import Navbar from "../components/Navbar";
import { FETCH_PATIENTS } from "../gqloperations/queries";
import { useQuery } from "@apollo/client";

const Homepage = () => {
  const {user, selectedChat} = ChatState();

  const { loading, data, refetch } = useQuery(FETCH_PATIENTS, {
    variables: {docId :  user}
  });

  const [patients, setPatients] = useState([]);
  useEffect(() => {
    console.log("init fetch");
      refetch().then((response) => {
        const resp = response?.data?.fetchAmbulancesByDoctorId;
        console.log(resp);
        if (resp && resp.length > 0) {
          setPatients(resp)
        }
      });
  }, []); 

  useEffect(() => {
    const interval = setInterval(() => {
      refetch().then((response) => {
        const resp = response?.data?.fetchAmbulancesByDoctorId;
        console.log(resp);
        if (resp && resp.length > 0) {
          setPatients(resp)
        }
      });
    }, patients?10000:0);

    return () => clearInterval(interval); 
  }, [refetch]); 

  return (
    <div className="flex-container wrapper">
      <div className="column">
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
        <Template />

        {patients.map((item) => (
          <Dropdown
            key={item.id}
            data={item}
          />
        ))}
      </div>
      <div className="column">
        <h1 className="text-3xl font-bold underline">{`Rendering ${selectedChat}`}</h1>
        {selectedChat && 
        <ChatPage />
      }
      {
        !selectedChat && 
        <Placeholder />
      }
      </div>
    </div>
  );
};

export default Homepage;
