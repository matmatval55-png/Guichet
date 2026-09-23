import { ImageResponse } from "next/og";
import { PROMESSE } from "@/lib/site";

export const alt = PROMESSE;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Image d'aperçu affichée quand le lien est partagé (WhatsApp, Instagram, TikTok…).
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0e0f12",
          color: "#fafaf6",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 40, fontWeight: 800 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 60,
              height: 60,
              borderRadius: 14,
              background: "#d4f54a",
              color: "#0e0f12",
            }}
          >
            G
          </div>
          guichet
        </div>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>
          {PROMESSE}
        </div>
        <div style={{ display: "flex", fontSize: 32, color: "#d4f54a" }}>
          4 questions · montant estimé · pièces · dates limites
        </div>
      </div>
    ),
    size
  );
}
