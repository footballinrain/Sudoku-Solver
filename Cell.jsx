import React from 'react';
import './Cell.css';

const Cell = ({ value, onChange }) => {
  return (
    <input
      className="cell"
      type="text"
      value={value}
      onChange={onChange}
      maxLength="1"
    />
  );
};

export default Cell;
