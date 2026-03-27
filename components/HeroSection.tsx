"use client";

import { STATS } from "../data";
import CyberBackground from "../components/CyberBackground";
import { useState } from "react";

const TABS = [
  {
    id: "contexte",
    label: "Contexte cybersécurité",
    items: [
      {
        icon: "📈",
        color: "bg-red-50",
        title: "+38 % d'attaques en un an",
        desc: "Les cyberattaques mondiales ont explosé en 2023. Les PME représentent désormais 43 % des cibles, souvent faute de protection adaptée.",
      },
      {
        icon: "⏱️",
        color: "bg-amber-50",
        title: "197 jours d'intrusion non détectée",
        desc: "C'est le délai moyen avant qu'une entreprise découvre une violation de son système — 197 jours pendant lesquels les données sont exposées.",
      },
      {
        icon: "💶",
        color: "bg-blue-50",
        title: "4,5 M€ de coût moyen par incident",
        desc: "Selon IBM, le coût moyen d'une violation de données en Europe atteint 4,5 millions d'euros en 2024, entre arrêt d'activité, amendes et réparations.",
      },
      {
        icon: "⚖️",
        color: "bg-emerald-50",
        title: "NIS2 : nouvelles obligations dès 2024",
        desc: "La directive européenne NIS2 élargit les obligations de sécurité à des milliers d'entreprises. Non-conformité = sanctions pouvant dépasser 10 M€.",
      },
    ],
  },
  {
    id: "pourquoi",
    label: "Pourquoi un audit ?",
    items: [
      {
        icon: "🔍",
        color: "bg-blue-50",
        title: "Identifier les vulnérabilités cachées",
        desc: "Un audit révèle les failles que les équipes internes ne voient plus : configurations obsolètes, droits d'accès excessifs, ports ouverts.",
      },
      {
        icon: "✅",
        color: "bg-emerald-50",
        title: "Répondre aux obligations légales",
        desc: "RGPD, NIS2, ISO 27001 : un audit formel vous place en conformité et réduit votre exposition juridique.",
      },
      {
        icon: "📊",
        color: "bg-amber-50",
        title: "Prioriser les investissements IT",
        desc: "Plutôt que d'investir à l'aveugle, l'audit fournit une cartographie précise pour allouer les budgets sécurité efficacement.",
      },
      {
        icon: "🛡️",
        color: "bg-sky-50",
        title: "Renforcer la confiance client",
        desc: "Un certificat d'audit est un signal fort pour vos clients et partenaires sur la maturité de votre sécurité.",
      },
    ],
  },
  {
    id: "qui",
    label: "Qui est concerné ?",
    items: [
      {
        icon: "🏢",
        color: "bg-blue-50",
        title: "TPE et PME",
        desc: "Souvent les plus exposées car elles gèrent des données sensibles sans équipe dédiée à la cybersécurité.",
      },
      {
        icon: "🏥",
        color: "bg-emerald-50",
        title: "Secteurs réglementés",
        desc: "Santé, finance, collectivités : l'audit est une obligation légale et un gage de crédibilité institutionnelle.",
      },
      {
        icon: "🚀",
        color: "bg-amber-50",
        title: "Startups en croissance",
        desc: "Avant une levée de fonds ou une ouverture internationale, un audit rassure les investisseurs et les partenaires.",
      },
      {
        icon: "🔗",
        color: "bg-red-50",
        title: "Entreprises avec des sous-traitants",
        desc: "Si vos prestataires accèdent à vos systèmes, vous êtes responsable de leur niveau de sécurité.",
      },
    ],
  },
  {
    id: "risques",
    label: "Risques sans audit",
    items: [
      {
        icon: "⚠️",
        color: "bg-red-50",
        title: "Ransomware et paralysie totale",
        desc: "Une seule faille non corrigée suffit à stopper intégralement l'activité pendant des jours, voire des semaines.",
      },
      {
        icon: "💸",
        color: "bg-red-50",
        title: "Sanctions RGPD",
        desc: "En cas de violation de données, les amendes peuvent atteindre 4 % du CA annuel mondial si aucune diligence n'est prouvée.",
      },
      {
        icon: "📉",
        color: "bg-amber-50",
        title: "Perte de réputation irréversible",
        desc: "72 % des clients cessent de faire confiance à une entreprise après une fuite de données publiquement connue.",
      },
      {
        icon: "👁️",
        color: "bg-blue-50",
        title: "Intrusions silencieuses",
        desc: "En moyenne, un attaquant reste 197 jours non détecté dans un système avant d'agir — sans audit, vous ne le saurez pas.",
      },
    ],
  },
  {
    id: "apres",
    label: "Après l'audit",
    items: [
      {
        icon: "📋",
        color: "bg-blue-50",
        title: "Rapport détaillé sous 72h",
        desc: "Un document clair avec l'ensemble des constats, leur criticité et les recommandations hiérarchisées par priorité.",
      },
      {
        icon: "🛠️",
        color: "bg-emerald-50",
        title: "Plan de remédiation accompagné",
        desc: "Notre expert reste disponible pour guider l'implémentation des corrections identifiées, sans vous laisser seul face au rapport.",
      },
      {
        icon: "📅",
        color: "bg-amber-50",
        title: "Suivi à 3 et 6 mois",
        desc: "Un point de contrôle pour vérifier l'efficacité des actions mises en place et mesurer la progression de votre posture.",
      },
      {
        icon: "📜",
        color: "bg-emerald-50",
        title: "Attestation d'audit",
        desc: "Un certificat officiel que vous pouvez présenter à vos clients, partenaires, ou dans le cadre d'appels d'offres.",
      },
    ],
  },
];

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState("pourquoi");
  const current = TABS.find((t) => t.id === activeTab)!;

  return (
    <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2 items-center gap-12 px-6 lg:px-20 pt-16 pb-10 relative overflow-hidden">
      <CyberBackground />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(110deg, rgba(255,255,255,0.82) 0%, rgba(255,255,255,0.55) 55%, rgba(255,255,255,0.25) 100%)",
          zIndex: 1,
        }}
      />

      {/* ── Left: copy ── */}
      <div className="relative z-10" style={{ zIndex: 2 }}>
        <span className="fade-up delay-1 inline-flex items-center gap-1.5 text-xs font-semibold text-sky tracking-widest uppercase bg-skylt px-3.5 py-1.5 rounded-full mb-6">
          <span>↗</span> Sécurité · Infrastructure · Évolution
        </span>
        <h1 className="fade-up delay-2 font-playfair font-bold text-ink leading-[1.08] tracking-tight text-4xl sm:text-5xl xl:text-[4rem] mb-6">
          Votre sécurité,{" "}
          <em className="text-sky not-italic">notre priorité.</em>
        </h1>
        <p className="fade-up delay-3 text-slate font-light text-[1.05rem] leading-relaxed max-w-[480px] mb-9">
          Mistral IT accompagne les entreprises dans l'audit de leurs systèmes
          et la mise en œuvre de solutions IT robustes. Une approche claire, des
          résultats concrets.
        </p>
        <div className="fade-up delay-4 flex flex-wrap gap-3 mb-12">
          <a
            href="#audits"
            className="text-sm font-semibold px-7 py-3 bg-ink text-white rounded-lg border-2 border-ink hover:bg-sky hover:border-sky transition-colors"
          >
            Découvrir nos audits
          </a>
          <a
            href="#contact"
            className="text-sm font-semibold px-7 py-3 bg-transparent text-ink rounded-lg border-2 border-[#e4e8ef] hover:border-ink transition-colors"
          >
            Parler à un expert
          </a>
        </div>
        <div className="fade-up delay-5 flex gap-8 pt-7 border-t border-[#e4e8ef]">
          {STATS.map(({ value, label }) => (
            <div key={label}>
              <p className="font-playfair font-bold text-[2rem] text-ink leading-none mb-1">
                {value}
              </p>
              <p className="text-xs text-muted font-medium">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right: interactive tabs ── */}
      <div className="fade-up delay-3 relative hidden lg:block" style={{ zIndex: 2 }}>
        <div className="bg-stone rounded-[20px] border border-[#e4e8ef] p-8">
          {/* Tab buttons */}
          <div className="flex flex-wrap gap-2 mb-6">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-xs font-semibold px-4 py-1.5 rounded-full border transition-colors ${
                  activeTab === tab.id
                    ? "bg-ink text-white border-ink"
                    : "bg-white text-slate border-[#e4e8ef] hover:border-ink"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="flex flex-col gap-4">
            {current.items.map(({ icon, color, title, desc }) => (
              <div key={title} className="flex items-start gap-3">
                <div
                  className={`w-9 h-9 rounded-xl ${color} flex items-center justify-center text-base flex-shrink-0`}
                >
                  {icon}
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink mb-0.5">{title}</p>
                  <p className="text-xs text-muted leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}