const TESTIMONIALS = [
  {
    quote:
      "En moins de 3 semaines, mes priorités sécurité étaient claires et les failles critiques corrigées. J'ai enfin une vision concrète de mon niveau de risque.",
    author: "Dirigeant, PME industrielle",
  },
  {
    quote:
      "L'audit a mis en évidence des risques que je n'avais jamais identifiés en interne. Les recommandations étaient simples, actionnables et adaptées à ma structure.",
    author: "Responsable opérations, secteur services",
  },
  {
    quote:
      "J'ai été accompagné de bout en bout: diagnostic, plan de remédiation et suivi. Le niveau de confiance de mes équipes a nettement augmenté.",
    author: "DAF, groupe multi-sites",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 px-6 lg:px-20 bg-[#f8fbff] border-y border-[#e4e8ef]">
      <p className="text-xs font-semibold text-sky tracking-widest uppercase mb-3">
        Témoignages clients
      </p>
      <h2 className="font-playfair font-bold text-ink text-3xl sm:text-[2.6rem] leading-tight tracking-tight mb-4">
        Ils m'ont fait confiance
      </h2>
      <p className="text-slate font-light text-[1rem] leading-relaxed max-w-xl mb-12">
        Des retours d'entreprises accompagnées sur des sujets d'audit, de remédiation et de structuration IT.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {TESTIMONIALS.map((item) => (
          <article
            key={item.quote}
            className="rounded-2xl border border-[#e4e8ef] bg-white p-7 shadow-[0_14px_40px_-30px_rgba(26,34,53,0.45)]"
          >
            <p className="text-sm leading-relaxed text-slate">"{item.quote}"</p>
            <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-sky">{item.author}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
