import {
  aliasOptions,
  archiveEntries,
  todayPoems,
  todayPrompt,
  todayResponse,
} from "@/lib/data";
import type {
  ArchiveEntry,
  ArchivePageData,
  Poem,
  PoemPageData,
  TodayResponse,
} from "@/types/api";

// Async on purpose: this module is the seam a real API client will replace.
export function getAliasOptions(): readonly string[] {
  return aliasOptions;
}

export async function getToday(): Promise<TodayResponse> {
  return todayResponse;
}

export async function getPoems(date: string): Promise<Poem[]> {
  if (date !== todayPrompt.date) return [];
  return todayPoems;
}

export async function getPoemPage(id: string): Promise<PoemPageData | null> {
  const index = todayPoems.findIndex((poem) => poem.id === id);
  if (index === -1) return null;

  return {
    prompt: todayPrompt,
    poem: todayPoems[index],
    previous: todayPoems[index - 1] ?? null,
    next: todayPoems[index + 1] ?? null,
  };
}

export async function getArchive(): Promise<ArchiveEntry[]> {
  return archiveEntries;
}

export async function getArchivePage(id: string): Promise<ArchivePageData | null> {
  const index = archiveEntries.findIndex((entry) => entry.id === id);
  if (index === -1) return null;

  return {
    entry: archiveEntries[index],
    previous: archiveEntries[index + 1] ?? null,
    next: archiveEntries[index - 1] ?? null,
  };
}
