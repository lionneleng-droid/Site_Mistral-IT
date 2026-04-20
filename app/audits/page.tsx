import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ContactSection from "../../components/ContactSection";
import Link from "next/link";

const audits = [
  {
    title: "Pré-audit Express",
    subtitle: "30 minutes pour faire le point",
    points: [
      "Score sécurité / maturité IT",
      "3 failles principales",
      "3 actions prioritaires",
    ],
  },
  {
    title: "Pack Audit Essentiel",
    subtitle: "Vision rapide et actionnable",
    points: [
      "Scan réseau rapide",
      "Vérification sécurité basique",
      "Analyse AD simplifiée (si existant)",
      "Check sauvegardes",
      "Rapport PDF clair (non technique)",
    ],
  },
  {
    title: "Pack Audit Avancé",
    subtitle: "Analyse technique complète",
    points: [
      "Scan réseau complet (Nmap + vulnérabilités)",
      "Audit Active Directory (droits, GPO, comptes à risque)",
      "Analyse VLAN / segmentation",
      "Test exposition externe",
      "Rapport détaillé + plan d'action",
    ],
  },
];

export default function AuditsPage() {
  return (
    <>
      <Navbar />

      <main className="pt-16 bg-white text-ink">
        <section className="relative overflow-hidden border-b border-[#e4e8ef]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(14,165,233,0.12),transparent_42%),radial-gradient(circle_at_86%_16%,rgba(59,130,246,0.08),transparent_40%),linear-gradient(135deg,#f8fbff_0%,#ffffff_64%)]" />

          <div className="relative max-w-7xl mx-auto px-6 lg:px-20 py-14 lg:py-20 grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-start">
            <div>
              <p className="inline-flex items-center rounded-full border border-sky/30 bg-skylt px-3 py-1 text-xs font-semibold tracking-wide text-sky uppercase">
                Audits
              </p>
              <h1 className="mt-5 text-3xl lg:text-5xl font-bold leading-tight text-ink">
                Évaluer, prioriser et sécuriser votre environnement
              </h1>
              <p className="mt-5 max-w-2xl text-base lg:text-lg text-slate leading-relaxed">
                J'audite votre infrastructure pour identifier les risques réels,
                définir les priorités et fournir un plan d'action concret adapté à votre contexte.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/tarifs"
                  className="inline-flex items-center rounded-lg bg-ink px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-sky"
                >
                  Voir les tarifs d'audit
                </Link>
                <Link
                  href="#contact"
                  className="inline-flex items-center rounded-lg border border-[#cdd7e6] bg-white px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-skylt"
                >
                  Demander un échange
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-[#d7e3f5] bg-white/90 p-6 shadow-[0_20px_60px_-35px_rgba(26,34,53,0.35)]">
              <h2 className="text-sm font-semibold tracking-wide uppercase text-sky">Ce que vous obtenez</h2>
              <ul className="mt-4 space-y-3">
                {[
                  "Un état des lieux fiable et priorisé",
                  "Des risques métier clairement identifiés",
                  "Un plan d'action pragmatique",
                  "Une base solide pour la remédiation",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate">
                    <span className="mt-1 h-2 w-2 rounded-full bg-sky shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 lg:px-20 py-14 lg:py-16">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {audits.map((audit) => (
              <article
                key={audit.title}
                className="rounded-2xl border border-[#e4e8ef] p-6 bg-white shadow-[0_10px_35px_-28px_rgba(26,34,53,0.5)]"
              >
                <h3 className="text-xl font-semibold text-ink">{audit.title}</h3>
                <p className="mt-2 text-sm text-slate leading-relaxed">{audit.subtitle}</p>
                <ul className="mt-4 space-y-2">
                  {audit.points.map((point) => (
                    <li key={point} className="text-sm text-slate flex items-start gap-2">
                      <span className="mt-1 text-sky">●</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="remediation" className="border-y border-[#e4e8ef] bg-[#f8fbff]">
          <div className="max-w-7xl mx-auto px-6 lg:px-20 py-14 lg:py-16">
            <div className="rounded-2xl border border-[#dbe5f2] bg-white p-8 lg:p-10">
              <p className="text-xs font-semibold uppercase tracking-wide text-sky">Remédiation</p>
              <h2 className="mt-2 text-2xl lg:text-3xl font-bold text-ink">
                Je corrige les failles identifiées et je sécurise l'existant
              </h2>
              <p className="mt-4 text-sm lg:text-base text-slate leading-relaxed max-w-3xl">
                Après l'audit, je prends en charge la remédiation priorisée: corrections techniques,
                durcissement des configurations, validation des actions et recommandations opérationnelles.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/tarifs"
                  className="inline-flex items-center rounded-lg bg-ink px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-sky"
                >
                  Voir les packs et tarifs
                </Link>
                <Link
                  href="#contact"
                  className="inline-flex items-center rounded-lg border border-[#cdd7e6] bg-white px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-skylt"
                >
                  Me contacter
                </Link>
              </div>
            </div>
          </div>
        </section>

        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
