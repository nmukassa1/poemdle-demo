import { HomeExperience } from "@/features/submission/components/home-experience";
import { getToday } from "@/lib/api";

async function loadToday() {
  "use cache";
  return getToday();
}

export default async function HomePage() {
  const { prompt } = await loadToday();
  return <HomeExperience prompt={prompt} />;
}
