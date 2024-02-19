import logo from './logo.png';
import './App.css';
import React, { useState } from 'react';

function App() {

  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="App">


      <header className="header">
        <div className="header-content">
          <div className="logo">
            {/* Your EMRI logo */}
            <img src={logo} className="emri-logo" alt="EMRI logo" />
          </div>
          <div className="title">
            <h1>Doctor Assistant App</h1>
          </div>
        </div>
      </header>


      <div className="main-content">
        <div className = "container">

        
        
          <div className="smaller-column">
            <div className = "inbox-header">
              <p style={{ color: 'rgb(54, 114, 136)',fontSize:'15px',fontWeight:'bold',lineHeight: '0',textAlign:'left',marginTop:"5%" }}>Inbox</p>
              <div className="labels">
                  <span className="label critical"></span>
                  <p style={{ color: 'rgb(146,146,146)',fontSize:'12px'}}>Critical</p>
                  <span className="label moderate"></span>
                  <p style={{ color: 'rgb(146,146,146)',fontSize:'12px'}}>Moderate</p>
                  <span className="label minor"></span>
                  <p style={{ color: 'rgb(146,146,146)',fontSize:'12px'}}>Minor</p>
              </div>

            </div>
            Content for the first column
            <div className="expandable-box" onClick={toggleExpanded}>
              <div className={`box-content ${expanded ? 'expanded' : ''}`}>
                {expanded ? (
                  <p>Expanded content goes here...</p>
                ) : (
                  <p>Limited information initially...</p>
                )}
              </div>
            </div>

          </div>
          <div className="larger-column">
            Content for the second column
          </div>

        </div>
      </div>

    </div>


  );
}

export default App;
