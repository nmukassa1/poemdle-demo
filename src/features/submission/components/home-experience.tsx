"use client";

import Link from "next/link";
import { useState } from "react";

import { PageContainer } from "@/components/layout/page-container";
import { DailyPrompt } from "@/features/daily-prompt/components/daily-prompt";
import { PoemEditor } from "@/features/submission/components/poem-editor";
import { SubmissionModal } from "@/features/submission/components/submission-modal";
import { useGame } from "@/providers/game-provider";
import type { Prompt } from "@/types/api";

export function HomeExperience({ prompt }: { prompt: Prompt }) {
  const { alias, cycleAlias, hasSubmitted, submitPoem } = useGame();
  const [open, setOpen] = useState(false);

  return (
    <main className="flex flex-1 flex-col">
      <div className="min-h-6 flex-1 basis-0" aria-hidden="true" />
      <PageContainer width="home" className="py-6">
        <DailyPrompt prompt={prompt} />
        {hasSubmitted && !open ? (
          <div className="mt-12 text-center">
            <p className="font-serif text-[2rem] italic leading-tight text-ink">Your poem is in.</p>
            <p className="mt-3 text-sm text-muted">You’re writing as {alias}.</p>
            <Link
              href="/poems"
              className="mt-8 inline-flex rounded-full bg-ink px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-ink/85"
            >
              Read today’s poems
            </Link>
          </div>
        ) : (
          <PoemEditor
            characterLimit={prompt.characterLimit}
            onSubmitted={(body) => {
              submitPoem(body);
              setOpen(true);
            }}
          />
        )}
      </PageContainer>
      <div className="min-h-10 flex-1 basis-0" aria-hidden="true" />
      <SubmissionModal
        open={open}
        dayNumber={prompt.dayNumber}
        alias={alias}
        onAliasChange={cycleAlias}
        onClose={() => setOpen(false)}
      />
    </main>
  );
}
