import React, { createContext, useContext, useReducer } from 'react';
import type { WorkflowState, Artist, Contributor, AICredit } from '../types/workflow';

type Action =
  | { type: 'SET_FIELD'; field: keyof WorkflowState; value: unknown }
  | { type: 'ADD_ARTIST'; artist: Artist }
  | { type: 'REMOVE_ARTIST'; id: string }
  | { type: 'UPDATE_ARTIST'; artist: Artist }
  | { type: 'ADD_CONTRIBUTOR'; contributor: Contributor }
  | { type: 'REMOVE_CONTRIBUTOR'; id: string }
  | { type: 'UPDATE_CONTRIBUTOR'; contributor: Contributor }
  | { type: 'ADD_AI_CREDIT'; credit: AICredit }
  | { type: 'REMOVE_AI_CREDIT'; id: string }
  | { type: 'UPDATE_AI_CREDIT'; credit: AICredit };

const initialState: WorkflowState = {
  trackTitle: 'Mi canción increíble',
  primaryGenre: '',
  secondaryGenre: '',
  hasLyrics: true,
  language: '',
  lyrics: '',
  isExplicit: null,
  hasCleanVersion: null,
  artists: [],
  contributors: [],
  aiCredits: [],
  requestISRC: false,
};

function reducer(state: WorkflowState, action: Action): WorkflowState {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'ADD_ARTIST':
      return { ...state, artists: [...state.artists, action.artist] };
    case 'REMOVE_ARTIST':
      return { ...state, artists: state.artists.filter((a) => a.id !== action.id) };
    case 'UPDATE_ARTIST':
      return { ...state, artists: state.artists.map((a) => (a.id === action.artist.id ? action.artist : a)) };
    case 'ADD_CONTRIBUTOR':
      return { ...state, contributors: [...state.contributors, action.contributor] };
    case 'REMOVE_CONTRIBUTOR':
      return { ...state, contributors: state.contributors.filter((c) => c.id !== action.id) };
    case 'UPDATE_CONTRIBUTOR':
      return { ...state, contributors: state.contributors.map((c) => (c.id === action.contributor.id ? action.contributor : c)) };
    case 'ADD_AI_CREDIT':
      return { ...state, aiCredits: [...state.aiCredits, action.credit] };
    case 'REMOVE_AI_CREDIT':
      return { ...state, aiCredits: state.aiCredits.filter((c) => c.id !== action.id) };
    case 'UPDATE_AI_CREDIT':
      return { ...state, aiCredits: state.aiCredits.map((c) => (c.id === action.credit.id ? action.credit : c)) };
    default:
      return state;
  }
}

interface WorkflowContextValue {
  state: WorkflowState;
  dispatch: React.Dispatch<Action>;
}

const WorkflowContext = createContext<WorkflowContextValue | null>(null);

export function WorkflowProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <WorkflowContext.Provider value={{ state, dispatch }}>{children}</WorkflowContext.Provider>;
}

export function useWorkflow() {
  const ctx = useContext(WorkflowContext);
  if (!ctx) throw new Error('useWorkflow must be used within WorkflowProvider');
  return ctx;
}
