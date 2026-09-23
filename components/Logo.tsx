import Link from "next/link";

export function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2 font-display text-xl font-extrabold tracking-tight ${
        inverse ? "text-paper" : "text-ink"
      }`}
      aria-label="Guichet, retour à l'accueil"
    >
      <span
        aria-hidden
        className="grid size-7 place-items-center rounded-lg bg-lime font-mono text-sm text-ink"
      >
        G
      </span>
      guichet
    </Link>
  );
}
