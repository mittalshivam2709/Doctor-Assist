import React from "react";
import "../index.css";

const Template = () => {
    return (
       <div className="inbox-box">
            <div className="font-bold_Inbox"> Inbox </div>
            <span class="container_red">
            <div class="red-square"></div>
            <div class="text_critical">Critical</div>
            </span>
            <span class="container_yellow">
            <div class="yellow-square"></div>
            <div class="text_moderate">Moderate</div>
            </span>
            <span class="container_green">
            <div class="green-square"></div>
            <div class="text_minor">Minor</div>
            </span>
            </div>
    )
}
export default Template;