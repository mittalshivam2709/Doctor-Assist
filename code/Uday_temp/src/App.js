import logo from './logo.png';
import './App.css';
import React, { useState } from 'react';

function App() {

  // const AmbulanceInfo = () => {
  //   const [expanded, setExpanded] = useState(false);

  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="App">


      <header className="header">
        <div className="header-content">
          <div className="logo">
          
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
              <p style={{ color: 'rgb(54, 114, 136)',fontSize:'15px',fontWeight:'bold',lineHeight: '0',textAlign:'left',marginTop:"5%", }}>Inbox</p>
              <div className="labels">
                  <span className="label critical"></span>
                  <p style={{ color: 'rgb(146,146,146)',fontSize:'12px'}}>Critical</p>
                  <span className="label moderate"></span>
                  <p style={{ color: 'rgb(146,146,146)',fontSize:'12px'}}>Moderate</p>
                  <span className="label minor"></span>
                  <p style={{ color: 'rgb(146,146,146)',fontSize:'12px'}}>Minor</p>
              </div>

            </div>
            {/* Content for the first column */}
            <div className="expandable-box" onClick={toggleExpanded}>
              <div className={`box-content ${expanded ? 'expanded' : ''}`}>
                {expanded ? (
                  <p>Expanded content goes here...</p>
                ) : (
                  // <p>Limited information initially...</p>
                  <div style={{ backgroundColor: 'rgb(220,234,254)', paddingTop: '5px',paddingBottom:'8px'}}>
                    <span style={{ textAlign:'right',color:'rgb(15,96,241)',fontSize:'12px',marginRight:'5%',marginTop:'10%',paddingLeft:'43%' }}>Ambulance No-2304</span>
                    <span style = {{fontSize:'12px',textAlign:'right'}}>12:11 PM</span>

                  
                   <p style ={{textAlign:'left',paddingLeft:'6%',marginTop:'8px',marginBottom:'5px'}}><strong>Cardiac-cardiac-cardiac-arrest</strong></p>

                    <span style={{paddingLeft:'6%',marginRight: '12%',fontSize:'12px',paddingBottom:'10px'}}>Age - 45 Years</span>

                    <span style={{marginRight: '12%',fontSize:'12px'}}>Age type - old</span>

                    <span style={{fontSize:'12px'}}>Gender - Male</span>

                  </div>
                )}
              </div>
            </div>

          </div>
          <div className="larger-column">
          {/* <p>Chief Complaint -  Breathing Problem-Breathing Problem-Breathing Problem</p> */}
            <div className='long-column-header'>

              <span style={{marginRight:'1px'}}>Chief Complaint -  </span>
              <span style={{fontWeight:'bold',marginLeft:'0',paddingRight:'28%'}}>Breathing Problem-Breathing Problem-Breathing Problem</span>
            </div>
            <div className='right-column'>
              ehvckhwkv
            </div>

          </div>

        </div>
      </div>

    </div>


  );
}

export default App;
