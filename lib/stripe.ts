import "server-only";
import Stripe from "stripe";

let client: Stripe | null = null;

// Créé à la première utilisation : le build passe même sans clé configurée.
export function stripe() {
  if (!client) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error("STRIPE_SECRET_KEY manquante");
    client = new Stripe(key);
  }
  return client;
}

export const PRIX_MENSUEL_CENTIMES = 3900;
