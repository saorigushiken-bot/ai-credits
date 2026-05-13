import {
  Box, Typography, AppBar, Toolbar, Button, Divider, Paper,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { useWorkflow } from '../context/WorkflowContext';

interface ReviewRowProps {
  label: string;
  value: string | React.ReactNode;
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
        ml: '4px',
        flexShrink: 0,
        verticalAlign: 'middle',
      }}
    >
      AI
    </Box>
  );
}

function ReviewRow({ label, value }: ReviewRowProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', minHeight: 40, borderBottom: '0.5px solid #cac9c9' }}>
      <Box sx={{ width: 240, flexShrink: 0, px: 1, py: 0.5, display: 'flex', alignItems: 'center', minHeight: 40 }}>
        <Typography variant="subtitle1" sx={{ color: '#171717', fontSize: '1rem' }}>{label}</Typography>
      </Box>
      <Box sx={{ flex: 1, px: 1, py: 0.5, display: 'flex', alignItems: 'center', minHeight: 40 }}>
        <Typography variant="body1" component="div" sx={{ color: '#000', whiteSpace: 'pre-wrap' }}>{value}</Typography>
      </Box>
    </Box>
  );
}

interface SectionCardProps {
  title: string;
  onEdit: () => void;
  children: React.ReactNode;
}

function SectionCard({ title, onEdit, children }: SectionCardProps) {
  return (
    <Paper variant="outlined" sx={{ p: 3, borderRadius: 1, borderColor: '#cac9c9' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ color: '#0d0d0d', fontSize: '1.375rem', fontWeight: 400 }}>
          {title}
        </Typography>
        <Button
          variant="text"
          onClick={onEdit}
          sx={{ color: '#484f7a', fontWeight: 500, minWidth: 80 }}
        >
          Editar
        </Button>
      </Box>
      {children}
    </Paper>
  );
}

export default function TrackReview() {
  const navigate = useNavigate();
  const { state } = useWorkflow();

  const roleMap: Record<string, string> = { principal: 'Artista principal', invitado: 'Artista invitado' };
  const contribRoleMap: Record<string, string> = { compositor: 'Compositor', letrista: 'Letrista', productor: 'Productor', 'intérprete': 'Intérprete' };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#fff' }}>
      <AppBar position="sticky" color="default" elevation={0} sx={{ bgcolor: '#f5f5f5', borderBottom: '1px solid #cac9c9' }}>
        <Toolbar sx={{ gap: 1, minHeight: 56 }}>
          <Box
            component="button"
            onClick={() => navigate('/step2')}
            sx={{
              display: 'flex', alignItems: 'center', gap: 0.5,
              border: 'none', background: 'none', cursor: 'pointer', color: '#000', fontSize: '1rem', p: 0,
              '&:focus-visible': { outline: '2px solid #484f7a' },
            }}
          >
            <ArrowBackIcon fontSize="small" />
            Atrás
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ maxWidth: 680, mx: 'auto', px: 3, py: 6, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Typography variant="h5" sx={{ color: '#0d0d0d', fontSize: '1.75rem', fontWeight: 400 }}>
          Información de la pista
        </Typography>

        {/* Información básica */}
        <SectionCard title="Información de la pista" onEdit={() => navigate('/step2')}>
          <ReviewRow label="Título" value={state.trackTitle || '—'} />
          <ReviewRow label="Idioma del título" value={state.language || '—'} />
        </SectionCard>

        {/* Audio */}
        <SectionCard title="Audio" onEdit={() => navigate('/step2')}>
          <Box sx={{ bgcolor: '#ecedf4', borderRadius: 1, p: 2 }}>
            <Typography variant="body2" sx={{ color: '#535353' }}>mi_cancion.wav · 03:47</Typography>
          </Box>
        </SectionCard>

        {/* Géneros */}
        <SectionCard title="Géneros" onEdit={() => navigate('/step2')}>
          <ReviewRow label="Género principal" value={state.primaryGenre || '—'} />
          <ReviewRow label="Género secundario" value={state.secondaryGenre || '—'} />
        </SectionCard>

        {/* Idioma y letra */}
        <SectionCard title="Idioma y letra" onEdit={() => navigate('/step2')}>
          <ReviewRow label="Idioma de la canción" value={state.language || '—'} />
          {state.hasLyrics && (
            <>
              <ReviewRow label="Transcripción de la letra" value="" />
              <Box sx={{ px: 1, pb: 1 }}>
                <Typography variant="body1" sx={{ color: '#000', whiteSpace: 'pre-wrap', lineHeight: '1.75' }}>
                  {state.lyrics || '—'}
                </Typography>
              </Box>
              <Divider sx={{ my: 0.5 }} />
              <ReviewRow
                label="Contenido explícito"
                value={state.isExplicit === true ? 'Explícito' : state.isExplicit === false ? 'No explícito' : '—'}
              />
            </>
          )}
        </SectionCard>

        {/* Créditos */}
        <SectionCard title="Créditos" onEdit={() => navigate('/step2')}>
          {state.artists.length === 0 && state.contributors.length === 0 && state.aiCredits.length === 0 && (
            <Typography variant="body2" sx={{ color: '#797676' }}>Sin créditos añadidos</Typography>
          )}
          {state.artists.map((a) => (
            <ReviewRow
              key={a.id}
              label={a.name}
              value={
                <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center' }}>
                  {roleMap[a.role] ?? a.role}
                  {a.usedAI && <AIBadge />}
                </Box>
              }
            />
          ))}
          {state.contributors.map((c) => (
            <ReviewRow
              key={c.id}
              label={c.name}
              value={
                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 0 }}>
                  {c.roles.map((r, i) => (
                    <Box key={r} component="span" sx={{ display: 'inline-flex', alignItems: 'center' }}>
                      {i > 0 && <Box component="span" sx={{ mr: '2px' }}>,</Box>}
                      <Box component="span" sx={{ ml: i > 0 ? '4px' : 0 }}>{contribRoleMap[r] ?? r}</Box>
                      {c.aiRoles.includes(r) && <AIBadge />}
                    </Box>
                  ))}
                </Box>
              }
            />
          ))}
          {state.aiCredits.map((c) => (
            <ReviewRow
              key={c.id}
              label={c.name}
              value={
                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 0 }}>
                  {c.roles.map((r, i) => (
                    <Box key={r} component="span" sx={{ display: 'inline-flex', alignItems: 'center' }}>
                      {i > 0 && <Box component="span" sx={{ mr: '2px' }}>,</Box>}
                      <Box component="span" sx={{ ml: i > 0 ? '4px' : 0 }}>{contribRoleMap[r] ?? r}</Box>
                      <AIBadge />
                    </Box>
                  ))}
                </Box>
              }
            />
          ))}
        </SectionCard>

        {/* Identificador */}
        <SectionCard title="Identificador estándar" onEdit={() => navigate('/step2')}>
          <ReviewRow label="ISRC" value={state.requestISRC ? 'Solicitado (pendiente de asignación)' : 'No solicitado'} />
        </SectionCard>
      </Box>
    </Box>
  );
}
