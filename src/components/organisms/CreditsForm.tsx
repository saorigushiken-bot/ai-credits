import { Box, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import ArtistCard from '../molecules/ArtistCard';
import AddCard from '../molecules/AddCard';
import AddArtistModal from './AddArtistModal';
import AddContributorModal from './AddContributorModal';
import AddAIContributorModal from './AddAIContributorModal';
import { useWorkflow } from '../../context/WorkflowContext';
import type { Artist, Contributor, AICredit } from '../../types/workflow';

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
          Añade las personas que han colaborado en esta pista. Es obligatorio indicar al menos un compositor, productor y letrista (si incluye letra).
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

      {/* Créditos IA — siempre visible */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
        <Typography variant="subtitle1" sx={{ color: '#313030' }}>Créditos de IA (Inteligencia Artificial)</Typography>
        <Typography variant="body2" sx={{ color: '#797676' }}>
          Si uno o varios roles en esta pista fueron generados íntegramente por IA, también puedes añadirlos por separado en esta sección. Aparecerán bajo el nombre del contribuidor GenerativeAI.
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {state.aiCredits.map((c) => (
          <ArtistCard
            key={c.id}
            name={c.name}
            roleLabel={aiRoleLabel(c)}
            usedAI={true}
            onEdit={() => { setEditingAI(c); setAIModalOpen(true); }}
            onDelete={() => dispatch({ type: 'REMOVE_AI_CREDIT', id: c.id })}
          />
        ))}
        <AddCard
          label="Añadir perfil de IA generativa (opcional)"
          onClick={() => { setEditingAI(undefined); setAIModalOpen(true); }}
          disabled={state.aiCredits.length > 0}
        />
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
