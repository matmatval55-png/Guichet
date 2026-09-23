"use client";

import Link from "next/link";
import { useEffect } from "react";
import { PageSimple } from "@/components/PageSimple";

export default function Erreur({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <PageSimple>
      <h1 className="mt-6 font-display text-4xl leading-tight font-extrabold tracking-tight">
        Un problème est survenu.
      </h1>
      <p className="mt-4 text-lg text-muted">
        Ce n&apos;est pas de votre faute. Réessayez : si le problème continue, revenez à l&apos;accueil.
      </p>
      <div className="mt-8 flex flex-col gap-3 md:flex-row">
        <button
          type="button"
          onClick={reset}
          className="min-h-14 rounded-2xl bg-ink px-6 text-lg font-bold text-lime"
        >
          Réessayer
        </button>
        <Link
          href="/"
          className="flex min-h-14 items-center justify-center rounded-2xl border border-ink px-6 text-lg font-bold"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </PageSimple>
  );
}
