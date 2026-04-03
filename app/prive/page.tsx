"use client";
import { useState } from "react";

type TypeMail = "premier-contact" | "relance" | "rdv";

const TYPE_OPTIONS: { value: TypeMail; label: string; desc: string; icon: string }[] = [
  {
    value: "premier-contact",
    label: "Premier contact",
    desc: "Présentation de Mistral IT et proposition d'un diagnostic gratuit",
    icon: "👋",
  },
  {
    value: "relance",
    label: "Relance après premier contact",
    desc: "Rappel suite à un message sans réponse",
    icon: "🔁",
  },
  {
    value: "rdv",
    label: "Proposition de rendez-vous",
    desc: "Invitation à un échange de 30–45 min (visio ou sur site)",
    icon: "📅",
  },
];

const TYPE_LABELS: Record<TypeMail, string> = {
  "premier-contact": "Premier contact",
  relance: "Relance après premier contact",
  rdv: "Proposition de rendez-vous",
};

type Status = "idle" | "loading" | "success" | "error";

export default function PrivePage() {
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    societe: "",
    type_mail: "" as TypeMail | "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [sentType, setSentType] = useState<TypeMail | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.type_mail) return;
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/prospection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur inconnue");
      setSentType(form.type_mail as TypeMail);
      setStatus("success");
      setForm({ nom: "", prenom: "", email: "", societe: "", type_mail: "" });
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Erreur inconnue");
      setStatus("error");
    }
  };

  const reset = () => {
    setStatus("idle");
    setSentType(null);
  };

  return (
    <main className="min-h-screen bg-[#f7f5f2] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="mb-8 text-center">
          <span className="inline-block text-xs font-semibold text-[#3b82f6] tracking-widest uppercase mb-3">
            Espace privé — Mistral IT
          </span>
          <h1 className="font-playfair font-bold text-[#1a2235] text-3xl sm:text-4xl tracking-tight leading-tight">
            Outil de prospection
          </h1>
          <p className="text-[#8492a6] text-sm mt-3 font-light">
            Renseignez les informations du prospect et choisissez le type d'email à envoyer.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#e4e8ef] p-8 shadow-sm">
          {status === "success" ? (
            <div className="flex flex-col items-center text-center py-6 gap-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center text-3xl">
                ✓
              </div>
              <h2 className="font-playfair font-bold text-[#1a2235] text-xl">
                Email envoyé !
              </h2>
              {sentType && (
                <p className="text-[#3a4a63] text-sm">
                  Type :{" "}
                  <span className="font-semibold text-[#3b82f6]">
                    {TYPE_LABELS[sentType]}
                  </span>
                </p>
              )}
              <button
                onClick={reset}
                className="mt-2 text-sm text-[#3b82f6] underline underline-offset-2 hover:text-[#0ea5e9] transition-colors"
              >
                Envoyer un autre email
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Nom / Prénom */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#3a4a63] uppercase tracking-wide">
                    Nom
                  </label>
                  <input
                    name="nom"
                    type="text"
                    required
                    value={form.nom}
                    onChange={handleChange}
                    placeholder="Dupont"
                    className="border border-[#e4e8ef] rounded-lg px-3 py-2.5 text-sm text-[#1a2235] placeholder:text-[#8492a6] focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/30 focus:border-[#3b82f6] transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#3a4a63] uppercase tracking-wide">
                    Prénom
                  </label>
                  <input
                    name="prenom"
                    type="text"
                    required
                    value={form.prenom}
                    onChange={handleChange}
                    placeholder="Jean"
                    className="border border-[#e4e8ef] rounded-lg px-3 py-2.5 text-sm text-[#1a2235] placeholder:text-[#8492a6] focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/30 focus:border-[#3b82f6] transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#3a4a63] uppercase tracking-wide">
                  Adresse email
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="jean.dupont@societe.fr"
                  className="border border-[#e4e8ef] rounded-lg px-3 py-2.5 text-sm text-[#1a2235] placeholder:text-[#8492a6] focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/30 focus:border-[#3b82f6] transition-all"
                />
              </div>

              {/* Société */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#3a4a63] uppercase tracking-wide">
                  Nom de la société
                </label>
                <input
                  name="societe"
                  type="text"
                  required
                  value={form.societe}
                  onChange={handleChange}
                  placeholder="Acme SAS"
                  className="border border-[#e4e8ef] rounded-lg px-3 py-2.5 text-sm text-[#1a2235] placeholder:text-[#8492a6] focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/30 focus:border-[#3b82f6] transition-all"
                />
              </div>

              {/* Type de mail */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-[#3a4a63] uppercase tracking-wide">
                  Type d'email
                </label>
                <div className="flex flex-col gap-2">
                  {TYPE_OPTIONS.map((opt) => (
                    <label
                      key={opt.value}
                      className={`flex items-start gap-3 cursor-pointer rounded-xl border p-3.5 transition-all ${
                        form.type_mail === opt.value
                          ? "border-[#3b82f6] bg-[#eff6ff]"
                          : "border-[#e4e8ef] bg-white hover:border-[#3b82f6]/40 hover:bg-[#f7f5f2]"
                      }`}
                    >
                      <input
                        type="radio"
                        name="type_mail"
                        value={opt.value}
                        checked={form.type_mail === opt.value}
                        onChange={() => setForm({ ...form, type_mail: opt.value })}
                        className="mt-0.5 accent-[#3b82f6] flex-shrink-0"
                      />
                      <div>
                        <span className="text-sm font-semibold text-[#1a2235]">
                          {opt.icon} {opt.label}
                        </span>
                        <p className="text-xs text-[#8492a6] mt-0.5 font-light">
                          {opt.desc}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Error */}
              {status === "error" && (
                <p className="text-red-500 text-xs bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  ⚠️ {errorMsg}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "loading" || !form.type_mail}
                className="mt-1 w-full py-3 rounded-xl bg-gradient-to-r from-[#3b82f6] to-[#0ea5e9] text-white font-semibold text-sm tracking-wide hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "loading" ? "Envoi en cours…" : "Envoyer l'email →"}
              </button>
            </form>
          )}
        </div>

        <p className="text-center text-xs text-[#8492a6] mt-6">
          Cette page est réservée à un usage interne — Mistral IT
        </p>
      </div>
    </main>
  );
}
