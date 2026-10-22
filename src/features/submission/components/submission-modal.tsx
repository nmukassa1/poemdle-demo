"use client";

import Link from "next/link";

import { Dialog } from "@/components/ui/dialog";
import { formatDayNumber } from "@/lib/utils/format";

export function SubmissionModal({
  open,
  dayNumber,
  alias,
  onAliasChange,
  onClose,
}: {
  open: boolean;
  dayNumber: number;
  alias: string;
  onAliasChange: () => void;
  onClose: () => void;
}) {
  const titleId = "submission-title";

  return (
    <Dialog open={open} onClose={onClose} labelledBy={titleId}>
      <div className="relative px-6 py-8 sm:px-8 sm:py-9">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 flex size-9 items-center justify-center rounded-full bg-fill text-lg leading-none text-ink transition-opacity hover:opacity-70"
        >
          <span aria-hidden="true">×</span>
        </button>
        <div className="px-4 text-center">
          <p className="text-[0.72rem] font-medium tracking-[0.16em] text-muted uppercase">
            Day {formatDayNumber(dayNumber)} · Submitted
          </p>
          <h2
            id={titleId}
            className="mt-4 font-serif text-[clamp(2.1rem,5vw,2.7rem)] italic leading-tight tracking-tight text-ink"
          >
            Your poem is in.
          </h2>
          <p className="mx-auto mt-4 max-w-[26rem] text-[0.98rem] leading-relaxed text-ink">
            Today’s poems are unlocked. Read them and upvote up to 5 favourites.
          </p>
        </div>
        <div className="mt-6 rounded-[1.15rem] border border-border bg-white px-5 py-6 text-center">
          <p className="text-[0.68rem] font-medium tracking-[0.16em] text-muted uppercase">
            You’re writing as
          </p>
          <p className="mt-2 font-serif text-[2rem] italic leading-tight text-ink">{alias}</p>
          <button
            type="button"
            onClick={onAliasChange}
            className="mt-3 text-sm text-ink underline underline-offset-4 transition-opacity hover:opacity-60"
          >
            Change alias
          </button>
        </div>
        <Link
          href="/poems"
          className="mt-5 flex w-full items-center justify-center rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-ink/85"
        >
          Read today’s poems →
        </Link>
        <Link
          href="/archive"
          className="mt-4 block text-center text-sm text-muted transition-opacity hover:opacity-70"
        >
          Visit the archive
        </Link>
      </div>
    </Dialog>
  );
}
