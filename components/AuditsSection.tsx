import { AUDITS } from "@/data";

export default function AuditsSection() {
  return (
    <section id="audits" className="py-28 px-6 lg:px-20 bg-stone bg-circuit relative">
      <p className="text-xs font-semibold text-sky tracking-widest uppercase mb-3">
        Nos audits
      </p>
      <h2 className="font-playfair font-bold text-ink text-3xl sm:text-[2.6rem] leading-tight tracking-tight mb-4">
        Un diagnostic complet
        <br />
        de votre environnement
      </h2>
      <p className="text-slate font-light text-[1rem] leading-relaxed max-w-lg mb-14">
        De la sécurité applicative à la conformité réglementaire, chaque audit
        est conduit par nos consultants certifiés selon les référentiels les plus
        exigeants.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {AUDITS.map((audit) => (
          <div
            key={audit.title}
            className="reveal group bg-white border border-[#e4e8ef] rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:border-sky hover:shadow-[0_4px_24px_rgba(59,130,246,0.08)]"
          >
            <div className="w-12 h-12 rounded-xl bg-skylt flex items-center justify-center text-[1.4rem] mb-5">
              {audit.icon}
            </div>
            <h3 className="font-playfair font-bold text-ink text-[1.1rem] leading-snug mb-2">
              {audit.title}
            </h3>
            <p className="text-slate font-light text-sm leading-relaxed mb-5">
              {audit.description}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {audit.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[0.7rem] font-semibold px-2.5 py-1 rounded-full bg-stone text-slate tracking-wide"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
