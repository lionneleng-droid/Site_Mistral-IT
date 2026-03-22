# Configuration de l'envoi d'email pour les résultats d'audit

## Vue d'ensemble

Le système d'audit capture automatiquement les résultats des diagnostics et les enregistre. Pour activer l'envoi d'emails :

## Option 1: Resend (Recommandé pour production)

### Installation

```bash
npm install resend
```

### Configuration de l'API

Modifiez `app/api/audit-results/route.ts` et remplacez la fonction `sendEmail` :

```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail(to: string, subject: string, htmlContent: string) {
  try {
    const result = await resend.emails.send({
      from: 'Mistral IT <audit@mistral-it.fr>',
      to,
      subject,
      html: htmlContent,
    });
    return result;
  } catch (error) {
    console.error('Erreur Resend:', error);
    throw error;
  }
}
```

### Variables d'environnement

Ajoutez à `.env.local`:
```
RESEND_API_KEY=votre_clé_api_resend
```

## Option 2: SendGrid

### Installation

```bash
npm install @sendgrid/mail
```

### Configuration de l'API

```typescript
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(to: string, subject: string, htmlContent: string) {
  try {
    await sgMail.send({
      to,
      from: 'audit@mistral-it.fr',
      subject,
      html: htmlContent,
    });
  } catch (error) {
    console.error('Erreur SendGrid:', error);
    throw error;
  }
}
```

### Variables d'environnement

```
SENDGRID_API_KEY=votre_clé_api_sendgrid
```

## Option 3: Nodemailer (SMTP simple)

### Installation

```bash
npm install nodemailer
```

### Configuration de l'API

```typescript
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

async function sendEmail(to: string, subject: string, htmlContent: string) {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to,
      subject,
      html: htmlContent,
    });
  } catch (error) {
    console.error('Erreur Nodemailer:', error);
    throw error;
  }
}
```

### Variables d'environnement

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=votre_email@gmail.com
SMTP_PASSWORD=votre_mot_de_passe
SMTP_FROM=audit@mistral-it.fr
```

## Stockage des données

Les résultats sont automatiquement sauvegardés dans:
- **Fichier local**: `data/audit-results.json` (développement)
- **Suggestion production**: Utiliser une base de données (MongoDB, PostgreSQL, etc.)

### Modifier le stockage pour MongoDB:

```typescript
// app/api/audit-results/route.ts
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);

async function saveResults(result: AuditResult) {
  const db = client.db('mistral-it');
  const collection = db.collection('audit-results');
  await collection.insertOne(result);
}
```

## Dashboard d'administration

Accédez au tableau de bord à: `/dashboard`

Le dashboard affiche:
- ✓ Total de diagnostics complétés
- ✓ Nombre d'entreprises
- ✓ Répartition par type d'audit
- ✓ Historique des 50 derniers résultats

### Sécuriser le dashboard

Pour la production, ajoutez une authentification:

```typescript
// app/dashboard/page.tsx
import { redirect } from 'next/navigation';

export default function DashboardPage() {
  const token = process.env.DASHBOARD_TOKEN;
  
  // Vérifier l'authentification si nécessaire
  
  return <AuditStatsDashboard />;
}
```

## Tester en local

1. Les résultats sont stockés dans `data/audit-results.json`
2. Les emails ne sont pas réellement envoyés en développement (console logs uniquement)
3. Pour activez les vrais emails, configurez une des options ci-dessus

## Variables d'environnement de base

Créez `.env.local`:

```
# Email (choisissez une option)
RESEND_API_KEY=
# OU
SENDGRID_API_KEY=
# OU
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=

# Dashboard (optionnel)
DASHBOARD_TOKEN=secrettoken123
```

## Support

Pour des questions sur la configuration, consultez la documentation des services:
- [Resend](https://resend.com)
- [SendGrid](https://sendgrid.com)
- [Nodemailer](https://nodemailer.com)
