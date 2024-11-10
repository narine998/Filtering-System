import React from "react";

const Category = ({ list, name, filterArr, onChange }) => {
  return (
    <>
      <h3>{name[0].toUpperCase() + name.slice(1)}</h3>
      {list.map((item) => (
        <label key={item}>
          <input
            type="checkbox"
            name={name}
            value={item}
            checked={filterArr.includes(item)}
            onChange={(e) => {
              const selectedItems = e.target.checked
                ? [...filterArr, item]
                : filterArr.filter((el) => el !== item);
              onChange(name, selectedItems);
            }}
          />
          {item}
        </label>
      ))}
    </>
  );
};

export default Category;
