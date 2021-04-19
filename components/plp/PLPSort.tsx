import React from 'react';

interface SelectOption {
    value: string,
    
}

interface Props{}

function PLPSort() : React.ReactElement {
  const options: SelectOption[] = [{ }];
  return (
    <Select
      labelId="demo-controlled-open-select-label"
      id="demo-controlled-open-select"
      value={age}
      onChange={handleChange}
    >
      <MenuItem value={10}>Ten</MenuItem>
      <MenuItem value={20}>Twenty</MenuItem>
      <MenuItem value={30}>Thirty</MenuItem>
    </Select>
  );
}

export default PLPSort;
