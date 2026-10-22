"use client";

import { useQuery } from "@tanstack/react-query";
import { useSyncExternalStore } from "react";

import { PageContainer } from "@/components/layout/page-container";
import { PoemCard } from "@/features/poem-feed/components/poem-card";
import { VoteIndicator } from "@/features/voting/components/vote-indicator";
import { getPoems } from "@/lib/api";
import { queryKeys } from "@/lib/query/keys";
import { formatDayNumber } from "@/lib/utils/format";
import { useGame } from "@/providers/game-provider";
import type { Poem, Prompt } from "@/types/api";

function useCanQuery() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function PoemFeed({
  prompt,
  initialPoems,
}: {
  prompt: Prompt;
  initialPoems: Poem[];
}) {
  const { hasVoted, remainingVotes, toggleVote, votesAllowed } = useGame();
  const canQuery = useCanQuery();

  // The query waits until after hydration. Seeding it during prerender makes
  // React Query read Date.now(), which Cache Components reject.
  const poems = useQuery({
    queryKey: queryKeys.poems(prompt.date),
    queryFn: () => getPoems(prompt.date),
    enabled: canQuery,
    staleTime: 30_000,
  });
  const items = poems.data ?? initialPoems;

  return (
    <main className="flex-1 pb-16">
      <PageContainer width="feed">
        <h1 className="text-[0.72rem] font-medium tracking-[0.16em] text-muted uppercase">
          Day {formatDayNumber(prompt.dayNumber)} · Today’s poems
        </h1>
        <p className="mt-4 rounded-[1.15rem] border border-border bg-surface px-5 py-4 text-center text-[0.95rem] leading-relaxed text-ink">
          Choose your favourites. Counts stay hidden until tomorrow’s winner is announced, and you
          can change your votes until the day ends.
        </p>
        <div className="mt-3">
          <VoteIndicator remaining={remainingVotes} allowed={votesAllowed} />
        </div>
        {poems.isError && items.length === 0 ? (
          <p role="alert" className="mt-6 text-center text-sm text-ink">
            Today’s poems couldn’t be loaded.
          </p>
        ) : items.length === 0 ? (
          <p className="mt-6 rounded-[1.15rem] border border-border bg-surface px-5 py-8 text-center text-sm text-muted">
            No poems have been shared yet.
          </p>
        ) : (
          <ul className="mt-3 space-y-3">
            {items.map((poem) => {
              const pressed = hasVoted(poem.id);
              return (
                <li key={poem.id}>
                  <PoemCard
                    poem={poem}
                    pressed={pressed}
                    voteDisabled={!pressed && remainingVotes === 0}
                    onToggleVote={toggleVote}
                  />
                </li>
              );
            })}
          </ul>
        )}
      </PageContainer>
    </main>
  );
}
