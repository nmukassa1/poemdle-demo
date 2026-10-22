export function VoteIndicator({
  remaining,
  allowed,
  variant = "card",
}: {
  remaining: number;
  allowed: number;
  variant?: "card" | "plain";
}) {
  const label = `${remaining} of ${allowed} upvotes left`;
  const dots = (
    <span className="flex shrink-0 items-center gap-1.5" aria-hidden="true">
      {Array.from({ length: allowed }, (_, index) => (
        <span
          key={index}
          className={
            index < remaining
              ? "size-2.5 rounded-full bg-ink"
              : "size-2.5 rounded-full border border-ink/40 bg-transparent"
          }
        />
      ))}
    </span>
  );

  if (variant === "plain") {
    return (
      <div className="flex items-center justify-between gap-4">
        <p aria-live="polite" className="text-sm text-ink">
          {label}
        </p>
        {dots}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between gap-4 rounded-[1.15rem] border border-border bg-surface px-4 py-3.5">
      <p aria-live="polite" className="text-sm text-ink">
        {label}
      </p>
      {dots}
    </div>
  );
}
