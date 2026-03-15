import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["500", "700"],
  style: ["normal", "italic"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Mistral IT — Audits Sécurité & Infrastructure",
  description:
    "Mistral IT accompagne les entreprises dans l'audit de leurs systèmes et la mise en œuvre de solutions IT robustes. Confiance, clarté, expertise.",
  keywords: ["audit sécurité", "infrastructure IT", "pentest", "RGPD", "ISO 27001", "cybersécurité"],
  icons: {
    icon: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${playfair.variable} ${outfit.variable}`}>
      <body className="font-outfit antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
