import React from "react";


export const DateTimePicker = props => (
  <div className={props.dateClass} >
    <div className="form-group">
      <div className="input-group date" id="datetimepicker1">
        <span className="input-group-addon theme-color" >
          <span> <strong> {props.sideLabel} </strong> </span>
        </span>
        <input
          id={props.inputName}
          type="date"
          onChange={props.handleInputChange}
          name={props.inputName}
          className="form-control"
        />
        <span className="input-group-addon theme-color" >
          <span className="fa fa-calendar" aria-hidden="true" />
        </span>
      </div>
    </div>
  </div>);

export default DateTimePicker;
