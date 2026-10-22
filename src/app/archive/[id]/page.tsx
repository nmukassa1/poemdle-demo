import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArchiveDetail } from "@/features/archive/components/archive-detail";
import { getArchive, getArchivePage } from "@/lib/api";

export async function generateStaticParams() {
  const entries = await getArchive();
  return entries.map((entry) => ({ id: entry.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const page = await getArchivePage(id);
  if (!page) return { title: "Archive" };
  return { title: page.entry.prompt.title };
}

async function loadArchivePage(id: string) {
  "use cache";
  return getArchivePage(id);
}

export default async function ArchiveEntryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const page = await loadArchivePage(id);
  if (!page) notFound();
  return <ArchiveDetail page={page} />;
}
