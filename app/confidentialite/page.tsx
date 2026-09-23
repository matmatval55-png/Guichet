import type { Metadata } from "next";
import { Champ } from "@/components/Champ";
import { PageSimple } from "@/components/PageSimple";
import { EDITEUR } from "@/lib/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Comment Guichet traite vos données personnelles.",
};

export default function Confidentialite() {
  return (
    <PageSimple>
      <article className="prose-legal">
        <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight">
          Politique de confidentialité
        </h1>
        <p className="text-sm">Version du 23 septembre 2026</p>

        <h2>Responsable du traitement</h2>
        <p>
          <Champ valeur={EDITEUR.nom} />, <Champ valeur={EDITEUR.adresse} />. Contact :{" "}
          <Champ valeur={EDITEUR.email} />.
        </p>

        <h2>Données collectées et usage</h2>
        <ul>
          <li>
            <strong>Réponses au questionnaire</strong> (activité, effectif, région, projets) : pour
            établir votre bilan et vous envoyer des alertes. Base légale : exécution du contrat.
          </li>
          <li>
            <strong>Nom, email, données de paiement</strong> : collectés par Stripe au moment du
            paiement, pour gérer l&apos;abonnement et la facturation. Guichet ne voit jamais votre
            numéro de carte. Base légale : exécution du contrat et obligations comptables.
          </li>
          <li>
            <strong>Mesure d&apos;audience</strong> : nombre de visites et de clics, sans cookie et
            sans donnée permettant de vous identifier. Base légale : intérêt légitime.
          </li>
        </ul>

        <h2>Destinataires</h2>
        <p>Vos données ne sont jamais vendues. Elles sont traitées par nos prestataires :</p>
        <ul>
          <li>Stripe (paiement) — Irlande et États-Unis ;</li>
          <li>Netlify (hébergement du site) — États-Unis ;</li>
          <li>Resend (envoi des emails) — États-Unis ;</li>
          <li>Umami (mesure d&apos;audience sans cookie) — Union européenne.</li>
        </ul>
        <p>
          Les transferts hors de l&apos;Union européenne sont encadrés par les clauses
          contractuelles types de la Commission européenne ou le Data Privacy Framework.
        </p>

        <h2>Durée de conservation</h2>
        <p>
          Pendant toute la durée de l&apos;abonnement, puis 3 ans pour les échanges commerciaux. Les
          pièces comptables sont conservées 10 ans, comme la loi l&apos;impose.
        </p>

        <h2>Vos droits</h2>
        <p>
          Vous pouvez accéder à vos données, les rectifier, les effacer, vous opposer à leur
          traitement ou demander leur portabilité en écrivant à <Champ valeur={EDITEUR.email} />.
          Vous pouvez aussi saisir la CNIL (
          <a href="https://www.cnil.fr" rel="noopener">www.cnil.fr</a>).
        </p>

        <h2>Cookies</h2>
        <p>Guichet n&apos;utilise aucun cookie publicitaire ni de suivi. Aucun bandeau n&apos;est donc nécessaire.</p>
      </article>
    </PageSimple>
  );
}
