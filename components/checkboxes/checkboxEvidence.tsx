import React from 'react';
import { Checkbox, FormControlLabel } from '@material-ui/core';

interface Props {
  selectedEvidence: boolean
  handleChangeEvidence: (evidence: boolean) => void;
}

function CheckboxEvidence(
  {
    selectedEvidence, handleChangeEvidence,
  }: Props,
) {
  const [state, setState] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState(event.target.checked);
    handleChangeEvidence(event.target.checked);
  };

  React.useEffect(() => {
    if (selectedEvidence) {
      // console.log(selectedEvidence);
      setState(true);
    }
  });
  return (
    <FormControlLabel
      control={
        <Checkbox checked={state} onChange={handleChange} name="Evidence" inputProps={{ 'aria-label': 'Checbox for evidence' }} />
      }
      label="Evidence"
    />
  );
}

export default CheckboxEvidence;
