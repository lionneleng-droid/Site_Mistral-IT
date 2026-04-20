import Link from "next/link";

const OFFRES = [
  {
    icon: "🔍",
    color: "bg-blue-50",
    accent: "#3b82f6",
    label: "Audit informatique",
    title: "Audit & Diagnostic",
    description:
      "Analyse complète de votre infrastructure, réseau, Active Directory et sécurité. Identification des vulnérabilités, mauvaises configurations et risques de conformité.",
    points: [
      "Audit réseau & infrastructure",
      "Audit Active Directory & droits d'accès",
      "Analyse de conformité RGPD / NIS2",
      "Rapport détaillé sous 72h",
    ],
    href: "/audits",
    cta: "Voir les audits",
  },
  {
    icon: "🛠️",
    color: "bg-emerald-50",
    accent: "#10b981",
    label: "Remédiation & Prestations",
    title: "Remédiation & Mise en production",
    description:
      "Une fois les failles identifiées, nous les corrigeons. Déploiement de solutions, sécurisation de l'architecture réseau, renforcement de l'infrastructure et automatisation des processus.",
    points: [
      "Correction des vulnérabilités identifiées",
      "Sécurisation Active Directory & réseau",
      "Automatisation Ansible / scripts",
      "Mise en production et suivi",
    ],
    href: "/audits",
    cta: "Voir les prestations",
  },
  {
    icon: "🏗️",
    color: "bg-sky-50",
    accent: "#0ea5e9",
    label: "Accompagnement SI",
    title: "Construction du Système d'Information",
    description:
      "Vous démarrez ou restructurez votre informatique ? Nous construisons votre SI de A à Z : choix du matériel, serveur, réseau, et ERP selon vos besoins métier.",
    points: [
      "Choix du matériel et des équipements",
      "Mise en place serveur (local, cloud, hybride)",
      "Architecture réseau & sécurité",
      "Intégration ERP via partenariat",
    ],
    href: "/accompagnement-si",
    cta: "Voir l'accompagnement SI",
  },
];

export default function OffresSection() {
  return (
    <section id="offres" className="py-24 px-6 lg:px-20 bg-white">
      <p className="text-xs font-semibold text-sky tracking-widest uppercase mb-3">
        Nos domaines d'intervention
      </p>
      <h2 className="font-playfair font-bold text-ink text-3xl sm:text-[2.6rem] leading-tight tracking-tight mb-4">
        Un accompagnement complet,
        <br />
        de l'audit à la production
      </h2>
      <p className="text-slate font-light text-[1rem] leading-relaxed max-w-xl mb-14">
        Que vous ayez besoin de sécuriser l'existant, corriger des failles ou construire un système d'information
        depuis zéro, Mistral IT intervient avec une méthode structurée et des livrables concrets.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {OFFRES.map((offre) => (
          <article
            key={offre.title}
            className="reveal flex flex-col rounded-2xl border border-[#e4e8ef] bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(59,130,246,0.09)] hover:border-sky/30"
          >
            <div className={`w-12 h-12 rounded-xl ${offre.color} flex items-center justify-center text-[1.4rem] mb-5`}>
              {offre.icon}
            </div>
            <span className="text-xs font-semibold tracking-wide uppercase mb-2" style={{ color: offre.accent }}>
              {offre.label}
            </span>
            <h3 className="font-playfair font-bold text-ink text-[1.15rem] leading-snug mb-3">
              {offre.title}
            </h3>
            <p className="text-slate font-light text-sm leading-relaxed mb-5">
              {offre.description}
            </p>
            <ul className="flex flex-col gap-2 mb-8">
              {offre.points.map((point) => (
                <li key={point} className="flex items-start gap-2 text-sm text-slate">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-sky flex-shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
            <Link
              href={offre.href}
              className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-sky hover:text-ink transition-colors"
            >
              {offre.cta} <span>→</span>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
