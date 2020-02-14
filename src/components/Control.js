import React from "react";

export default ({ input }) => {
  const {id, label, onChange, ...rest} = input

  return (
    <div id={`bunny-input-${id}`}>
      <label htmlFor={id}>{label}</label>
      <input {...rest} onChange={onChange} />
    </div>
  );
};
