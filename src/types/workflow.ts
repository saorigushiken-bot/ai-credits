export type ArtistRole = 'principal' | 'invitado';

export type ContributorRole = 'compositor' | 'letrista' | 'productor' | 'intérprete';

export type AIRole = 'compositor' | 'letrista' | 'productor' | 'intérprete';

export interface Artist {
  id: string;
  name: string;
  role: ArtistRole;
  usedAI: boolean;
  artistRoles?: ContributorRole[];
}

export interface Contributor {
  id: string;
  name: string;
  roles: ContributorRole[];
  performerRoles: string;
  otherRoles: boolean;
  otherRolesDescription: string;
  usedAI: boolean;
  aiRoles: ContributorRole[];
}

export interface AICredit {
  id: string;
  name: string;
  roles: AIRole[];
  performerRoles: string[];
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
