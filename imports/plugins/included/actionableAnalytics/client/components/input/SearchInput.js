import React from "react";

export const SearchInput = props => (
  <div className={props.inputClass} >
    <div className="form-group">
      <div className="input-group date">
        <span className="input-group-addon theme-color" >
          <span> <strong> SEARCH </strong> </span>
        </span>
        <input
          id={props.inputName}
          type="text"
          placeholder={props.inputPlaceholder}
          onChange={props.handleInputChange}
          name={props.inputName}
          className="form-control"
        />
        <span className="input-group-addon theme-color" >
          <span className="fa fa-search" aria-hidden="true" />
        </span>
      </div>
    </div>
  </div>);

export default SearchInput;
