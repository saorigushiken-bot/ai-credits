import { Box, Typography } from '@mui/material';

interface AddCardProps {
  label: string;
  onClick: () => void;
}

export default function AddCard({ label, onClick }: AddCardProps) {
  return (
    <Box
      component="button"
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        px: 2,
        py: 1,
        bgcolor: '#fff',
        border: '1px dashed #959393',
        borderRadius: 1,
        minHeight: 72,
        width: '100%',
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'background-color 0.15s',
        '&:hover': { bgcolor: '#f5f5f5' },
        '&:focus-visible': { outline: '2px solid #484f7a', outlineOffset: 2 },
      }}
    >
      <Box
        sx={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: '1px solid #484646',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          color: '#484646',
          fontSize: 22,
          lineHeight: 1,
        }}
      >
        +
      </Box>
      <Typography variant="body1" sx={{ color: '#313030' }}>
        {label}
      </Typography>
    </Box>
  );
}
