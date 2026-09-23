import { NextResponse } from "next/server";
import { validerReponses } from "@/lib/questionnaire";
import { SITE_URL } from "@/lib/site";
import { PRIX_MENSUEL_CENTIMES, stripe } from "@/lib/stripe";

// Reçoit le questionnaire, le valide, puis envoie le visiteur sur Stripe Checkout.
// Les réponses voyagent dans les métadonnées Stripe : pas de base de données à ce stade.
export async function POST(request: Request) {
  const form = await request.formData();
  const reponses = validerReponses({
    activite: form.get("activite"),
    effectif: form.get("effectif"),
    region: form.get("region"),
    projets: form.getAll("projets"),
  });

  if (!reponses) {
    return NextResponse.redirect(`${SITE_URL}/questionnaire?erreur=1`, 303);
  }

  const metadata = {
    activite: reponses.activite,
    effectif: reponses.effectif,
    region: reponses.region,
    projets: reponses.projets.join(","),
  };

  try {
    const session = await stripe().checkout.sessions.create({
      mode: "subscription",
      locale: "fr",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "eur",
            unit_amount: PRIX_MENSUEL_CENTIMES,
            recurring: { interval: "month" },
            product_data: {
              name: "Guichet — abonnement mensuel",
              description: "Bilan des aides publiques de votre entreprise + alertes nouvelles aides",
            },
          },
        },
      ],
      metadata,
      subscription_data: { metadata },
      custom_text: {
        submit: { message: "Votre bilan vous est envoyé par email sous 24 h ouvrées." },
      },
      success_url: `${SITE_URL}/merci?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}/paiement-annule`,
    });

    return NextResponse.redirect(session.url!, 303);
  } catch (err) {
    console.error("Création de la session Stripe impossible :", err);
    return NextResponse.redirect(`${SITE_URL}/questionnaire?erreur=1`, 303);
  }
}
