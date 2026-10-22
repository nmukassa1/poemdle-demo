/** Counts Unicode code points. Newlines are included; grapheme clusters are not combined. */
export function countCodePoints(value: string): number {
  return Array.from(value).length;
}

export function clampToCodePoints(value: string, limit: number): string {
  const characters = Array.from(value);
  if (characters.length <= limit) return value;
  return characters.slice(0, limit).join("");
}
