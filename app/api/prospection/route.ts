import { NextRequest, NextResponse } from 'next/server';
import { Resend as ResendClient } from 'resend';

type TypeMail = 'premier-contact' | 'relance' | 'rdv';

function buildEmailContent(
  type: TypeMail,
  prenom: string,
  nom: string,
  societe: string
): { subject: string; html: string } {
  const signature = `
    <div style="margin-top:32px; padding-top:20px; border-top:1px solid #e4e8ef; font-size:13px; color:#8492a6;">
      <strong style="color:#1a2235;">Alexandre Brière</strong><br>
      Consultant IT & Sécurité — Mistral IT<br>
      📞 +33 6 42 03 17 54 &nbsp;|&nbsp; ✉️ contact@mistral-it.fr<br>
      🌐 <a href="https://www.mistral-it.fr" style="color:#3b82f6; text-decoration:none;">www.mistral-it.fr</a>
    </div>
  `;

  const base = (content: string) => `
    <!DOCTYPE html>
    <html lang="fr">
      <head><meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0; background: #f7f5f2; }
          .container { max-width: 600px; margin: 30px auto; background: #f7f5f2; padding: 20px; border-radius: 12px; }
          .header { background: linear-gradient(135deg, #1a2235 0%, #3a4a63 100%); color: white; padding: 24px 28px; border-radius: 10px; margin-bottom: 20px; }
          .header h1 { margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.3px; }
          .header p { margin: 6px 0 0; font-size: 13px; opacity: 0.7; }
          .content { background: white; padding: 28px; border-radius: 10px; line-height: 1.7; font-size: 15px; color: #1a2235; }
          .highlight { background: #eff6ff; border-left: 3px solid #3b82f6; padding: 14px 18px; border-radius: 0 8px 8px 0; margin: 20px 0; color: #1a2235; font-size: 14px; }
          .cta { display: inline-block; background: linear-gradient(135deg, #3b82f6 0%, #0ea5e9 100%); color: white; padding: 13px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; margin: 22px 0; font-size: 14px; }
          .footer { text-align: center; color: #8492a6; font-size: 11px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Mistral IT</h1>
            <p>Audits Sécurité & Infrastructure — Vaucluse</p>
          </div>
          <div class="content">
            ${content}
            ${signature}
          </div>
          <div class="footer">© 2026 Mistral IT — Tous droits réservés</div>
        </div>
      </body>
    </html>
  `;

  if (type === 'premier-contact') {
    return {
      subject: `Sécurité informatique de ${societe} — Mistral IT`,
      html: base(`
        <p>Bonjour ${prenom},</p>
        <p>Je me permets de vous contacter au sujet de la sécurité informatique de <strong>${societe}</strong>.</p>
        <p>Je suis consultant IT indépendant basé en Vaucluse. Chez <strong>Mistral IT</strong>, j'accompagne les entreprises dans l'audit et la sécurisation de leurs systèmes d'information : infrastructure, réseau, Active Directory, postes de travail.</p>
        <div class="highlight">
          <strong>Pourquoi un audit ?</strong><br>
          43 % des cyberattaques ciblent aujourd'hui les PME. Un audit permet d'identifier les vulnérabilités avant qu'elles deviennent des incidents coûteux — et de répondre aux obligations réglementaires (NIS2, RGPD).
        </div>
        <p>Je propose un <strong>premier échange gratuit de 30 minutes</strong> pour comprendre votre contexte et vous donner un avis technique sans engagement.</p>
        <p>Seriez-vous disponible cette semaine ou la semaine prochaine pour un appel ?</p>
        <a href="mailto:contact@mistral-it.fr" class="cta">Répondre à ce message</a>
        <p style="font-size:14px; color:#8492a6;">Bien cordialement,</p>
      `),
    };
  }

  if (type === 'relance') {
    return {
      subject: `Suite à notre contact — ${societe} / Mistral IT`,
      html: base(`
        <p>Bonjour ${prenom},</p>
        <p>Je me permets de revenir vers vous suite à mon précédent message concernant la sécurité informatique de <strong>${societe}</strong>.</p>
        <p>Je comprends que vous êtes certainement très sollicité, aussi je voulais simplement m'assurer que mon message vous avait bien atteint et vérifier si le sujet de la sécurité IT était d'actualité pour vous.</p>
        <div class="highlight">
          Notre approche est simple : un <strong>diagnostic initial gratuit</strong>, sans engagement, qui vous donne en 30 minutes une vision claire de vos risques prioritaires.
        </div>
        <p>Si ce n'est pas le bon moment, n'hésitez pas à me le faire savoir — je prendrai note et reviendrai vers vous ultérieurement.</p>
        <p>Dans le cas contraire, je reste à votre disposition pour un échange rapide à votre convenance.</p>
        <a href="mailto:contact@mistral-it.fr" class="cta">Répondre à ce message</a>
        <p style="font-size:14px; color:#8492a6;">Bien cordialement,</p>
      `),
    };
  }

  // rdv
  return {
    subject: `Proposition de rendez-vous — Mistral IT × ${societe}`,
    html: base(`
      <p>Bonjour ${prenom},</p>
      <p>Je souhaitais vous proposer un rendez-vous afin d'échanger sur la sécurité informatique de <strong>${societe}</strong> et voir comment <strong>Mistral IT</strong> pourrait vous accompagner.</p>
      <p>Cet échange de <strong>30 à 45 minutes</strong> nous permettrait de :</p>
      <ul style="padding-left:18px; color:#3a4a63;">
        <li>Faire le point sur votre infrastructure et votre niveau d'exposition actuel</li>
        <li>Identifier les axes d'amélioration prioritaires</li>
        <li>Vous présenter nos offres d'audit adaptées à votre contexte</li>
      </ul>
      <div class="highlight">
        <strong>Format proposé :</strong> visioconférence (Teams / Google Meet) ou déplacement sur site en Vaucluse — selon votre préférence.
      </div>
      <p>Seriez-vous disponible dans les prochains jours ? Je m'adapte à vos créneaux.</p>
      <a href="mailto:contact@mistral-it.fr" class="cta">Confirmer un créneau</a>
      <p style="font-size:14px; color:#8492a6;">Dans l'attente de votre retour,</p>
    `),
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nom, prenom, email, societe, type_mail } = body as {
      nom: string;
      prenom: string;
      email: string;
      societe: string;
      type_mail: TypeMail;
    };

    if (!nom || !prenom || !email || !societe || !type_mail) {
      return NextResponse.json({ error: 'Données manquantes' }, { status: 400 });
    }

    const validTypes: TypeMail[] = ['premier-contact', 'relance', 'rdv'];
    if (!validTypes.includes(type_mail)) {
      return NextResponse.json({ error: 'Type de mail invalide' }, { status: 400 });
    }

    const resend = new ResendClient(process.env.RESEND_API_KEY);
    const { subject, html } = buildEmailContent(type_mail, prenom, nom, societe);

    const result = await resend.emails.send({
      from: 'Mistral IT <contact@mistral-it.fr>',
      to: email,
      subject,
      html,
    });

    if (result.error) {
      return NextResponse.json({ error: result.error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: result.data?.id });
  } catch (err) {
    console.error('[prospection] Erreur:', err);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}
