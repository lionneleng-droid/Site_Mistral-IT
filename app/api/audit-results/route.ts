import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

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
  timestamp: number;
}

// Chemin du fichier JSON pour stocker les résultats
const getDataFilePath = () => {
  return path.join(process.cwd(), 'data', 'audit-results.json');
};

// Créer le répertoire data s'il n'existe pas
async function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data');
  try {
    await fs.mkdir(dataDir, { recursive: true });
  } catch (error) {
    console.error('Erreur lors de la création du répertoire:', error);
  }
}

// Lire les résultats existants
async function getExistingResults(): Promise<AuditResult[]> {
  try {
    await ensureDataDir();
    const filePath = getDataFilePath();
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Sauvegarder les résultats
async function saveResults(results: AuditResult[]): Promise<void> {
  await ensureDataDir();
  const filePath = getDataFilePath();
  await fs.writeFile(filePath, JSON.stringify(results, null, 2));
}

// Envoyer l'email (simulation pour développement)
async function sendEmail(to: string, subject: string, htmlContent: string) {
  // En production, vous pouvez utiliser Resend, SendGrid, Nodemailer, etc.
  // Pour le développement, on simule juste l'envoi
  console.log(`Email envoyé à: ${to}`);
  console.log(`Sujet: ${subject}`);
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      nom,
      prenom,
      email,
      societe,
      type_audit,
      scores,
    } = body;

    // Validation basique
    if (!nom || !prenom || !email || !societe || !type_audit || !scores) {
      return NextResponse.json(
        { error: 'Données manquantes' },
        { status: 400 }
      );
    }

    // Créer le nouvel enregistrement
    const newResult: AuditResult = {
      nom,
      prenom,
      email,
      societe,
      type_audit,
      scores,
      date: new Date().toLocaleString('fr-FR'),
      timestamp: Date.now(),
    };

    // Récupérer les résultats existants
    const existingResults = await getExistingResults();
    existingResults.push(newResult);

    // Sauvegarder les résultats
    await saveResults(existingResults);

    // Préparer le contenu de l'email
    const emailContent = `
      <!DOCTYPE html>
      <html lang="fr">
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; color: #333; }
            .container { max-width: 600px; margin: 0 auto; background: #f7f5f2; padding: 20px; border-radius: 8px; }
            .header { background: linear-gradient(135deg, #3b82f6 0%, #0ea5e9 100%); color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
            .content { background: white; padding: 20px; border-radius: 8px; }
            .result-box { background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%); color: white; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; }
            .result-box h2 { margin: 0; font-size: 28px; }
            .info { margin: 15px 0; }
            .info strong { color: #1a2235; }
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
              
              <div class="info">
                <p><strong>Entreprise :</strong> ${societe}</p>
                <p><strong>Date :</strong> ${newResult.date}</p>
              </div>
              
              <div class="result-box">
                <p style="margin: 0 0 10px; opacity: 0.9;">Audit recommandé</p>
                <h2>${type_audit}</h2>
              </div>
              
              <h3>Analyse détaillée :</h3>
              <div class="scores">
                <div class="score-item">
                  <span>Infrastructure</span>
                  <strong>${scores.infra}/3</strong>
                </div>
                <div class="score-item">
                  <span>Active Directory</span>
                  <strong>${scores.ad}/3</strong>
                </div>
                <div class="score-item">
                  <span>Sécurité</span>
                  <strong>${scores.securite}/3</strong>
                </div>
                <div class="score-item">
                  <span>Réseaux</span>
                  <strong>${scores.reseaux}/3</strong>
                </div>
                <div class="score-item" style="border-bottom: none;">
                  <span>Autres besoins</span>
                  <strong>${scores.autres}/3</strong>
                </div>
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
                <a href="https://www.mistral-it.fr#contact" style="background: #3b82f6; color: white; padding: 12px 30px; border-radius: 8px; text-decoration: none; display: inline-block;">
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
      </html>
    `;

    // Envoyer l'email
    await sendEmail(
      email,
      `Résultat de votre diagnostic - ${type_audit}`,
      emailContent
    );

    // Retourner la réponse
    return NextResponse.json({
      success: true,
      message: 'Résultat envoyé avec succès',
      total: existingResults.length,
      result: newResult,
    });
  } catch (error) {
    console.error('Erreur:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi du résultat' },
      { status: 500 }
    );
  }
}

// GET - Récupérer les statistiques (à protéger en production)
export async function GET(request: NextRequest) {
  try {
    const results = await getExistingResults();
    
    // Compter par type d'audit
    const auditCounts = results.reduce((acc, result) => {
      acc[result.type_audit] = (acc[result.type_audit] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Compter par société
    const societyCounts = results.reduce((acc, result) => {
      acc[result.societe] = (acc[result.societe] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return NextResponse.json({
      total: results.length,
      auditCounts,
      societyCounts,
      results: results.reverse().slice(0, 50), // Derniers 50
    });
  } catch (error) {
    console.error('Erreur:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la lecture des données' },
      { status: 500 }
    );
  }
}
