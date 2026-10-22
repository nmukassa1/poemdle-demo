import type { Metadata } from "next";

import { ArchiveList } from "@/features/archive/components/archive-list";
import { getArchive } from "@/lib/api";

export const metadata: Metadata = {
  title: "Archive",
};

async function loadArchive() {
  "use cache";
  return getArchive();
}

export default async function ArchivePage() {
  const entries = await loadArchive();
  return <ArchiveList entries={entries} />;
}
