import Link from "next/link";

const links = [
  { href: "/archive", label: "Archive" },
  { href: "/about", label: "About" },
] as const;

export function SiteHeader() {
  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-6 sm:px-8 sm:py-8">
      <Link
        href="/"
        className="font-serif text-[1.85rem] italic leading-none tracking-tight text-ink"
      >
        Poemdle
      </Link>
      <nav aria-label="Primary" className="flex items-center gap-6 text-[0.95rem] sm:gap-8">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-ink transition-opacity hover:opacity-60"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
