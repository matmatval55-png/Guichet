import type { Metadata } from "next";
import { Champ } from "@/components/Champ";
import { PageSimple } from "@/components/PageSimple";
import { EDITEUR } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site Guichet.",
};

export default function MentionsLegales() {
  return (
    <PageSimple>
      <article className="prose-legal">
        <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight">Mentions légales</h1>

        <h2>Éditeur du site</h2>
        <p>
          <Champ valeur={EDITEUR.nom} />, <Champ valeur={EDITEUR.statut} />
          <br />
          SIRET : <Champ valeur={EDITEUR.siret} />
          <br />
          Adresse : <Champ valeur={EDITEUR.adresse} />
          <br />
          Email : <Champ valeur={EDITEUR.email} />
          <br />
          {EDITEUR.tva}
        </p>
        <p>Directeur de la publication : <Champ valeur={EDITEUR.nom} /></p>

        <h2>Hébergement</h2>
        <p>
          Netlify, Inc., 512 2nd Street, Suite 200, San Francisco, CA 94107, États-Unis —{" "}
          <a href="https://www.netlify.com" rel="noopener">www.netlify.com</a>
        </p>

        <h2>Nature du service</h2>
        <p>
          Guichet est un service privé et indépendant. Il n&apos;est ni édité, ni agréé, ni financé
          par une administration ou un organisme public. Les informations sur les aides proviennent
          de sources publiques. Les montants sont des estimations indicatives : seul l&apos;organisme
          qui attribue l&apos;aide décide de l&apos;éligibilité et du montant versé.
        </p>

        <h2>Propriété intellectuelle</h2>
        <p>
          Les textes, la mise en page et la marque Guichet sont protégés. Toute reproduction sans
          autorisation est interdite.
        </p>
      </article>
    </PageSimple>
  );
}
