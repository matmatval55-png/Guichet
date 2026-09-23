export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
).replace(/\/$/, "");

export const PROMESSE = "Les aides publiques auxquelles votre entreprise a droit.";
export const DESCRIPTION =
  "4 questions, 2 minutes. Guichet vous dit quelles aides vous concernent, combien elles rapportent, quelles pièces réunir et avant quelle date déposer.";

// Informations légales : remplacez chaque [À COMPLÉTER] par vos informations.
export const EDITEUR = {
  nom: "[À COMPLÉTER : prénom et nom]",
  statut: "[À COMPLÉTER : entrepreneur individuel (micro-entreprise)]",
  siret: "[À COMPLÉTER : SIRET]",
  adresse: "[À COMPLÉTER : adresse postale]",
  email: "[À COMPLÉTER : adresse email de contact]",
  tva: "TVA non applicable, art. 293 B du CGI",
};
