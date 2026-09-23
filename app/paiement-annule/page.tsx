import type { Metadata } from "next";
import Link from "next/link";
import { PageSimple } from "@/components/PageSimple";

export const metadata: Metadata = { title: "Paiement non abouti", robots: { index: false } };

export default function PaiementAnnule() {
  return (
    <PageSimple>
      <h1 className="mt-6 font-display text-4xl leading-tight font-extrabold tracking-tight">
        Le paiement n&apos;a pas abouti
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">
        Aucun montant n&apos;a été débité. Vos réponses sont gardées : vous pouvez réessayer en un
        clic, avec la même carte ou une autre.
      </p>
      <Link
        href="/questionnaire"
        className="mt-8 flex min-h-14 items-center justify-center rounded-2xl bg-ink px-6 text-lg font-bold text-lime md:inline-flex"
      >
        Réessayer le paiement
      </Link>
      <p className="mt-6 text-sm text-muted">
        Si votre banque refuse la carte, vérifiez le plafond de paiement en ligne ou essayez une
        autre carte.
      </p>
    </PageSimple>
  );
}
