import { NextRequest, NextResponse } from 'next/server';
import { Resend as ResendClient } from 'resend';

interface AuditResult {
  nom: string;
  prenom: string;
  email: string;
  societe: string;
  type_audit: string;
  scores: {
    infra: number;
    ad: number;
    securite: number;
    reseaux: number;
    autres: number;
  };
  date: string;
}

async function sendEmail(to: string, subject: string, htmlContent: string) {
  const resend = new ResendClient(process.env.RESEND_API_KEY);
  const result = await resend.emails.send({
    from: 'Mistral-IT <contact@mistral-it.fr>',
    to,
    subject,
    html: htmlContent,
  });
  return result;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nom, prenom, email, societe, type_audit, scores } = body;

    if (!nom || !prenom || !email || !societe || !type_audit || !scores) {
      return NextResponse.json({ error: 'Données manquantes' }, { status: 400 });
    }

    const date = new Date().toLocaleString('fr-FR');

    const clientEmailContent = `
      <!DOCTYPE html>
      <html lang="fr">
        <head><meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; color: #333; }
            .container { max-width: 600px; margin: 0 auto; background: #f7f5f2; padding: 20px; border-radius: 8px; }
            .header { background: linear-gradient(135deg, #3b82f6 0%, #0ea5e9 100%); color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
            .content { background: white; padding: 20px; border-radius: 8px; }
            .result-box { background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%); color: white; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; }
            .result-box h2 { margin: 0; font-size: 28px; }
            .scores { background: #f7f5f2; padding: 15px; border-radius: 8px; margin: 15px 0; }
            .score-item { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e4e8ef; }
            .footer { text-align: center; color: #3a4a63; font-size: 12px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Diagnostic d'Audit Personnalisé</h1>
              <p>Mistral IT - Votre sécurité, notre priorité</p>
            </div>
            <div class="content">
              <p>Bonjour <strong>${prenom} ${nom}</strong>,</p>
              <p>Nous avons bien reçu vos réponses au diagnostic d'audit. Voici vos résultats :</p>
              <p><strong>Entreprise :</strong> ${societe}</p>
              <p><strong>Date :</strong> ${date}</p>
              <div class="result-box">
                <p style="margin: 0 0 10px; opacity: 0.9;">Audit recommandé</p>
                <h2>${type_audit}</h2>
              </div>
              <h3>Analyse détaillée :</h3>
              <div class="scores">
                <div class="score-item"><span>Infrastructure</span><strong>${scores.infra}/3</strong></div>
                <div class="score-item"><span>Active Directory</span><strong>${scores.ad}/3</strong></div>
                <div class="score-item"><span>Sécurité</span><strong>${scores.securite}/3</strong></div>
                <div class="score-item"><span>Réseaux</span><strong>${scores.reseaux}/3</strong></div>
                <div class="score-item" style="border-bottom: none;"><span>Autres besoins</span><strong>${scores.autres}/3</strong></div>
              </div>
              <p>Basé sur vos réponses, nous avons identifié que votre entreprise bénéficierait d'un audit approfondi sur cet aspect spécifique de votre infrastructure informatique.</p>
              <p><strong>Notre équipe d'experts est prête à vous accompagner pour :</strong></p>
              <ul>
                <li>Évaluer votre situation actuelle</li>
                <li>Identifier les vulnérabilités et risques</li>
                <li>Proposer des solutions adaptées à votre contexte</li>
                <li>Mettre en place un plan d'amélioration</li>
              </ul>
              <p style="text-align: center; margin-top: 30px;">
                <a href="https://www.mistral-it.fr/#contact" style="background: #3b82f6; color: white; padding: 12px 30px; border-radius: 8px; text-decoration: none; display: inline-block;">
                  Contacter un expert
                </a>
              </p>
            </div>
            <div class="footer">
              <p>© 2026 Mistral IT - Tous droits réservés</p>
              <p>Vous avez reçu cet email car vous avez complété le diagnostic d'audit sur notre site.</p>
            </div>
          </div>
        </body>
      </html>`;

    const internalEmailContent = `
      <!DOCTYPE html>
      <html lang="fr">
        <head><meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; color: #333; }
            .container { max-width: 600px; margin: 0 auto; background: #f7f5f2; padding: 20px; border-radius: 8px; }
            .header { background: #1a2235; color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
            .content { background: white; padding: 20px; border-radius: 8px; }
            .scores { background: #f7f5f2; padding: 15px; border-radius: 8px; margin: 15px 0; }
            .score-item { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e4e8ef; }
            .badge { display: inline-block; background: #3b82f6; color: white; padding: 6px 14px; border-radius: 20px; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin:0;">📋 Nouveau diagnostic reçu</h1>
              <p style="margin:5px 0 0; opacity:0.8;">${date}</p>
            </div>
            <div class="content">
              <p><strong>Client :</strong> ${prenom} ${nom}</p>
              <p><strong>Email :</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>Société :</strong> ${societe}</p>
              <p><strong>Audit recommandé :</strong> <span class="badge">${type_audit}</span></p>
              <h3>Scores :</h3>
              <div class="scores">
                <div class="score-item"><span>Infrastructure</span><strong>${scores.infra}/3</strong></div>
                <div class="score-item"><span>Active Directory</span><strong>${scores.ad}/3</strong></div>
                <div class="score-item"><span>Sécurité</span><strong>${scores.securite}/3</strong></div>
                <div class="score-item"><span>Réseaux</span><strong>${scores.reseaux}/3</strong></div>
                <div class="score-item" style="border-bottom: none;"><span>Autres besoins</span><strong>${scores.autres}/3</strong></div>
              </div>
            </div>
          </div>
        </body>
      </html>`;

    // Envoi des deux emails en parallèle
    await Promise.all([
      sendEmail(email, `Résultat de votre diagnostic - ${type_audit}`, clientEmailContent),
      sendEmail('contact@mistral-it.fr', `[Diagnostic] ${prenom} ${nom} - ${societe} - ${type_audit}`, internalEmailContent),
    ]);

    return NextResponse.json({ success: true, message: 'Résultat envoyé avec succès' });
  } catch (error) {
    console.error('Erreur:', error);
    return NextResponse.json({ error: "Erreur lors de l'envoi du résultat" }, { status: 500 });
  }
}