import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, DM_Mono, DM_Sans } from "next/font/google";
import Script from "next/script";
import { DESCRIPTION, PROMESSE, SITE_URL } from "@/lib/site";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-bricolage",
  display: "swap",
});
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});
const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `Guichet — ${PROMESSE}`, template: "%s — Guichet" },
  description: DESCRIPTION,
  openGraph: {
    title: PROMESSE,
    description: DESCRIPTION,
    siteName: "Guichet",
    locale: "fr_FR",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: PROMESSE, description: DESCRIPTION },
};

export const viewport: Viewport = {
  themeColor: "#0e0f12",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const umamiId = process.env.NEXT_PUBLIC_UMAMI_ID;
  return (
    <html lang="fr" className={`${bricolage.variable} ${dmSans.variable} ${dmMono.variable}`}>
      <body className="min-h-dvh antialiased">
        {children}
        {umamiId && (
          <Script
            src="https://cloud.umami.is/script.js"
            data-website-id={umamiId}
            strategy="lazyOnload"
          />
        )}
      </body>
    </html>
  );
}
