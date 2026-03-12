import { STEPS } from "@/lib/data";

export default function ProcessSection() {
  return (
    <section id="processus" className="py-28 px-6 lg:px-20 bg-ink text-white">
      <p className="text-xs font-semibold text-blue-400 tracking-widest uppercase mb-3">
        Notre méthode
      </p>
      <h2 className="font-playfair font-bold text-white text-3xl sm:text-[2.6rem] leading-tight tracking-tight mb-4">
        Un processus structuré,
        <br />
        une transparence totale
      </h2>
      <p className="text-white/50 font-light text-[1rem] leading-relaxed max-w-lg mb-16">
        De la qualification initiale au déploiement des solutions, chaque étape
        est documentée et partagée avec vous en temps réel.
      </p>

      {/* Steps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 relative">
        {/* Connector line (desktop only) */}
        <div
          aria-hidden
          className="hidden lg:block absolute top-7 left-[10%] right-[10%] h-px bg-white/10"
        />

        {STEPS.map((step) => (
          <div key={step.num} className="reveal text-center relative">
            <div className="w-14 h-14 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mx-auto mb-5 relative z-10">
              <span className="font-bold text-sm text-blue-400">{step.num}</span>
            </div>
            <h3 className="font-playfair font-bold text-white text-base mb-2">
              {step.title}
            </h3>
            <p className="text-white/40 text-[0.82rem] font-light leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
