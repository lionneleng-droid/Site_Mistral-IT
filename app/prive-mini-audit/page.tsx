'use client';

import { useMemo, useState } from 'react';

type Axis = 'ad' | 'reseau' | 'securite';

interface Question {
  id: number;
  text: string;
  options: {
    label: string;
    score: Record<Axis, number>;
  }[];
}

interface LeadForm {
  nom: string;
  prenom: string;
  societe: string;
  email: string;
}

interface AnswerState {
  question: string;
  answer: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: 'Les comptes administrateurs AD sont-ils nominatifs et séparés des comptes bureautiques ?',
    options: [
      { label: 'Non, ce n\'est pas structuré', score: { ad: 3, reseau: 0, securite: 1 } },
      { label: 'Partiellement', score: { ad: 2, reseau: 0, securite: 1 } },
      { label: 'Oui, complètement', score: { ad: 0, reseau: 0, securite: 0 } },
    ],
  },
  {
    id: 2,
    text: 'Avez-vous une revue régulière des droits et groupes AD sensibles ?',
    options: [
      { label: 'Jamais', score: { ad: 3, reseau: 0, securite: 1 } },
      { label: 'Occasionnellement', score: { ad: 2, reseau: 0, securite: 1 } },
      { label: 'Oui, au moins trimestrielle', score: { ad: 0, reseau: 0, securite: 0 } },
    ],
  },
  {
    id: 3,
    text: 'Le réseau interne est-il segmenté (VLAN, zones dédiées, filtrage est-ouest) ?',
    options: [
      { label: 'Non', score: { ad: 0, reseau: 3, securite: 1 } },
      { label: 'Partiellement', score: { ad: 0, reseau: 2, securite: 1 } },
      { label: 'Oui, segmentation maîtrisée', score: { ad: 0, reseau: 0, securite: 0 } },
    ],
  },
  {
    id: 4,
    text: 'Disposez-vous d\'une supervision des équipements réseau (switch, firewall, VPN) ?',
    options: [
      { label: 'Non', score: { ad: 0, reseau: 3, securite: 1 } },
      { label: 'Oui mais limitée', score: { ad: 0, reseau: 2, securite: 1 } },
      { label: 'Oui, complète avec alertes', score: { ad: 0, reseau: 0, securite: 0 } },
    ],
  },
  {
    id: 5,
    text: 'L\'authentification multifacteur (MFA) est-elle en place pour les accès sensibles ?',
    options: [
      { label: 'Non', score: { ad: 1, reseau: 0, securite: 3 } },
      { label: 'Partiellement', score: { ad: 1, reseau: 0, securite: 2 } },
      { label: 'Oui', score: { ad: 0, reseau: 0, securite: 0 } },
    ],
  },
  {
    id: 6,
    text: 'Un plan de sauvegarde/restauration AD et serveurs est-il testé ?',
    options: [
      { label: 'Non', score: { ad: 2, reseau: 0, securite: 2 } },
      { label: 'Oui mais non testé', score: { ad: 1, reseau: 0, securite: 2 } },
      { label: 'Oui, tests réguliers', score: { ad: 0, reseau: 0, securite: 0 } },
    ],
  },
  {
    id: 7,
    text: 'Avez-vous déjà observé des anomalies de connexion ou des comptes suspects ?',
    options: [
      { label: 'Oui, plusieurs fois', score: { ad: 2, reseau: 1, securite: 3 } },
      { label: 'Oui, rarement', score: { ad: 1, reseau: 1, securite: 2 } },
      { label: 'Non', score: { ad: 0, reseau: 0, securite: 0 } },
    ],
  },
  {
    id: 8,
    text: 'Les accès distants (VPN, RDP, bastion) sont-ils correctement contrôlés ?',
    options: [
      { label: 'Non', score: { ad: 1, reseau: 2, securite: 3 } },
      { label: 'Partiellement', score: { ad: 1, reseau: 2, securite: 2 } },
      { label: 'Oui', score: { ad: 0, reseau: 0, securite: 0 } },
    ],
  },
  {
    id: 9,
    text: 'Disposez-vous d\'un durcissement des postes/serveurs (GPO, patching, antivirus EDR) ?',
    options: [
      { label: 'Non', score: { ad: 2, reseau: 0, securite: 3 } },
      { label: 'Partiel', score: { ad: 1, reseau: 0, securite: 2 } },
      { label: 'Oui, processus en place', score: { ad: 0, reseau: 0, securite: 0 } },
    ],
  },
  {
    id: 10,
    text: 'Votre SI est-il documenté (cartographie réseau, rôles AD, procédures sécurité) ?',
    options: [
      { label: 'Non', score: { ad: 2, reseau: 2, securite: 2 } },
      { label: 'Partiellement', score: { ad: 1, reseau: 1, securite: 1 } },
      { label: 'Oui', score: { ad: 0, reseau: 0, securite: 0 } },
    ],
  },
];

function getRecommendation(scores: Record<Axis, number>) {
  if (scores.ad >= scores.reseau && scores.ad >= scores.securite) {
    return 'Audit Accès AD et Identités';
  }
  if (scores.reseau >= scores.ad && scores.reseau >= scores.securite) {
    return 'Audit Réseau et Segmentation';
  }
  return 'Audit Sécurité Opérationnelle';
}

export default function PriveMiniAuditPage() {
  const [step, setStep] = useState<'lead' | 'quiz' | 'done'>('lead');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [lead, setLead] = useState<LeadForm>({ nom: '', prenom: '', societe: '', email: '' });
  const [answers, setAnswers] = useState<AnswerState[]>([]);
  const [scores, setScores] = useState<Record<Axis, number>>({ ad: 0, reseau: 0, securite: 0 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const recommendation = useMemo(() => getRecommendation(scores), [scores]);

  const handleLeadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLead((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const startQuiz = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!lead.nom || !lead.prenom || !lead.societe || !lead.email) {
      setError('Merci de remplir tous les champs.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(lead.email)) {
      setError('Adresse email invalide.');
      return;
    }

    setStep('quiz');
  };

  const finalizeAudit = async (finalAnswers: AnswerState[], finalScores: Record<Axis, number>) => {
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/mini-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...lead,
          answers: finalAnswers,
          scores: finalScores,
          recommendation: getRecommendation(finalScores),
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || "Erreur lors de l'envoi du mini audit.");
      }

      setStep('done');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur lors de l'envoi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOptionClick = async (option: Question['options'][number]) => {
    if (isSubmitting) return;

    const question = QUESTIONS[currentQuestion];
    const nextAnswers = [...answers, { question: question.text, answer: option.label }];

    const nextScores: Record<Axis, number> = {
      ad: scores.ad + option.score.ad,
      reseau: scores.reseau + option.score.reseau,
      securite: scores.securite + option.score.securite,
    };

    setAnswers(nextAnswers);
    setScores(nextScores);

    const isLast = currentQuestion === QUESTIONS.length - 1;
    if (isLast) {
      await finalizeAudit(nextAnswers, nextScores);
      return;
    }

    setCurrentQuestion((prev) => prev + 1);
  };

  const resetAll = () => {
    setStep('lead');
    setCurrentQuestion(0);
    setLead({ nom: '', prenom: '', societe: '', email: '' });
    setAnswers([]);
    setScores({ ad: 0, reseau: 0, securite: 0 });
    setError('');
    setIsSubmitting(false);
  };

  return (
    <main className="min-h-screen bg-[#f7f5f2] py-10 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white border border-[#e4e8ef] rounded-2xl p-6 sm:p-10 shadow-[0_20px_45px_-35px_rgba(26,34,53,0.55)]">
          <p className="text-xs uppercase tracking-[0.18em] font-semibold text-[#3b82f6]">Espace discret - Mini audit SI</p>

          {step === 'lead' && (
            <>
              <h1 className="mt-3 text-2xl sm:text-3xl font-bold text-[#1a2235]">10 questions pour évaluer vos risques AD, réseau et sécurité</h1>
              <p className="mt-3 text-sm sm:text-base text-[#3a4a63]">
                Remplissez vos coordonnées puis répondez au questionnaire. Le résultat vous est envoyé automatiquement par email à la fin.
              </p>

              <form className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={startQuiz}>
                <input
                  type="text"
                  name="nom"
                  placeholder="Nom"
                  value={lead.nom}
                  onChange={handleLeadChange}
                  className="border border-[#d5deea] rounded-lg px-4 py-2.5 text-sm text-[#1a2235] focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/30"
                  required
                />
                <input
                  type="text"
                  name="prenom"
                  placeholder="Prénom"
                  value={lead.prenom}
                  onChange={handleLeadChange}
                  className="border border-[#d5deea] rounded-lg px-4 py-2.5 text-sm text-[#1a2235] focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/30"
                  required
                />
                <input
                  type="text"
                  name="societe"
                  placeholder="Nom de l'entreprise"
                  value={lead.societe}
                  onChange={handleLeadChange}
                  className="border border-[#d5deea] rounded-lg px-4 py-2.5 text-sm text-[#1a2235] focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/30"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={lead.email}
                  onChange={handleLeadChange}
                  className="border border-[#d5deea] rounded-lg px-4 py-2.5 text-sm text-[#1a2235] focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/30"
                  required
                />

                {error && (
                  <p className="sm:col-span-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  className="sm:col-span-2 mt-1 rounded-lg bg-gradient-to-r from-[#3b82f6] to-[#0ea5e9] text-white text-sm font-semibold px-4 py-3 hover:opacity-95 transition-opacity"
                >
                  Commencer le mini audit
                </button>
              </form>
            </>
          )}

          {step === 'quiz' && (
            <>
              <div className="mt-3 flex items-center justify-between gap-4 text-sm text-[#3a4a63]">
                <span>
                  Question {currentQuestion + 1} / {QUESTIONS.length}
                </span>
                <span>
                  {lead.prenom} {lead.nom} - {lead.societe}
                </span>
              </div>

              <div className="mt-3 w-full h-2 rounded-full bg-[#e6edf8] overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#3b82f6] to-[#0ea5e9] transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / QUESTIONS.length) * 100}%` }}
                />
              </div>

              <h2 className="mt-6 text-xl sm:text-2xl font-semibold text-[#1a2235] leading-snug">
                {QUESTIONS[currentQuestion].text}
              </h2>

              <div className="mt-6 grid gap-3">
                {QUESTIONS[currentQuestion].options.map((option) => (
                  <button
                    key={option.label}
                    onClick={() => void handleOptionClick(option)}
                    disabled={isSubmitting}
                    className="text-left border border-[#d7e3f5] bg-[#f8fbff] hover:bg-[#eff6ff] rounded-xl px-4 py-3 text-sm text-[#1a2235] transition-colors disabled:opacity-65"
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              {isSubmitting && (
                <p className="mt-5 text-sm text-[#3a4a63]">Envoi du résultat en cours...</p>
              )}

              {error && (
                <p className="mt-5 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}
            </>
          )}

          {step === 'done' && (
            <>
              <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-[#1a2235]">Mini audit terminé</h2>
              <p className="mt-3 text-[#3a4a63]">
                Merci {lead.prenom} {lead.nom}. Votre résultat a été envoyé automatiquement à <strong>{lead.email}</strong>.
              </p>

              <div className="mt-6 rounded-xl border border-[#bfdbfe] bg-[#eff6ff] p-5">
                <p className="text-xs uppercase tracking-wide text-[#1e40af] font-semibold">Recommandation principale</p>
                <p className="mt-1 text-xl font-semibold text-[#1d4ed8]">{recommendation}</p>
              </div>

              <div className="mt-6 text-sm text-[#3a4a63] space-y-1">
                <p>Score Accès AD: <strong>{scores.ad}</strong></p>
                <p>Score Réseau: <strong>{scores.reseau}</strong></p>
                <p>Score Sécurité: <strong>{scores.securite}</strong></p>
              </div>

              <button
                onClick={resetAll}
                className="mt-8 rounded-lg border border-[#d0dcec] text-[#1a2235] px-4 py-2.5 text-sm font-semibold hover:bg-[#f8fbff] transition-colors"
              >
                Recommencer
              </button>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
