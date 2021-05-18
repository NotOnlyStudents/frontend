import React from 'react';
import { Checkbox, FormControlLabel } from '@material-ui/core';

interface Props {
  status: boolean,
  disabled: boolean,
  handleChangeStatus: (status: boolean) => void;
}

function CheckboxStatus({
  status, disabled, handleChangeStatus,
}: Props) {
  const [checked, setChecked] = React.useState(status);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChangeStatus(event.target.checked);
  };

  React.useEffect(() => {
    setChecked(status);
  }, [status]);

  return (
    <FormControlLabel
      control={
        <Checkbox checked={checked} onChange={handleChange} name="Fulfilled" inputProps={{ 'aria-label': 'Checbox for status' }} />
      }
      label="Fulfilled"
      labelPlacement="bottom"
      disabled={disabled}
    />
  );
}

export default CheckboxStatus;
