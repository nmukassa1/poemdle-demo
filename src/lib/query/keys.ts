export const queryKeys = {
  today: ["today"] as const,
  poems: (date: string) => ["poems", date] as const,
  leaderboard: (date: string) => ["leaderboard", date] as const,
  archive: ["archive"] as const,
};
