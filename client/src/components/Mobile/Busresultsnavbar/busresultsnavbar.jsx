import React from "react";
import './busresultsnavbar.scss'

function busresultsnavbar() {
  return (
    <div className="mobile_navbar_section">
      <div className="left_section">
        <div className="back_arrow">
          <h1>&#129104;</h1>
        </div>
        <div className="place">
          <h1>Bangalore - Hyderabad</h1>
          <p>102 Buses</p>
        </div>
      </div>
      <div className="right_section">
        <button>05 Jul,Wed</button>
      </div>
    </div>
  );
}

export default busresultsnavbar;
