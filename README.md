# Mistral IT — Site Vitrine Next.js

Site vitrine professionnel pour une société d'audit de sécurité et d'infrastructure IT.

## Stack

- **Next.js 14** — App Router
- **TypeScript** — typage strict
- **Tailwind CSS** — utility-first styling
- **next/font** — Google Fonts optimisées (Playfair Display + Outfit)

## Démarrage rapide

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Structure du projet

```
mistral-it/
├── app/
│   ├── layout.tsx        # Root layout, metadata, fonts
│   ├── page.tsx          # Page principale (assemblage des sections)
│   └── globals.css       # Variables CSS, animations, Tailwind
├── components/
│   ├── Navbar.tsx         # Navigation fixe + burger mobile
│   ├── HeroSection.tsx    # Hero + carte audit animée
│   ├── AuditsSection.tsx  # Grille de 6 types d'audits
│   ├── ServicesSection.tsx # Sélecteur interactif de prestations
│   ├── ProcessSection.tsx  # Timeline 5 étapes
│   ├── WhySection.tsx     # Avantages + certifications
│   ├── ContactSection.tsx  # Formulaire avec état (submitted)
│   ├── Footer.tsx          # Pied de page
│   └── ScrollReveal.tsx    # Client component : IntersectionObserver
├── lib/
│   └── data.ts            # Toutes les données statiques centralisées
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

## Design

Esthétique **sobre et institutionnelle** :
- Fond blanc cassé chaud `#f7f5f2` · Blanc pur `#ffffff`
- Bleu ardoise profond `#1a2235` (textes, CTA)
- Bleu ciel `#3b82f6` (accents, liens, hover)
- Typo : **Playfair Display** (titres serif élégants) + **Outfit** (corps moderne)
- Animations légères : fadeUp au chargement, scroll-reveal sur les cartes

## Personnalisation

- **Contenu** : modifier `lib/data.ts` pour changer audits, services, certifications, etc.
- **Couleurs** : ajuster les variables dans `app/globals.css` et `tailwind.config.ts`
- **Formulaire** : brancher `ContactSection.tsx` sur votre API dans `handleSubmit`
- **SEO** : adapter `metadata` dans `app/layout.tsx`
