import { describe, expect, it } from "vitest";

import { queryKeys } from "@/lib/query/keys";

describe("queryKeys", () => {
  it("matches the shared query key contract", () => {
    expect(queryKeys.today).toEqual(["today"]);
    expect(queryKeys.poems("2026-10-22")).toEqual(["poems", "2026-10-22"]);
    expect(queryKeys.leaderboard("2026-10-22")).toEqual(["leaderboard", "2026-10-22"]);
    expect(queryKeys.archive).toEqual(["archive"]);
  });
});
