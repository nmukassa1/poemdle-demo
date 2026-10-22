import type { Metadata } from "next";

import { PageContainer } from "@/components/layout/page-container";

export const metadata: Metadata = {
  title: "About",
};

const sections = [
  {
    title: "What is Poemdle?",
    body: "Poemdle is a daily micro-poetry game. Each day there is one prompt. You write a short poem, then read what others wrote and upvote the lines that stay with you.",
  },
  {
    title: "How the daily prompt works",
    body: "A new prompt is published every day and stays open until the day ends. When it closes, the next prompt begins.",
  },
  {
    title: "How to submit a poem",
    body: "Write up to 280 characters. Line breaks and stanza spacing are kept, and there is no line limit. You can submit one poem each day. After you send it, it can’t be edited.",
  },
  {
    title: "How voting works",
    body: "Submitting unlocks today’s poems. You have five upvotes and can change them until the day ends. Counts stay hidden while voting is open, and you can’t vote on your own poem.",
  },
  {
    title: "How daily winners are selected",
    body: "When the day closes, the poems with the most votes are ranked. The winning poem is kept in the archive. The game decides the rank — this page only shows the result.",
  },
] as const;

export default function AboutPage() {
  return (
    <main className="flex-1 pb-16">
      <PageContainer>
        <h1 className="font-serif text-[clamp(2.5rem,6vw,3.5rem)] italic leading-tight tracking-tight text-ink">
          About
        </h1>
        <div className="mt-10 space-y-10">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="font-serif text-[1.7rem] italic leading-tight text-ink">{section.title}</h2>
              <p className="mt-3 max-w-[38rem] text-[1.02rem] leading-relaxed text-ink">{section.body}</p>
            </section>
          ))}
        </div>
      </PageContainer>
    </main>
  );
}
