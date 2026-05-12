import {
  Box, Typography, Button, IconButton, AppBar, Toolbar,
  TextField, Select, MenuItem, FormControl, InputLabel,
  InputAdornment, OutlinedInput,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ViewListIcon from '@mui/icons-material/ViewList';
import GridViewIcon from '@mui/icons-material/GridView';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MOCK_RELEASE = {
  id: '1',
  title: 'Noche de Verano',
  artist: 'Saori Gushiken',
  type: 'Single',
  tracks: 1,
  releaseDate: '15/06/2026',
  updatedAt: '12/05/2026',
  status: 'Borrador' as const,
};

type StatusKey = 'Borrador' | 'Enviado a revisión' | 'En revisión' | 'Entregado' | 'Rechazado' | 'Acción requerida';

const STATUS_STYLES: Record<StatusKey, { bg: string; border: string; color: string; fontWeight?: number }> = {
  'Borrador':           { bg: '#FFF4E5', border: '#FFA000', color: '#CC8100', fontWeight: 600 },
  'Enviado a revisión': { bg: '#ECEDF4', border: '#AFB3D0', color: '#484F7A' },
  'En revisión':        { bg: '#DBE5FF', border: '#002A9D', color: '#002A9D' },
  'Entregado':          { bg: '#EDF7ED', border: '#2E7D39', color: '#1E4620', fontWeight: 500 },
  'Rechazado':          { bg: '#FDEDED', border: '#B3261E', color: '#B3261E' },
  'Acción requerida':   { bg: '#FFF4E5', border: '#FFA000', color: '#CC8100' },
};

function StatusBadge({ status }: { status: StatusKey }) {
  const s = STATUS_STYLES[status];
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        height: 24,
        px: '8px',
        borderRadius: '16px',
        bgcolor: s.bg,
        border: `1px solid ${s.border}`,
        color: s.color,
        fontWeight: s.fontWeight ?? 500,
        fontSize: '0.875rem',
        lineHeight: 1,
        whiteSpace: 'nowrap',
        flexShrink: 0,
      }}
    >
      {status}
    </Box>
  );
}

function NavTab({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <Box
      component="button"
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 0.5,
        border: 'none',
        borderBottom: active ? '3px solid #CF0389' : '3px solid transparent',
        background: 'none',
        cursor: 'pointer',
        color: '#171717',
        fontSize: '1rem',
        fontWeight: 500,
        px: 2,
        height: 80,
        '&:hover': { borderBottomColor: active ? '#CF0389' : '#e0e0e0' },
        '&:focus-visible': { outline: '2px solid #484f7a' },
      }}
    >
      {label}
      <ExpandMoreIcon sx={{ fontSize: 20, color: '#535353' }} />
    </Box>
  );
}

function ViewToggle({ view, onChange }: { view: 'list' | 'grid'; onChange: (v: 'list' | 'grid') => void }) {
  const base = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 64,
    height: 40,
    cursor: 'pointer',
    border: '1px solid #959393',
    transition: 'background-color 0.15s',
  };
  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        component="button"
        aria-label="Vista lista"
        onClick={() => onChange('list')}
        sx={{
          ...base,
          bgcolor: view === 'list' ? '#fff' : '#dde0f1',
          borderRadius: '100px 0 0 100px',
          borderRight: 'none',
          '&:hover': { bgcolor: view === 'list' ? '#f5f5f5' : '#c8cce6' },
          '&:focus-visible': { outline: '2px solid #484f7a', zIndex: 1, position: 'relative' },
        }}
      >
        <ViewListIcon sx={{ fontSize: 18, color: '#313030' }} />
      </Box>
      <Box
        component="button"
        aria-label="Vista cuadrícula"
        onClick={() => onChange('grid')}
        sx={{
          ...base,
          bgcolor: view === 'grid' ? '#fff' : '#dde0f1',
          borderRadius: '0 100px 100px 0',
          '&:hover': { bgcolor: view === 'grid' ? '#f5f5f5' : '#c8cce6' },
          '&:focus-visible': { outline: '2px solid #484f7a', zIndex: 1, position: 'relative' },
        }}
      >
        <GridViewIcon sx={{ fontSize: 18, color: '#313030' }} />
      </Box>
    </Box>
  );
}

function ListRow({ release, onClick }: { release: typeof MOCK_RELEASE; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Box
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        bgcolor: '#F9F9F9',
        borderRadius: '8px',
        px: 3,
        py: 2,
        cursor: 'pointer',
        '&:hover': { bgcolor: '#f0f1f7' },
        transition: 'background-color 0.15s',
      }}
    >
      {/* Cover + title */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: 280, flexShrink: 0 }}>
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: 1,
            bgcolor: '#ecedf4',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <MusicNoteIcon sx={{ color: '#484f7a', fontSize: 22 }} />
        </Box>
        <Box>
          <Typography sx={{ fontSize: '1rem', fontWeight: 500, color: '#0d0d0d', lineHeight: 1.5 }}>
            {release.title}
          </Typography>
          <Typography sx={{ fontSize: '0.875rem', color: '#535353', lineHeight: 1.4 }}>
            {release.artist}
          </Typography>
        </Box>
      </Box>

      {/* Tipo */}
      <Box sx={{ flexShrink: 0, minWidth: 80 }}>
        <Typography sx={{ fontSize: '0.875rem', color: 'rgba(0,0,0,0.87)', lineHeight: 1.4 }}>Tipo</Typography>
        <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: 'rgba(0,0,0,0.87)', lineHeight: 1.4 }}>
          {release.type}
        </Typography>
      </Box>

      {/* Pistas */}
      <Box sx={{ flexShrink: 0, minWidth: 60 }}>
        <Typography sx={{ fontSize: '0.875rem', color: 'rgba(0,0,0,0.87)', lineHeight: 1.4 }}>Pistas</Typography>
        <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: 'rgba(0,0,0,0.87)', lineHeight: 1.4 }}>
          {release.tracks}
        </Typography>
      </Box>

      {/* Fecha de Lanzamiento */}
      <Box sx={{ flexShrink: 0, minWidth: 130 }}>
        <Typography sx={{ fontSize: '0.875rem', color: 'rgba(0,0,0,0.87)', lineHeight: 1.4 }}>
          Fecha de Lanzamiento
        </Typography>
        <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: 'rgba(0,0,0,0.87)', lineHeight: 1.4 }}>
          {release.releaseDate}
        </Typography>
      </Box>

      {/* Última modificación */}
      <Box sx={{ flexShrink: 0, minWidth: 130 }}>
        <Typography sx={{ fontSize: '0.875rem', color: 'rgba(0,0,0,0.87)', lineHeight: 1.4 }}>
          Última modificación
        </Typography>
        <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: 'rgba(0,0,0,0.87)', lineHeight: 1.4 }}>
          {release.updatedAt}
        </Typography>
      </Box>

      {/* Estado */}
      <Box sx={{ flexShrink: 0 }}>
        <StatusBadge status={release.status} />
      </Box>

      {/* Acciones */}
      <Box sx={{ width: 40, display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
        {hovered && (
          <IconButton
            size="small"
            aria-label="Más opciones"
            onClick={(e) => { e.stopPropagation(); onClick(); }}
            sx={{ color: '#535353' }}
          >
            <MoreVertIcon fontSize="small" />
          </IconButton>
        )}
      </Box>
    </Box>
  );
}

function GridCard({ release, onClick }: { release: typeof MOCK_RELEASE; onClick: () => void }) {
  return (
    <Box
      onClick={onClick}
      sx={{
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        width: 306,
        '&:hover .card-cover': { filter: 'brightness(0.92)' },
      }}
    >
      {/* Artwork */}
      <Box
        className="card-cover"
        sx={{
          width: 306,
          height: 306,
          borderRadius: '4px',
          bgcolor: '#ecedf4',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          flexShrink: 0,
          transition: 'filter 0.15s',
        }}
      >
        <MusicNoteIcon sx={{ color: '#484f7a', fontSize: 64 }} />
        <Box
          sx={{
            position: 'absolute',
            width: 40,
            height: 40,
            borderRadius: '50%',
            bgcolor: '#484f7a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            component="span"
            sx={{
              width: 0,
              height: 0,
              borderStyle: 'solid',
              borderWidth: '6px 0 6px 12px',
              borderColor: 'transparent transparent transparent #fff',
              ml: '2px',
            }}
          />
        </Box>
      </Box>

      {/* Info */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography sx={{ fontSize: '1rem', fontWeight: 500, color: '#171717', lineHeight: 1.5 }}>
          {release.title}
        </Typography>
        <Typography sx={{ fontSize: '1rem', color: '#171717', lineHeight: 1.5 }}>
          {release.artist}
        </Typography>
        <Typography sx={{ fontSize: '0.875rem', color: '#535353', lineHeight: 1.4 }}>
          {release.type} · {release.tracks} pista · {release.releaseDate}
        </Typography>
        <Typography sx={{ fontSize: '0.875rem', color: '#535353', lineHeight: 1.4 }}>
          Última modificación: {release.updatedAt}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Typography sx={{ fontSize: '0.875rem', color: '#535353' }}>Estado:</Typography>
          <StatusBadge status={release.status} />
        </Box>
      </Box>
    </Box>
  );
}

export default function ReleasesPage() {
  const navigate = useNavigate();
  const [view, setView] = useState<'list' | 'grid'>('list');
  const [statusFilter, setStatusFilter] = useState('');
  const [search, setSearch] = useState('');

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#fff' }}>
      {/* Nav bar */}
      <AppBar
        position="sticky"
        color="default"
        elevation={0}
        sx={{
          bgcolor: '#fff',
          boxShadow: '0 2px 1.5px rgba(0,0,0,0.05)',
          borderBottom: '1px solid #e8e8e8',
        }}
      >
        <Toolbar sx={{ minHeight: 80, px: '80px !important', justifyContent: 'space-between' }}>
          {/* Logo */}
          <Typography sx={{ fontWeight: 700, fontSize: '1.25rem', color: '#CF0389', letterSpacing: '-0.02em', flexShrink: 0 }}>
            SonoSuite
          </Typography>

          {/* Nav tabs */}
          <Box sx={{ display: 'flex', height: 80, alignItems: 'stretch' }}>
            <NavTab label="Music" active />
            <NavTab label="Analytics" />
            <NavTab label="Royalties" />
          </Box>

          {/* Right — avatar */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexShrink: 0 }}>
            <Box sx={{ width: 32, height: 32, borderRadius: '50%', bgcolor: '#ecedf4' }} />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Page content */}
      <Box sx={{ px: '80px', pt: 4, pb: 8 }}>

        {/* Page header */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h4" sx={{ color: '#0d0d0d', fontWeight: 400, fontSize: '2rem', lineHeight: 1.25 }}>
            Lanzamientos
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/step1')}
            sx={{
              bgcolor: '#CF0389',
              '&:hover': { bgcolor: '#b00278' },
              borderRadius: '100px',
              textTransform: 'none',
              fontWeight: 500,
              px: 3,
              height: 40,
              fontSize: '0.875rem',
            }}
          >
            Nuevo lanzamiento
          </Button>
        </Box>

        {/* Toolbar */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5 }}>
          {/* Filter by status */}
          <FormControl size="small" sx={{ minWidth: 208 }}>
            <InputLabel sx={{ fontSize: '0.875rem' }}>Filtrar por estado</InputLabel>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              label="Filtrar por estado"
              input={<OutlinedInput label="Filtrar por estado" />}
              sx={{ height: 40, fontSize: '0.875rem' }}
            >
              <MenuItem value=""><em>Todos</em></MenuItem>
              {Object.keys(STATUS_STYLES).map((s) => (
                <MenuItem key={s} value={s}>{s}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Search + toggle */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <TextField
              size="small"
              placeholder="Title, artist or UPC (EAN13)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ fontSize: 20, color: '#535353' }} />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                width: 424,
                '& .MuiOutlinedInput-root': { height: 40, fontSize: '0.9375rem' },
              }}
            />
            <ViewToggle view={view} onChange={setView} />
          </Box>
        </Box>

        {/* List view */}
        {view === 'list' && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <ListRow release={MOCK_RELEASE} onClick={() => navigate('/step1')} />
          </Box>
        )}

        {/* Grid view */}
        {view === 'grid' && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
            <GridCard release={MOCK_RELEASE} onClick={() => navigate('/step1')} />
          </Box>
        )}

        {/* Pagination */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 1, mt: 3 }}>
          <Typography sx={{ fontSize: '0.875rem', color: '#535353' }}>1-1 of 1</Typography>
          <IconButton size="small" disabled aria-label="Página anterior">
            <ChevronLeftIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" disabled aria-label="Página siguiente">
            <ChevronRightIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
