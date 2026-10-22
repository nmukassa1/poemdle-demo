import { describe, expect, it } from "vitest";

import { clampToCodePoints, countCodePoints } from "@/lib/utils/characters";

describe("countCodePoints", () => {
  it("counts newlines and composed characters as code points", () => {
    expect(countCodePoints("a\nb")).toBe(3);
    expect(countCodePoints("é")).toBe(1);
    expect(countCodePoints("e\u0301")).toBe(2);
    expect(countCodePoints("🙂")).toBe(1);
  });
});

describe("clampToCodePoints", () => {
  it("leaves short strings unchanged and cuts on code point boundaries", () => {
    expect(clampToCodePoints("abc", 5)).toBe("abc");
    expect(clampToCodePoints("abcdef", 3)).toBe("abc");
    expect(clampToCodePoints("🙂🙂", 1)).toBe("🙂");
  });
});
