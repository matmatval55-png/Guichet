import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-line px-4 pt-8 pb-28 text-sm text-muted md:pb-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p>
          Guichet est un service indépendant, non affilié à l&apos;administration.
          <br className="hidden md:inline" /> Les montants affichés sont des estimations.
        </p>
        <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Informations légales">
          <Link href="/mentions-legales" className="py-1 underline-offset-4 hover:underline">
            Mentions légales
          </Link>
          <Link href="/cgv" className="py-1 underline-offset-4 hover:underline">
            CGV
          </Link>
          <Link href="/confidentialite" className="py-1 underline-offset-4 hover:underline">
            Confidentialité
          </Link>
        </nav>
      </div>
    </footer>
  );
}
