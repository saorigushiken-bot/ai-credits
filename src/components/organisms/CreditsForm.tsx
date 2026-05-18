import { Box, Typography, Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import ArtistCard from '../molecules/ArtistCard';
import AddCard from '../molecules/AddCard';
import AddArtistModal from './AddArtistModal';
import AddContributorModal from './AddContributorModal';
import AddAIContributorModal from './AddAIContributorModal';
import { useWorkflow } from '../../context/WorkflowContext';
import type { Artist, Contributor, AICredit } from '../../types/workflow';


function SavedAIBadge() {
  return (
    <Box
      component="span"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 16,
        height: 16,
        borderRadius: '2px',
        bgcolor: '#484646',
        color: '#fff',
        fontWeight: 600,
        fontSize: '12px',
        lineHeight: 1,
        flexShrink: 0,
      }}
    >
      AI
    </Box>
  );
}

export default function CreditsForm() {
  const { state, dispatch } = useWorkflow();

  const [artistModalOpen, setArtistModalOpen] = useState(false);
  const [editingArtist, setEditingArtist] = useState<Artist | undefined>();

  const [contributorModal, setContributorModal] = useState<{
    open: boolean;
    mountKey: number;
    initial?: Contributor;
  }>({ open: false, mountKey: 0 });

  const [aiModalOpen, setAIModalOpen] = useState(false);
  const [editingAI, setEditingAI] = useState<AICredit | undefined>();

  const ROLE_LABELS: Record<string, string> = {
    compositor: 'Compositor', letrista: 'Letrista', productor: 'Productor', 'intérprete': 'Intérprete',
  };

  const artistRoleLabel = (a: Artist) => {
    const typeLabel = a.role === 'principal' ? 'Artista principal' : 'Artista invitado';
    if (a.artistRoles && a.artistRoles.length > 0) {
      return `${typeLabel} · ${a.artistRoles.map((r) => ROLE_LABELS[r] ?? r).join(', ')}`;
    }
    return typeLabel;
  };

  const contribRoleLabel = (c: Contributor) => c.roles.map((r) => ROLE_LABELS[r] ?? r).join(', ');
  const aiRoleLabel = (c: AICredit) => c.roles.map((r) => ROLE_LABELS[r] ?? r).join(', ');

  const openContributorModal = (contributor?: Contributor) => {
    setContributorModal((prev) => ({ open: true, mountKey: prev.mountKey + 1, initial: contributor }));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>

      {/* Artistas */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography variant="subtitle1" sx={{ color: '#313030' }}>Artistas</Typography>
        <Typography variant="body2" sx={{ color: '#797676' }}>
          Indica los artistas principales y destacados (si los hay) en esta pista.
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {state.artists.map((a) => (
          <ArtistCard
            key={a.id}
            name={a.name}
            roleLabel={artistRoleLabel(a)}
            usedAI={a.usedAI}
            onEdit={() => { setEditingArtist(a); setArtistModalOpen(true); }}
            onDelete={() => dispatch({ type: 'REMOVE_ARTIST', id: a.id })}
          />
        ))}
        <AddCard label="Añadir artista (obligatorio)" onClick={() => { setEditingArtist(undefined); setArtistModalOpen(true); }} />
      </Box>

      {/* Contribuidores */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
        <Typography variant="subtitle1" sx={{ color: '#313030' }}>Contribuidores</Typography>
        <Typography variant="body2" sx={{ color: '#797676' }}>
          Añade las personas que han colaborado en esta pista. Es obligatorio indicar al menos un
          compositor, productor y letrista (si incluye letra). Especifica también los roles exactos
          que interpreta cada artista (por ejemplo, Voces, Guitarra, Conjunto, Remixer). Puedes
          encontrar la lista de los roles disponibles{' '}
          <Box component="a" href="#" sx={{ color: '#484f7a', fontWeight: 500 }}>aquí</Box>.
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {state.contributors.map((c) => (
          <ArtistCard
            key={c.id}
            name={c.name}
            roleLabel={contribRoleLabel(c)}
            roleItems={c.roles.map((r) => ({ label: ROLE_LABELS[r] ?? r, isAI: c.aiRoles.includes(r) }))}
            onEdit={() => openContributorModal(c)}
            onDelete={() => dispatch({ type: 'REMOVE_CONTRIBUTOR', id: c.id })}
          />
        ))}

        {!state.contributors.some((c) => c.roles.includes('compositor')) && (
          <AddCard label="Añadir compositor (obligatorio)" onClick={() => openContributorModal()} />
        )}
        {!state.contributors.some((c) => c.roles.includes('productor')) && (
          <AddCard label="Añadir productor (obligatorio)" onClick={() => openContributorModal()} />
        )}
        {state.hasLyrics && !state.contributors.some((c) => c.roles.includes('letrista')) && (
          <AddCard label="Añadir letrista (obligatorio)" onClick={() => openContributorModal()} />
        )}

        <Button
          startIcon={<AddIcon />}
          onClick={() => openContributorModal()}
          sx={{ alignSelf: 'flex-start', color: '#484f7a', fontWeight: 500 }}
        >
          Añadir contribuidor
        </Button>
      </Box>

      {/* GenerativeAI — bloque inline */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mt: 1 }}>
        {state.aiCredits.length > 0 ? (
          state.aiCredits.map((c) => (
            <Box
              key={c.id}
              sx={{ display: 'flex', alignItems: 'center', gap: 2, px: 2, bgcolor: '#ecedf4', borderRadius: '4px', height: 72, width: '100%' }}
            >
              <Box sx={{ width: 40, height: 40, borderRadius: '50%', bgcolor: '#484f7a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 16, fontWeight: 500, flexShrink: 0 }}>
                G
              </Box>
              <Box sx={{ flex: 1, overflow: 'hidden' }}>
                <Typography variant="body1" sx={{ color: '#000' }}>GenerativeAI</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                  <Typography variant="body2" sx={{ color: '#000' }}>{aiRoleLabel(c)}</Typography>
                  <SavedAIBadge />
                  <Typography
                    component="button"
                    onClick={() => { setEditingAI(c); setAIModalOpen(true); }}
                    sx={{ border: 'none', background: 'none', cursor: 'pointer', color: '#484f7a', fontWeight: 500, fontSize: '0.875rem', p: 0, lineHeight: 1, textDecoration: 'underline' }}
                  >
                    Edit
                  </Typography>
                </Box>
              </Box>
              <IconButton
                aria-label="Eliminar crédito de IA"
                onClick={() => dispatch({ type: 'REMOVE_AI_CREDIT', id: c.id })}
                size="small"
                sx={{ color: '#535353' }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))
        ) : (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              px: 2,
              bgcolor: '#fff',
              border: '1px dashed #959393',
              borderRadius: '4px',
              height: 72,
              width: '100%',
            }}
          >
            <SavedAIBadge />
            <Typography sx={{ flex: 1, fontSize: '0.875rem', color: '#797676', fontWeight: 400, lineHeight: 1.5 }}>
              Si más de un rol se generó íntegramente por IA, puedes añadirlos como GenerativeAI.
            </Typography>
            <Typography
              component="button"
              onClick={() => { setEditingAI(undefined); setAIModalOpen(true); }}
              sx={{ border: 'none', background: 'none', cursor: 'pointer', color: '#484f7a', fontWeight: 500, fontSize: '0.875rem', p: 0, lineHeight: 1, flexShrink: 0 }}
            >
              + Añadir contribuidor
            </Typography>
          </Box>
        )}

        <Typography variant="body2" sx={{ color: '#797676', fontSize: '0.875rem' }}>
          Créditos Generative AI: Identifica que la IA generó íntegramente una contribución
          específica, como voces o letras. Se aplica a nivel de rol, no al track completo.
        </Typography>
      </Box>

      {/* Modals */}
      <AddArtistModal
        open={artistModalOpen}
        onClose={() => setArtistModalOpen(false)}
        initial={editingArtist}
        onSave={(a) => {
          if (editingArtist) dispatch({ type: 'UPDATE_ARTIST', artist: a });
          else dispatch({ type: 'ADD_ARTIST', artist: a });
        }}
      />

      <AddContributorModal
        key={contributorModal.mountKey}
        open={contributorModal.open}
        initial={contributorModal.initial}
        onClose={() => setContributorModal((prev) => ({ ...prev, open: false, initial: undefined }))}
        onSave={(c) => {
          if (contributorModal.initial) dispatch({ type: 'UPDATE_CONTRIBUTOR', contributor: c });
          else dispatch({ type: 'ADD_CONTRIBUTOR', contributor: c });
        }}
      />

      <AddAIContributorModal
        open={aiModalOpen}
        onClose={() => setAIModalOpen(false)}
        initial={editingAI}
        onSave={(c) => {
          if (editingAI) dispatch({ type: 'UPDATE_AI_CREDIT', credit: c });
          else dispatch({ type: 'ADD_AI_CREDIT', credit: c });
        }}
      />
    </Box>
  );
}
