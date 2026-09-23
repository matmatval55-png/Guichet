// Options du questionnaire, partagées entre le formulaire (client) et la validation (serveur).

export type Option = { value: string; label: string };

export const ACTIVITES: Option[] = [
  { value: "commerce", label: "Commerce" },
  { value: "artisanat-btp", label: "Artisanat, BTP" },
  { value: "services-entreprises", label: "Services aux entreprises" },
  { value: "numerique", label: "Numérique, informatique" },
  { value: "hotellerie-restauration", label: "Hôtellerie, restauration" },
  { value: "sante-personne", label: "Santé, services à la personne" },
  { value: "industrie", label: "Industrie, production" },
  { value: "agriculture", label: "Agriculture, pêche" },
  { value: "autre", label: "Autre activité" },
];

export const EFFECTIFS: Option[] = [
  { value: "0", label: "Juste moi" },
  { value: "1-9", label: "1 à 9 salariés" },
  { value: "10-49", label: "10 à 49 salariés" },
  { value: "50-249", label: "50 à 249 salariés" },
];

export const REGIONS: Option[] = [
  { value: "ara", label: "Auvergne-Rhône-Alpes" },
  { value: "bfc", label: "Bourgogne-Franche-Comté" },
  { value: "bretagne", label: "Bretagne" },
  { value: "cvl", label: "Centre-Val de Loire" },
  { value: "corse", label: "Corse" },
  { value: "grand-est", label: "Grand Est" },
  { value: "hdf", label: "Hauts-de-France" },
  { value: "idf", label: "Île-de-France" },
  { value: "normandie", label: "Normandie" },
  { value: "nouvelle-aquitaine", label: "Nouvelle-Aquitaine" },
  { value: "occitanie", label: "Occitanie" },
  { value: "pdl", label: "Pays de la Loire" },
  { value: "paca", label: "Provence-Alpes-Côte d'Azur" },
  { value: "outre-mer", label: "Outre-mer" },
];

export const PROJETS: Option[] = [
  { value: "embaucher", label: "Embaucher un salarié" },
  { value: "apprenti", label: "Prendre un apprenti ou un alternant" },
  { value: "investir", label: "Acheter du matériel, des machines" },
  { value: "innover", label: "Innover, faire de la R&D" },
  { value: "energie", label: "Rénover, réduire ma facture d'énergie" },
  { value: "numerique", label: "Me numériser (site, logiciel…)" },
  { value: "export", label: "Vendre à l'étranger" },
  { value: "former", label: "Me former, former mon équipe" },
  { value: "creer-reprendre", label: "Créer ou reprendre une entreprise" },
];

export type Reponses = {
  activite: string;
  effectif: string;
  region: string;
  projets: string[];
};

const inclut = (options: Option[], value: unknown) =>
  typeof value === "string" && options.some((o) => o.value === value);

// Validation serveur : n'accepte que des valeurs connues, rien d'autre.
export function validerReponses(input: {
  activite: unknown;
  effectif: unknown;
  region: unknown;
  projets: unknown[];
}): Reponses | null {
  const projets = [...new Set(input.projets)];
  if (
    !inclut(ACTIVITES, input.activite) ||
    !inclut(EFFECTIFS, input.effectif) ||
    !inclut(REGIONS, input.region) ||
    projets.length > PROJETS.length ||
    !projets.every((p) => inclut(PROJETS, p))
  ) {
    return null;
  }
  return {
    activite: input.activite as string,
    effectif: input.effectif as string,
    region: input.region as string,
    projets: projets as string[],
  };
}

export function libelle(options: Option[], value: string | undefined) {
  return options.find((o) => o.value === value)?.label ?? value ?? "—";
}
