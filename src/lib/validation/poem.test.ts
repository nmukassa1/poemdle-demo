import { describe, expect, it } from "vitest";

import { archiveEntries, todayPoems, todayPrompt } from "@/lib/data";
import { countCodePoints } from "@/lib/utils/characters";
import { createPoemSchema } from "@/lib/validation/poem";

const schema = createPoemSchema(280);

describe("poem schema", () => {
  it("rejects an empty or whitespace poem", () => {
    expect(schema.safeParse({ body: "" }).success).toBe(false);
    expect(schema.safeParse({ body: " \n\t" }).success).toBe(false);
  });

  it("accepts 280 code points and rejects 281, counting newlines", () => {
    const exact = `${"a".repeat(279)}\n`;
    expect(countCodePoints(exact)).toBe(280);
    expect(schema.safeParse({ body: exact }).success).toBe(true);
    expect(schema.safeParse({ body: `${exact}b` }).success).toBe(false);
  });
});

describe("mock poems", () => {
  it("keeps every poem within its prompt limit", () => {
    for (const poem of todayPoems) {
      expect(poem.promptId).toBe(todayPrompt.id);
      expect(countCodePoints(poem.content)).toBeLessThanOrEqual(todayPrompt.characterLimit);
      expect(poem.content.trim().length).toBeGreaterThan(0);
    }

    for (const entry of archiveEntries) {
      expect(entry.winningPoem.promptId).toBe(entry.prompt.id);
      expect(countCodePoints(entry.winningPoem.content)).toBeLessThanOrEqual(
        entry.prompt.characterLimit,
      );
    }

    expect(todayPoems.length).toBeGreaterThanOrEqual(10);
    expect(archiveEntries.length).toBeGreaterThanOrEqual(5);
  });
});
