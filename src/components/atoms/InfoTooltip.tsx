import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Tooltip, IconButton } from '@mui/material';

interface InfoTooltipProps {
  title: string;
}

export default function InfoTooltip({ title }: InfoTooltipProps) {
  return (
    <Tooltip title={title} arrow placement="top">
      <IconButton size="small" aria-label={`Información: ${title}`} sx={{ color: '#535353', p: 0.5 }}>
        <InfoOutlinedIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  );
}
