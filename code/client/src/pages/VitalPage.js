import React, { useEffect, useState } from "react";
import { FETCH_NUMBER } from "../gqloperations/queries";
import { useQuery } from "@apollo/client"; // NOT USE lazy QUERY

const VitalPage = () => {
  const { loading, data, refetch } = useQuery(FETCH_NUMBER);

  const [vital, setVital] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch().then((response) => {
        const numbers = response?.data?.getNumberList?.numbers;
        if (numbers && numbers.length > 0) {
          setVital(numbers[numbers.length - 1]);
        }
      });
    }, 1000);

    return () => clearInterval(interval); 
  }, [refetch]); 

  if (loading) return <p>Loading...</p>;

  return <div>Current vital - {vital}</div>;
};

export default VitalPage;
