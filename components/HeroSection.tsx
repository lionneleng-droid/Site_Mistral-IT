import { STATS, AUDIT_PROGRESS } from "@/data";
import CyberBackground from "../components/CyberBackground";

export default function HeroSection() {
  return (
    <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2 items-center gap-12 px-6 lg:px-20 pt-16 pb-10 relative overflow-hidden">
      {/* Fond cybersécurité animé */}
      <CyberBackground />

      {/* Voile blanc très léger pour lisibilité du texte */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(110deg, rgba(255,255,255,0.82) 0%, rgba(255,255,255,0.55) 55%, rgba(255,255,255,0.25) 100%)",
          zIndex: 1,
        }}
      />

      {/* ── Left: copy ── */}
      <div className="relative z-10" style={{ zIndex: 2 }}>
        <span className="fade-up delay-1 inline-flex items-center gap-1.5 text-xs font-semibold text-sky tracking-widest uppercase bg-skylt px-3.5 py-1.5 rounded-full mb-6">
          <span>↗</span> Sécurité · Infrastructure · Évolution
        </span>

        <h1 className="fade-up delay-2 font-playfair font-bold text-ink leading-[1.08] tracking-tight text-4xl sm:text-5xl xl:text-[4rem] mb-6">
          Votre sécurité,{" "}
          <em className="text-sky not-italic">notre expertise.</em>
        </h1>

        <p className="fade-up delay-3 text-slate font-light text-[1.05rem] leading-relaxed max-w-[480px] mb-9">
          Mistral IT accompagne les entreprises dans l'audit de leurs systèmes
          et la mise en œuvre de solutions IT robustes. Une approche claire, des
          résultats concrets.
        </p>

        <div className="fade-up delay-4 flex flex-wrap gap-3 mb-12">
          <a
            href="#audits"
            className="text-sm font-semibold px-7 py-3 bg-ink text-white rounded-lg border-2 border-ink hover:bg-sky hover:border-sky transition-colors"
          >
            Découvrir nos audits
          </a>
          <a
            href="#contact"
            className="text-sm font-semibold px-7 py-3 bg-transparent text-ink rounded-lg border-2 border-[#e4e8ef] hover:border-ink transition-colors"
          >
            Parler à un expert
          </a>
        </div>

        {/* Stats */}
        <div className="fade-up delay-5 flex gap-8 pt-7 border-t border-[#e4e8ef]">
          {STATS.map(({ value, label }) => (
            <div key={label}>
              <p className="font-playfair font-bold text-[2rem] text-ink leading-none mb-1">
                {value}
              </p>
              <p className="text-xs text-muted font-medium">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right: visual card ── */}
      <div className="fade-up delay-3 relative hidden lg:block" style={{ zIndex: 2 }}>
        <div className="bg-stone rounded-[20px] border border-[#e4e8ef] p-10">
          {/* Card header */}
          <div className="flex items-center gap-3 mb-7">
            <div className="w-11 h-11 rounded-xl bg-skylt flex items-center justify-center text-xl flex-shrink-0">
              🔍
            </div>
            <div>
              <p className="font-semibold text-[0.95rem] text-ink">
                Rapport d'audit en cours
              </p>
              <p className="text-xs text-muted">
                Client : Acme Corp · Infrastructure réseau
              </p>
            </div>
          </div>

          {/* Progress bars */}
          <div className="flex flex-col gap-4">
            {AUDIT_PROGRESS.map(({ label, pct }) => (
              <div key={label}>
                <div className="flex justify-between text-xs font-medium text-slate mb-1.5">
                  <span>{label}</span>
                  <span>{pct}%</span>
                </div>
                <div className="h-1.5 bg-[#e4e8ef] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full progress-fill"
                    style={{
                      width: `${pct}%`,
                      background: "linear-gradient(90deg, #3b82f6, #60a5fa)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full mt-6">
            ✓ 3 vulnérabilités critiques identifiées
          </span>
        </div>

        {/* Floating badge */}
        <div className="absolute -bottom-5 -left-6 bg-white border border-[#e4e8ef] rounded-2xl px-4 py-3 shadow-lg flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-skylt flex items-center justify-center text-lg flex-shrink-0">
            📋
          </div>
          <div>
            <p className="text-[0.7rem] text-muted">Rapport livré sous</p>
            <p className="font-bold text-sm text-ink">48 heures</p>
          </div>
        </div>
      </div>
    </section>
  );
}
