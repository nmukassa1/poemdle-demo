"use client";

import Link from "next/link";

import { PageContainer } from "@/components/layout/page-container";
import { UpvoteButton } from "@/features/voting/components/upvote-button";
import { VoteIndicator } from "@/features/voting/components/vote-indicator";
import { formatDayNumber } from "@/lib/utils/format";
import { useGame } from "@/providers/game-provider";
import type { PoemPageData } from "@/types/api";

export function PoemReader({ page }: { page: PoemPageData }) {
  const { poem, prompt, previous, next } = page;
  const { hasVoted, remainingVotes, toggleVote, votesAllowed } = useGame();
  const pressed = hasVoted(poem.id);

  return (
    <main className="flex-1 pb-16">
      <PageContainer width="page">
        <Link
          href="/poems"
          className="inline-flex text-sm text-ink transition-opacity hover:opacity-60"
        >
          ← Today’s poems
        </Link>
        <h1 className="mt-8 text-[0.72rem] font-medium tracking-[0.14em] text-muted uppercase">
          Day {formatDayNumber(prompt.dayNumber)} · {prompt.title}
        </h1>
        <article className="mt-4 rounded-[1.35rem] border border-border bg-surface px-6 py-8 sm:px-10 sm:py-12">
          <p className="whitespace-pre-wrap font-serif text-[clamp(1.35rem,2.4vw,1.7rem)] italic leading-[1.65] text-ink">
            {poem.content}
          </p>
          <hr className="mt-8 border-border" />
          <p className="mt-4 text-sm text-muted">by {poem.authorAlias}</p>
        </article>
        <nav aria-label="More poems" className="mt-8 flex items-center justify-between gap-4">
          <AdjacentPoem poemId={previous?.id ?? null} direction="previous" />
          <AdjacentPoem poemId={next?.id ?? null} direction="next" />
        </nav>
        <div className="mt-8">
          <UpvoteButton
            size="large"
            authorAlias={poem.authorAlias}
            pressed={pressed}
            disabled={!pressed && remainingVotes === 0}
            onToggle={() => toggleVote(poem.id)}
          />
          <div className="mt-4">
            <VoteIndicator remaining={remainingVotes} allowed={votesAllowed} variant="plain" />
          </div>
        </div>
      </PageContainer>
    </main>
  );
}

function AdjacentPoem({
  poemId,
  direction,
}: {
  poemId: string | null;
  direction: "previous" | "next";
}) {
  const label = direction === "previous" ? "← Previous poem" : "Next poem →";

  if (!poemId) {
    return (
      <span className="invisible text-sm" aria-hidden="true">
        {label}
      </span>
    );
  }

  return (
    <Link
      href={`/poems/${poemId}`}
      className="text-sm text-ink transition-opacity hover:opacity-60"
    >
      {label}
    </Link>
  );
}
