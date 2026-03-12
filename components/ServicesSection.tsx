"use client";
import { useState } from "react";
import { SERVICES } from "../data";

export default function ServicesSection() {
  const [active, setActive] = useState(0);
  const current = SERVICES[active];

  return (
    <section id="services" className="py-28 px-6 lg:px-20 bg-white">
      <p className="text-xs font-semibold text-sky tracking-widest uppercase mb-3">
        Nos prestations
      </p>
      <h2 className="font-playfair font-bold text-ink text-3xl sm:text-[2.6rem] leading-tight tracking-tight mb-4">
        Remédiation &amp;
        <br />
        mise en production
      </h2>
      <p className="text-slate font-light text-[1rem] leading-relaxed max-w-lg mb-14">
        Au-delà de l'audit infrastructure, nous déployons les solutions pour corriger les
        vulnérabilités, sécuriser votre architecture réseau et renforcer durablement votre infrastructure IT.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8 items-start">
        {/* Nav */}
        <div className="flex flex-col gap-2">
          {SERVICES.map((s, i) => (
            <button
              key={s.title}
              onClick={() => setActive(i)}
              className={`text-left px-5 py-4 rounded-xl border transition-all duration-200 ${
                active === i
                  ? "bg-skylt border-sky/20 "
                  : "bg-transparent border-transparent hover:bg-stone"
              }`}
            >
              <p
                className={`font-semibold text-[0.95rem] flex justify-between items-center mb-0.5 ${
                  active === i ? "text-sky" : "text-ink"
                }`}
              >
                {s.title}
                <span className="text-sky opacity-70">→</span>
              </p>
              <p className="text-xs text-muted font-light">{s.shortDesc}</p>
            </button>
          ))}
        </div>

        {/* Detail panel */}
        <div className="bg-stone rounded-2xl p-10 lg:sticky lg:top-20">
          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[1.6rem] shadow-sm mb-5">
            {current.icon}
          </div>
          <h3 className="font-playfair font-bold text-ink text-[1.5rem] mb-3 leading-snug">
            {current.title}
          </h3>
          <p className="text-slate font-light text-sm leading-relaxed mb-7">
            {current.fullDesc}
          </p>

          <p className="text-[0.7rem] font-bold text-muted tracking-widest uppercase mb-3">
            Livrables inclus
          </p>
          <div className="flex flex-col">
            {current.deliverables.map((d) => (
              <div
                key={d}
                className="flex items-center gap-3 py-2.5 border-b border-[#e4e8ef] text-sm text-slate font-light last:border-0"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-sky flex-shrink-0" />
                {d}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}