import type { Metadata } from "next";

import { PoemFeed } from "@/features/poem-feed/components/poem-feed";
import { getPoems, getToday } from "@/lib/api";

export const metadata: Metadata = {
  title: "Today’s poems",
};

async function loadFeed() {
  "use cache";
  const { prompt } = await getToday();
  const poems = await getPoems(prompt.date);
  return { prompt, poems };
}

export default async function PoemsPage() {
  const { prompt, poems } = await loadFeed();
  return <PoemFeed prompt={prompt} initialPoems={poems} />;
}
