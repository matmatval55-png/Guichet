import { Footer } from "./Footer";
import { Logo } from "./Logo";

// Gabarit des pages secondaires : logo, contenu centré, pied de page.
export function PageSimple({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="px-4 py-5">
        <div className="mx-auto max-w-2xl">
          <Logo />
        </div>
      </header>
      <main className="px-4 pb-16">
        <div className="mx-auto max-w-2xl">{children}</div>
      </main>
      <Footer />
    </>
  );
}
