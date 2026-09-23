import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { echapper, envoyerEmail } from "@/lib/email";
import { ACTIVITES, EFFECTIFS, PROJETS, REGIONS, libelle } from "@/lib/questionnaire";
import { stripe } from "@/lib/stripe";

// Seule source de vérité sur les paiements : Stripe appelle cette adresse,
// et on vérifie la signature avant de faire quoi que ce soit.
export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!signature || !secret) {
    return NextResponse.json({ error: "Signature absente" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe().webhooks.constructEvent(await request.text(), signature, secret);
  } catch {
    return NextResponse.json({ error: "Signature invalide" }, { status: 400 });
  }

  const notify = process.env.NOTIFY_EMAIL;
  if (!notify) {
    console.error("NOTIFY_EMAIL manquante : impossible de prévenir d'une commande");
    return NextResponse.json({ error: "Configuration incomplète" }, { status: 500 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      if (session.payment_status === "paid") {
        await notifierCommande(session, notify);
      }
    }

    if (event.type === "customer.subscription.deleted") {
      const sub = event.data.object as Stripe.Subscription;
      const client = await stripe().customers.retrieve(sub.customer as string);
      const email = "deleted" in client ? "client supprimé" : client.email ?? "inconnu";
      await envoyerEmail({
        to: notify,
        subject: `Résiliation : ${email}`,
        html: `<p>L'abonnement de <strong>${echapper(email)}</strong> est terminé. Arrêtez ses alertes.</p>`,
      });
    }
  } catch (err) {
    // Réponse 500 : Stripe renverra l'événement plus tard, rien n'est perdu.
    console.error("Traitement du webhook impossible :", err);
    return NextResponse.json({ error: "Erreur de traitement" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

async function notifierCommande(session: Stripe.Checkout.Session, notify: string) {
  const m = session.metadata ?? {};
  const email = session.customer_details?.email ?? "inconnu";
  const nom = session.customer_details?.name ?? "";
  const projets = (m.projets || "")
    .split(",")
    .filter(Boolean)
    .map((p) => libelle(PROJETS, p));

  const lignes: [string, string][] = [
    ["Client", `${nom} <${email}>`],
    ["Activité", libelle(ACTIVITES, m.activite)],
    ["Effectif", libelle(EFFECTIFS, m.effectif)],
    ["Région", libelle(REGIONS, m.region)],
    ["Projets", projets.length ? projets.join(", ") : "Aucun projet précis"],
    ["Montant", `${((session.amount_total ?? 0) / 100).toFixed(2).replace(".", ",")} €`],
    ["Mode", session.livemode ? "RÉEL" : "test"],
  ];

  await envoyerEmail({
    to: notify,
    subject: `${session.livemode ? "" : "[TEST] "}Nouvelle commande Guichet : ${email}`,
    html: `
      <h2>Nouvelle commande</h2>
      <p>Envoyez son bilan à ce client sous 24 h ouvrées, en répondant directement à son adresse.</p>
      <table cellpadding="6" style="border-collapse:collapse">
        ${lignes
          .map(
            ([k, v]) =>
              `<tr><td style="color:#5b5f67">${k}</td><td><strong>${echapper(v)}</strong></td></tr>`
          )
          .join("")}
      </table>`,
  });
}
