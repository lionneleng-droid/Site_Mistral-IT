// ── lib/data.ts
// Centralise toutes les données statiques du site Mistral IT

export const AUDITS = [
  {
    icon: "🏗️",
    title: "Audit Infrastructure",
    description:
      "Analyse complète de votre infrastructure : virtualisation, stockage, datacenters et architectures hybrides. Identification des points de défaillance et optimisation des performances.",
    tags: ["Virtualisation", "Stockage", "Datacenters"],
  },
  {
    icon: "🌐",
    title: "Audit Réseau & Sécurité",
    description:
      "Évaluation approfondie de votre architecture réseau : firewalls, VPN, segmentation, micro-segmentation et cartographie des flux critiques.",
    tags: ["Firewall", "VPN", "Segmentation", "VLAN"],
  },
  {
    icon: "💻",
    title: "Audit Serveurs & Postes de travail",
    description:
      "Durcissement des serveurs (Windows/Linux), gestion des correctifs, configurations de sécurité et conformité CIS Benchmarks.",
    tags: ["Windows", "Linux", "Hardening"],
  },
  {
    icon: "☁️",
    title: "Audit Infrastructure Cloud",
    description:
      "Revue de votre environnement AWS, Azure ou GCP : conformité CIS Benchmarks, IAM, sécurité réseau et optimisation des coûts.",
    tags: ["AWS", "Azure", "GCP"],
  },
] as const;

export type Service = {
  icon: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  deliverables: string[];
  image: string; // Nouveau champ pour l'image de fond
};

export const SERVICES: Service[] = [
  {
    icon: "🔧",
    title: "Remediation & Hardening",
    shortDesc: "Correction et durcissement des systèmes",
    fullDesc:
      "Suite à l'audit, je prends en charge la correction des vulnérabilités identifiées. J'applique les patchs de sécurité, durcis les configurations (CIS Benchmarks, ANSSI) et vérifie chaque correction par re-test. Un rapport final atteste de la résolution de chaque point.",
    deliverables: [
      "Plan de remédiation priorisé",
      "Application des correctifs système",
      "Durcissement configuration (CIS/ANSSI)",
      "Re-test de validation post-correction",
      "Rapport de clôture signé",
    ],
    image: "/images/remediation.png", // Image pour cette prestation
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
    image: "/images/architecture.jpg", // Image pour cette prestation
  },
  {
    icon: "📡",
    title: "SOC & Supervision",
    shortDesc: "SIEM, détection et réponse aux incidents",
    fullDesc:
      "Déploiement d'un Security Operations Center adapté à votre taille. Intégration SIEM, création de règles de détection sur-mesure, remontées d'incidents et supervision continue.",
    deliverables: [
      "Règles de détection personnalisées",
      "Remontées d'incidents",
      "Antivirus & EDR monitorés",
      "Tableaux de bord temps réel",
      "Supervision 24/7 (option)",
    ],
    image: "/images/soc.jpg", // Image pour cette prestation
  },
  {
  icon: "💾",
  title: "Sauvegarde & Restauration",
  shortDesc: "Backup, restauration, résilience des données",
  fullDesc:
    "Audit et mise en place de stratégies de sauvegarde robustes selon la règle 3-2-1. Vérification de l'intégrité des sauvegardes, tests de restauration réguliers ou sur demande et protection contre le chiffrement par ransomware.",
  deliverables: [
    "Audit de l'existant et des gaps",
    "Mise en œuvre de la règle 3-2-1 selon besoin",
    "Tests de restauration documentés",
    "Protection anti-ransomware (sauvegardes immuables)",
    "Déploiement de solutions de sauvegarde adaptées",
  ],
  image: "/images/sauvegarde.png",
  },
  {
    icon: "🔄",
    title: "Plan de Continuité",
    shortDesc: "PCA, PRA, gestion de crise",
    fullDesc:
      "Élaboration complète de votre Plan de Continuité d'Activité et Plan de Reprise après Sinistre. Analyse d'impact (BIA), tests réguliers et révision annuelle.",
    deliverables: [
      "Analyse d'impact métier",
      "Rédaction PCA / PRA",
      "Tests de bascule et exercices",
      "Révision et mise à jour annuelle",
    ],
    image: "/images/continuite.png", // Image pour cette prestation
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
      "Livraison d'un rapport détaillé avec synthèse executive, schémas et recommandations priorisées.",
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
      "Rapport préliminaire sous 72h, interlocuteur unique tout au long de la mission.",
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
      "Je priorise par impact métier, pas seulement par score technique.",
  },
  {
    icon: "🌀",
    title: "Suivi post-mission",
    description:
      "3 mois de suivi inclus pour s'assurer de l'efficacité des mesures déployées.",
  },
] as const;

export const STATS = [
  { value: "40+", label: "Audits réalisés" },
  { value: "4H", label: "Temps moyen par audit" },
  { value: "48H", label: "Délai moyen de réponse" },
  { value: "72H", label: "Délai moyen des retours d'audits" },
  { value: "6 ans", label: "d'expertise terrain" },
] as const;

export const AUDIT_PROGRESS = [
  { label: "Analyse infrastructure", pct: 100 },
  { label: "Tests réseau", pct: 87 },
  { label: "Audit serveurs", pct: 100 },
  { label: "Conformité réglementaire", pct: 41 },
] as const;

export const SELECT_OPTIONS = [
  "Audit infrastructure",
  "Audit réseau et sécurité",
  "Audit serveurs et poste de travail",
  "Audit Personnalisé",
  "Demande de renseignements",
] as const;