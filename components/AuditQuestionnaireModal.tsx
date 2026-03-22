'use client';

import { useState } from 'react';

interface AuditScores {
  infra: number;
  ad: number;
  securite: number;
  reseaux: number;
  autres: number;
}

interface FormData {
  nom: string;
  prenom: string;
  email: string;
  societe: string;
}

export default function AuditQuestionnaireModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    nom: '',
    prenom: '',
    email: '',
    societe: '',
  });
  const [scores, setScores] = useState<AuditScores>({
    infra: 0,
    ad: 0,
    securite: 0,
    reseaux: 0,
    autres: 0,
  });
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const questions = [
    {
      id: 1,
      question: 'Avez-vous rencontré des problèmes de stabilité ou de performance de vos serveurs?',
      answers: [
        { text: 'Oui, régulièrement', scores: { infra: 3, autres: 1 } },
        { text: 'Occasionnellement', scores: { infra: 2, reseaux: 1 } },
        { text: 'Non, tout fonctionne bien', scores: { autres: 1 } },
      ],
    },
    {
      id: 2,
      question: 'Comment gérez-vous actuellement vos annuaires et authentifications utilisateurs?',
      answers: [
        { text: 'Via Active Directory (AD)', scores: { ad: 3, securite: 1 } },
        { text: 'Solution cloud (Azure AD, Okta)', scores: { ad: 2, securite: 2 } },
        { text: 'Solutions propriétaires ou locales', scores: { autres: 2, ad: 1 } },
      ],
    },
    {
      id: 3,
      question: 'Avez-vous des inquiétudes concernant les menaces de sécurité informatique?',
      answers: [
        { text: 'Oui, c\'est une priorité majeure', scores: { securite: 3, infra: 1 } },
        { text: 'C\'est important mais géré correctement', scores: { securite: 2 } },
        { text: 'Pas vraiment une préoccupation', scores: { autres: 1 } },
      ],
    },
    {
      id: 4,
      question: 'Quelle est la qualité actuelle de votre infrastructure réseau?',
      answers: [
        { text: 'Obsolète ou problématique', scores: { reseaux: 3, infra: 2 } },
        { text: 'Ancienne mais fonctionnelle', scores: { reseaux: 2, infra: 1 } },
        { text: 'Moderne et bien maintenue', scores: { autres: 1 } },
      ],
    },
    {
      id: 5,
      question: 'Disposez-vous actuellement d\'une solution de sauvegarde et de récupération d\'urgence?',
      answers: [
        { text: 'Non, c\'est un besoin urgent', scores: { infra: 3, securite: 2 } },
        { text: 'Oui, mais insuffisante', scores: { infra: 2, securite: 1 } },
        { text: 'Oui, robuste et testée', scores: { autres: 1 } },
      ],
    },
    {
      id: 6,
      question: 'Avez-vous eu des incidents de sécurité (virus, accès non autorisé, fuite de données)?',
      answers: [
        { text: 'Oui, plusieurs', scores: { securite: 3, reseaux: 1, ad: 1 } },
        { text: 'Oui, un incident', scores: { securite: 2, reseaux: 1 } },
        { text: 'Non, aucun', scores: { autres: 1 } },
      ],
    },
    {
      id: 7,
      question: 'Quel est votre niveau de conformité avec les normes (RGPD, ISO, etc.)?',
      answers: [
        { text: 'Non compliant, amélioration urgente', scores: { securite: 3, infra: 1 } },
        { text: 'Partiellement compliant', scores: { securite: 2, autres: 1 } },
        { text: 'Entièrement compliant', scores: { autres: 1 } },
      ],
    },
    {
      id: 8,
      question: 'Avez-vous des problèmes de connectivité ou de latence réseau?',
      answers: [
        { text: 'Oui, c\'est un problème majeur', scores: { reseaux: 3, infra: 1 } },
        { text: 'Occasionnellement', scores: { reseaux: 2 } },
        { text: 'Non, excellent', scores: { autres: 1 } },
      ],
    },
    {
      id: 9,
      question: 'Avez-vous besoin d\'améliorer la gestion des accès et des permissions utilisateurs?',
      answers: [
        { text: 'Oui, urgence absolue', scores: { ad: 3, securite: 2 } },
        { text: 'Oui, amélioration nécessaire', scores: { ad: 2, securite: 1 } },
        { text: 'Non, bien géré', scores: { autres: 1 } },
      ],
    },
    {
      id: 10,
      question: 'Quel aspect IT vous préoccupe le plus actuellement?',
      answers: [
        { text: 'La sécurité des données', scores: { securite: 3, ad: 1 } },
        { text: 'La stabilité de l\'infrastructure', scores: { infra: 3 } },
        { text: 'Les performances réseau', scores: { reseaux: 3 } },
        { text: 'La gestion des utilisateurs', scores: { ad: 2, securite: 1 } },
        { text: 'Autre', scores: { autres: 2 } },
      ],
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAnswerSelect = (answerScores: Record<string, number>) => {
    const newScores = { ...scores };
    Object.keys(answerScores).forEach(key => {
      newScores[key as keyof AuditScores] += answerScores[key];
    });
    setScores(newScores);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateResult(newScores);
    }
  };

  const calculateResult = (finalScores: AuditScores) => {
    const maxScore = Math.max(
      finalScores.infra,
      finalScores.ad,
      finalScores.securite,
      finalScores.reseaux,
      finalScores.autres
    );

    const types = [
      { key: 'infra', label: 'Audit Infrastructure', score: finalScores.infra },
      { key: 'ad', label: 'Audit Active Directory / Identité', score: finalScores.ad },
      { key: 'securite', label: 'Audit Sécurité', score: finalScores.securite },
      { key: 'reseaux', label: 'Audit Réseaux', score: finalScores.reseaux },
      { key: 'autres', label: 'Audit Complémentaire', score: finalScores.autres },
    ];

    const primaryAudit = types.find(t => t.score === maxScore);
    setResult(primaryAudit ? primaryAudit.label : 'Audit Général');
  };

  const sendResultEmail = async () => {
    if (!formData.email) {
      setError('Adresse email requise');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/audit-results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nom: formData.nom,
          prenom: formData.prenom,
          email: formData.email,
          societe: formData.societe,
          type_audit: result,
          scores: scores,
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi');
      }

      const data = await response.json();
      setEmailSent(true);
    } catch (err) {
      setError('Erreur lors de l\'envoi. Veuillez réessayer.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    if (currentStep === 0) {
      if (!formData.nom || !formData.prenom || !formData.email || !formData.societe) {
        alert('Veuillez remplir tous les champs');
        return;
      }
      // Valider l'email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        alert('Veuillez entrer une adresse email valide');
        return;
      }
      setCurrentStep(1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setFormData({ nom: '', prenom: '', email: '', societe: '' });
    setScores({ infra: 0, ad: 0, securite: 0, reseaux: 0, autres: 0 });
    setResult(null);
    setEmailSent(false);
    setError(null);
  };

  const renderAuditTypeColor = (auditType: string) => {
    switch (auditType) {
      case 'Audit Infrastructure':
        return '#2563eb';
      case 'Audit Active Directory / Identité':
        return '#a855f7';
      case 'Audit Sécurité':
        return '#dc2626';
      case 'Audit Réseaux':
        return '#f97316';
      default:
        return '#4b5563';
    }
  };

  return (
    <>
      {!isOpen && (
        <div className="flex justify-center mb-12">
          <button
            onClick={() => setIsOpen(true)}
            className="text-sm font-semibold px-8 py-4 bg-gradient-to-r from-sky via-sky to-blue-500 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Découvrir votre type d'audit
          </button>
        </div>
      )}

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 relative">
            {/* Bouton fermeture */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
            >
              ✕
            </button>

            {result ? (
              // Écran de résultat
              <div className="text-center py-8">
                <h2 className="text-3xl font-bold text-ink mb-4">Résultat du diagnostic</h2>
                <p className="text-lg text-slate mb-6">
                  Bienvenue <span className="font-semibold">{formData.prenom} {formData.nom}</span> de{' '}
                  <span className="font-semibold">{formData.societe}</span>
                </p>

                {emailSent ? (
                  <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 mb-8">
                    <p className="text-green-700 font-semibold text-lg">✓ Email envoyé avec succès!</p>
                    <p className="text-green-600 text-sm mt-2">
                      Les résultats ont été envoyés à <span className="font-semibold">{formData.email}</span>
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="bg-gradient-to-br from-sky to-blue-500 text-white rounded-lg p-8 mb-8">
                      <p className="text-sm font-semibold mb-2 opacity-90">Audit recommandé:</p>
                      <h3 
                        className="text-3xl font-bold"
                        style={{ color: renderAuditTypeColor(result) }}
                      >
                        {result}
                      </h3>
                    </div>

                    <p className="text-slate mb-8 text-justify">
                      Basé sur vos réponses, nous avons identifié que votre entreprise bénéficierait d'un audit approfondi 
                      sur cet aspect spécifique de votre infrastructure informatique. Notre équipe d'experts est prête à 
                      vous accompagner pour évaluer votre situation actuelle et proposer des solutions adaptées.
                    </p>

                    {error && (
                      <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 mb-6">
                        <p className="text-red-700 text-sm">{error}</p>
                      </div>
                    )}
                  </>
                )}

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={handleReset}
                    className="text-sm font-semibold px-6 py-3 bg-ink text-white rounded-lg hover:bg-blue-900 transition-colors"
                  >
                    Recommencer
                  </button>

                  {!emailSent && (
                    <button
                      onClick={sendResultEmail}
                      disabled={isLoading}
                      className="text-sm font-semibold px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <span className="animate-spin">⏳</span> Envoi...
                        </>
                      ) : (
                        <>
                          📧 Envoyer par email
                        </>
                      )}
                    </button>
                  )}

                  <a
                    href="#contact"
                    onClick={() => setIsOpen(false)}
                    className="text-sm font-semibold px-6 py-3 bg-sky text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Contacter un expert
                  </a>
                </div>
              </div>
            ) : currentStep === 0 ? (
              // Formulaire initial
              <div>
                <h2 className="text-2xl font-bold text-ink mb-6">
                  Diagnostic d'audit personnalisé
                </h2>

                <p className="text-slate mb-8">
                  Répondez à quelques questions pour découvrir le type d'audit le plus adapté à votre entreprise.
                </p>

                <div className="space-y-4 mb-8">
                  <div>
                    <label htmlFor="nom" className="block text-sm font-semibold text-ink mb-2">
                      Nom *
                    </label>
                    <input
                      type="text"
                      id="nom"
                      name="nom"
                      value={formData.nom}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-sky focus:outline-none"
                      placeholder="Votre nom"
                    />
                  </div>

                  <div>
                    <label htmlFor="prenom" className="block text-sm font-semibold text-ink mb-2">
                      Prénom *
                    </label>
                    <input
                      type="text"
                      id="prenom"
                      name="prenom"
                      value={formData.prenom}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-sky focus:outline-none"
                      placeholder="Votre prénom"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-ink mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-sky focus:outline-none"
                      placeholder="votre.email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="societe" className="block text-sm font-semibold text-ink mb-2">
                      Nom de la société *
                    </label>
                    <input
                      type="text"
                      id="societe"
                      name="societe"
                      value={formData.societe}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-sky focus:outline-none"
                      placeholder="Nom de votre entreprise"
                    />
                  </div>
                </div>

                <button
                  onClick={handleNext}
                  className="w-full text-sm font-semibold px-6 py-3 bg-sky text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Commencer le diagnostic
                </button>
              </div>
            ) : (
              // Questions
              <div>
                <div className="mb-6">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-sky h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${((currentStep) / (questions.length)) * 100}%`,
                      }}
                    />
                  </div>
                  <p className="text-sm text-slate mt-2">
                    Question {currentStep} sur {questions.length}
                  </p>
                </div>

                <h3 className="text-xl font-bold text-ink mb-6">
                  {questions[currentStep - 1].question}
                </h3>

                <div className="space-y-3">
                  {questions[currentStep - 1].answers.map((answer, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(answer.scores as Record<string, number>)}
                      className="w-full text-left px-4 py-3 border-2 border-gray-200 rounded-lg hover:border-sky hover:bg-sky/5 transition-all"
                    >
                      <p className="font-medium text-ink">{answer.text}</p>
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  className="mt-6 text-sm text-slate hover:text-ink underline"
                >
                  ← Retour
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
