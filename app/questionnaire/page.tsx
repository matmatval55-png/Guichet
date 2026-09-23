import type { Metadata } from "next";
import { Logo } from "@/components/Logo";
import { Questionnaire } from "@/components/Questionnaire";

export const metadata: Metadata = {
  title: "Trouver mes aides",
  description: "4 questions pour savoir à quelles aides publiques votre entreprise a droit.",
  alternates: { canonical: "/questionnaire" },
};

export default async function PageQuestionnaire({
  searchParams,
}: {
  searchParams: Promise<{ erreur?: string }>;
}) {
  const { erreur } = await searchParams;
  return (
    <>
      <header className="px-4 py-5">
        <div className="mx-auto max-w-xl">
          <Logo />
        </div>
      </header>
      <main className="px-4 pb-16">
        <div className="mx-auto max-w-xl">
          <Questionnaire erreur={erreur === "1"} />
        </div>
      </main>
    </>
  );
}
