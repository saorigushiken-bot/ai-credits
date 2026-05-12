import { Box, Avatar, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface ArtistCardProps {
  name: string;
  roleLabel: string;
  usedAI?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  avatarColor?: string;
}

export default function ArtistCard({ name, roleLabel, usedAI, onEdit, onDelete, avatarColor = '#484f7a' }: ArtistCardProps) {
  const initials = name.trim().charAt(0).toUpperCase() || '?';

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        px: 2,
        py: 1,
        bgcolor: '#ecedf4',
        borderRadius: 1,
        minHeight: 72,
        position: 'relative',
        '&:hover .artist-actions': { opacity: 1 },
      }}
    >
      <Avatar sx={{ bgcolor: avatarColor, width: 40, height: 40, fontSize: 16, fontWeight: 500 }}>
        {initials}
      </Avatar>

      <Box sx={{ flex: 1, overflow: 'hidden' }}>
        <Typography variant="body1" sx={{ color: '#000', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" sx={{ color: '#000' }}>
            {roleLabel}
            {usedAI && <strong> (IA)</strong>}
          </Typography>
          {onEdit && (
            <Typography
              component="button"
              onClick={onEdit}
              sx={{
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                color: '#484f7a',
                fontWeight: 600,
                fontSize: '0.875rem',
                p: 0,
                lineHeight: '1.25rem',
              }}
            >
              Editar
            </Typography>
          )}
        </Box>
      </Box>

      {onDelete && (
        <IconButton
          aria-label={`Eliminar ${name}`}
          onClick={onDelete}
          size="small"
          sx={{ color: '#535353' }}
        >
          <DeleteIcon />
        </IconButton>
      )}
    </Box>
  );
}
