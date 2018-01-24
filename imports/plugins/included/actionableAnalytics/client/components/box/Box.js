import React from "react";

export const Box = props => (
  <div className="report-box col-sm-10">
    <p className="box-heading">
      {props.boxTitle}
    </p>
    <p className="box-value">
      <strong>
        {props.boxValue}
      </strong>
    </p>
  </div>);

export default Box;
