import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FORTISSEC — Audits Sécurité & Infrastructure",
  description:
    "Experts en audit de sécurité et d'infrastructure IT. Nous identifions vos vulnérabilités et déployons des solutions robustes.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
