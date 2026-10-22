"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";

import { clampToCodePoints, countCodePoints } from "@/lib/utils/characters";
import { createPoemSchema, type PoemFormValues } from "@/lib/validation/poem";

export function PoemEditor({
  characterLimit,
  onSubmitted,
}: {
  characterLimit: number;
  onSubmitted: (body: string) => void;
}) {
  const schema = useMemo(() => createPoemSchema(characterLimit), [characterLimit]);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PoemFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { body: "" },
    mode: "onSubmit",
  });

  const countId = "poem-body-count";
  const errorId = "poem-body-error";

  return (
    <form
      className="mt-10 sm:mt-12"
      onSubmit={handleSubmit((values) => onSubmitted(values.body))}
      noValidate
    >
      <Controller
        name="body"
        control={control}
        render={({ field }) => {
          const count = countCodePoints(field.value);
          const canSubmit = field.value.trim().length > 0 && count <= characterLimit;

          return (
            <>
              <label htmlFor="poem-body" className="sr-only">
                Your poem
              </label>
              <textarea
                {...field}
                id="poem-body"
                rows={6}
                placeholder="Write your poem here..."
                aria-invalid={errors.body ? true : undefined}
                aria-describedby={errors.body ? `${countId} ${errorId}` : countId}
                onChange={(event) => {
                  field.onChange(clampToCodePoints(event.target.value, characterLimit));
                }}
                className="min-h-40 w-full resize-none rounded-[1.15rem] border border-border bg-surface px-4 py-4 text-[0.98rem] leading-relaxed text-ink outline-none placeholder:text-muted/80 focus-visible:border-ink"
              />
              <p id={countId} className="mt-2 text-right text-sm italic text-muted">
                {count} of {characterLimit} characters
              </p>
              {errors.body?.message ? (
                <p id={errorId} role="alert" className="mt-2 text-sm text-ink">
                  {errors.body.message}
                </p>
              ) : null}
              <div className="mt-6 flex justify-center">
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="rounded-full bg-ink px-8 py-2.5 text-sm font-medium text-white transition-colors hover:bg-ink/85 disabled:cursor-not-allowed disabled:opacity-35"
                >
                  Submit
                </button>
              </div>
            </>
          );
        }}
      />
    </form>
  );
}
