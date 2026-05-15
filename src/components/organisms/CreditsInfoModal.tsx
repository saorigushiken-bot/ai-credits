import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  IconButton, Typography, Button, Box, Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
  open: boolean;
  onClose: () => void;
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
        verticalAlign: 'middle',
      }}
    >
      AI
    </Box>
  );
}

function ExampleEntry({ name, roles }: { name: string; roles: { label: string; ai?: boolean }[] }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
      <Typography sx={{ fontWeight: 600, fontSize: '0.875rem', color: '#171717' }}>{name}</Typography>
      {roles.map((r, i) => (
        <Box key={i} sx={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          <Typography sx={{ fontWeight: 400, fontSize: '0.875rem', color: '#797676' }}>{r.label}</Typography>
          {r.ai && <AIBadge />}
        </Box>
      ))}
    </Box>
  );
}

export default function CreditsInfoModal({ open, onClose }: Props) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      slotProps={{
        paper: { sx: { width: 560, borderRadius: '16px', bgcolor: '#fff' } },
        backdrop: { sx: { bgcolor: 'rgba(0,0,0,0.5)' } },
      }}
      aria-labelledby="credits-info-title"
    >
      <DialogTitle
        id="credits-info-title"
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}
      >
        <Typography sx={{ fontSize: '22px', fontWeight: 400, color: '#171717' }}>
          ¿Cómo aparecerán tus créditos?
        </Typography>
        <IconButton onClick={onClose} aria-label="Cerrar" size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 1 }}>
        <Typography sx={{ fontSize: '16px', color: '#797676', lineHeight: 1.6 }}>
          Los créditos que declares aquí serán enviados a las plataformas de distribución y
          aparecerán visibles para los oyentes en la sección de créditos de cada pista.
          <br /><br />
          Los créditos se muestran a nivel de rol. Aquellos roles que fueron generados íntegramente
          por inteligencia artificial aparecerán identificados con una etiqueta AI junto al rol
          correspondiente.
        </Typography>

        <Box>
          <Typography sx={{ fontSize: '16px', color: '#797676', fontWeight: 500, mb: 1.5 }}>
            Ejemplo:
          </Typography>

          <Box
            sx={{
              bgcolor: '#F5F5F5',
              borderRadius: '8px',
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 1.5,
            }}
          >
            <ExampleEntry
              name="Nombre del artista principal"
              roles={[{ label: 'Artista principal' }]}
            />
            <Divider sx={{ borderColor: '#E0E0E0' }} />
            <ExampleEntry
              name="Nombre del artista secundario"
              roles={[{ label: 'Artista secundario', ai: true }]}
            />
            <Divider sx={{ borderColor: '#E0E0E0' }} />
            <ExampleEntry
              name="GenerativeAI"
              roles={[
                { label: 'Voces', ai: true },
                { label: 'Todos los instrumentos', ai: true },
              ]}
            />
            <Divider sx={{ borderColor: '#E0E0E0' }} />
            <ExampleEntry
              name="Nombre del contribuidor"
              roles={[{ label: 'Letrista' }]}
            />
          </Box>
        </Box>

        <Box
          sx={{
            bgcolor: '#F5F5F5',
            borderRadius: '8px',
            p: 2,
          }}
        >
          <Typography sx={{ fontSize: '14px', color: '#535353', lineHeight: 1.6 }}>
            Declarar el uso de IA es actualmente opcional y no afecta a tus reproducciones,
            regalías ni a la visibilidad de tu música. El objetivo es ofrecer transparencia a
            tus oyentes sobre cómo fue creada la pista.
          </Typography>
        </Box>
      </DialogContent>

      <Divider />

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button
          variant="contained"
          onClick={onClose}
          sx={{
            bgcolor: '#CF0389',
            '&:hover': { bgcolor: '#b00278' },
            borderRadius: '100px',
            height: 40,
            px: 3,
            textTransform: 'none',
            fontWeight: 500,
          }}
        >
          Entendido
        </Button>
      </DialogActions>
    </Dialog>
  );
}
