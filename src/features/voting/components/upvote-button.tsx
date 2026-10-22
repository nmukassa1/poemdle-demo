export function UpvoteButton({
  authorAlias,
  pressed,
  disabled,
  onToggle,
  size = "compact",
}: {
  authorAlias: string;
  pressed: boolean;
  disabled: boolean;
  onToggle: () => void;
  size?: "compact" | "large";
}) {
  const label = pressed
    ? `Remove upvote from ${authorAlias}`
    : disabled
      ? `Upvote poem by ${authorAlias}, no upvotes left`
      : `Upvote poem by ${authorAlias}`;

  const text =
    size === "large"
      ? pressed
        ? "↑ Upvoted"
        : "↑ Upvote this poem"
      : pressed
        ? "↑ Upvoted"
        : "↑ Upvote";

  const shape =
    size === "large" ? "w-full px-6 py-3.5 text-[0.98rem]" : "px-4 py-2 text-sm";

  return (
    <button
      type="button"
      aria-pressed={pressed}
      aria-label={label}
      disabled={disabled}
      onClick={onToggle}
      className={`inline-flex shrink-0 items-center justify-center rounded-full border border-ink font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${shape} ${
        pressed ? "bg-ink text-white" : "bg-surface text-ink hover:bg-ink/5"
      }`}
    >
      {text}
    </button>
  );
}
