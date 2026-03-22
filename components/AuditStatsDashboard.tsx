'use client';

import { useState, useEffect } from 'react';

interface StatData {
  total: number;
  auditCounts: Record<string, number>;
  societyCounts: Record<string, number>;
  results: any[];
}

export default function AuditStatsDashboard() {
  const [stats, setStats] = useState<StatData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/audit-results');
      if (!response.ok) throw new Error('Erreur lors du chargement');
      const data = await response.json();
      setStats(data);
    } catch (err) {
      setError('Erreur lors du chargement des statistiques');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div className="p-8 text-center">Chargement...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;
  if (!stats) return <div className="p-8 text-center">Aucune donnée</div>;

  return (
    <div className="p-8 bg-stone">
      <h1 className="text-4xl font-bold text-ink mb-8">Tableau de bord - Diagnostics d'audit</h1>

      {/* Carte totale */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 border-l-4 border-sky shadow">
          <p className="text-slate font-semibold text-sm mb-2">Total de diagnostics</p>
          <p className="text-4xl font-bold text-sky">{stats.total}</p>
        </div>

        <div className="bg-white rounded-lg p-6 border-l-4 border-blue-500 shadow">
          <p className="text-slate font-semibold text-sm mb-2">Entreprises</p>
          <p className="text-4xl font-bold text-blue-500">
            {Object.keys(stats.societyCounts).length}
          </p>
        </div>

        <div className="bg-white rounded-lg p-6 border-l-4 border-purple-500 shadow">
          <p className="text-slate font-semibold text-sm mb-2">Dernière mise à jour</p>
          <p className="text-lg font-semibold text-purple-500">
            {stats.results.length > 0 
              ? new Date(stats.results[0].timestamp).toLocaleDateString('fr-FR')
              : 'N/A'}
          </p>
        </div>
      </div>

      {/* Grille statistiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Audit par type */}
        <div className="bg-white rounded-lg p-6 shadow">
          <h2 className="text-xl font-bold text-ink mb-6">Diagnostics par type d'audit</h2>
          <div className="space-y-4">
            {Object.entries(stats.auditCounts).map(([type, count]) => (
              <div key={type}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-slate">{type}</span>
                  <span className="text-lg font-bold text-ink">{count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-sky h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${(count / stats.total) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Entreprises */}
        <div className="bg-white rounded-lg p-6 shadow">
          <h2 className="text-xl font-bold text-ink mb-6">Entreprises participantes</h2>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {Object.entries(stats.societyCounts)
              .sort(([, a], [, b]) => b - a)
              .map(([company, count]) => (
                <div key={company} className="flex justify-between items-center p-3 bg-stone rounded-lg">
                  <span className="text-sm font-medium text-ink">{company}</span>
                  <span className="font-bold text-sky">{count}</span>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Tableau détaillé */}
      <div className="mt-8 bg-white rounded-lg p-6 shadow overflow-x-auto">
        <h2 className="text-xl font-bold text-ink mb-6">Derniers diagnostics (50 derniers)</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-slate">Date</th>
              <th className="text-left py-3 px-4 font-semibold text-slate">Prénom</th>
              <th className="text-left py-3 px-4 font-semibold text-slate">Nom</th>
              <th className="text-left py-3 px-4 font-semibold text-slate">Email</th>
              <th className="text-left py-3 px-4 font-semibold text-slate">Société</th>
              <th className="text-left py-3 px-4 font-semibold text-slate">Type d'audit</th>
              <th className="text-center py-3 px-4 font-semibold text-slate">Scores</th>
            </tr>
          </thead>
          <tbody>
            {stats.results.map((result, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-stone">
                <td className="py-3 px-4 text-slate">{result.date}</td>
                <td className="py-3 px-4 font-medium text-ink">{result.prenom}</td>
                <td className="py-3 px-4 font-medium text-ink">{result.nom}</td>
                <td className="py-3 px-4 text-slate text-xs">{result.email}</td>
                <td className="py-3 px-4 text-slate">{result.societe}</td>
                <td className="py-3 px-4">
                  <span className="inline-block px-3 py-1 bg-skylt text-sky font-semibold rounded-full text-xs">
                    {result.type_audit}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  <details>
                    <summary className="cursor-pointer text-sky font-semibold">Voir</summary>
                    <div className="mt-2 text-xs bg-stone p-2 rounded">
                      <p>Infra: {result.scores.infra}</p>
                      <p>AD: {result.scores.ad}</p>
                      <p>Sécu: {result.scores.securite}</p>
                      <p>Réseau: {result.scores.reseaux}</p>
                      <p>Autres: {result.scores.autres}</p>
                    </div>
                  </details>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
