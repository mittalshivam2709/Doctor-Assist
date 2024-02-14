import React from "react";
import "../index.css";

const Template = () => {
    return (

        <div
        className="inbox-box bg-white text-black text-sm flex justify-between"  style={{padding:"5%", borderRadius:"0"}}>
        
            <div className="font-bold"> Inbox </div>
            <div>Critical Moderate Minor</div>
        </div>
    )
}
export default Template;