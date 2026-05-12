import { Checkbox, FormControlLabel } from '@mui/material';

interface CheckboxItemProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  disabled?: boolean;
}

export default function CheckboxItem({ checked, onChange, label, disabled }: CheckboxItemProps) {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          size="small"
        />
      }
      label={label}
      sx={{ '& .MuiFormControlLabel-label': { fontSize: '1rem', color: '#313030' } }}
    />
  );
}
