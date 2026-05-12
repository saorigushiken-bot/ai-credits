import { Box, Typography } from '@mui/material';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  variant?: 'h5' | 'h6' | 'subtitle1';
}

export default function SectionHeader({ title, subtitle, variant = 'h6' }: SectionHeaderProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
      <Typography variant={variant} sx={{ color: '#313030', fontWeight: 500 }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body2" sx={{ color: '#797676' }}>
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}
