import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  IconButton, TextField, Typography, Button, Box,
  FormGroup, Divider, Select, MenuItem, InputLabel,
  FormControl as MUIFormControl, FormHelperText,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import CheckboxItem from '../atoms/CheckboxItem';
import type { AICredit, AIRole } from '../../types/workflow';

const PERFORMER_ROLES = ['Voces', 'Guitarra', 'Bajo', 'Batería', 'Piano', 'Teclados', 'Violín', 'Trompeta', 'Conjunto', 'Remixer'];
const OTHER_ROLES_OPTIONS = ['Arreglista', 'Mezclador', 'Masterizador', 'Programador'];

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (credit: AICredit) => void;
  initial?: AICredit;
}

export default function AddAIContributorModal({ open, onClose, onSave, initial }: Props) {
  const [roles, setRoles] = useState<AIRole[]>(initial?.roles ?? []);
  const [performerRoles, setPerformerRoles] = useState<string[]>(initial?.performerRoles ?? []);
  const [hasOtherRoles, setHasOtherRoles] = useState(false);
  const [otherRoles, setOtherRoles] = useState<string[]>(initial?.otherRoles ?? []);
  const [rolesError, setRolesError] = useState('');

  const toggleRole = (r: AIRole) => {
    setRoles((prev) => prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r]);
    setRolesError('');
  };

  const resetState = () => {
    setRoles([]);
    setPerformerRoles([]);
    setHasOtherRoles(false);
    setOtherRoles([]);
    setRolesError('');
  };

  const handleSave = () => {
    if (roles.length === 0) { setRolesError('Selecciona al menos un rol'); return; }
    if (roles.includes('intérprete') && performerRoles.length === 0) {
      setRolesError('Indica al menos un rol de intérprete');
      return;
    }
    onSave({ id: initial?.id ?? crypto.randomUUID(), name: 'Generative AI', roles, performerRoles, otherRoles });
    resetState();
    onClose();
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth aria-labelledby="ai-credit-title">
      <DialogTitle id="ai-credit-title" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 0 }}>
        <Typography variant="h6">Créditos generado por IA</Typography>
        <IconButton onClick={handleClose} aria-label="Cerrar diálogo" size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 3 }}>
        <TextField
          label="Perfil de IA"
          value="Generative AI"
          fullWidth
          slotProps={{ input: { readOnly: true } }}
          sx={{
            bgcolor: 'rgba(0,0,0,0.04)',
            borderRadius: 1,
            '& .MuiOutlinedInput-root': { bgcolor: 'rgba(0,0,0,0.04)' },
            '& input': { cursor: 'default', color: '#535353' },
          }}
        />

        <Box>
          <Typography variant="body1" sx={{ color: '#313030', mb: 1.5 }}>
            Indica el rol con el que participa:
          </Typography>
          <FormGroup>
            <CheckboxItem checked={roles.includes('compositor')} onChange={() => toggleRole('compositor')} label="Compositor" />
            <CheckboxItem checked={roles.includes('letrista')} onChange={() => toggleRole('letrista')} label="Letrista" />
            <CheckboxItem checked={roles.includes('productor')} onChange={() => toggleRole('productor')} label="Productor" />
            <CheckboxItem checked={roles.includes('intérprete')} onChange={() => toggleRole('intérprete')} label="Intérprete" />
          </FormGroup>

          {roles.includes('intérprete') && (
            <MUIFormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Roles de intérprete</InputLabel>
              <Select
                multiple
                value={performerRoles}
                onChange={(e) => setPerformerRoles(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)}
                label="Roles de intérprete"
              >
                {PERFORMER_ROLES.map((r) => <MenuItem key={r} value={r}>{r}</MenuItem>)}
              </Select>
              <FormHelperText>Indica al menos un rol interpretado por esta IA</FormHelperText>
            </MUIFormControl>
          )}

          {rolesError && <Typography color="error" variant="caption" sx={{ mt: 1, display: 'block' }}>{rolesError}</Typography>}
        </Box>

        <Divider />

        <Box>
          <CheckboxItem
            checked={hasOtherRoles}
            onChange={setHasOtherRoles}
            label="Este contribuidor también realiza otros roles"
          />
          {hasOtherRoles && (
            <MUIFormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Otros roles (opcional)</InputLabel>
              <Select
                multiple
                value={otherRoles}
                onChange={(e) => setOtherRoles(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)}
                label="Otros roles (opcional)"
              >
                {OTHER_ROLES_OPTIONS.map((r) => <MenuItem key={r} value={r}>{r}</MenuItem>)}
              </Select>
            </MUIFormControl>
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
        <Button variant="outlined" onClick={handleClose}>Atrás</Button>
        <Button variant="contained" onClick={handleSave} sx={{ bgcolor: '#cf0389', '&:hover': { bgcolor: '#b00278' } }}>
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
