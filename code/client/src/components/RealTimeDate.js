import React, { useState, useEffect } from 'react';

const RealTimeDate = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const nextDay = new Date(date);
    nextDay.setDate(date.getDate() + 1);
    nextDay.setHours(0, 0, 0, 0);

    const msUntilNextDay = nextDay.getTime() - new Date().getTime();
    const timer = setTimeout(() => {
      setDate(new Date());
    }, msUntilNextDay);

    return () => {
      clearTimeout(timer);
    };
  }, [date]);

  const formatDate = (date) => {
    const d = new Date(date);
    const day = `0${d.getDate()}`.slice(-2);
    const month = `0${d.getMonth() + 1}`.slice(-2);
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="datee">Date: {formatDate(date)}</div>
  );
};

export default RealTimeDate;
