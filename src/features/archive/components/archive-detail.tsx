import Link from "next/link";

import { PageContainer } from "@/components/layout/page-container";
import { formatDayNumber, formatPromptDate } from "@/lib/utils/format";
import type { ArchivePageData } from "@/types/api";

export function ArchiveDetail({ page }: { page: ArchivePageData }) {
  const { entry, previous, next } = page;

  return (
    <main className="flex-1 pb-16">
      <PageContainer width="page">
        <Link
          href="/archive"
          className="inline-flex text-sm text-ink transition-opacity hover:opacity-60"
        >
          ← Archive
        </Link>
        <p className="mt-8 text-[0.72rem] font-medium tracking-[0.14em] text-muted uppercase">
          Day {formatDayNumber(entry.prompt.dayNumber)} · {formatPromptDate(entry.prompt.date)}
        </p>
        <h1 className="mt-4 font-serif text-[clamp(2.2rem,5vw,3.25rem)] italic leading-tight tracking-tight text-ink">
          {entry.prompt.title}
        </h1>
        <p className="mt-4 max-w-[36rem] text-[1.02rem] leading-relaxed text-ink">
          {entry.prompt.description}
        </p>
        <article className="mt-8 rounded-[1.35rem] border border-border bg-surface px-6 py-8 sm:px-10 sm:py-12">
          <p className="whitespace-pre-wrap font-serif text-[clamp(1.35rem,2.4vw,1.7rem)] italic leading-[1.65] text-ink">
            {entry.winningPoem.content}
          </p>
          <hr className="mt-8 border-border" />
          <p className="mt-4 text-sm text-muted">by {entry.winningPoem.authorAlias}</p>
        </article>
        <nav aria-label="More days" className="mt-8 flex items-center justify-between gap-4">
          <AdjacentDay id={previous?.id ?? null} direction="previous" />
          <AdjacentDay id={next?.id ?? null} direction="next" />
        </nav>
      </PageContainer>
    </main>
  );
}

function AdjacentDay({
  id,
  direction,
}: {
  id: string | null;
  direction: "previous" | "next";
}) {
  const label = direction === "previous" ? "← Previous day" : "Next day →";

  if (!id) {
    return (
      <span className="invisible text-sm" aria-hidden="true">
        {label}
      </span>
    );
  }

  return (
    <Link href={`/archive/${id}`} className="text-sm text-ink transition-opacity hover:opacity-60">
      {label}
    </Link>
  );
}
