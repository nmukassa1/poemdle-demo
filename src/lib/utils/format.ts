const promptDateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export function formatDayNumber(dayNumber: number): string {
  return String(dayNumber).padStart(3, "0");
}

export function formatPromptDate(isoDate: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate);
  if (!match) return isoDate;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  return promptDateFormat.format(new Date(Date.UTC(year, month - 1, day)));
}

export function firstStanza(content: string): string {
  const [stanza] = content.split(/\n{2,}/);
  return stanza?.trim() ?? content.trim();
}
