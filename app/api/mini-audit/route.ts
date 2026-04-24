import { NextRequest, NextResponse } from 'next/server';
import { Resend as ResendClient } from 'resend';

interface LeadInfo {
  nom: string;
  prenom: string;
  email: string;
  societe: string;
}

interface AnswerItem {
  question: string;
  answer: string;
}

interface MiniAuditPayload extends LeadInfo {
  answers: AnswerItem[];
  scores: {
    ad: number;
    reseau: number;
    securite: number;
  };
  recommendation: string;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function renderAnswersRows(answers: AnswerItem[]) {
  return answers
    .map(
      (item, index) => `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #e4e8ef; vertical-align: top;"><strong>Q${index + 1}</strong></td>
          <td style="padding: 10px; border-bottom: 1px solid #e4e8ef; vertical-align: top;">${escapeHtml(item.question)}</td>
          <td style="padding: 10px; border-bottom: 1px solid #e4e8ef; vertical-align: top;">${escapeHtml(item.answer)}</td>
        </tr>`
    )
    .join('');
}

async function sendEmail(to: string, subject: string, html: string) {
  const resend = new ResendClient(process.env.RESEND_API_KEY);
  return resend.emails.send({
    from: 'Mistral-IT <contact@mistral-it.fr>',
    to,
    subject,
    html,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as MiniAuditPayload;

    const { nom, prenom, email, societe, answers, scores, recommendation } = body;

    if (!nom || !prenom || !email || !societe || !answers || !scores || !recommendation) {
      return NextResponse.json({ error: 'Données manquantes' }, { status: 400 });
    }

    if (!Array.isArray(answers) || answers.length !== 10) {
      return NextResponse.json({ error: 'Le mini audit doit contenir 10 réponses.' }, { status: 400 });
    }

    const date = new Date().toLocaleString('fr-FR');

    const answersRows = renderAnswersRows(answers);

    const clientEmail = `
      <!DOCTYPE html>
      <html lang="fr">
        <head><meta charset="UTF-8" /></head>
        <body style="font-family: Arial, sans-serif; background: #f7f5f2; margin: 0; padding: 24px; color: #1a2235;">
          <div style="max-width: 680px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e4e8ef; overflow: hidden;">
            <div style="padding: 24px; background: linear-gradient(135deg,#3b82f6 0%,#0ea5e9 100%); color: #fff;">
              <h1 style="margin:0; font-size: 24px;">Mini audit SI - Résultats</h1>
              <p style="margin: 8px 0 0; opacity: 0.95;">Merci ${escapeHtml(prenom)} ${escapeHtml(nom)}, votre audit a bien été enregistré.</p>
            </div>

            <div style="padding: 24px;">
              <p style="margin-top: 0;"><strong>Entreprise :</strong> ${escapeHtml(societe)}</p>
              <p><strong>Date :</strong> ${date}</p>

              <div style="margin: 20px 0; padding: 18px; border-radius: 10px; background: #eff6ff; border: 1px solid #bfdbfe;">
                <p style="margin: 0 0 6px; font-size: 13px; color: #1e3a8a; text-transform: uppercase; letter-spacing: .5px;">Recommandation principale</p>
                <h2 style="margin: 0; font-size: 22px; color: #1d4ed8;">${escapeHtml(recommendation)}</h2>
              </div>

              <p style="margin-bottom: 8px;"><strong>Scores:</strong></p>
              <ul style="margin-top: 0; color: #3a4a63;">
                <li>Accès AD: <strong>${scores.ad}</strong></li>
                <li>Réseau: <strong>${scores.reseau}</strong></li>
                <li>Sécurité: <strong>${scores.securite}</strong></li>
              </ul>

              <p>Un expert Mistral IT peut vous aider à transformer ces résultats en plan d'actions concret.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const internalEmail = `
      <!DOCTYPE html>
      <html lang="fr">
        <head><meta charset="UTF-8" /></head>
        <body style="font-family: Arial, sans-serif; background: #f7f5f2; margin: 0; padding: 24px; color: #1a2235;">
          <div style="max-width: 860px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e4e8ef; overflow: hidden;">
            <div style="padding: 24px; background: #1a2235; color: #fff;">
              <h1 style="margin:0; font-size: 24px;">Nouveau mini audit SI</h1>
              <p style="margin: 8px 0 0; opacity: 0.85;">${date}</p>
            </div>

            <div style="padding: 24px;">
              <p><strong>Nom:</strong> ${escapeHtml(prenom)} ${escapeHtml(nom)}</p>
              <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
              <p><strong>Société:</strong> ${escapeHtml(societe)}</p>
              <p><strong>Recommandation:</strong> ${escapeHtml(recommendation)}</p>

              <div style="margin: 20px 0; padding: 16px; background: #f8fbff; border: 1px solid #dbeafe; border-radius: 10px;">
                <strong>Scores:</strong>
                <ul style="margin-bottom: 0; color: #3a4a63;">
                  <li>Accès AD: <strong>${scores.ad}</strong></li>
                  <li>Réseau: <strong>${scores.reseau}</strong></li>
                  <li>Sécurité: <strong>${scores.securite}</strong></li>
                </ul>
              </div>

              <table style="width:100%; border-collapse: collapse; font-size: 14px;">
                <thead>
                  <tr>
                    <th style="text-align:left; padding:10px; border-bottom:2px solid #dbeafe;">#</th>
                    <th style="text-align:left; padding:10px; border-bottom:2px solid #dbeafe;">Question</th>
                    <th style="text-align:left; padding:10px; border-bottom:2px solid #dbeafe;">Réponse</th>
                  </tr>
                </thead>
                <tbody>
                  ${answersRows}
                </tbody>
              </table>
            </div>
          </div>
        </body>
      </html>
    `;

    await Promise.all([
      sendEmail(email, 'Votre mini audit Mistral IT', clientEmail),
      sendEmail('contact@mistral-it.fr', `[Mini Audit] ${prenom} ${nom} - ${societe}`, internalEmail),
    ]);

    return NextResponse.json({ success: true, message: 'Mini audit envoyé.' });
  } catch (error) {
    console.error('Erreur mini audit:', error);
    return NextResponse.json({ error: "Erreur lors de l'envoi du mini audit." }, { status: 500 });
  }
}
