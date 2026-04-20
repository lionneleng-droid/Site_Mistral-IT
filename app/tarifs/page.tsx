import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ContactSection from "../../components/ContactSection";

const OFFERS = [
  {
    name: "Pré-audit Express",
    price: "99EUR TTC*",
    subtitle: "30 minutes",
    highlight: "Idéal pour un premier niveau de visibilité",
    deliverables: [
      "Score sécurité / maturité IT",
      "3 failles principales",
      "3 actions prioritaires",
    ],
  },
  {
    name: "Pack Audit Essentiel",
    price: "490EUR TTC",
    subtitle: "Vision rapide et claire de l'existant",
    highlight: "Pour identifier les risques majeurs et agir vite",
    deliverables: [
      "Scan réseau rapide",
      "Vérification sécurité basique (ports, firewall, MFA)",
      "Analyse AD simplifiée (si existant)",
      "Check sauvegardes",
      "Rapport PDF clair (non technique)",
    ],
  },
  {
    name: "Pack Audit Avancé",
    price: "1490EUR TTC",
    subtitle: "Évaluation technique approfondie",
    highlight: "Pour une feuille de route sécurité complète",
    deliverables: [
      "Scan réseau complet (Nmap + vulnérabilités)",
      "Audit Active Directory (droits, GPO, comptes à risque)",
      "Analyse VLAN / segmentation",
      "Test exposition externe (IP publique, services ouverts)",
      "Analyse des postes (échantillon)",
      "Vérification PRA / sauvegardes",
      "Rapport détaillé + plan d'action",
    ],
  },
];

export default function TarifsPage() {
  return (
    <>
      <Navbar />

      <main className="pt-16 bg-white text-ink">
        <section className="relative overflow-hidden border-b border-[#e4e8ef]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(14,165,233,0.12),transparent_42%),radial-gradient(circle_at_86%_16%,rgba(59,130,246,0.08),transparent_40%),linear-gradient(135deg,#f8fbff_0%,#ffffff_64%)]" />
          <div className="relative max-w-7xl mx-auto px-6 lg:px-20 py-14 lg:py-20">
            <p className="inline-flex items-center rounded-full border border-sky/30 bg-skylt px-3 py-1 text-xs font-semibold tracking-wide text-sky uppercase">
              Nos tarifs
            </p>
            <h1 className="mt-5 text-3xl lg:text-5xl font-bold leading-tight text-ink">
              Des offres claires pour securiser votre informatique
            </h1>
            <p className="mt-5 max-w-3xl text-base lg:text-lg text-slate leading-relaxed">
              Choisissez le niveau d'accompagnement adapté à votre contexte: pré-audit express, audit essentiel,
              audit avancé, ou accompagnement 100% sur mesure pour construire votre système d'information.
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 lg:px-20 py-14 lg:py-16">
          <div className="grid lg:grid-cols-3 gap-6">
            {OFFERS.map((offer, index) => (
              <article
                key={offer.name}
                className={`rounded-2xl border p-7 bg-white shadow-[0_14px_40px_-30px_rgba(26,34,53,0.45)] ${index === 1 ? "border-sky/40" : "border-[#e4e8ef]"}`}
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-sky">{offer.name}</p>
                <p className="mt-3 text-3xl font-bold text-ink">{offer.price}</p>
                <p className="mt-1 text-sm text-slate">{offer.subtitle}</p>
                <p className="mt-4 text-sm text-slate leading-relaxed">{offer.highlight}</p>

                <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-muted">Livrables</p>
                <ul className="mt-3 space-y-2">
                  {offer.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate">
                      <span className="mt-1 text-sky">●</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <p className="mt-6 text-sm text-slate">
            * Le pré-audit à 99EUR TTC est offert si vous souscrivez ensuite à une offre plus chère.
          </p>
        </section>

        <section className="border-y border-[#e4e8ef] bg-[#f8fbff]">
          <div className="max-w-7xl mx-auto px-6 lg:px-20 py-14 lg:py-16">
            <div className="rounded-2xl border border-[#dbe5f2] bg-white p-8 lg:p-10">
              <p className="text-xs font-semibold uppercase tracking-wide text-sky">Sur mesure</p>
              <h2 className="mt-2 text-2xl lg:text-3xl font-bold text-ink">
                Construction complète de système d'information
              </h2>
              <p className="mt-4 text-sm lg:text-base text-slate leading-relaxed max-w-3xl">
                Si votre besoin dépasse un pack standard, l'accompagnement est uniquement sur mesure.
                Nous définissons ensemble l'architecture cible (matériel, équipements, serveur, réseau,
                sécurité et poste de travail) lors d'un échange gratuit sur rendez-vous ou par téléphone.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="#contact"
                  className="inline-flex items-center rounded-lg bg-ink px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-sky"
                >
                  Prendre un RDV gratuit
                </a>
                <Link
                  href="/accompagnement-si"
                  className="inline-flex items-center rounded-lg border border-[#cdd7e6] bg-white px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-skylt"
                >
                  Voir l'accompagnement SI
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
