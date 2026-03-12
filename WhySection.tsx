import { WHY_ITEMS, CERTS } from "@/lib/data";

export default function WhySection() {
  return (
    <section id="pourquoi" className="py-28 px-6 lg:px-20 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <div>
          <p className="text-xs font-semibold text-sky tracking-widest uppercase mb-3">
            Pourquoi Mistral IT
          </p>
          <h2 className="font-playfair font-bold text-ink text-3xl sm:text-[2.6rem] leading-tight tracking-tight mb-4">
            La confiance se
            <br />
            construit dans les détails
          </h2>
          <p className="text-slate font-light text-[1rem] leading-relaxed max-w-md mb-10">
            Nos consultants certifiés apportent une expertise terrain sur des
            environnements critiques, avec une approche orientée résultat.
          </p>

          <div className="flex flex-col gap-4">
            {WHY_ITEMS.map((item) => (
              <div
                key={item.title}
                className="reveal flex gap-4 items-start p-5 rounded-xl border border-[#e4e8ef] transition-all duration-200 hover:border-sky/30 hover:bg-skylt"
              >
                <div className="w-10 h-10 rounded-xl bg-skylt flex items-center justify-center text-lg flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-ink text-[0.95rem] mb-0.5">
                    {item.title}
                  </h4>
                  <p className="text-muted text-sm font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: certs */}
        <div className="bg-stone rounded-2xl p-8">
          <h3 className="font-playfair font-bold text-ink text-xl mb-1">
            Certifications & Référentiels
          </h3>
          <p className="text-muted text-sm font-light mb-7">
            Nos consultants sont certifiés et nos méthodes alignées sur les
            standards internationaux.
          </p>
          <div className="grid grid-cols-2 gap-3">
            {CERTS.map((cert) => (
              <div
                key={cert.name}
                className="reveal bg-white rounded-xl p-4 border border-[#e4e8ef]"
              >
                <p className="font-bold text-sky text-sm mb-0.5">{cert.name}</p>
                <p className="text-muted text-xs font-light">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
