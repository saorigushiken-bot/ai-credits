import {
  Box, Typography, Button, IconButton, Slider, Select,
  MenuItem, FormControl, InputLabel, OutlinedInput, AppBar,
  Toolbar,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RELEASE_TYPES = ['Single', 'EP', 'Álbum', 'Maxi single'];
const STEPS = ['Información del lanzamiento', 'Listado de pistas', 'Distribución', 'Revisión'];

const MOCK_TRACK = {
  title: 'Noche de Verano',
  artist: 'Novia Robot',
  duration: '3:42',
  totalSeconds: 222,
};

function Stepper({ active }: { active: number }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0 }}>
      {STEPS.map((label, i) => {
        const idx = i + 1;
        const isActive = idx === active;
        const isDone = idx < active;
        return (
          <Box key={label} sx={{ display: 'flex', alignItems: 'center' }}>
            {i > 0 && (
              <Box sx={{ width: 48, height: 2, bgcolor: isDone ? '#484f7a' : '#cac9c9' }} />
            )}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.75 }}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: isActive || isDone ? '#484f7a' : 'transparent',
                  border: isActive || isDone ? 'none' : '2px solid #cac9c9',
                  color: isActive || isDone ? '#fff' : '#797676',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                }}
              >
                {isDone ? <CheckIcon sx={{ fontSize: 16 }} /> : idx}
              </Box>
              <Typography
                variant="caption"
                sx={{
                  color: isActive ? '#484f7a' : '#797676',
                  fontWeight: isActive ? 600 : 400,
                  fontSize: '0.75rem',
                  whiteSpace: 'nowrap',
                  maxWidth: 90,
                  textAlign: 'center',
                  lineHeight: 1.3,
                }}
              >
                {label}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}

export default function TrackList() {
  const navigate = useNavigate();
  const [playProgress, setPlayProgress] = useState(0);
  const [releaseType, setReleaseType] = useState('Single');

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const currentSeconds = Math.round((playProgress / 100) * MOCK_TRACK.totalSeconds);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5', display: 'flex', flexDirection: 'column' }}>
      {/* Sticky header with stepper */}
      <AppBar position="sticky" color="default" elevation={0} sx={{ bgcolor: '#fff', borderBottom: '1px solid #cac9c9' }}>
        <Toolbar sx={{ minHeight: 72, px: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="body2" sx={{ color: '#797676', fontSize: '0.875rem' }}>
            Nuevo lanzamiento
          </Typography>
          <Stepper active={2} />
          <Box
            component="button"
            onClick={() => navigate('/')}
            aria-label="Cerrar y volver a mis lanzamientos"
            sx={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: 'none', background: 'none', cursor: 'pointer',
              color: '#535353', p: 0.5, borderRadius: 1,
              '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' },
              '&:focus-visible': { outline: '2px solid #484f7a' },
            }}
          >
            <CloseIcon />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Scrollable content */}
      <Box sx={{ flex: 1, maxWidth: 880, width: '100%', mx: 'auto', px: 3, py: 6, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <Typography variant="h4" sx={{ color: '#0d0d0d', fontWeight: 400, fontSize: '2rem' }}>
          Listado de pistas
        </Typography>

        {/* Track player card */}
        <Box
          sx={{
            bgcolor: '#fff',
            border: '0.5px solid #cac9c9',
            borderRadius: 1,
            overflow: 'hidden',
          }}
        >
          {/* Track header row */}
          <Box
            sx={{
              bgcolor: '#ecedf4',
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              px: 2,
              py: 1.5,
            }}
          >
            <DragIndicatorIcon sx={{ color: '#797676', cursor: 'grab', flexShrink: 0 }} />

            {/* Track info */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="subtitle2" sx={{ color: '#0d0d0d', fontWeight: 500 }}>
                1. {MOCK_TRACK.title}
              </Typography>
              <Typography variant="caption" sx={{ color: '#535353' }}>
                {MOCK_TRACK.artist}
              </Typography>
            </Box>

            {/* Edit data button */}
            <Button
              variant="outlined"
              size="small"
              onClick={() => navigate('/step2')}
              sx={{
                borderColor: '#484f7a',
                color: '#484f7a',
                textTransform: 'none',
                fontWeight: 500,
                borderRadius: 1,
                flexShrink: 0,
                '&:hover': { bgcolor: 'rgba(72,79,122,0.06)', borderColor: '#484f7a' },
              }}
            >
              Editar datos
            </Button>
          </Box>

          {/* Player row */}
          <Box
            sx={{
              bgcolor: '#ecedf4',
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              px: 2,
              py: 1,
              borderTop: '1px solid #d9daf0',
            }}
          >
            <IconButton
              aria-label="Reproducir pista"
              sx={{
                bgcolor: '#484f7a',
                color: '#fff',
                width: 36,
                height: 36,
                flexShrink: 0,
                '&:hover': { bgcolor: '#3a4168' },
              }}
            >
              <PlayArrowIcon fontSize="small" />
            </IconButton>

            <Typography variant="caption" sx={{ color: '#535353', flexShrink: 0, minWidth: 36 }}>
              {formatTime(currentSeconds)}
            </Typography>

            <Slider
              value={playProgress}
              onChange={(_, v) => setPlayProgress(v as number)}
              aria-label="Progreso de reproducción"
              sx={{
                color: '#484f7a',
                height: 4,
                '& .MuiSlider-thumb': { width: 12, height: 12 },
              }}
            />

            <Typography variant="caption" sx={{ color: '#535353', flexShrink: 0, minWidth: 36 }}>
              {MOCK_TRACK.duration}
            </Typography>
          </Box>

          {/* Remove track row */}
          <Box sx={{ px: 2, py: 1.5, display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid #e8e8e8' }}>
            <Button
              variant="text"
              size="small"
              sx={{
                color: '#c62828',
                textTransform: 'none',
                fontWeight: 400,
                fontSize: '0.8125rem',
                '&:hover': { bgcolor: 'rgba(198,40,40,0.06)' },
              }}
            >
              Eliminar pista
            </Button>
          </Box>
        </Box>

        {/* Tipo de lanzamiento */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="h6" sx={{ color: '#0d0d0d', fontSize: '1.25rem', fontWeight: 500 }}>
            Tipo de lanzamiento
          </Typography>
          <Typography variant="body2" sx={{ color: '#535353' }}>
            El tipo de lanzamiento se determina por el número de pistas y la duración total. Puedes ajustarlo si es necesario.
          </Typography>
          <FormControl fullWidth>
            <InputLabel>Tipo de lanzamiento</InputLabel>
            <Select
              value={releaseType}
              onChange={(e) => setReleaseType(e.target.value)}
              label="Tipo de lanzamiento"
              input={<OutlinedInput label="Tipo de lanzamiento" />}
            >
              {RELEASE_TYPES.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
            </Select>
          </FormControl>
        </Box>

        {/* Audio upload zone */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="h6" sx={{ color: '#0d0d0d', fontSize: '1.25rem', fontWeight: 500 }}>
            Añadir pista
          </Typography>
          <Box
            sx={{
              border: '2px dashed #cac9c9',
              borderRadius: 1,
              bgcolor: '#fff',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1.5,
              py: 5,
              cursor: 'pointer',
              '&:hover': { borderColor: '#484f7a', bgcolor: '#f9f9fb' },
              transition: 'border-color 0.15s, background-color 0.15s',
            }}
            role="button"
            tabIndex={0}
            aria-label="Subir archivo de audio"
          >
            <CloudUploadOutlinedIcon sx={{ color: '#797676', fontSize: 40 }} />
            <Typography variant="body2" sx={{ color: '#535353' }}>
              Arrastra tu archivo de audio aquí o haz clic para seleccionarlo
            </Typography>
            <Typography variant="caption" sx={{ color: '#797676' }}>
              WAV · 44.1 kHz · 16-bit mínimo
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Sticky footer */}
      <Box
        sx={{
          position: 'sticky',
          bottom: 0,
          bgcolor: '#fff',
          borderTop: '1px solid #cac9c9',
          px: 4,
          py: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        {/* Release thumbnail */}
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 1,
            bgcolor: '#ecedf4',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <MusicNoteIcon sx={{ color: '#484f7a', fontSize: 20 }} />
        </Box>
        <Typography variant="body2" sx={{ color: '#313030', fontWeight: 500, flex: 1 }}>
          Noche de Verano
        </Typography>

        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <Button
            variant="outlined"
            onClick={() => navigate('/step1')}
            sx={{ borderColor: '#484f7a', color: '#484f7a', textTransform: 'none', minWidth: 100 }}
          >
            Atrás
          </Button>
          <Button
            variant="contained"
            onClick={() => navigate('/step2')}
            sx={{ bgcolor: '#cf0389', '&:hover': { bgcolor: '#b00278' }, textTransform: 'none', minWidth: 120 }}
          >
            Continuar
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
