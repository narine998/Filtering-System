import React from "react";

const PriceRange = ({ price, onChange, type }) => {
  return (
    <input
      type="range"
      min="0"
      max="1000"
      value={price}
      onChange={(e) => onChange(type, Number(e.target.value))}
    />
  );
};

export default PriceRange;
