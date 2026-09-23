import type { Metadata } from "next";
import { Champ } from "@/components/Champ";
import { PageSimple } from "@/components/PageSimple";
import { EDITEUR } from "@/lib/site";

export const metadata: Metadata = {
  title: "Conditions générales de vente",
  description: "Conditions générales de vente de l'abonnement Guichet.",
};

export default function CGV() {
  return (
    <PageSimple>
      <article className="prose-legal">
        <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight">
          Conditions générales de vente
        </h1>
        <p className="text-sm">Version du 23 septembre 2026</p>

        <h2>1. Objet</h2>
        <p>
          Les présentes conditions régissent l&apos;abonnement au service Guichet, vendu par{" "}
          <Champ valeur={EDITEUR.nom} /> (<Champ valeur={EDITEUR.statut} />, SIRET{" "}
          <Champ valeur={EDITEUR.siret} />), ci-après « Guichet ». Le service s&apos;adresse aux
          entreprises, aux indépendants et aux professionnels.
        </p>

        <h2>2. Le service</h2>
        <p>L&apos;abonnement comprend :</p>
        <ul>
          <li>
            un bilan des aides publiques, exonérations et crédits d&apos;impôt correspondant aux
            informations fournies par le client (activité, effectif, région, projets), avec pour
            chacun un montant estimé, les pièces à réunir et le calendrier de dépôt ;
          </li>
          <li>des alertes par email lorsqu&apos;un nouveau dispositif correspondant au profil du client ouvre.</li>
        </ul>
        <p>
          Le bilan est envoyé par email dans un délai de 24 heures ouvrées après le paiement.
          Guichet ne dépose pas les dossiers à la place du client.
        </p>

        <h2>3. Nature des informations</h2>
        <p>
          Guichet est un service indépendant, non affilié à l&apos;administration. Les montants
          communiqués sont des estimations fondées sur les textes en vigueur et sur les réponses du
          client. L&apos;attribution d&apos;une aide et son montant relèvent de la seule décision de
          l&apos;organisme qui la verse. Guichet est tenu à une obligation de moyens et ne garantit
          pas l&apos;obtention d&apos;une aide.
        </p>

        <h2>4. Prix et paiement</h2>
        <p>
          L&apos;abonnement coûte 39 € par mois. {EDITEUR.tva}. Le paiement est prélevé par carte
          bancaire via Stripe, le jour de la souscription puis chaque mois à la même date. Guichet
          n&apos;a jamais accès aux données de carte bancaire.
        </p>

        <h2>5. Durée et résiliation</h2>
        <p>
          L&apos;abonnement est sans engagement. Le client peut le résilier à tout moment par
          email à <Champ valeur={EDITEUR.email} />. La résiliation prend effet à la fin de la
          période mensuelle en cours ; aucun nouveau prélèvement n&apos;est effectué ensuite.
        </p>

        <h2>6. Garantie « aucune aide, remboursé »</h2>
        <p>
          Si le bilan ne contient aucune aide à laquelle le client est éligible au vu des
          informations fournies, le client peut demander le remboursement intégral du premier mois,
          par email, dans les 14 jours suivant le paiement.
        </p>

        <h2>7. Droit de rétractation</h2>
        <p>
          Le client professionnel qui emploie cinq salariés au plus et pour qui le service
          n&apos;entre pas dans le champ de son activité principale dispose d&apos;un délai de 14
          jours pour se rétracter (article L221-3 du Code de la consommation). En demandant
          l&apos;envoi du bilan avant la fin de ce délai, il accepte que le service commence
          immédiatement ; s&apos;il se rétracte ensuite, il reste redevable du service déjà fourni.
        </p>

        <h2>8. Responsabilité</h2>
        <p>
          La responsabilité de Guichet, si elle est engagée, est limitée au montant payé par le
          client au cours des 12 derniers mois. Guichet n&apos;est pas responsable d&apos;un refus
          d&apos;aide, d&apos;un dossier déposé hors délai ou d&apos;informations inexactes fournies
          par le client.
        </p>

        <h2>9. Données personnelles</h2>
        <p>
          Voir la <a href="/confidentialite">politique de confidentialité</a>.
        </p>

        <h2>10. Droit applicable</h2>
        <p>
          Les présentes conditions sont soumises au droit français. En cas de litige, les parties
          cherchent d&apos;abord une solution amiable ; à défaut, les tribunaux du ressort du siège
          de Guichet sont compétents.
        </p>
      </article>
    </PageSimple>
  );
}
