import {
  Box, Typography, TextField, RadioGroup, FormControl,
  FormLabel, FormControlLabel, Checkbox, Button, AppBar,
  Toolbar, Divider, Select, MenuItem, InputLabel, OutlinedInput,
  Alert,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined';
import CheckIcon from '@mui/icons-material/Check';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RadioButton from '../components/atoms/RadioButton';

const LANGUAGES = ['Español', 'Inglés', 'Portugués', 'Francés', 'Alemán', 'Italiano', 'Japonés', 'Coreano', 'Chino mandarín'];

const STEPS = ['Información del lanzamiento', 'Listado de pistas', 'Distribución', 'Revisión'];

function Stepper({ active }: { active: number }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0 }}>
      {STEPS.map((label, i) => {
        const idx = i + 1;
        const isActive = idx === active;
        const isDone = idx < active;
        return (
          <Box key={label} sx={{ display: 'flex', alignItems: 'center' }}>
            {/* connector line before step (not for first) */}
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

export default function Step1ReleaseInfo() {
  const navigate = useNavigate();

  const [title, setTitle] = useState('Noche de Verano');
  const [titleLanguage, setTitleLanguage] = useState('Español');
  const [isVersion, setIsVersion] = useState<'no' | 'si'>('no');
  const [label, setLabel] = useState('Music Beats SL');
  const [copyrightHolder, setCopyrightHolder] = useState('');
  const [phonoHolder, setPhonoHolder] = useState('');
  const [labelIsCopyright, setLabelIsCopyright] = useState(false);
  const [wasPreviouslyPublished, setWasPreviouslyPublished] = useState<'no' | 'si'>('no');
  const [ean, setEan] = useState('');

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5', display: 'flex', flexDirection: 'column' }}>
      {/* Sticky header with stepper */}
      <AppBar position="sticky" color="default" elevation={0} sx={{ bgcolor: '#fff', borderBottom: '1px solid #cac9c9' }}>
        <Toolbar sx={{ minHeight: 72, px: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="body2" sx={{ color: '#797676', fontSize: '0.875rem' }}>
            Nuevo lanzamiento
          </Typography>
          <Stepper active={1} />
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

      {/* Scrollable form */}
      <Box sx={{ flex: 1, maxWidth: 686, width: '100%', mx: 'auto', px: 3, py: 6, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <Typography variant="h4" sx={{ color: '#0d0d0d', fontWeight: 400, fontSize: '2rem' }}>
          Información del lanzamiento
        </Typography>

        {/* Título del lanzamiento */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Título del lanzamiento"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            helperText="Escribe el nombre de tu lanzamiento tal y como debe aparecer en las plataformas."
          />

          <FormControl fullWidth>
            <InputLabel>Idioma del título</InputLabel>
            <Select
              value={titleLanguage}
              onChange={(e) => setTitleLanguage(e.target.value)}
              label="Idioma del título"
              input={<OutlinedInput label="Idioma del título" />}
            >
              {LANGUAGES.map((l) => <MenuItem key={l} value={l}>{l}</MenuItem>)}
            </Select>
          </FormControl>

          <FormControl component="fieldset">
            <FormLabel component="legend" sx={{ color: '#313030', fontWeight: 400, fontSize: '1rem', mb: 1 }}>
              ¿Es una versión de otro lanzamiento?
            </FormLabel>
            <RadioGroup value={isVersion} onChange={(e) => setIsVersion(e.target.value as 'no' | 'si')}>
              <RadioButton value="no" label="No - es un lanzamiento original" />
              <RadioButton value="si" label="Sí - es una versión, remezcla, recopilación u otro" />
            </RadioGroup>
          </FormControl>
        </Box>

        <Divider />

        {/* Portada */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="h6" sx={{ color: '#0d0d0d', fontSize: '1.25rem', fontWeight: 500 }}>
            Portada
          </Typography>

          <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
            {/* Upload zone */}
            <Box
              sx={{
                width: 250,
                height: 250,
                border: '2px dashed #cac9c9',
                borderRadius: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                cursor: 'pointer',
                flexShrink: 0,
                bgcolor: '#fff',
                '&:hover': { borderColor: '#484f7a', bgcolor: '#f9f9fb' },
                transition: 'border-color 0.15s, background-color 0.15s',
              }}
              role="button"
              tabIndex={0}
              aria-label="Subir portada del lanzamiento"
            >
              <CloudUploadOutlinedIcon sx={{ color: '#797676', fontSize: 36 }} />
              <Typography variant="body2" sx={{ color: '#535353', textAlign: 'center', px: 2 }}>
                Arrastra tu imagen aquí o haz clic para seleccionarla
              </Typography>
              <Typography variant="caption" sx={{ color: '#797676' }}>JPG, PNG · 3000×3000 px mín.</Typography>
            </Box>

            {/* Requirements + warning */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box>
                <Typography variant="body2" sx={{ color: '#313030', fontWeight: 500, mb: 1 }}>
                  Requisitos de la portada:
                </Typography>
                {[
                  'Formato JPG o PNG',
                  'Mínimo 3000 × 3000 píxeles',
                  'Sin texto adicional ni logos de plataformas',
                  'Sin bordes ni marcos',
                ].map((req) => (
                  <Typography key={req} variant="caption" sx={{ color: '#535353', display: 'block', mb: 0.5 }}>
                    • {req}
                  </Typography>
                ))}
              </Box>

              <Alert
                severity="warning"
                icon={<ErrorOutlinedIcon fontSize="small" />}
                sx={{ bgcolor: '#fff8e1', color: '#5d4037', border: '1px solid #ffe082', fontSize: '0.8125rem' }}
              >
                La portada no puede contener referencias a plataformas de streaming, precios ni fechas de lanzamiento.
              </Alert>
            </Box>
          </Box>
        </Box>

        <Divider />

        {/* Sello y licencias */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Typography variant="h6" sx={{ color: '#0d0d0d', fontSize: '1.25rem', fontWeight: 500 }}>
            Sello y licencias
          </Typography>

          <TextField
            label="Sello discográfico"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            fullWidth
          />

          <TextField
            label="Titular del copyright (©)"
            value={copyrightHolder}
            onChange={(e) => setCopyrightHolder(e.target.value)}
            fullWidth
            helperText="Nombre del titular de los derechos de autor de la composición."
          />

          <TextField
            label="Titular del fonograma (℗)"
            value={phonoHolder}
            onChange={(e) => setPhonoHolder(e.target.value)}
            fullWidth
            helperText="Nombre del titular de los derechos de la grabación."
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={labelIsCopyright}
                onChange={(e) => setLabelIsCopyright(e.target.checked)}
              />
            }
            label="El sello es titular de los derechos (© y ℗)"
            sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.9375rem', color: '#313030' } }}
          />
        </Box>

        <Divider />

        {/* Información previa */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Typography variant="h6" sx={{ color: '#0d0d0d', fontSize: '1.25rem', fontWeight: 500 }}>
            Información previa
          </Typography>

          <FormControl component="fieldset">
            <FormLabel component="legend" sx={{ color: '#313030', fontWeight: 400, fontSize: '1rem', mb: 1 }}>
              ¿Este lanzamiento ha sido publicado anteriormente?
            </FormLabel>
            <RadioGroup value={wasPreviouslyPublished} onChange={(e) => setWasPreviouslyPublished(e.target.value as 'no' | 'si')}>
              <RadioButton value="no" label="No - es un lanzamiento nuevo" />
              <RadioButton value="si" label="Sí - ya ha sido distribuido antes" />
            </RadioGroup>
          </FormControl>

          {wasPreviouslyPublished === 'si' && (
            <TextField
              label="Código EAN / UPC (opcional)"
              value={ean}
              onChange={(e) => setEan(e.target.value)}
              fullWidth
              helperText="Si ya tienes un código EAN13 o UPC asignado, indícalo aquí."
            />
          )}
        </Box>

        <Divider />

        {/* Footer actions */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 2 }}>
          <Button
            variant="outlined"
            size="large"
            disabled
            sx={{ minWidth: 120, borderColor: '#cac9c9', color: '#797676' }}
          >
            Atrás
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/tracks')}
            sx={{ bgcolor: '#cf0389', '&:hover': { bgcolor: '#b00278' }, minWidth: 140 }}
          >
            Siguiente
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
