import type { Metadata } from "next";
import Link from "next/link";
import { PageSimple } from "@/components/PageSimple";
import { EDITEUR } from "@/lib/site";
import { stripe } from "@/lib/stripe";

export const metadata: Metadata = { title: "Merci", robots: { index: false } };

// On redemande à Stripe l'état réel du paiement : l'URL seule ne prouve rien.
async function lireSession(id: string | undefined) {
  if (!id || !/^cs_(test|live)_[A-Za-z0-9]+$/.test(id)) return null;
  try {
    return await stripe().checkout.sessions.retrieve(id);
  } catch {
    return null;
  }
}

export default async function Merci({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  const session = await lireSession(session_id);
  const paye = session?.status === "complete" && session.payment_status === "paid";
  const email = session?.customer_details?.email;

  if (!paye) {
    return (
      <PageSimple>
        <h1 className="mt-6 font-display text-4xl leading-tight font-extrabold tracking-tight">
          Paiement non confirmé
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Nous ne trouvons pas de paiement validé pour cette page. Si vous venez de payer, patientez
          une minute puis rechargez. Sinon, aucun montant n&apos;a été débité.
        </p>
        <Link
          href="/questionnaire"
          className="mt-8 flex min-h-14 items-center justify-center rounded-2xl bg-ink px-6 text-lg font-bold text-lime md:inline-flex"
        >
          Revenir au questionnaire
        </Link>
      </PageSimple>
    );
  }

  return (
    <PageSimple>
      <p className="mt-6 inline-block rounded-full bg-lime px-3 py-1 font-mono text-sm">
        Paiement confirmé
      </p>
      <h1 className="mt-4 font-display text-4xl leading-tight font-extrabold tracking-tight">
        C&apos;est parti. Votre bilan arrive sous 24 h ouvrées.
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">
        Nous l&apos;envoyons à <strong className="text-ink">{email}</strong>. Vous recevez aussi le
        reçu de paiement de Stripe à cette adresse.
      </p>

      <h2 className="mt-10 font-display text-2xl font-bold">Ce qui se passe maintenant</h2>
      <ol className="mt-4 space-y-4">
        {[
          ["Nous analysons votre profil", "Activité, effectif, région et projets, face aux dispositifs en vigueur."],
          ["Vous recevez votre bilan", "Chaque aide avec son montant estimé, les pièces à réunir et la date limite."],
          ["Vous êtes alerté ensuite", "Dès qu'une nouvelle aide correspond à votre profil, vous recevez un email."],
        ].map(([titre, texte], i) => (
          <li key={titre} className="flex gap-4">
            <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-line bg-card font-mono text-sm">
              0{i + 1}
            </span>
            <div>
              <p className="font-bold">{titre}</p>
              <p className="text-muted">{texte}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-10 text-sm text-muted">
        Pas d&apos;email d&apos;ici demain ? Regardez vos indésirables, puis écrivez-nous à{" "}
        {EDITEUR.email}.
      </p>
    </PageSimple>
  );
}
