// ── lib/data.ts
// Centralise toutes les données statiques du site Mistral IT

export const AUDITS = [
  {
    icon: "🔍",
    title: "Sécurité Applicative",
    description:
      "Tests d'intrusion, revue de code et conformité OWASP Top 10 sur vos applications web, mobiles et APIs.",
    tags: ["Pentest", "OWASP", "API"],
  },
  {
    icon: "🌐",
    title: "Infrastructure Réseau",
    description:
      "Évaluation de votre architecture réseau : firewalls, VPN, segmentation et cartographie des actifs critiques.",
    tags: ["Firewall", "VPN", "VLAN"],
  },
  {
    icon: "☁️",
    title: "Cloud & Conteneurisation",
    description:
      "Revue de votre configuration AWS, Azure ou GCP. Conformité CIS Benchmarks, IAM et sécurité Kubernetes.",
    tags: ["AWS", "Azure", "Kubernetes"],
  },
  {
    icon: "🛡️",
    title: "Conformité & RGPD",
    description:
      "Évaluation de votre conformité ISO 27001, RGPD et NIS2. Analyse des politiques et contrôles organisationnels.",
    tags: ["ISO 27001", "RGPD", "NIS2"],
  },
  {
    icon: "💻",
    title: "Active Directory & IAM",
    description:
      "Analyse de votre annuaire AD, GPO, délégations et comptes privilégiés. Détection des chemins d'escalade.",
    tags: ["Active Directory", "PAM", "GPO"],
  },
  {
    icon: "👥",
    title: "Posture & Sensibilisation",
    description:
      "Maturité cyber de votre organisation : phishing simulé, test des collaborateurs et revue des procédures.",
    tags: ["Phishing", "Awareness", "OSINT"],
  },
] as const;

export type Service = {
  icon: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  deliverables: string[];
};

export const SERVICES: Service[] = [
  {
    icon: "🔧",
    title: "Remediation & Hardening",
    shortDesc: "Correction et durcissement des systèmes",
    fullDesc:
      "Suite à l'audit, nous prenons en charge la correction des vulnérabilités identifiées. Nos ingénieurs appliquent les patchs de sécurité, durcissent les configurations (CIS Benchmarks, ANSSI) et vérifient chaque correction par re-test. Un rapport final atteste de la résolution de chaque point.",
    deliverables: [
      "Plan de remédiation priorisé (CVSS)",
      "Application des correctifs système",
      "Durcissement configuration (CIS/ANSSI)",
      "Re-test de validation post-correction",
      "Rapport de clôture signé",
    ],
  },
  {
    icon: "🏗️",
    title: "Architecture Sécurisée",
    shortDesc: "Zero Trust, DMZ, micro-segmentation",
    fullDesc:
      "Conception d'une architecture Zero Trust adaptée à votre organisation. Mise en place de micro-segmentation réseau, DMZ, contrôles d'accès granulaires et identité forte (MFA, PAM). Déploiement accompagné et transfert de compétences inclus.",
    deliverables: [
      "Schéma d'architecture cible",
      "Déploiement Zero Trust / DMZ",
      "Configuration MFA & PAM",
      "Micro-segmentation réseau",
      "Documentation technique complète",
    ],
  },
  {
    icon: "📡",
    title: "SOC & Supervision",
    shortDesc: "SIEM, détection et réponse aux incidents",
    fullDesc:
      "Déploiement d'un Security Operations Center adapté à votre taille. Intégration SIEM, création de règles de détection sur-mesure, playbooks d'incident et supervision continue par nos analystes certifiés.",
    deliverables: [
      "Déploiement SIEM / SOAR",
      "Règles de détection personnalisées",
      "Playbooks réponse incidents",
      "Tableaux de bord temps réel",
      "Supervision 24/7 (option)",
    ],
  },
  {
    icon: "🎓",
    title: "Formation & Transfert",
    shortDesc: "Montée en compétences de vos équipes",
    fullDesc:
      "Formations techniques sur la sécurité offensive et défensive pour vos équipes IT, et sessions de sensibilisation pour tous vos collaborateurs. Simulations de phishing et ateliers pratiques.",
    deliverables: [
      "Formation sécurité (équipes IT)",
      "Sensibilisation collaborateurs",
      "Campagnes phishing simulées",
      "E-learning sur-mesure",
      "Attestations de formation",
    ],
  },
  {
    icon: "🔄",
    title: "Plan de Continuité",
    shortDesc: "PCA, PRA, gestion de crise",
    fullDesc:
      "Élaboration complète de votre Plan de Continuité d'Activité et Plan de Reprise après Sinistre. Analyse d'impact (BIA), définition des RPO/RTO, tests réguliers et révision annuelle.",
    deliverables: [
      "Analyse d'impact (BIA)",
      "Rédaction PCA / PRA",
      "Définition RPO & RTO",
      "Tests de bascule et exercices",
      "Révision et mise à jour annuelle",
    ],
  },
];

export const STEPS = [
  {
    num: "01",
    title: "Qualification",
    description:
      "Analyse du périmètre, des enjeux métier et définition des objectifs avec vos équipes.",
  },
  {
    num: "02",
    title: "Reconnaissance",
    description:
      "Cartographie des actifs et identification de votre surface d'attaque réelle.",
  },
  {
    num: "03",
    title: "Analyse",
    description:
      "Tests techniques approfondis et évaluation des impacts potentiels sur votre activité.",
  },
  {
    num: "04",
    title: "Rapport",
    description:
      "Livraison d'un rapport détaillé avec synthèse executive et recommandations priorisées.",
  },
  {
    num: "05",
    title: "Mise en œuvre",
    description:
      "Déploiement des solutions correctives et validation finale par re-test complet.",
  },
] as const;

export const WHY_ITEMS = [
  {
    icon: "⚡",
    title: "Réactivité garantie",
    description:
      "Rapport préliminaire sous 48h, interlocuteur dédié tout au long de la mission.",
  },
  {
    icon: "🔒",
    title: "Confidentialité absolue",
    description:
      "NDA systématique, données traitées en France, zéro rétention sur vos environnements.",
  },
  {
    icon: "📊",
    title: "Approche orientée risque",
    description:
      "Nous priorisons par impact métier, pas seulement par score technique.",
  },
  {
    icon: "🌀",
    title: "Suivi post-mission",
    description:
      "3 mois de suivi inclus pour s'assurer de l'efficacité des mesures déployées.",
  },
] as const;

export const CERTS = [
  { name: "OSCP / OSEP", description: "Offensive Security Certified Professional" },
  { name: "CISSP", description: "Information Systems Security" },
  { name: "ISO 27001", description: "Lead Auditor certifié" },
  { name: "CEH / CPEH", description: "Certified Ethical Hacker" },
  { name: "ANSSI PASSI", description: "Prestataire d'Audit SSI" },
  { name: "NIS2 / RGPD", description: "Conformité réglementaire" },
] as const;

export const STATS = [
  { value: "200+", label: "Audits réalisés" },
  { value: "98%", label: "Satisfaction client" },
  { value: "12 ans", label: "d'expertise terrain" },
] as const;

export const AUDIT_PROGRESS = [
  { label: "Analyse réseau", pct: 100 },
  { label: "Tests de vulnérabilités", pct: 87 },
  { label: "Audit Active Directory", pct: 64 },
  { label: "Conformité RGPD", pct: 41 },
] as const;

export const SELECT_OPTIONS = [
  "Audit sécurité applicative",
  "Audit infrastructure réseau",
  "Audit Cloud",
  "Audit conformité RGPD/NIS2",
  "Audit Active Directory",
  "Mise en œuvre de solutions",
  "Formation & sensibilisation",
] as const;
