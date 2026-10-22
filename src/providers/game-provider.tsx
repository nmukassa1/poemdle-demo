"use client";

import { useQuery } from "@tanstack/react-query";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { getAliasOptions, getToday } from "@/lib/api";
import { queryKeys } from "@/lib/query/keys";

const aliasOptions = getAliasOptions();

const votesFallback = 5;

type GameContextValue = {
  alias: string;
  submission: string | null;
  hasSubmitted: boolean;
  votedIds: string[];
  votesAllowed: number;
  remainingVotes: number;
  submitPoem: (body: string) => void;
  cycleAlias: () => void;
  toggleVote: (poemId: string) => void;
  hasVoted: (poemId: string) => boolean;
};

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const today = useQuery({
    queryKey: queryKeys.today,
    queryFn: getToday,
    staleTime: 60_000,
  });

  const queryAlias = today.data?.player.alias ?? null;
  const votesAllowed = today.data?.player.votesAllowed ?? votesFallback;
  const [aliasOverride, setAliasOverride] = useState<string | null>(null);
  const [submission, setSubmission] = useState<string | null>(null);
  const [votedIds, setVotedIds] = useState<string[]>([]);

  const alias = aliasOverride ?? queryAlias ?? aliasOptions[0];

  const toggleVote = useCallback(
    (poemId: string) => {
      setVotedIds((current) => {
        if (current.includes(poemId)) {
          return current.filter((id) => id !== poemId);
        }
        if (current.length >= votesAllowed) return current;
        return [...current, poemId];
      });
    },
    [votesAllowed],
  );

  const value = useMemo<GameContextValue>(
    () => ({
      alias,
      submission,
      hasSubmitted: submission !== null,
      votedIds,
      votesAllowed,
      remainingVotes: votesAllowed - votedIds.length,
      submitPoem: (body: string) => {
        setSubmission((current) => current ?? body);
      },
      cycleAlias: () => {
        setAliasOverride((current) => {
          const base = current ?? queryAlias ?? aliasOptions[0];
          const index = aliasOptions.indexOf(base);
          const nextIndex = index === -1 ? 0 : (index + 1) % aliasOptions.length;
          return aliasOptions[nextIndex];
        });
      },
      toggleVote,
      hasVoted: (poemId: string) => votedIds.includes(poemId),
    }),
    [alias, queryAlias, submission, toggleVote, votedIds, votesAllowed],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame(): GameContextValue {
  const value = useContext(GameContext);
  if (!value) {
    throw new Error("useGame must be used within GameProvider");
  }
  return value;
}
