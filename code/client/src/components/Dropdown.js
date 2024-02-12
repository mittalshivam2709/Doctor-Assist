import React, { useState } from 'react';
import '../index.css';
import LoremIpsum from '../utils/loremipsum';



const Dropdown = ({ title, content, color = "red" }) => {

  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="expanding-box bg-red text-white" onClick={handleToggle}>
      <div className="expanding-box-header bg-red">{title}</div>
      {expanded && <div className="expanding-box-content">{content} {LoremIpsum} </div>}
      {/* TestContent */}
    </div>
  );
};

export default Dropdown;
