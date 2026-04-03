import { NextRequest, NextResponse } from 'next/server';
import { Resend as ResendClient } from 'resend';

type TypeMail = 'premier-contact' | 'relance' | 'rdv';

const LOGO_URL = 'https://www.mistral-it.fr/images/Logo-blanc.png';

// ── Composants HTML compatibles Outlook (table-based, styles 100 % inline) ────

/** Encadré bleu avec bordure gauche */
function highlight(text: string): string {
  return `<table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:20px 0;"><tr>
    <td width="3" bgcolor="#3b82f6" style="background-color:#3b82f6;font-size:0;line-height:0;">&nbsp;</td>
    <td bgcolor="#eff6ff" style="background-color:#eff6ff;padding:14px 18px;font-family:Arial,sans-serif;font-size:14px;color:#1a2235;line-height:1.7;">${text}</td>
  </tr></table>`;
}

/** Bouton CTA — bgcolor attribut pour Outlook Word */
function ctaButton(label: string, href: string): string {
  return `<table cellpadding="0" cellspacing="0" border="0" style="margin:24px 0;"><tr>
    <td bgcolor="#3b82f6" style="background-color:#3b82f6;padding:13px 28px;">
      <a href="${href}" style="color:#ffffff;font-family:Arial,sans-serif;font-size:14px;font-weight:bold;text-decoration:none;white-space:nowrap;display:inline-block;">${label}</a>
    </td>
  </tr></table>`;
}

/** Signature expéditeur */
const signature = `<table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:28px;"><tr>
  <td style="border-top:1px solid #e4e8ef;padding-top:20px;font-family:Arial,sans-serif;font-size:13px;color:#8492a6;line-height:1.7;">
    <strong style="color:#1a2235;display:block;font-size:14px;">Lionnel ENG</strong>
    Fondateur — Mistral IT<br>
    +33 6 42 03 17 54 &nbsp;|&nbsp; contact@mistral-it.fr<br>
    <a href="https://www.mistral-it.fr" style="color:#3b82f6;text-decoration:none;">www.mistral-it.fr</a>
  </td>
</tr></table>`;

/** Gabarit principal compatbile Outlook */
function base(content: string): string {
  return `<!DOCTYPE html>
<html lang="fr" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#f7f5f2;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f7f5f2" style="background-color:#f7f5f2;">
  <tr><td align="center" style="padding:30px 16px;">

    <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">

      <!-- HEADER -->
      <tr>
        <td bgcolor="#1a2235" style="background-color:#1a2235;padding:28px 32px 22px 32px;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr><td>
              <img src="${LOGO_URL}" alt="Mistral IT" width="140" border="0"
                   style="display:block;border:0;outline:none;max-width:140px;height:auto;" />
            </td></tr>
            <tr><td style="padding-top:10px;font-family:Arial,sans-serif;font-size:12px;color:#8fa8c8;line-height:1.4;">
              Audits Sécurité &amp; Infrastructure — Vaucluse
            </td></tr>
          </table>
        </td>
      </tr>

      <!-- CORPS -->
      <tr>
        <td bgcolor="#ffffff" style="background-color:#ffffff;padding:32px;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
            <td style="font-family:Arial,sans-serif;font-size:15px;color:#1a2235;line-height:1.7;">
              ${content}
              ${signature}
            </td>
          </tr></table>
        </td>
      </tr>

      <!-- FOOTER -->
      <tr>
        <td style="padding:20px 32px;text-align:center;font-family:Arial,sans-serif;font-size:11px;color:#8492a6;">
          &copy; 2026 Mistral IT — Tous droits réservés
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;
}

// ── Contenus par type ──────────────────────────────────────────────────────────

function buildEmailContent(
  type: TypeMail,
  prenom: string,
  nom: string,
  societe: string
): { subject: string; html: string } {

  if (type === 'premier-contact') {
    return {
      subject: `Sécurité informatique de ${societe} — Mistral IT`,
      html: base(`
        <p style="margin:0 0 16px;">Bonjour ${prenom},</p>
        <p style="margin:0 0 16px;">Je me permets de vous contacter au sujet de la sécurité informatique de <strong>${societe}</strong>.</p>
        <p style="margin:0 0 16px;">Je suis consultant IT indépendant basé en Vaucluse. Chez <strong>Mistral IT</strong>, j'accompagne les entreprises dans l'audit, la sécurisation et l'évolution de leurs systèmes d'information : infrastructure, réseau, Active Directory, postes de travail.</p>
        ${highlight('<strong>Pourquoi un audit ?</strong><br>43&nbsp;% des cyberattaques ciblent aujourd\'hui les PME. Un audit permet d\'identifier les vulnérabilités avant qu\'elles deviennent des incidents coûteux — et de répondre aux obligations réglementaires (NIS2, RGPD).')}
        <p style="margin:0 0 16px;">Je propose un <strong>premier échange gratuit de 30 minutes</strong> pour comprendre votre contexte et vous donner un avis technique sans engagement.</p>
        <p style="margin:0 0 16px;">Seriez-vous disponible cette semaine ou la semaine prochaine pour un appel ?</p>
        ${ctaButton('Répondre à ce message', 'mailto:contact@mistral-it.fr')}
        <p style="margin:0;font-size:14px;color:#8492a6;">Bien cordialement,</p>
      `),
    };
  }

  if (type === 'relance') {
    return {
      subject: `Suite à notre contact — ${societe} / Mistral IT`,
      html: base(`
        <p style="margin:0 0 16px;">Bonjour ${prenom},</p>
        <p style="margin:0 0 16px;">Je me permets de revenir vers vous suite à mon précédent message concernant la sécurité informatique de <strong>${societe}</strong>.</p>
        <p style="margin:0 0 16px;">Je comprends que vous êtes certainement très sollicité, aussi je voulais simplement m'assurer que mon message vous avait bien atteint et vérifier si le sujet de la sécurité IT était d'actualité pour vous.</p>
        ${highlight('Notre approche est simple : un <strong>diagnostic initial gratuit</strong>, sans engagement, qui vous donne en 30 minutes une vision claire de vos risques prioritaires.')}
        <p style="margin:0 0 16px;">Si ce n'est pas le bon moment, n'hésitez pas à me le faire savoir — je prendrai note et reviendrai vers vous ultérieurement.</p>
        <p style="margin:0 0 16px;">Dans le cas contraire, je reste à votre disposition pour un échange rapide à votre convenance.</p>
        ${ctaButton('Répondre à ce message', 'mailto:contact@mistral-it.fr')}
        <p style="margin:0;font-size:14px;color:#8492a6;">Bien cordialement,</p>
      `),
    };
  }

  // rdv
  return {
    subject: `Proposition de rendez-vous — Mistral IT × ${societe}`,
    html: base(`
      <p style="margin:0 0 16px;">Bonjour ${prenom},</p>
      <p style="margin:0 0 16px;">Je souhaitais vous proposer un rendez-vous afin d'échanger sur la sécurité informatique de <strong>${societe}</strong> et voir comment <strong>Mistral IT</strong> pourrait vous accompagner.</p>
      <p style="margin:0 0 16px;">Cet échange de <strong>30 à 45 minutes</strong> nous permettrait de :</p>
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 16px;">
        <tr><td style="padding:4px 0 4px 16px;font-family:Arial,sans-serif;font-size:15px;color:#3a4a63;line-height:1.6;">— Faire le point sur votre infrastructure et votre niveau d'exposition actuel</td></tr>
        <tr><td style="padding:4px 0 4px 16px;font-family:Arial,sans-serif;font-size:15px;color:#3a4a63;line-height:1.6;">— Identifier les axes d'amélioration prioritaires</td></tr>
        <tr><td style="padding:4px 0 4px 16px;font-family:Arial,sans-serif;font-size:15px;color:#3a4a63;line-height:1.6;">— Vous présenter nos offres d'audit adaptées à votre contexte</td></tr>
      </table>
      ${highlight('<strong>Format proposé :</strong> visioconférence (Teams / Google Meet) ou déplacement sur site en Vaucluse — selon votre préférence.')}
      <p style="margin:0 0 16px;">Seriez-vous disponible dans les prochains jours ? Je m'adapte à vos créneaux.</p>
      ${ctaButton('Confirmer un créneau', 'mailto:contact@mistral-it.fr')}
      <p style="margin:0;font-size:14px;color:#8492a6;">Dans l'attente de votre retour,</p>
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
