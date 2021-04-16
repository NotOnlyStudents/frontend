import React from 'react';
import { Checkbox, FormControlLabel } from '@material-ui/core';

interface Props {
  selectedAvailable: boolean
  handleChangeAvailable: (available: boolean) => void;
}

function CheckboxAvailable(
  {
    selectedAvailable, handleChangeAvailable,
  }: Props,
) {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    handleChangeAvailable(checked);
  };
  console.log(selectedAvailable);
  React.useEffect(() => {
    if (selectedAvailable === true) {
      setChecked(true);
    }
  }, []);

  return (
    <FormControlLabel
      control={
        <Checkbox checked={checked} onChange={handleChange} name="Available" inputProps={{ 'aria-label': 'Checbox for available' }} />
      }
      label="Available"
    />
  );
}

export default CheckboxAvailable;
