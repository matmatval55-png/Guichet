// Affiche une information légale ; surligne en jaune celles qui restent à compléter.
export function Champ({ valeur }: { valeur: string }) {
  return valeur.startsWith("[À COMPLÉTER") ? <span className="a-completer">{valeur}</span> : <>{valeur}</>;
}
