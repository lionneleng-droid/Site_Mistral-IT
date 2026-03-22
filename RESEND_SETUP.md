# Configuration Resend - Guide d'installation

## ✅ Prérequis

- Node.js installé
- Resend déjà installé (`npm install resend`)
- Compte Resend créé (gratuit)

## 🚀 Configuration

### Étape 1: Créer un compte Resend

1. Allez sur [https://resend.com](https://resend.com)
2. Cliquez sur "Get started" 
3. Créez votre compte avec votre email

### Étape 2: Obtenir votre clé API

1. Connectez-vous à votre dashboard Resend
2. Allez à [https://resend.com/api-keys](https://resend.com/api-keys)
3. Cliquez sur "Create API Key"
4. Donnez-lui un nom (ex: "Mistral IT Audit")
5. Copiez la clé

### Étape 3: Configurer .env.local

Modifiez le fichier `.env.local` à la racine du projet:

```bash
RESEND_API_KEY=re_votre_clé_très_longue_ici
```

**Important**: 
- ⚠️ Ne jamais commiter ce fichier (il est dans .gitignore)
- ⚠️ Ne pas partager votre clé API publiquement
- ⚠️ Régénérez la clé si elle a été compromise

### Étape 4: Vérifier l'adresse email d'envoi

L'email est actuellement configuré pour envoyer depuis: `audit@mistral-it.fr`

Vous pouvez modifier cette adresse dans `app/api/audit-results/route.ts`:

```typescript
const result = await resend.emails.send({
  from: 'votre-email@mistral-it.fr',  // ← Changez ici
  to,
  subject,
  html: htmlContent,
});
```

## 🧪 Tester l'configuration

### Test local

1. Démarrez le serveur:
```bash
npm run dev
```

2. Allez sur http://localhost:3000
3. Cliquez sur "Découvrir votre type d'audit"
4. Remplissez le formulaire avec votre email
5. Complétez le questionnaire
6. Cliquez sur "Envoyer par email"

### Vérifier les logs

Dans le terminal où tourne `npm run dev`, vous verrez:
```
Email envoyé avec succès via Resend: {
  id: 'email_xxxxx',
  from: 'audit@mistral-it.fr',
  created_at: '2026-03-22T10:30:00.000Z'
}
```

## 📊 Dashboard Resend

Vous pouvez voir tous vos emails envoyés sur:
https://resend.com/emails

## 🔒 Limites gratuit Resend

- **Emails gratuits**: 100/jour en développement
- **Domaines**: Vous pouvez ajouter votre propre domaine en production
- **Support**: Document de support disponible

## 🐛 Dépannage

### "RESEND_API_KEY is not configured"

→ Vérifiez que `RESEND_API_KEY` est bien défini dans `.env.local`

### "Invalid API key"

→ La clé API est inexacte ou expirée
→ Régénérez une nouvelle clé sur https://resend.com/api-keys

### "Recipient is not valid"

→ L'email saisi par l'utilisateur n'est pas valide
→ Utilisez une vraie adresse email pour tester

### Email non reçu après 5 minutes

→ Vérifiez le dossier spam
→ Consultez les logs dans le dashboard Resend
→ Vérifiez l'adresse "from" est correcte

## 🎯 Utilisation en production

Pour la production:

1. **Ajouter domaine personnalisé**:
   - Allez dans https://resend.com/domains
   - Ajoutez `mistral-it.fr`
   - Suivez les instructions DNS

2. **Changer l'adresse "from"**:
   ```typescript
   from: 'audit@mistral-it.fr',  // Votre domaine
   ```

3. **Variables d'environnement**:
   - Configurez `RESEND_API_KEY` dans votre provider (Vercel, Netlify, etc.)
   - Ne commitez jamais les secrets

4. **Webhooks** (optionnel):
   - Vous pouvez configurer des webhooks pour suivre les événements d'email
   - Bounces, complaints, deliveries, etc.

## 📚 Documentation officielle

- [Resend Docs](https://resend.com/docs)
- [Email API Reference](https://resend.com/docs/api-reference/emails/send)
- [React Email Components](https://react.email/)

## ✨ Prochaines étapes

- Examiner les statistiques sur `/dashboard`
- Consultez [EMAIL_SETUP.md](EMAIL_SETUP.md) pour les alternatives (SendGrid, Nodemailer)
- Personnalisez le template d'email dans `app/api/audit-results/route.ts`
