import Link from "next/link";

import { UpvoteButton } from "@/features/voting/components/upvote-button";
import { firstStanza } from "@/lib/utils/format";
import type { Poem } from "@/types/api";

export function PoemCard({
  poem,
  pressed,
  voteDisabled,
  onToggleVote,
}: {
  poem: Poem;
  pressed: boolean;
  voteDisabled: boolean;
  onToggleVote: (poemId: string) => void;
}) {
  return (
    <article className="rounded-[1.25rem] border border-border bg-surface px-5 py-5">
      <Link
        href={`/poems/${poem.id}`}
        className="block rounded-md font-serif text-[1.28rem] italic leading-snug text-ink sm:text-[1.38rem]"
      >
        <span className="whitespace-pre-wrap">{firstStanza(poem.content)}</span>
      </Link>
      <div className="mt-6 flex items-center justify-between gap-4">
        <p className="text-sm text-muted">{poem.authorAlias}</p>
        <UpvoteButton
          authorAlias={poem.authorAlias}
          pressed={pressed}
          disabled={voteDisabled}
          onToggle={() => onToggleVote(poem.id)}
        />
      </div>
    </article>
  );
}
