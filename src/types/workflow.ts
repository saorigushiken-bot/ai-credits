export type ArtistRole = 'principal' | 'invitado';

export type ContributorRole = 'compositor' | 'letrista' | 'productor' | 'intérprete';

export type AIRole = 'compositor' | 'letrista' | 'productor' | 'intérprete';

export interface Artist {
  id: string;
  name: string;
  role: ArtistRole;
  usedAI: boolean;
}

export interface Contributor {
  id: string;
  name: string;
  roles: ContributorRole[];
  performerRoles: string[];
  otherRoles: string[];
  usedAI: boolean;
}

export interface AICredit {
  id: string;
  name: string;
  roles: AIRole[];
  otherRoles: string[];
}

export interface WorkflowState {
  trackTitle: string;
  primaryGenre: string;
  secondaryGenre: string;
  hasLyrics: boolean | null;
  language: string;
  lyrics: string;
  isExplicit: boolean | null;
  hasCleanVersion: boolean | null;
  artists: Artist[];
  contributors: Contributor[];
  aiCredits: AICredit[];
  requestISRC: boolean;
}
