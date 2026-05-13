import { Box, Avatar, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export interface RoleItem {
  label: string;
  isAI?: boolean;
}

interface ArtistCardProps {
  name: string;
  roleLabel: string;
  roleItems?: RoleItem[];
  usedAI?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  avatarColor?: string;
}

function AIBadge() {
  return (
    <Box
      component="span"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 16,
        height: 16,
        borderRadius: '4px',
        bgcolor: '#1E1E2E',
        color: '#fff',
        fontWeight: 600,
        fontSize: '9px',
        lineHeight: 1,
        flexShrink: 0,
      }}
    >
      AI
    </Box>
  );
}

export default function ArtistCard({
  name, roleLabel, roleItems, usedAI, onEdit, onDelete, avatarColor = '#484f7a',
}: ArtistCardProps) {
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
      }}
    >
      <Avatar sx={{ bgcolor: avatarColor, width: 40, height: 40, fontSize: 16, fontWeight: 500 }}>
        {initials}
      </Avatar>

      <Box sx={{ flex: 1, overflow: 'hidden' }}>
        <Typography variant="body1" sx={{ color: '#000', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {name}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, flexWrap: 'wrap' }}>
          {roleItems ? (
            roleItems.map((item, i) => (
              <Box key={i} sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}>
                <Typography variant="body2" sx={{ color: '#000' }}>
                  {i > 0 ? `, ${item.label}` : item.label}
                </Typography>
                {item.isAI && <AIBadge />}
              </Box>
            ))
          ) : (
            <>
              <Typography variant="body2" sx={{ color: '#000' }}>{roleLabel}</Typography>
              {usedAI && <AIBadge />}
            </>
          )}

          {onEdit && (
            <Typography
              component="button"
              onClick={onEdit}
              sx={{
                border: 'none', background: 'none', cursor: 'pointer',
                color: '#484f7a', fontWeight: 600, fontSize: '0.875rem',
                p: 0, lineHeight: '1.25rem',
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
