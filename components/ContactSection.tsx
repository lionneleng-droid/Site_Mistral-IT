"use client";
import { useState } from "react";
import { SELECT_OPTIONS } from "../data";

const CONTACT_DETAILS = [
  { icon: "✉️", label: "contact@mistral-it.fr", href: "mailto:contact@mistral-it.fr" },
  { icon: "📞", label: "+33 6 42 03 17 54", href: "tel:+33642031754" },
  { icon: "📍", label: "Carpentras · Vaucluse", href: null },
];

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    service: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire to your API / email provider
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-28 px-6 lg:px-20 bg-stone bg-dot-grid relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left: info */}
        <div>
          <p className="text-xs font-semibold text-sky tracking-widest uppercase mb-3">
            Nous contacter
          </p>
          <h2 className="font-playfair font-bold text-ink text-3xl sm:text-[2.6rem] leading-tight tracking-tight mb-5">
            Démarrons votre audit
          </h2>
          <p className="text-slate font-light text-[0.95rem] leading-relaxed mb-10">
            Un consultant Mistral IT vous recontacte sous 24h pour qualifier
            votre besoin et vous proposer une approche sur-mesure.
          </p>

          <div className="flex flex-col gap-4">
            {CONTACT_DETAILS.map(({ icon, label, href }) => (
              <div key={label} className="flex items-center gap-3 text-slate text-sm">
                <div className="w-9 h-9 rounded-lg bg-white border border-[#e4e8ef] flex items-center justify-center text-base flex-shrink-0">
                  {icon}
                </div>
                {href ? (
                  <a href={href} className="hover:text-sky transition-colors">
                    {label}
                  </a>
                ) : (
                  <span>{label}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right: form */}
        <div className="bg-white rounded-2xl border border-[#e4e8ef] p-8">
          {submitted ? (
            <div className="flex flex-col items-center justify-center text-center py-10 gap-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center text-3xl">
                ✓
              </div>
              <h3 className="font-playfair font-bold text-ink text-xl">
                Message envoyé !
              </h3>
              <p className="text-slate font-light text-sm max-w-xs">
                Un consultant Mistral IT vous contactera dans les 24h ouvrées.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-sm text-sky underline underline-offset-2 mt-2"
              >
                Envoyer une autre demande
              </button>
            </div>
          ) : (
            <>
              <h3 className="font-playfair font-bold text-ink text-xl mb-1">
                Demande de devis
              </h3>
              <p className="text-muted text-sm font-light mb-6">
                Réponse garantie sous 24h ouvrées
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Prénom & Nom">
                    <input
                      name="name"
                      type="text"
                      placeholder="Jean Dupont"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </Field>
                  <Field label="Société">
                    <input
                      name="company"
                      type="text"
                      placeholder="Acme Corp"
                      value={form.company}
                      onChange={handleChange}
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Field label="Email professionnel">
                    <input
                      name="email"
                      type="email"
                      placeholder="jean@acme.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </Field>
                  <Field label="Type de prestation">
                    <select
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                    >
                      <option value="">Sélectionner…</option>
                      {SELECT_OPTIONS.map((o: string) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <Field label="Contexte & périmètre">
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Décrivez votre environnement, vos enjeux et contraintes…"
                    value={form.message}
                    onChange={handleChange}
                    className="resize-y"
                  />
                </Field>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-ink text-white rounded-lg text-sm font-semibold hover:bg-sky transition-colors mt-1"
                >
                  Envoyer la demande →
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

// ── Helper sub-component
function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactElement;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-slate">{label}</label>
      <div className="[&>*]:w-full [&>*]:px-3.5 [&>*]:py-2.5 [&>*]:rounded-lg [&>*]:border [&>*]:border-[#e4e8ef] [&>*]:text-ink [&>*]:text-sm [&>*]:font-light [&>*]:outline-none [&>*:focus]:border-sky [&>*:focus]:ring-2 [&>*:focus]:ring-sky/10 [&>*]:transition-all [&>select]:appearance-none [&>select]:bg-white [&>select]:cursor-pointer">
        {children}
      </div>
    </div>
  );
}
