"use client";
import { useState } from "react";

// ── DATA ─────────────────────────────────────────────────────────────────────

const audits = [
  {
    id: "AUDIT_01",
    icon: "🔍",
    title: "Audit de Sécurité Applicative",
    desc: "Analyse approfondie de vos applications web et APIs. Tests d'intrusion, revue de code, conformité OWASP Top 10 et identification des vecteurs d'attaque.",
    tags: ["PENTEST", "OWASP", "API", "CODE REVIEW"],
  },
  {
    id: "AUDIT_02",
    icon: "🌐",
    title: "Audit d'Infrastructure Réseau",
    desc: "Évaluation complète de votre architecture réseau : firewalls, VPN, segmentation, flux, exposition externe et cartographie des actifs critiques.",
    tags: ["NMAP", "FIREWALL", "VPN", "VLAN"],
  },
  {
    id: "AUDIT_03",
    icon: "☁️",
    title: "Audit Cloud & Conteneurisation",
    desc: "Revue de votre configuration AWS, Azure, GCP ou on-premise. Conformité CIS Benchmarks, IAM, gestion des secrets et sécurité des workloads Kubernetes.",
    tags: ["AWS", "AZURE", "KUBERNETES", "IAM"],
  },
  {
    id: "AUDIT_04",
    icon: "🛡️",
    title: "Audit de Conformité & RGPD",
    desc: "Évaluation de votre conformité aux normes ISO 27001, SOC 2, RGPD et NIS2. Analyse des politiques, procédures et contrôles organisationnels.",
    tags: ["ISO 27001", "RGPD", "NIS2", "SOC2"],
  },
  {
    id: "AUDIT_05",
    icon: "💻",
    title: "Audit Active Directory & IAM",
    desc: "Analyse de votre annuaire AD, GPO, délégations, comptes privilégiés. Détection des chemins d'escalade de privilèges et des configurations à risque.",
    tags: ["ACTIVE DIRECTORY", "GPO", "PAM", "BLOODHOUND"],
  },
  {
    id: "AUDIT_06",
    icon: "📱",
    title: "Audit Posture & Sensibilisation",
    desc: "Évaluation de la maturité cyber de votre organisation : campagnes de phishing simulées, test des employés, revue des procédures de réponse aux incidents.",
    tags: ["PHISHING", "SOCIAL ENGINEERING", "AWARENESS"],
  },
];

const services = [
  {
    title: "Remediation & Hardening",
    desc: "Suite à l'audit, nous prenons en charge la correction des vulnérabilités identifiées. Nos ingénieurs appliquent les patchs, durcissent les configurations (CIS/ANSSI) et vérifient chaque correction par re-test.",
    deliverables: [
      "Plan de remédiation priorisé (CVSS)",
      "Application des correctifs système",
      "Durcissement configuration (CIS/ANSSI)",
      "Re-test de validation post-correction",
      "Rapport de clôture signé",
    ],
  },
  {
    title: "Architecture Sécurisée",
    desc: "Conception d'une architecture Zero Trust. Mise en place de micro-segmentation réseau, DMZ, contrôles d'accès granulaires et identité forte (MFA, PAM).",
    deliverables: [
      "Schéma d'architecture cible",
      "Déploiement Zero Trust / DMZ",
      "Configuration MFA & PAM",
      "Micro-segmentation réseau",
      "Documentation technique complète",
    ],
  },
  {
    title: "SOC & Supervision",
    desc: "Déploiement d'un SOC adapté à votre taille. Intégration SIEM, règles de détection sur-mesure, playbooks d'incident et supervision 24/7 par nos analystes certifiés.",
    deliverables: [
      "Déploiement SIEM / SOAR",
      "Règles de détection personnalisées",
      "Playbooks réponse incidents",
      "Tableaux de bord temps réel",
      "Supervision 24/7 (option)",
    ],
  },
  {
    title: "Formation & Transfert",
    desc: "Formations techniques pour vos équipes IT et sessions de sensibilisation pour tous vos collaborateurs. Simulations de phishing, ateliers hands-on.",
    deliverables: [
      "Formation sécurité (équipes IT)",
      "Sensibilisation collaborateurs",
      "Campagnes phishing simulées",
      "E-learning sur-mesure",
      "Attestations de formation",
    ],
  },
  {
    title: "Plan de Continuité (PCA/PRA)",
    desc: "Élaboration complète de votre PCA et PRA. Analyse d'impact (BIA), définition RPO/RTO, tests réguliers et révision annuelle.",
    deliverables: [
      "Analyse d'impact (BIA)",
      "Rédaction PCA / PRA",
      "Définition RPO & RTO",
      "Tests de bascule et exercices",
      "Révision et mise à jour annuelle",
    ],
  },
];

const steps = [
  { num: "STEP_01", title: "Qualification", desc: "Analyse du périmètre, des enjeux métier et définition des objectifs." },
  { num: "STEP_02", title: "Reconnaissance", desc: "Cartographie des actifs et identification de la surface d'attaque." },
  { num: "STEP_03", title: "Analyse", desc: "Tests techniques approfondis et évaluation des impacts potentiels." },
  { num: "STEP_04", title: "Rapport", desc: "Livraison du rapport avec synthèse executive et recommandations." },
  { num: "STEP_05", title: "Mise en œuvre", desc: "Déploiement des correctifs et validation finale par re-test." },
];

const certs = [
  { name: "OSCP / OSEP", desc: "Offensive Security Certified Professional" },
  { name: "CISSP", desc: "Certified Information Systems Security" },
  { name: "ISO 27001", desc: "Lead Auditor certifié" },
  { name: "CEH / CPEH", desc: "Certified Ethical Hacker" },
  { name: "ANSSI PASSI", desc: "Prestataire d'Audit SSI qualifié" },
  { name: "CIS Benchmarks", desc: "Center for Internet Security" },
];

// ── COMPONENTS ────────────────────────────────────────────────────────────────

function SectionTag({ children, color = "#00cfff" }: { children: string; color?: string }) {
  return (
    <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.72rem", color, letterSpacing: "0.2em", textTransform: "uppercase" as const, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.8rem" }}>
      <span style={{ color: "var(--muted)" }}>//</span>
      {children}
    </div>
  );
}

// ── PAGE ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [activeService, setActiveService] = useState(0);

  return (
    <>
      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.2rem 4rem", background: "rgba(8,12,16,0.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid var(--border)", zIndex: 100 }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.4rem", letterSpacing: "-0.02em" }}>
          FORTIS<span style={{ color: "var(--accent)" }}>SEC</span>
        </div>
        <ul style={{ display: "flex", gap: "2.5rem", listStyle: "none" }}>
          {["audits", "services", "processus", "pourquoi"].map((id) => (
            <li key={id}>
              <a href={`#${id}`} style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.8rem", textDecoration: "none", color: "var(--muted)", letterSpacing: "0.08em", textTransform: "uppercase" as const }}>
                {id}
              </a>
            </li>
          ))}
        </ul>
        <a href="#contact" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.8rem", padding: "0.6rem 1.4rem", background: "transparent", color: "var(--accent)", border: "1px solid var(--accent)", cursor: "pointer", letterSpacing: "0.08em", textTransform: "uppercase" as const, textDecoration: "none" }}>
          Demander un devis
        </a>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "0 4rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", width: 600, height: 600, background: "radial-gradient(circle, rgba(0,255,140,0.08) 0%, transparent 70%)", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
        <div style={{ maxWidth: 800 }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.75rem", color: "var(--accent)", letterSpacing: "0.2em", textTransform: "uppercase" as const, marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.8rem" }}>
            <span style={{ display: "block", width: 30, height: 1, background: "var(--accent)" }} />
            Sécurité & Infrastructure
          </div>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(3rem, 7vw, 5.5rem)", lineHeight: 1.0, letterSpacing: "-0.03em", marginBottom: "1.5rem" }}>
            Protégez.<br />
            <span style={{ color: "transparent", WebkitTextStroke: "1px rgba(0,255,140,0.5)" }}>Auditez.</span><br />
            Renforcez.
          </h1>
          <p style={{ fontSize: "1.1rem", color: "var(--muted)", lineHeight: 1.8, maxWidth: 540, marginBottom: "3rem" }}>
            Experts en audit de sécurité et d'infrastructure IT. Nous identifions vos vulnérabilités et déployons des solutions robustes pour sécuriser durablement vos systèmes.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" as const }}>
            <a href="#audits" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.85rem", padding: "1rem 2.4rem", background: "var(--accent)", color: "var(--bg)", border: "none", cursor: "pointer", letterSpacing: "0.1em", textTransform: "uppercase" as const, textDecoration: "none", clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)" }}>
              Découvrir nos audits
            </a>
            <a href="#contact" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.85rem", padding: "1rem 2.4rem", background: "transparent", color: "var(--text)", border: "1px solid rgba(255,255,255,0.15)", cursor: "pointer", letterSpacing: "0.1em", textTransform: "uppercase" as const, textDecoration: "none" }}>
              Parler à un expert
            </a>
          </div>
        </div>
        {/* Terminal widget */}
        <div style={{ position: "absolute", bottom: "6rem", right: "4rem", background: "rgba(0,0,0,0.6)", border: "1px solid var(--border)", padding: "1.2rem 1.5rem", width: 340, backdropFilter: "blur(12px)" }}>
          <div style={{ display: "flex", gap: "0.4rem", marginBottom: "1rem" }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff3c6e", display: "block" }} />
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ffb800", display: "block" }} />
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#00ff8c", display: "block" }} />
          </div>
          {[
            { color: "var(--accent)", text: "$ run audit --target client_network" },
            { color: "var(--accent2)", text: "[*] Scanning 254 hosts..." },
            { color: "var(--accent)", text: "[+] CVE-2024-1234 detected (CRITICAL)" },
            { color: "#ffb800", text: "[!] Weak TLS config on 3 endpoints" },
            { color: "var(--accent)", text: "[+] Report generated: audit_2024.pdf" },
          ].map((line, i) => (
            <div key={i} style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.72rem", marginBottom: "0.3rem", color: line.color }}>{line.text}</div>
          ))}
        </div>
        {/* Metrics */}
        <div style={{ position: "absolute", bottom: "4rem", left: "4rem", display: "flex", gap: "3rem" }}>
          {[["200+", "Audits réalisés"], ["98%", "Satisfaction client"], ["0", "Incidents post-audit"]].map(([val, label]) => (
            <div key={label}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "2.2rem", fontWeight: 700, color: "var(--accent)" }}>{val}</div>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.7rem", color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase" as const }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* AUDITS */}
      <section id="audits" style={{ padding: "7rem 4rem", background: "var(--bg2)" }}>
        <SectionTag>01 — Nos audits</SectionTag>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.02em", marginBottom: "1rem" }}>
          Diagnostics complets<br />de votre environnement
        </h2>
        <p style={{ color: "var(--muted)", maxWidth: 560, lineHeight: 1.8, marginBottom: "4rem" }}>
          De l'évaluation des risques à l'analyse des vulnérabilités, chaque audit est mené par nos consultants certifiés selon les référentiels les plus exigeants.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 1, background: "var(--border)", border: "1px solid var(--border)" }}>
          {audits.map((a) => (
            <div key={a.id} style={{ background: "var(--bg2)", padding: "2.5rem", transition: "all 0.3s" }}>
              <div style={{ fontSize: "1.8rem", marginBottom: "1.2rem" }}>{a.icon}</div>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.7rem", color: "var(--muted)", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>{a.id}</div>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.8rem" }}>{a.title}</h3>
              <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.7, marginBottom: "1.5rem" }}>{a.desc}</p>
              <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "0.4rem" }}>
                {a.tags.map((t) => (
                  <span key={t} style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.65rem", padding: "0.25rem 0.6rem", border: "1px solid rgba(0,255,140,0.2)", color: "var(--accent)", letterSpacing: "0.08em" }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ padding: "7rem 4rem", background: "var(--bg)" }}>
        <SectionTag>02 — Prestations</SectionTag>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.02em", marginBottom: "1rem" }}>
          Mise en œuvre<br />&amp; accompagnement
        </h2>
        <p style={{ color: "var(--muted)", maxWidth: 560, lineHeight: 1.8, marginBottom: "4rem" }}>
          Au-delà du diagnostic, nous déployons concrètement les solutions pour corriger les vulnérabilités et renforcer durablement votre posture de sécurité.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column" as const, gap: 1 }}>
            {services.map((s, i) => (
              <div key={i} onClick={() => setActiveService(i)} style={{ background: "var(--card)", border: "1px solid var(--border)", borderLeft: `3px solid ${i === activeService ? "var(--accent)" : "transparent"}`, padding: "2rem", cursor: "pointer", transition: "all 0.2s", background: i === activeService ? "rgba(0,255,140,0.04)" : "var(--card)" }}>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  {s.title}
                  <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.7rem", color: "var(--accent)" }}>→</span>
                </h3>
                <p style={{ fontSize: "0.88rem", color: "var(--muted)", lineHeight: 1.6 }}>{s.desc.slice(0, 80)}…</p>
              </div>
            ))}
          </div>
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", padding: "3rem", position: "sticky" as const, top: "5rem" }}>
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.7rem", color: "var(--accent)", letterSpacing: "0.15em", marginBottom: "1rem" }}>SERVICE_ACTIF</div>
            <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.6rem", fontWeight: 700, marginBottom: "1rem" }}>{services[activeService].title}</h3>
            <p style={{ color: "var(--muted)", lineHeight: 1.8, marginBottom: "2rem" }}>{services[activeService].desc}</p>
            <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1.5rem" }}>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.72rem", color: "var(--accent2)", letterSpacing: "0.15em", textTransform: "uppercase" as const, marginBottom: "1rem" }}>Livrables inclus</div>
              {services[activeService].deliverables.map((d) => (
                <div key={d} style={{ display: "flex", alignItems: "flex-start", gap: "0.8rem", padding: "0.6rem 0", borderBottom: "1px solid rgba(255,255,255,0.04)", fontSize: "0.88rem", color: "var(--muted)" }}>
                  <span style={{ color: "var(--accent)", fontFamily: "'Share Tech Mono', monospace", flexShrink: 0 }}>→</span>
                  {d}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="processus" style={{ padding: "7rem 4rem", background: "var(--bg2)" }}>
        <SectionTag>03 — Méthodologie</SectionTag>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.02em", marginBottom: "1rem" }}>Notre processus en 5 étapes</h2>
        <p style={{ color: "var(--muted)", lineHeight: 1.8, marginBottom: "4rem" }}>Une approche structurée et transparente, de la prise en charge à la livraison des solutions.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", position: "relative" as const }}>
          <div style={{ position: "absolute" as const, top: "2.5rem", left: "10%", right: "10%", height: 1, background: "linear-gradient(90deg, transparent, var(--accent), var(--accent2), var(--accent), transparent)" }} />
          {steps.map((s) => (
            <div key={s.num} style={{ padding: "0 1.5rem", paddingTop: "5rem", textAlign: "center" as const, position: "relative" as const }}>
              <div style={{ position: "absolute" as const, top: "1.5rem", left: "50%", transform: "translateX(-50%)", width: 20, height: 20, background: "var(--bg2)", border: "2px solid var(--accent)", borderRadius: "50%" }} />
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.65rem", color: "var(--muted)", letterSpacing: "0.15em", marginBottom: "0.5rem" }}>{s.num}</div>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "1rem", fontWeight: 700, marginBottom: "0.5rem" }}>{s.title}</h3>
              <p style={{ fontSize: "0.82rem", color: "var(--muted)", lineHeight: 1.6 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHY */}
      <section id="pourquoi" style={{ padding: "7rem 4rem", background: "var(--bg)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
          <div>
            <SectionTag>04 — Pourquoi nous</SectionTag>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.02em", marginBottom: "1rem" }}>Une expertise<br />sans compromis</h2>
            <p style={{ color: "var(--muted)", lineHeight: 1.8, marginBottom: "2rem" }}>Des consultants certifiés OSCP, CEH, CISSP avec une expérience terrain sur des environnements critiques.</p>
            {[
              { icon: "⚡", title: "Réactivité garantie", desc: "Rapport préliminaire sous 48h, accompagnement dédié tout au long de la mission." },
              { icon: "🔒", title: "Confidentialité absolue", desc: "NDA systématique, données traitées en France, zero data retention." },
              { icon: "📊", title: "Approche orientée risque", desc: "Priorisation des vulnérabilités par impact métier, pas seulement par score CVSS." },
              { icon: "🎯", title: "Suivi post-mission", desc: "3 mois de suivi inclus pour vérifier l'efficacité des mesures correctives." },
            ].map((w) => (
              <div key={w.title} style={{ display: "flex", gap: "1.2rem", padding: "1.5rem 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ width: 40, height: 40, flexShrink: 0, background: "rgba(0,255,140,0.08)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>{w.icon}</div>
                <div>
                  <h4 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, marginBottom: "0.3rem" }}>{w.title}</h4>
                  <p style={{ fontSize: "0.85rem", color: "var(--muted)", lineHeight: 1.6 }}>{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: "var(--bg2)", border: "1px solid var(--border)", padding: "2.5rem" }}>
            <SectionTag>Certifications & Standards</SectionTag>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {certs.map((c) => (
                <div key={c.name} style={{ background: "rgba(0,0,0,0.3)", border: "1px solid var(--border)", padding: "1.2rem" }}>
                  <h4 style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.9rem", color: "var(--accent)", marginBottom: "0.3rem" }}>{c.name}</h4>
                  <p style={{ fontSize: "0.75rem", color: "var(--muted)" }}>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "7rem 4rem", background: "var(--bg2)", textAlign: "center" as const }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <SectionTag>05 — Contact</SectionTag>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(2.2rem, 5vw, 3.5rem)", letterSpacing: "-0.02em", marginBottom: "1rem" }}>Commençons votre audit</h2>
          <p style={{ color: "var(--muted)", lineHeight: 1.8, marginBottom: "3rem" }}>Répondez à quelques questions et un consultant vous contacte sous 24h.</p>
          <div style={{ display: "flex", flexDirection: "column" as const, gap: 1, background: "var(--border)", border: "1px solid var(--border)", textAlign: "left" as const, marginBottom: "2rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "var(--border)" }}>
              {[["Prénom & Nom", "Jean Dupont"], ["Société", "Acme Corp"]].map(([label, ph]) => (
                <div key={label} style={{ background: "var(--bg2)", display: "flex", flexDirection: "column" as const }}>
                  <label style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.65rem", color: "var(--muted)", letterSpacing: "0.15em", textTransform: "uppercase" as const, padding: "0.8rem 1.2rem 0" }}>{label}</label>
                  <input type="text" placeholder={ph} style={{ background: "transparent", border: "none", outline: "none", color: "var(--text)", fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", padding: "0.5rem 1.2rem 1rem" }} />
                </div>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "var(--border)" }}>
              <div style={{ background: "var(--bg2)", display: "flex", flexDirection: "column" as const }}>
                <label style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.65rem", color: "var(--muted)", letterSpacing: "0.15em", textTransform: "uppercase" as const, padding: "0.8rem 1.2rem 0" }}>Email professionnel</label>
                <input type="email" placeholder="jean@acme.com" style={{ background: "transparent", border: "none", outline: "none", color: "var(--text)", fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", padding: "0.5rem 1.2rem 1rem" }} />
              </div>
              <div style={{ background: "var(--bg2)", display: "flex", flexDirection: "column" as const }}>
                <label style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.65rem", color: "var(--muted)", letterSpacing: "0.15em", textTransform: "uppercase" as const, padding: "0.8rem 1.2rem 0" }}>Type de prestation</label>
                <select style={{ background: "var(--bg)", border: "none", outline: "none", color: "var(--text)", fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", padding: "0.5rem 1.2rem 1rem", appearance: "none" as const }}>
                  <option value="">— Sélectionner —</option>
                  {services.map((s) => <option key={s.title}>{s.title}</option>)}
                </select>
              </div>
            </div>
            <div style={{ background: "var(--bg2)", display: "flex", flexDirection: "column" as const }}>
              <label style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.65rem", color: "var(--muted)", letterSpacing: "0.15em", textTransform: "uppercase" as const, padding: "0.8rem 1.2rem 0" }}>Contexte & périmètre</label>
              <textarea placeholder="Décrivez votre environnement, vos enjeux et contraintes..." rows={4} style={{ background: "transparent", border: "none", outline: "none", color: "var(--text)", fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", padding: "0.5rem 1.2rem 1rem", resize: "vertical" as const }} />
            </div>
            <button style={{ width: "100%", fontFamily: "'Share Tech Mono', monospace", fontSize: "0.85rem", padding: "1.2rem", background: "var(--accent)", color: "var(--bg)", border: "none", cursor: "pointer", letterSpacing: "0.15em", textTransform: "uppercase" as const, fontWeight: 700 }}>
              Envoyer la demande →
            </button>
          </div>
          <p style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.8rem", color: "var(--muted)", letterSpacing: "0.08em" }}>
            Ou contactez-nous : <a href="mailto:contact@fortissec.fr" style={{ color: "var(--accent2)", textDecoration: "none" }}>contact@fortissec.fr</a> — <a href="tel:+33123456789" style={{ color: "var(--accent2)", textDecoration: "none" }}>+33 1 23 45 67 89</a>
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "var(--bg)", borderTop: "1px solid var(--border)", padding: "2.5rem 4rem", display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative" as const, zIndex: 1 }}>
        <div>
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.2rem", marginBottom: "0.4rem" }}>
            FORTIS<span style={{ color: "var(--accent)" }}>SEC</span>
          </div>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.72rem", color: "var(--muted)" }}>© 2024 FORTiSSEC SAS — Tous droits réservés</div>
        </div>
        <div style={{ display: "flex", gap: "2rem" }}>
          {["Mentions légales", "Confidentialité", "CGV", "Contact"].map((l) => (
            <a key={l} href="#" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.72rem", color: "var(--muted)", textDecoration: "none", letterSpacing: "0.08em" }}>{l}</a>
          ))}
        </div>
      </footer>
    </>
  );
}
