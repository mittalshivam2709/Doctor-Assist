import React from "react";

const Template = () => {
  return (
    <div className="inbox-box bg-white text-black text-sm flex flex-col justify-between" style={{background:"#FFFFFF",borderRadius:"10px"}}>
      <div className="font-bold text-lg" style={{ fontFamily: 'Poppins',color:"blue",fontSize:'30px' }}> Inbox </div>
      <div className="flex flex-col md:flex-row space-x-4">
        <div className="md:flex md:flex-row items-center">
          <div class="red-square"></div>
          <div className="text_critical">Critical</div>
        </div>
        <div className="md:flex md:flex-row items-center space-x-1" >
          <div class="yellow-square"></div>
          <div className="text_moderate"> Moderate</div>
        </div>
        <div className="md:flex md:flex-row items-center">
          <div class="green-square"></div>
          <div className="text_minor">Minor</div>
        </div>
      </div>
    </div>
  );
};

export default Template;
