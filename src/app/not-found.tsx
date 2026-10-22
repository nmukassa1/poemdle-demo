import Link from "next/link";

import { PageContainer } from "@/components/layout/page-container";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col justify-center py-16">
      <PageContainer>
        <h1 className="font-serif text-[clamp(2.4rem,6vw,3.4rem)] italic leading-tight text-ink">
          This page isn’t here.
        </h1>
        <p className="mt-4 text-[1.02rem] leading-relaxed text-ink">
          The poem or day you asked for isn’t part of this archive.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex text-sm text-ink underline underline-offset-4 transition-opacity hover:opacity-60"
        >
          Back to today’s prompt
        </Link>
      </PageContainer>
    </main>
  );
}
