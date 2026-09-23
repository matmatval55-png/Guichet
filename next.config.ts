import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  env: {
    // Netlify fournit l'adresse du site dans URL : pas besoin de la saisir à la main.
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || process.env.URL || "",
  },
};

export default nextConfig;
