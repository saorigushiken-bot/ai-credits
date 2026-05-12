import { Box, Typography, IconButton, Slider } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SyncIcon from '@mui/icons-material/Sync';
import { useState } from 'react';

export default function AudioPlayer() {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  return (
    <Box sx={{ border: '0.5px solid #cac9c9', borderRadius: 1, overflow: 'hidden' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          p: 2,
          bgcolor: '#ecedf4',
        }}
      >
        <IconButton
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? 'Pausar' : 'Reproducir'}
          sx={{ bgcolor: '#484f7a', color: '#fff', p: 0.5, '&:hover': { bgcolor: '#3a4060' } }}
        >
          <PlayArrowIcon />
        </IconButton>

        <Typography variant="caption" sx={{ color: '#000', fontWeight: 500, minWidth: 31 }}>
          00:00
        </Typography>

        <Slider
          value={progress}
          onChange={(_, v) => setProgress(v as number)}
          aria-label="Progreso de reproducción"
          sx={{
            flex: 1,
            color: '#484f7a',
            height: 6,
            '& .MuiSlider-thumb': { width: 14, height: 14 },
          }}
        />

        <Typography variant="caption" sx={{ color: '#000', fontWeight: 500, minWidth: 31 }}>
          03:47
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          px: 1,
          py: 1.5,
          bgcolor: '#ecedf4',
          borderTop: '0.5px solid #cac9c9',
        }}
      >
        <Box
          component="button"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            color: '#484f7a',
            fontWeight: 500,
            fontSize: '0.875rem',
            p: 0,
          }}
        >
          <SyncIcon fontSize="small" />
          Reemplazar audio
        </Box>
      </Box>
    </Box>
  );
}
