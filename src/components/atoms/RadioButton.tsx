import { FormControlLabel, Radio } from '@mui/material';

interface RadioButtonProps {
  value: string;
  label: string;
}

export default function RadioButton({ value, label }: RadioButtonProps) {
  return (
    <FormControlLabel
      value={value}
      control={<Radio size="small" />}
      label={label}
      sx={{ '& .MuiFormControlLabel-label': { fontSize: '1rem', color: '#313030' } }}
    />
  );
}
