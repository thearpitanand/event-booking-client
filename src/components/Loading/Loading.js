import React from "react";

// CSS
import "./Loading.css";

const Loading = () => {
  return (
    <div className="loading-main-div">
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
