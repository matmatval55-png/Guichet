import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Logo } from "@/components/Logo";
import { PROMESSE } from "@/lib/site";

const CTA = "Trouver mes aides";

function BoutonCTA({ className = "", id }: { className?: string; id: string }) {
  return (
    <Link
      href="/questionnaire"
      data-umami-event="cta-clic"
      data-umami-event-position={id}
      className={`flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-ink px-6 text-lg font-bold text-lime transition active:scale-[0.98] hover:bg-black ${className}`}
    >
      {CTA}
      <span aria-hidden>→</span>
    </Link>
  );
}

const BENEFICES = [
  {
    titre: "Seulement ce qui vous concerne",
    texte:
      "On trie selon votre activité, votre effectif, votre région et vos projets. Pas de liste de 200 aides à éplucher.",
  },
  {
    titre: "Le montant, les pièces, la date",
    texte:
      "Pour chaque aide : combien vous pouvez toucher, les documents à réunir et la date limite de dépôt.",
  },
  {
    titre: "Prévenu dès qu'une aide ouvre",
    texte:
      "Un nouveau dispositif correspond à votre profil ? Vous recevez un email, avant que la fenêtre se referme.",
  },
];

const ETAPES = [
  { n: "01", titre: "4 questions", texte: "Activité, effectif, région, projets. 2 minutes, au pouce." },
  { n: "02", titre: "Paiement sécurisé", texte: "39 € par mois, sans engagement. Paiement par Stripe." },
  { n: "03", titre: "Votre bilan", texte: "La liste de vos aides par email, sous 24 h ouvrées." },
];

const FAQ = [
  {
    q: "Guichet, c'est un site de l'État ?",
    r: "Non. Guichet est un service indépendant. On lit les dispositifs publics à votre place et on vous dit lesquels vous concernent. Le dépôt se fait ensuite auprès de l'organisme officiel.",
  },
  {
    q: "Et si aucune aide ne me correspond ?",
    r: "On vous rembourse. Si votre bilan ne contient aucune aide à laquelle vous êtes éligible, écrivez-nous dans les 14 jours : remboursement intégral.",
  },
  {
    q: "Comment résilier ?",
    r: "Un simple email suffit, sans justification. L'abonnement s'arrête à la fin du mois en cours.",
  },
];

export default function Accueil() {
  return (
    <>
      <header className="px-4 py-5">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Logo />
          <Link
            href="/questionnaire"
            className="hidden rounded-xl border border-ink px-4 py-2 text-sm font-bold md:inline-block hover:bg-ink hover:text-lime"
          >
            {CTA}
          </Link>
        </div>
      </header>

      <main>
        {/* Promesse : identique mot pour mot à celle des vidéos */}
        <section className="px-4 pt-6 pb-12 md:pt-16 md:pb-20">
          <div className="mx-auto max-w-5xl">
            <p className="mb-4 inline-block rounded-full border border-line bg-card px-3 py-1 text-sm font-medium text-muted">
              Pour les TPE, PME et indépendants
            </p>
            <h1 className="max-w-3xl font-display text-[2.6rem] leading-[1.02] font-extrabold tracking-tight md:text-7xl">
              {PROMESSE}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted md:text-xl">
              Répondez à 4 questions. Recevez les aides qui vous concernent, avec le montant estimé,
              les pièces à réunir et la date limite pour chacune.
            </p>
            <div className="mt-8 max-w-sm">
              <BoutonCTA id="hero" />
              <p className="mt-3 text-center text-sm text-muted">
                39 €/mois · sans engagement · remboursé si aucune aide
              </p>
            </div>
          </div>
        </section>

        {/* Douleur chiffrée */}
        <section className="bg-ink px-4 py-14 text-paper md:py-20">
          <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2 md:items-end">
            <div>
              <p className="font-mono text-6xl font-medium tracking-tight text-lime md:text-8xl">
                2&#8239;267
              </p>
              <p className="mt-3 text-xl leading-snug font-bold md:text-2xl">
                dispositifs d&apos;aide aux entreprises recensés en France.
              </p>
              <p className="mt-2 text-sm text-paper/60">
                Source :{" "}
                <a
                  href="https://www.senat.fr/rap/r24-808-1/r24-808-120.html"
                  className="underline underline-offset-2"
                  rel="noopener"
                  target="_blank"
                >
                  Sénat, rapport n° 808, 2025
                </a>
              </p>
            </div>
            <div className="space-y-4 text-lg leading-relaxed text-paper/85">
              <p>
                Éparpillés sur des dizaines de sites, écrits dans une langue illisible, modifiés
                chaque année. Personne n&apos;a le temps de tout lire.
              </p>
              <p>
                Résultat : des milliers d&apos;euros restent sur la table. Exemple en 2026 :
                jusqu&apos;à{" "}
                <span className="surligne font-mono font-medium text-ink">5&#8239;000&nbsp;€</span>{" "}
                pour l&apos;embauche d&apos;un apprenti dans une entreprise de moins de 250 salariés.
              </p>
            </div>
          </div>
        </section>

        {/* 3 bénéfices */}
        <section className="px-4 py-14 md:py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="font-display text-3xl font-extrabold tracking-tight md:text-5xl">
              Ce que Guichet fait pour vous
            </h2>
            <ol className="mt-8 grid gap-4 md:grid-cols-3">
              {BENEFICES.map((b, i) => (
                <li key={b.titre} className="rounded-2xl border border-line bg-card p-6">
                  <span className="font-mono text-sm text-cobalt">0{i + 1}</span>
                  <h3 className="mt-2 font-display text-xl font-bold">{b.titre}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{b.texte}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Comment ça marche */}
        <section className="border-y border-line bg-card px-4 py-14 md:py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="font-display text-3xl font-extrabold tracking-tight md:text-5xl">
              Comment ça marche
            </h2>
            <ol className="mt-8 grid gap-6 md:grid-cols-3">
              {ETAPES.map((e) => (
                <li key={e.n} className="flex gap-4 md:block">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-lime font-mono font-medium">
                    {e.n}
                  </span>
                  <div className="md:mt-4">
                    <h3 className="text-lg font-bold">{e.titre}</h3>
                    <p className="mt-1 text-muted">{e.texte}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-10 max-w-sm">
              <BoutonCTA id="etapes" />
            </div>
          </div>
        </section>

        {/* Questions fréquentes */}
        <section className="px-4 py-14 md:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">
              Questions fréquentes
            </h2>
            <div className="mt-6 divide-y divide-line border-y border-line">
              {FAQ.map((f) => (
                <details key={f.q} className="group py-4">
                  <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold">
                    {f.q}
                    <span aria-hidden className="font-mono text-cobalt transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-2 leading-relaxed text-muted">{f.r}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Bouton toujours à portée de pouce sur mobile */}
      <div className="fixed inset-x-0 bottom-0 z-10 border-t border-line bg-paper px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden">
        <BoutonCTA id="barre-mobile" />
      </div>
    </>
  );
}
