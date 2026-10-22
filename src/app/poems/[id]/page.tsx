import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PoemReader } from "@/features/poem-feed/components/poem-reader";
import { getPoemPage, getPoems, getToday } from "@/lib/api";

export async function generateStaticParams() {
  const { prompt } = await getToday();
  const poems = await getPoems(prompt.date);
  return poems.map((poem) => ({ id: poem.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const page = await getPoemPage(id);
  if (!page) return { title: "Poem" };
  return { title: `Poem by ${page.poem.authorAlias}` };
}

async function loadPoem(id: string) {
  "use cache";
  return getPoemPage(id);
}

export default async function PoemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const page = await loadPoem(id);
  if (!page) notFound();
  return <PoemReader page={page} />;
}
