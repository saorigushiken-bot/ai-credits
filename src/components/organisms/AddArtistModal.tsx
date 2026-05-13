import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  IconButton, TextField, RadioGroup, FormControl,
  FormLabel, Typography, Button,
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
  const [role, setRole] = useState<'principal' | 'invitado' | null>(initial?.role ?? null);
  const [usedAI, setUsedAI] = useState<'si' | 'no' | null>(
    initial?.usedAI === true ? 'si' : initial?.usedAI === false ? 'no' : null
  );
  const [nameError, setNameError] = useState('');

  const resetState = () => {
    setName('');
    setRole(null);
    setUsedAI(null);
    setNameError('');
  };

  const handleSave = () => {
    if (!name.trim()) { setNameError('El nombre es obligatorio'); return; }
    onSave({
      id: initial?.id ?? crypto.randomUUID(),
      name: name.trim(),
      role: role ?? 'principal',
      usedAI: usedAI === 'si',
    });
    resetState();
    onClose();
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  return (
    <Dialog
      key={initial?.id ?? 'new'}
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
          slotProps={{ htmlInput: { 'aria-label': 'Nombre del artista' } }}
          sx={{ bgcolor: '#ecedf4', borderRadius: 1 }}
        />

        <FormControl component="fieldset">
          <FormLabel component="legend" sx={{ color: '#313030', fontWeight: 500, fontSize: '1rem', mb: 1 }}>
            Indica si participa en esta pista como artista principal o invitado:
          </FormLabel>
          <RadioGroup value={role} onChange={(e) => setRole(e.target.value as 'principal' | 'invitado')}>
            <RadioButton value="principal" label="Artista principal" />
            <RadioButton value="invitado" label="Artista invitado/a" />
          </RadioGroup>
        </FormControl>

        <FormControl component="fieldset">
          <FormLabel component="legend" sx={{ color: '#313030', fontWeight: 500, fontSize: '1rem', mb: 1 }}>
            ¿Este artista ha sido creado íntegramente por IA (Inteligencia Artificial)?
          </FormLabel>
          <RadioGroup value={usedAI} onChange={(e) => setUsedAI(e.target.value as 'si' | 'no')}>
            <RadioButton value="no" label="No" />
            <RadioButton value="si" label="Sí" />
          </RadioGroup>
        </FormControl>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
        <Button variant="outlined" onClick={handleClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleSave} sx={{ bgcolor: '#cf0389', '&:hover': { bgcolor: '#b00278' } }}>
          {initial ? 'Guardar cambios' : 'Guardar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
