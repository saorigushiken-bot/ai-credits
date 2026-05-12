import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  IconButton, TextField, RadioGroup, FormControl,
  FormLabel, Typography, Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import RadioButton from '../atoms/RadioButton';
import type { Contributor } from '../../types/workflow';

interface Props {
  open: boolean;
  onClose: () => void;
  onNext: (partial: Pick<Contributor, 'id' | 'name' | 'usedAI'>) => void;
}

export default function AddContributorModal({ open, onClose, onNext }: Props) {
  const [name, setName] = useState('');
  const [usedAI, setUsedAI] = useState<'si' | 'no'>('no');
  const [nameError, setNameError] = useState('');

  const handleNext = () => {
    if (!name.trim()) { setNameError('El nombre es obligatorio'); return; }
    onNext({ id: crypto.randomUUID(), name: name.trim(), usedAI: usedAI === 'si' });
  };

  const handleClose = () => {
    setName('');
    setUsedAI('no');
    setNameError('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth aria-labelledby="add-contributor-title">
      <DialogTitle id="add-contributor-title" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 0 }}>
        <Typography variant="h6">Añadir contribuidor</Typography>
        <IconButton onClick={handleClose} aria-label="Cerrar diálogo" size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 3 }}>
        <TextField
          label="Nombre del contribuidor"
          value={name}
          onChange={(e) => { setName(e.target.value); setNameError(''); }}
          error={!!nameError}
          helperText={nameError}
          fullWidth
          sx={{ bgcolor: '#ecedf4', borderRadius: 1 }}
        />

        <FormControl component="fieldset">
          <FormLabel component="legend" sx={{ color: '#313030', fontWeight: 500, fontSize: '1rem', mb: 1 }}>
            ¿Este contribuidor utilizó herramientas de IA (mezcla, voz, traducción, etc.)?
          </FormLabel>
          <RadioGroup value={usedAI} onChange={(e) => setUsedAI(e.target.value as 'si' | 'no')}>
            <RadioButton value="no" label="No" />
            <RadioButton value="si" label="Sí" />
          </RadioGroup>
        </FormControl>


      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
        <Button variant="outlined" onClick={handleClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleNext} sx={{ bgcolor: '#cf0389', '&:hover': { bgcolor: '#b00278' } }}>
          Siguiente
        </Button>
      </DialogActions>
    </Dialog>
  );
}
