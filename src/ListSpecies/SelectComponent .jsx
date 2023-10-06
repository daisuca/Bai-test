import React, { memo } from "react";
import { Select } from "antd";

const SelectComponent = memo(({ placeholder, options, value, onChange }) => {
  return (
    <Select
      placeholder={placeholder}
      style={{ width: "100%" }}
      options={options}
      value={value}
      onChange={onChange}
    />
  );
});

export default SelectComponent;
