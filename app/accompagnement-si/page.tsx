import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ContactSection from "../../components/ContactSection";

const pillars = [
  {
    title: "Choix du matériel adapté",
    description:
      "Postes, laptops, réseau, backup et sécurité: vous obtenez des recommandations claires selon vos usages réels et vos contraintes budgétaires.",
    points: ["Audit des usages", "Selection de matériel fiable", "Plan de renouvellement"],
  },
  {
    title: "Infrastructure et équipements",
    description:
      "Je conçois une base technique solide: réseau, segmentation, Wi-Fi, supervision et bonnes pratiques pour une croissance sans dette technique.",
    points: ["Schéma d'architecture", "Choix des équipements", "Mise en service sécurisée"],
  },
  {
    title: "Mise en place serveur",
    description:
      "Serveur local, cloud ou hybride: je prépare l'environnement, les accès, la sauvegarde et la documentation d'exploitation.",
    points: ["Installation et hardening", "Sauvegardes et reprise", "Documentation opérationnelle"],
  },
  {
    title: "Supervision et continuité IT",
    description:
      "Je mets en place un socle d'exploitation fiable: supervision, alerting, sauvegardes et procédures de reprise pour garantir la disponibilité de votre environnement.",
    points: ["Monitoring et alertes", "Politique de sauvegarde", "Plan de reprise d'activite"],
  },
];

export default function AccompagnementSIPage() {
  return (
    <>
      <Navbar />

      <main className="pt-16 bg-white text-ink">
        <section className="relative overflow-hidden border-b border-[#e4e8ef]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(14,165,233,0.13),transparent_45%),radial-gradient(circle_at_88%_14%,rgba(59,130,246,0.09),transparent_42%),linear-gradient(135deg,#f8fbff_0%,#ffffff_62%)]" />

          <div className="relative max-w-7xl mx-auto px-6 lg:px-20 py-14 lg:py-20 grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-start">
            <div>
              <p className="inline-flex items-center rounded-full border border-sky/30 bg-skylt px-3 py-1 text-xs font-semibold tracking-wide text-sky uppercase">
                Accompagnement IT
              </p>                
              <h1 className="mt-5 text-3xl lg:text-5xl font-bold leading-tight text-ink">
                Architecture IT et construction de système d'information
              </h1>
              <p className="mt-5 max-w-2xl text-base lg:text-lg text-slate leading-relaxed">
                Un accompagnement complet pour construire un système d'information robuste, évolutif et cohérent avec votre activité.
                Du choix des équipements jusqu'à la mise en place serveur, tout est cadré et piloté.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="#contact"
                  className="inline-flex items-center rounded-lg bg-ink px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-sky"
                >
                  Demander un cadrage IT
                </Link>
                <Link
                  href="/audits#remediation"
                  className="inline-flex items-center rounded-lg border border-[#cdd7e6] bg-white px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-skylt"
                >
                  Voir les offres d'audit et remédiation
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-[#d7e3f5] bg-white/90 p-6 shadow-[0_20px_60px_-35px_rgba(26,34,53,0.35)]">
              <h2 className="text-sm font-semibold tracking-wide uppercase text-sky">Ce que vous obtenez</h2>
              <ul className="mt-4 space-y-3">
                {[
                  "Un environnement IT aligne sur vos usages metier",
                  "Des choix techniques justifies et durables",
                  "Un budget priorise sans sur-investissement",
                  "Une execution concrete avec pilotage",
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
          <div className="grid md:grid-cols-2 gap-5">
            {pillars.map((pillar) => (
              <article
                key={pillar.title}
                className="rounded-2xl border border-[#e4e8ef] p-6 bg-white shadow-[0_10px_35px_-28px_rgba(26,34,53,0.5)]"
              >
                <h3 className="text-xl font-semibold text-ink">{pillar.title}</h3>
                <p className="mt-3 text-sm text-slate leading-relaxed">{pillar.description}</p>
                <ul className="mt-4 space-y-2">
                  {pillar.points.map((point) => (
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

        <section className="max-w-7xl mx-auto px-6 lg:px-20 py-14 lg:py-16">
          <div className="rounded-2xl border border-ink bg-ink px-6 py-8 lg:px-10 lg:py-10 text-white flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
            <div>
              <p className="text-xs uppercase tracking-wide text-sky">Prêt à structurer votre IT ?</p>
              <h2 className="mt-2 text-2xl lg:text-3xl font-bold">On transforme les besoins métier en système concret.</h2>
              <p className="mt-3 text-sm lg:text-base text-[#c2d2ea] max-w-2xl">
                Vous gardez une vision claire des priorités, du budget et des choix techniques à chaque étape.
              </p>
            </div>
            <Link
              href="#contact"
              className="inline-flex justify-center items-center rounded-lg bg-white px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-skylt"
            >
              Lancer mon projet IT
            </Link>
          </div>
        </section>

        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
