import { z } from "zod";

import { countCodePoints } from "@/lib/utils/characters";

export function createPoemSchema(characterLimit: number) {
  return z.object({
    body: z
      .string()
      .refine((value) => value.trim().length > 0, {
        message: "Write a poem before submitting.",
      })
      .refine((value) => countCodePoints(value) <= characterLimit, {
        message: `Poems can be at most ${characterLimit} characters.`,
      }),
  });
}

export type PoemFormValues = z.infer<ReturnType<typeof createPoemSchema>>;
