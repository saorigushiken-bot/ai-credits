import {
  Box, Typography, TextField, RadioGroup, FormControl,
  FormLabel, Checkbox, FormControlLabel, Button, Select,
  MenuItem, InputLabel, OutlinedInput, Divider, AppBar, Toolbar,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { useWorkflow } from '../context/WorkflowContext';
import AudioPlayer from '../components/molecules/AudioPlayer';
import CreditsForm from '../components/organisms/CreditsForm';
import InfoTooltip from '../components/atoms/InfoTooltip';
import RadioButton from '../components/atoms/RadioButton';

const GENRES = ['Pop', 'Rock', 'Electrónica', 'Hip-Hop / Rap', 'R&B / Soul', 'Jazz', 'Clásica', 'Reggaeton', 'Salsa', 'Cumbia', 'Folk', 'Country', 'Metal', 'Indie'];
const LANGUAGES = ['Español', 'Inglés', 'Portugués', 'Francés', 'Alemán', 'Italiano', 'Japonés', 'Coreano', 'Chino mandarín'];

export default function Step2TrackDetails() {
  const navigate = useNavigate();
  const { state, dispatch } = useWorkflow();

  const set = (field: keyof typeof state, value: unknown) =>
    dispatch({ type: 'SET_FIELD', field, value });

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#fff' }}>
      {/* Sticky header */}
      <AppBar position="sticky" color="default" elevation={0} sx={{ bgcolor: '#f5f5f5', borderBottom: '1px solid #cac9c9' }}>
        <Toolbar sx={{ gap: 1, minHeight: 56 }}>
          <Box
            component="button"
            onClick={() => navigate('/')}
            sx={{
              display: 'flex', alignItems: 'center', gap: 0.5,
              border: 'none', background: 'none', cursor: 'pointer', color: '#000',
              fontSize: '1rem', p: 0,
              '&:focus-visible': { outline: '2px solid #484f7a' },
            }}
          >
            <ArrowBackIcon fontSize="small" />
            Volver al listado de pistas
          </Box>
        </Toolbar>
      </AppBar>

      {/* Scrollable form */}
      <Box sx={{ maxWidth: 686, mx: 'auto', px: 3, py: 6, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <Typography variant="h4" sx={{ color: '#0d0d0d', fontWeight: 400 }}>
          Información de la pista
        </Typography>

        {/* Track title */}
        <TextField
          label="Título de la pista"
          value={state.trackTitle}
          onChange={(e) => set('trackTitle', e.target.value)}
          fullWidth
          helperText="Escribe el nombre de la pista como quieres que aparezca en plataformas y tiendas de música."
        />

        {/* Audio */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="h6" sx={{ color: '#0d0d0d', fontSize: '1.5rem' }}>Audio</Typography>
          <AudioPlayer />
        </Box>

        {/* Géneros */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="h6" sx={{ color: '#0d0d0d', fontSize: '1.5rem' }}>Géneros</Typography>
          <FormControl fullWidth>
            <InputLabel>Género principal</InputLabel>
            <Select
              value={state.primaryGenre}
              onChange={(e) => set('primaryGenre', e.target.value)}
              label="Género principal"
              input={<OutlinedInput label="Género principal" />}
            >
              {GENRES.map((g) => <MenuItem key={g} value={g}>{g}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Género secundario (Opcional)</InputLabel>
            <Select
              value={state.secondaryGenre}
              onChange={(e) => set('secondaryGenre', e.target.value)}
              label="Género secundario (Opcional)"
              input={<OutlinedInput label="Género secundario (Opcional)" />}
            >
              <MenuItem value=""><em>Ninguno</em></MenuItem>
              {GENRES.map((g) => <MenuItem key={g} value={g}>{g}</MenuItem>)}
            </Select>
          </FormControl>
        </Box>

        {/* Idioma y letra */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Typography variant="h6" sx={{ color: '#0d0d0d', fontSize: '1.5rem' }}>Idioma y letra</Typography>

          <FormControl component="fieldset">
            <FormLabel component="legend" sx={{ color: '#313030', fontWeight: 400, fontSize: '1rem', mb: 1 }}>
              ¿Esta pista tiene letra?
            </FormLabel>
            <RadioGroup
              value={state.hasLyrics === null ? '' : String(state.hasLyrics)}
              onChange={(e) => set('hasLyrics', e.target.value === 'true')}
            >
              <RadioButton value="false" label="No" />
              <RadioButton value="true" label="Sí" />
            </RadioGroup>
          </FormControl>

          {state.hasLyrics && (
            <>
              <FormControl fullWidth>
                <InputLabel>Idioma de la letra</InputLabel>
                <Select
                  value={state.language}
                  onChange={(e) => set('language', e.target.value)}
                  label="Idioma de la letra"
                  input={<OutlinedInput label="Idioma de la letra" />}
                >
                  {LANGUAGES.map((l) => <MenuItem key={l} value={l}>{l}</MenuItem>)}
                </Select>
              </FormControl>

              <TextField
                label="Transcripción de la letra (Opcional)"
                value={state.lyrics}
                onChange={(e) => set('lyrics', e.target.value)}
                fullWidth
                multiline
                minRows={4}
                helperText="Escribe la letra completa y exacta de la canción, sin omitir ni modificar palabras. Solo para Apple Music."
              />

              <FormControl component="fieldset">
                <FormLabel component="legend" sx={{ color: '#313030', fontWeight: 400, fontSize: '1rem', mb: 1 }}>
                  ¿La letra tiene contenido explícito?
                </FormLabel>
                <RadioGroup
                  value={state.isExplicit === null ? '' : String(state.isExplicit)}
                  onChange={(e) => set('isExplicit', e.target.value === 'true')}
                >
                  <RadioButton value="true" label="Sí - Contiene lenguaje ofensivo, referencias sexuales, violencia o drogas" />
                  <RadioButton value="false" label="No - Es apropiada para todos los públicos" />
                </RadioGroup>
              </FormControl>

              <FormControl component="fieldset">
                <FormLabel component="legend" sx={{ color: '#313030', fontWeight: 400, fontSize: '1rem', mb: 1 }}>
                  ¿Existe una versión con contenido explícito?
                </FormLabel>
                <RadioGroup
                  value={state.hasCleanVersion === null ? '' : String(state.hasCleanVersion)}
                  onChange={(e) => set('hasCleanVersion', e.target.value === 'true')}
                >
                  <RadioButton value="true" label="Sí - Hay otra versión con contenido explícito y ha sido eliminado de esta pista" />
                  <RadioButton value="false" label="No - Esta pista no tiene contenido explícito y nunca lo ha tenido" />
                </RadioGroup>
              </FormControl>
            </>
          )}
        </Box>

        {/* Créditos */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="h6" sx={{ color: '#0d0d0d', fontSize: '1.5rem' }}>Créditos</Typography>
          <CreditsForm />
        </Box>

        {/* Identificador estándar */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="h6" sx={{ color: '#0d0d0d', fontSize: '1.5rem' }}>Identificador estándar</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.requestISRC}
                  onChange={(e) => set('requestISRC', e.target.checked)}
                />
              }
              label="Solicitar ISRC"
              sx={{ '& .MuiFormControlLabel-label': { fontSize: '1rem', color: '#313030' } }}
            />
            <InfoTooltip title="El ISRC (International Standard Recording Code) identifica de forma única una grabación musical a nivel mundial." />
          </Box>
        </Box>

        <Divider />

        {/* Footer actions */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', py: 2 }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/review')}
            sx={{ bgcolor: '#cf0389', '&:hover': { bgcolor: '#b00278' }, minWidth: 140 }}
          >
            Guardar y continuar
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
