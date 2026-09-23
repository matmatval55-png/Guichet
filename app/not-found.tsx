import Link from "next/link";
import { PageSimple } from "@/components/PageSimple";

export default function NotFound() {
  return (
    <PageSimple>
      <p className="mt-6 font-mono text-6xl text-muted">404</p>
      <h1 className="mt-2 font-display text-4xl leading-tight font-extrabold tracking-tight">
        Ce guichet est fermé.
      </h1>
      <p className="mt-4 text-lg text-muted">La page que vous cherchez n&apos;existe pas ou a été déplacée.</p>
      <Link
        href="/"
        className="mt-8 flex min-h-14 items-center justify-center rounded-2xl bg-ink px-6 text-lg font-bold text-lime md:inline-flex"
      >
        Retour à l&apos;accueil
      </Link>
    </PageSimple>
  );
}
