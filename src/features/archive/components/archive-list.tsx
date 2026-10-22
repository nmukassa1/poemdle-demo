import Link from "next/link";

import { PageContainer } from "@/components/layout/page-container";
import { firstStanza, formatDayNumber, formatPromptDate } from "@/lib/utils/format";
import type { ArchiveEntry } from "@/types/api";

export function ArchiveList({ entries }: { entries: ArchiveEntry[] }) {
  return (
    <main className="flex-1 pb-16">
      <PageContainer width="feed">
        <h1 className="font-serif text-[clamp(2.5rem,6vw,3.5rem)] italic leading-tight tracking-tight text-ink">
          Archive
        </h1>
        <p className="mt-4 text-[1.02rem] leading-relaxed text-ink">
          Previous prompts, and the poem that won each day.
        </p>
        {entries.length === 0 ? (
          <p className="mt-8 rounded-[1.15rem] border border-border bg-surface px-5 py-8 text-center text-sm text-muted">
            No days have been archived yet.
          </p>
        ) : (
          <ul className="mt-8 space-y-3">
            {entries.map((entry) => (
              <li key={entry.id}>
                <Link
                  href={`/archive/${entry.id}`}
                  className="block rounded-[1.25rem] border border-border bg-surface px-5 py-5 transition-colors hover:border-ink/30"
                >
                  <p className="text-[0.72rem] font-medium tracking-[0.14em] text-muted uppercase">
                    Day {formatDayNumber(entry.prompt.dayNumber)} · {formatPromptDate(entry.prompt.date)}
                  </p>
                  <h2 className="mt-3 font-serif text-[1.7rem] italic leading-tight text-ink">
                    {entry.prompt.title}
                  </h2>
                  <p className="mt-4 whitespace-pre-wrap font-serif text-[1.15rem] italic leading-snug text-ink">
                    {firstStanza(entry.winningPoem.content)}
                  </p>
                  <p className="mt-5 text-sm text-muted">{entry.winningPoem.authorAlias}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </PageContainer>
    </main>
  );
}
