"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ACTIVITES,
  EFFECTIFS,
  PROJETS,
  REGIONS,
  libelle,
  type Option,
} from "@/lib/questionnaire";

type Etat = { activite: string; effectif: string; region: string; projets: string[] };
const VIDE: Etat = { activite: "", effectif: "", region: "", projets: [] };
const CLE = "guichet-questionnaire";

const QUESTIONS: { cle: "activite" | "effectif" | "region"; titre: string; options: Option[] }[] = [
  { cle: "activite", titre: "Quelle est votre activité ?", options: ACTIVITES },
  { cle: "effectif", titre: "Combien de personnes travaillent avec vous ?", options: EFFECTIFS },
  { cle: "region", titre: "Où est installée votre entreprise ?", options: REGIONS },
];
const TOTAL = 5; // 4 questions + récapitulatif

function Choix({
  label,
  actif,
  onClick,
  multiple = false,
}: {
  label: string;
  actif: boolean;
  onClick: () => void;
  multiple?: boolean;
}) {
  return (
    <button
      type="button"
      role={multiple ? "checkbox" : "radio"}
      aria-checked={actif}
      onClick={onClick}
      className={`flex min-h-14 w-full items-center justify-between gap-3 rounded-2xl border px-4 text-left text-base font-medium transition active:scale-[0.99] ${
        actif ? "border-ink bg-lime" : "border-line bg-card hover:border-ink"
      }`}
    >
      {label}
      <span
        aria-hidden
        className={`grid size-6 shrink-0 place-items-center border text-sm ${
          multiple ? "rounded-md" : "rounded-full"
        } ${actif ? "border-ink bg-ink text-lime" : "border-line"}`}
      >
        {actif ? "✓" : ""}
      </span>
    </button>
  );
}

export function Questionnaire({ erreur }: { erreur: boolean }) {
  const [etape, setEtape] = useState(0);
  const [rep, setRep] = useState<Etat>(VIDE);
  const [envoi, setEnvoi] = useState(false);

  // Reprend les réponses si le visiteur revient (ex. paiement annulé).
  useEffect(() => {
    try {
      const brut = sessionStorage.getItem(CLE);
      if (brut) {
        const sauve = JSON.parse(brut) as Etat;
        setRep({ ...VIDE, ...sauve });
        if (sauve.activite && sauve.effectif && sauve.region) setEtape(TOTAL - 1);
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(CLE, JSON.stringify(rep));
    } catch {}
  }, [rep]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [etape]);

  // Retour arrière depuis Stripe : le bouton de paiement redevient cliquable.
  useEffect(() => {
    const reactiver = () => setEnvoi(false);
    window.addEventListener("pageshow", reactiver);
    return () => window.removeEventListener("pageshow", reactiver);
  }, []);

  const choisir = (cle: "activite" | "effectif" | "region", valeur: string) => {
    setRep((r) => ({ ...r, [cle]: valeur }));
    setEtape((e) => e + 1);
  };

  const basculerProjet = (valeur: string) =>
    setRep((r) => ({
      ...r,
      projets: r.projets.includes(valeur)
        ? r.projets.filter((p) => p !== valeur)
        : [...r.projets, valeur],
    }));

  const question = QUESTIONS[etape];

  return (
    <div>
      {/* Progression */}
      <div className="mb-6 flex items-center gap-3">
        {etape > 0 ? (
          <button
            type="button"
            onClick={() => setEtape((e) => e - 1)}
            className="-ml-2 min-h-11 rounded-lg px-2 font-medium text-muted hover:text-ink"
          >
            ← Retour
          </button>
        ) : (
          <Link href="/" className="-ml-2 min-h-11 rounded-lg px-2 py-2.5 font-medium text-muted hover:text-ink">
            ← Accueil
          </Link>
        )}
        <div
          className="h-1.5 flex-1 overflow-hidden rounded-full bg-line"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={TOTAL}
          aria-valuenow={etape + 1}
          aria-label={`Étape ${etape + 1} sur ${TOTAL}`}
        >
          <div
            className="h-full rounded-full bg-ink transition-all"
            style={{ width: `${((etape + 1) / TOTAL) * 100}%` }}
          />
        </div>
        <span className="font-mono text-sm text-muted">
          {etape + 1}/{TOTAL}
        </span>
      </div>

      {erreur && etape === TOTAL - 1 && (
        <p role="alert" className="mb-5 rounded-2xl border border-ink bg-card p-4 font-medium">
          Le paiement n&apos;a pas pu démarrer. Aucun montant n&apos;a été débité. Réessayez dans un
          instant.
        </p>
      )}

      {question && (
        <fieldset>
          <legend className="mb-5 font-display text-3xl leading-tight font-extrabold tracking-tight">
            {question.titre}
          </legend>
          <div className="grid gap-2.5" role="radiogroup">
            {question.options.map((o) => (
              <Choix
                key={o.value}
                label={o.label}
                actif={rep[question.cle] === o.value}
                onClick={() => choisir(question.cle, o.value)}
              />
            ))}
          </div>
        </fieldset>
      )}

      {etape === 3 && (
        <fieldset>
          <legend className="font-display text-3xl leading-tight font-extrabold tracking-tight">
            Quels sont vos projets pour les 12 prochains mois ?
          </legend>
          <p className="mt-2 mb-5 text-muted">Plusieurs réponses possibles.</p>
          <div className="grid gap-2.5">
            {PROJETS.map((o) => (
              <Choix
                key={o.value}
                label={o.label}
                multiple
                actif={rep.projets.includes(o.value)}
                onClick={() => basculerProjet(o.value)}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => setEtape(4)}
            className="sticky bottom-3 mt-6 min-h-14 w-full rounded-2xl bg-ink px-6 text-lg font-bold text-lime"
          >
            {rep.projets.length === 0 ? "Pas de projet précis, continuer" : "Continuer →"}
          </button>
        </fieldset>
      )}

      {etape === 4 && (
        <form
          method="POST"
          action="/api/checkout"
          onSubmit={() => setEnvoi(true)}
        >
          <h1 className="font-display text-3xl leading-tight font-extrabold tracking-tight">
            Votre bilan est prêt à être lancé
          </h1>
          <dl className="mt-5 divide-y divide-line rounded-2xl border border-line bg-card">
            {[
              ["Activité", libelle(ACTIVITES, rep.activite), 0],
              ["Effectif", libelle(EFFECTIFS, rep.effectif), 1],
              ["Région", libelle(REGIONS, rep.region), 2],
              [
                "Projets",
                rep.projets.length
                  ? rep.projets.map((p) => libelle(PROJETS, p)).join(", ")
                  : "Aucun projet précis",
                3,
              ],
            ].map(([terme, valeur, cible]) => (
              <div key={terme as string} className="flex items-start justify-between gap-3 p-4">
                <div>
                  <dt className="text-sm text-muted">{terme}</dt>
                  <dd className="mt-0.5 font-medium">{valeur}</dd>
                </div>
                <button
                  type="button"
                  onClick={() => setEtape(cible as number)}
                  className="min-h-11 shrink-0 px-1 text-sm font-medium text-cobalt underline underline-offset-2"
                >
                  Modifier
                </button>
              </div>
            ))}
          </dl>

          <ul className="mt-6 space-y-2 text-[0.95rem]">
            <li>✓ Vos aides, le montant estimé, les pièces et les dates limites</li>
            <li>✓ Envoyé par email sous 24 h ouvrées</li>
            <li>✓ Alertes quand une nouvelle aide vous concerne</li>
            <li>✓ Remboursé si aucune aide ne correspond</li>
          </ul>

          <input type="hidden" name="activite" value={rep.activite} />
          <input type="hidden" name="effectif" value={rep.effectif} />
          <input type="hidden" name="region" value={rep.region} />
          {rep.projets.map((p) => (
            <input key={p} type="hidden" name="projets" value={p} />
          ))}

          <button
            type="submit"
            disabled={envoi}
            data-umami-event="paiement-clic"
            className="mt-6 flex min-h-14 w-full items-center justify-center rounded-2xl bg-ink px-6 text-lg font-bold text-lime disabled:opacity-70"
          >
            {envoi ? "Redirection vers le paiement…" : "Recevoir mon bilan · 39 €/mois"}
          </button>
          <p className="mt-3 text-center text-sm text-muted">
            Paiement sécurisé par Stripe. Sans engagement. En continuant, vous acceptez les{" "}
            <Link href="/cgv" className="underline underline-offset-2">
              CGV
            </Link>
            .
          </p>
        </form>
      )}
    </div>
  );
}
