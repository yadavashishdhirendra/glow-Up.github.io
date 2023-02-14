import React from "react";
import "./input.css"
const Input = ({ htmlFor, inputType, name, id, value, onChange, laBel,...otherProps }) => {
  return (
    <div>
      <label htmlFor={htmlFor}>{laBel}</label>
      <br />
      <input
        type={inputType}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        {...otherProps}
      />
    </div>
  );
};

export default Input;
