export type GameStatus = "scheduled" | "open" | "closed";

export interface Prompt {
  id: string;
  dayNumber: number;
  title: string;
  description: string;
  date: string;
  characterLimit: number;
  status: GameStatus;
  closesAt: string;
}

export interface Poem {
  id: string;
  promptId: string;
  content: string;
  authorAlias: string;
  createdAt: string;
}

export interface PlayerState {
  hasSubmitted: boolean;
  ownPoemId: string | null;
  alias: string | null;
  votesAllowed: number;
  votesRemaining: number;
  canVote: boolean;
}

export interface TodayResponse {
  prompt: Prompt;
  player: PlayerState;
}

export interface ArchiveEntry {
  id: string;
  prompt: Prompt;
  winningPoem: Poem;
}

export interface PoemPageData {
  prompt: Prompt;
  poem: Poem;
  previous: Poem | null;
  next: Poem | null;
}

export interface ArchivePageData {
  entry: ArchiveEntry;
  previous: ArchiveEntry | null;
  next: ArchiveEntry | null;
}
