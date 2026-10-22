import type { ReactNode } from "react";

const widths = {
  home: "max-w-[40rem]",
  feed: "max-w-[32rem]",
  page: "max-w-[40rem]",
} as const;

export function PageContainer({
  width = "page",
  className = "",
  children,
}: {
  width?: keyof typeof widths;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`mx-auto w-full px-5 ${widths[width]} ${className}`}>{children}</div>
  );
}
