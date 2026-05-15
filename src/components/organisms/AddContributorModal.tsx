import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  IconButton, TextField, RadioGroup, FormControl,
  FormLabel, Typography, Button, Box, FormGroup, Divider,
  Select, MenuItem, InputLabel, FormControl as MUIFormControl,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import CheckboxItem from '../atoms/CheckboxItem';
import RadioButton from '../atoms/RadioButton';
import type { Contributor, ContributorRole } from '../../types/workflow';

const PERFORMER_ROLES = ['Voces', 'Guitarra', 'Bajo', 'Batería', 'Piano', 'Teclados', 'Violín', 'Trompeta', 'Conjunto', 'Remixer'];
const OTHER_ROLES_OPTIONS = ['Arreglista', 'Mezclador', 'Masterizador', 'Programador'];

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (contributor: Contributor) => void;
  initial?: Contributor;
}

export default function AddContributorModal({ open, onClose, onSave, initial }: Props) {
  const [step, setStep] = useState<1 | 2 | 3>(initial ? 2 : 1);
  const [name, setName] = useState(initial?.name ?? '');
  const [roles, setRoles] = useState<ContributorRole[]>(initial?.roles ?? []);
  const [interpreterRole, setInterpreterRole] = useState(initial?.performerRoles ?? '');
  const [hasOtherRoles, setHasOtherRoles] = useState(initial?.otherRoles ?? false);
  const [otherRolesValue, setOtherRolesValue] = useState(initial?.otherRolesDescription ?? '');
  const [usedAI, setUsedAI] = useState<'si' | 'no' | null>(
    initial?.usedAI === true ? 'si' : initial?.usedAI === false ? 'no' : null
  );
  const [aiRoles, setAiRoles] = useState<ContributorRole[]>(initial?.aiRoles ?? []);
  const [nameError, setNameError] = useState('');
  const [rolesError, setRolesError] = useState('');

  const toggleRole = (r: ContributorRole) => {
    setRoles((prev) => prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r]);
    setRolesError('');
  };

  const toggleAiRole = (r: ContributorRole) => {
    setAiRoles((prev) => prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r]);
  };

  const resetState = () => {
    setStep(1);
    setName('');
    setRoles([]);
    setInterpreterRole('');
    setHasOtherRoles(false);
    setOtherRolesValue('');
    setUsedAI(null);
    setAiRoles([]);
    setNameError('');
    setRolesError('');
  };

  const save = (withAI: boolean, finalAiRoles: ContributorRole[]) => {
    onSave({
      id: initial?.id ?? crypto.randomUUID(),
      name: name.trim(),
      roles,
      performerRoles: interpreterRole,
      otherRoles: hasOtherRoles,
      otherRolesDescription: otherRolesValue,
      usedAI: withAI,
      aiRoles: finalAiRoles,
    });
    resetState();
    onClose();
  };

  const handleNext = () => {
    if (!name.trim()) { setNameError('El nombre es obligatorio'); return; }
    setStep(2);
  };

  const handleSaveStep2 = () => {
    if (roles.length === 0) { setRolesError('Selecciona al menos un rol'); return; }
    if (usedAI === 'si') { setStep(3); return; }
    save(false, []);
  };

  const handleSaveStep3 = () => {
    save(true, aiRoles);
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const ROLE_LABELS: Record<ContributorRole, string> = {
    compositor: 'Compositor', letrista: 'Letrista', productor: 'Productor', 'intérprete': 'Intérprete',
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      aria-labelledby="add-contributor-title"
    >
      {/* ── Step 1: nombre ── */}
      {step === 1 && (
        <>
          <DialogTitle id="add-contributor-title" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 0 }}>
            <Typography variant="h6">Añadir Contribuidor</Typography>
            <IconButton onClick={handleClose} aria-label="Cerrar diálogo" size="small"><CloseIcon /></IconButton>
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
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
            <Button variant="outlined" onClick={handleClose}>Cancelar</Button>
            <Button variant="contained" onClick={handleNext} sx={{ bgcolor: '#cf0389', '&:hover': { bgcolor: '#b00278' } }}>
              Siguiente
            </Button>
          </DialogActions>
        </>
      )}

      {/* ── Step 2: roles + IA ── */}
      {step === 2 && (
        <>
          <DialogTitle id="add-contributor-title" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 0 }}>
            <Typography variant="h6">Añadir Contribuidor</Typography>
            <IconButton onClick={handleClose} aria-label="Cerrar diálogo" size="small"><CloseIcon /></IconButton>
          </DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 3 }}>
            <TextField
              label="Nombre del contribuidor"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              sx={{ bgcolor: '#ecedf4', borderRadius: 1 }}
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
                    value={interpreterRole}
                    onChange={(e) => setInterpreterRole(e.target.value)}
                    label="Roles de intérprete"
                  >
                    {PERFORMER_ROLES.map((r) => <MenuItem key={r} value={r}>{r}</MenuItem>)}
                  </Select>
                </MUIFormControl>
              )}

              {rolesError && (
                <Typography color="error" variant="caption" sx={{ mt: 1, display: 'block' }}>
                  {rolesError}
                </Typography>
              )}
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
                    value={otherRolesValue}
                    onChange={(e) => setOtherRolesValue(e.target.value)}
                    label="Otros roles (opcional)"
                  >
                    {OTHER_ROLES_OPTIONS.map((r) => <MenuItem key={r} value={r}>{r}</MenuItem>)}
                  </Select>
                </MUIFormControl>
              )}
            </Box>

            <Divider />

            <FormControl component="fieldset">
              <FormLabel component="legend" sx={{ color: '#313030', fontWeight: 500, fontSize: '1rem', mb: 1 }}>
                ¿Al menos uno de estos roles lo realizó íntegramente una IA (Inteligencia Artificial)?
              </FormLabel>
              <RadioGroup
                value={usedAI ?? ''}
                onChange={(e) => setUsedAI(e.target.value as 'si' | 'no')}
              >
                <RadioButton value="no" label="No" />
                <RadioButton value="si" label="Sí" />
              </RadioGroup>
            </FormControl>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
            <Button variant="outlined" onClick={() => setStep(1)}>Atrás</Button>
            <Button variant="contained" onClick={handleSaveStep2} sx={{ bgcolor: '#cf0389', '&:hover': { bgcolor: '#b00278' } }}>
              Añadir Contribuidor
            </Button>
          </DialogActions>
        </>
      )}

      {/* ── Step 3: roles de IA ── */}
      {step === 3 && (
        <>
          <DialogTitle id="add-contributor-title" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 0 }}>
            <Typography variant="h6">Créditos de IA</Typography>
            <IconButton onClick={handleClose} aria-label="Cerrar diálogo" size="small"><CloseIcon /></IconButton>
          </DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 3 }}>
            <Typography variant="body2" sx={{ color: '#535353' }}>
              Indica qué roles de <strong>{name}</strong> fueron generados íntegramente por IA:
            </Typography>
            <FormGroup>
              {roles.map((r) => (
                <CheckboxItem
                  key={r}
                  checked={aiRoles.includes(r)}
                  onChange={() => toggleAiRole(r)}
                  label={ROLE_LABELS[r]}
                />
              ))}
            </FormGroup>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
            <Button variant="outlined" onClick={() => setStep(2)}>Atrás</Button>
            <Button variant="contained" onClick={handleSaveStep3} sx={{ bgcolor: '#cf0389', '&:hover': { bgcolor: '#b00278' } }}>
              Guardar
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}
