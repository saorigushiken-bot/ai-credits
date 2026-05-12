import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  IconButton, TextField, RadioGroup, FormControl,
  FormLabel, Typography, Button, Alert,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import RadioButton from '../atoms/RadioButton';
import type { Artist } from '../../types/workflow';

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (artist: Artist) => void;
  initial?: Artist;
}

export default function AddArtistModal({ open, onClose, onSave, initial }: Props) {
  const [name, setName] = useState(initial?.name ?? '');
  const [role, setRole] = useState<'principal' | 'invitado'>(initial?.role ?? 'principal');
  const [usedAI, setUsedAI] = useState<'si' | 'no'>(initial?.usedAI ? 'si' : 'no');
  const [nameError, setNameError] = useState('');

  const handleSave = () => {
    if (!name.trim()) { setNameError('El nombre es obligatorio'); return; }
    onSave({
      id: initial?.id ?? crypto.randomUUID(),
      name: name.trim(),
      role,
      usedAI: usedAI === 'si',
    });
    onClose();
  };

  const handleClose = () => {
    setName(initial?.name ?? '');
    setRole(initial?.role ?? 'principal');
    setUsedAI(initial?.usedAI ? 'si' : 'no');
    setNameError('');
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      aria-labelledby="add-artist-title"
    >
      <DialogTitle id="add-artist-title" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 0 }}>
        <Typography variant="h6">Añadir artista</Typography>
        <IconButton onClick={handleClose} aria-label="Cerrar diálogo" size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 3 }}>
        <TextField
          label="Nombre del artista"
          value={name}
          onChange={(e) => { setName(e.target.value); setNameError(''); }}
          error={!!nameError}
          helperText={nameError}
          fullWidth
          size="medium"
          slotProps={{ htmlInput: { 'aria-label': 'Nombre del artista' } }}
          sx={{ bgcolor: '#ecedf4', borderRadius: 1 }}
        />

        <FormControl component="fieldset">
          <FormLabel component="legend" sx={{ color: '#313030', fontWeight: 500, fontSize: '1rem', mb: 1 }}>
            Indica si participa en esta pista como artista principal o invitado:
          </FormLabel>
          <RadioGroup value={role} onChange={(e) => setRole(e.target.value as 'principal' | 'invitado')}>
            <RadioButton value="principal" label="Principal" />
            <RadioButton value="invitado" label="Invitado" />
          </RadioGroup>
        </FormControl>

        <FormControl component="fieldset">
          <FormLabel component="legend" sx={{ color: '#313030', fontWeight: 500, fontSize: '1rem', mb: 1 }}>
            ¿Este Artista/invitado utilizó herramientas de IA (mezcla, voz, traducción, etc.)?
          </FormLabel>
          <RadioGroup value={usedAI} onChange={(e) => setUsedAI(e.target.value as 'si' | 'no')}>
            <RadioButton value="no" label="No" />
            <RadioButton value="si" label="Sí" />
          </RadioGroup>
        </FormControl>

        {usedAI === 'si' && (
          <Alert severity="info" sx={{ bgcolor: '#ecedf4', color: '#313030', border: 'none' }} icon={false}>
            <Typography variant="body2">
              * Una persona de IA generativa es una entidad o perfil virtual que actúa como intérprete principal del rol seleccionado.
            </Typography>
          </Alert>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
        <Button variant="outlined" onClick={handleClose}>Atrás</Button>
        <Button variant="contained" onClick={handleSave} sx={{ bgcolor: '#cf0389', '&:hover': { bgcolor: '#b00278' } }}>
          {initial ? 'Guardar cambios' : 'Añadir artista'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
