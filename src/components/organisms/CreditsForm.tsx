import { Box, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import ArtistCard from '../molecules/ArtistCard';
import AddCard from '../molecules/AddCard';
import AddArtistModal from './AddArtistModal';
import AddContributorModal from './AddContributorModal';
import AddContributorRolesModal from './AddContributorRolesModal';
import AddAIContributorModal from './AddAIContributorModal';
import { useWorkflow } from '../../context/WorkflowContext';
import type { Artist, Contributor, AICredit } from '../../types/workflow';

export default function CreditsForm() {
  const { state, dispatch } = useWorkflow();
  const [artistModalOpen, setArtistModalOpen] = useState(false);
  const [editingArtist, setEditingArtist] = useState<Artist | undefined>();

  const [contributorStep1Open, setContributorStep1Open] = useState(false);
  const [contributorRolesOpen, setContributorRolesOpen] = useState(false);
  const [contributorPartial, setContributorPartial] = useState<Pick<Contributor, 'id' | 'name' | 'usedAI'> | null>(null);
  const [editingContributor, setEditingContributor] = useState<Contributor | undefined>();

  const [aiModalOpen, setAIModalOpen] = useState(false);
  const [editingAI, setEditingAI] = useState<AICredit | undefined>();

  const roleLabel = (r: string) => {
    const map: Record<string, string> = { principal: 'Artista principal', invitado: 'Artista invitado' };
    return map[r] ?? r;
  };

  const contribRoleLabel = (c: Contributor) => {
    const labels: Record<string, string> = { compositor: 'Compositor', letrista: 'Letrista', productor: 'Productor', 'intérprete': 'Intérprete' };
    return c.roles.map((r) => labels[r] ?? r).join(', ');
  };

  const aiRoleLabel = (c: AICredit) => {
    const labels: Record<string, string> = { compositor: 'Compositor', letrista: 'Letrista', productor: 'Productor', 'intérprete': 'Intérprete' };
    return c.roles.map((r) => labels[r] ?? r).join(', ');
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
            roleLabel={roleLabel(a.role)}
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
            usedAI={c.usedAI}
            onEdit={() => { setEditingContributor(c); setContributorRolesOpen(true); setContributorPartial({ id: c.id, name: c.name, usedAI: c.usedAI }); }}
            onDelete={() => dispatch({ type: 'REMOVE_CONTRIBUTOR', id: c.id })}
          />
        ))}

        {!state.contributors.some((c) => c.roles.includes('compositor')) && (
          <AddCard label="Añadir compositor (obligatorio)" onClick={() => setContributorStep1Open(true)} />
        )}
        {!state.contributors.some((c) => c.roles.includes('productor')) && (
          <AddCard label="Añadir productor (obligatorio)" onClick={() => setContributorStep1Open(true)} />
        )}
        {state.hasLyrics && !state.contributors.some((c) => c.roles.includes('letrista')) && (
          <AddCard label="Añadir letrista (obligatorio)" onClick={() => setContributorStep1Open(true)} />
        )}

        <Button
          startIcon={<AddIcon />}
          onClick={() => setContributorStep1Open(true)}
          sx={{ alignSelf: 'flex-start', color: '#484f7a', fontWeight: 500 }}
        >
          Añadir contribuidor
        </Button>
      </Box>

      {/* Créditos IA — always visible */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
        <Typography variant="subtitle1" sx={{ color: '#313030' }}>Créditos de Inteligencia Artificial</Typography>
        <Typography variant="body2" sx={{ color: '#797676' }}>
          Agrega un perfil generado íntegramente por sistemas de Inteligencia Artificial.
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {state.aiCredits.map((c) => (
          <ArtistCard
            key={c.id}
            name={c.name}
            roleLabel={aiRoleLabel(c)}
            onEdit={() => { setEditingAI(c); setAIModalOpen(true); }}
            onDelete={() => dispatch({ type: 'REMOVE_AI_CREDIT', id: c.id })}
          />
        ))}
        <AddCard label="Añadir perfil de IA generativa (opcional)" onClick={() => { setEditingAI(undefined); setAIModalOpen(true); }} />
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
        open={contributorStep1Open}
        onClose={() => setContributorStep1Open(false)}
        onNext={(partial) => {
          setContributorPartial(partial);
          setContributorStep1Open(false);
          setContributorRolesOpen(true);
        }}
      />

      {contributorPartial && (
        <AddContributorRolesModal
          open={contributorRolesOpen}
          onClose={() => { setContributorRolesOpen(false); setContributorPartial(null); setEditingContributor(undefined); }}
          onBack={() => { setContributorRolesOpen(false); setContributorStep1Open(true); }}
          partial={contributorPartial}
          initial={editingContributor}
          onSave={(c) => {
            if (editingContributor) dispatch({ type: 'UPDATE_CONTRIBUTOR', contributor: c });
            else dispatch({ type: 'ADD_CONTRIBUTOR', contributor: c });
            setContributorPartial(null);
            setEditingContributor(undefined);
          }}
        />
      )}

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
