import type { Prompt } from "@/types/api";
import { formatDayNumber } from "@/lib/utils/format";

export function DailyPrompt({ prompt }: { prompt: Prompt }) {
  return (
    <header className="text-center">
      <p className="text-[0.72rem] font-medium tracking-[0.16em] text-muted uppercase">
        Day {formatDayNumber(prompt.dayNumber)} - Today’s prompt
      </p>
      <h1 className="mx-auto mt-5 font-serif text-[clamp(2.75rem,7vw,4.35rem)] italic leading-[1.05] tracking-tight text-ink">
        {prompt.title}
      </h1>
      <p className="mx-auto mt-5 max-w-[34rem] text-[1.02rem] leading-relaxed text-ink sm:text-[1.08rem]">
        {prompt.description}
      </p>
    </header>
  );
}
