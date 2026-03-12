import { WHY_ITEMS } from "../data";

export default function WhySection() {
  const PROJECTS = [
    { icon: "🔧", title: "Remédiation Active Directory", desc: "Audit et sécurisation d'infrastructures AD complexes" },
    { icon: "☁️", title: "Migration VMware → AWS EC2", desc: "Lift & shift de workloads critiques vers le cloud" },
    { icon: "⚙️", title: "Automatisation Ansible", desc: "Déploiement infra as code et gestion de configurations" },
    { icon: "🏗️", title: "Tiering Active Directory", desc: "Architecture sécurisée PAW & tier 0/1/2" },
    { icon: "🌐", title: "Tiering Réseau", desc: "Segmentation avancée et architecture Zero Trust" },
    { icon: "📡", title: "Migration Hyper-V → Azure", desc: "Consolidation infrastructure cloud hybride" },
  ];

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
            Nos consultants apportent une expertise terrain sur des
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

        {/* Right: experience & projects */}
        <div className="bg-stone rounded-2xl p-8">
          <h3 className="font-playfair font-bold text-ink text-xl mb-1">
            Expertise Éprouvée
          </h3>
          <p className="text-muted text-sm font-light mb-2">
            12 ans d'expérience terrain
          </p>
          <div className="bg-white rounded-xl p-4 mb-7 border border-[#e4e8ef]">
            <p className="text-sky font-bold text-lg">Dizaines</p>
            <p className="text-muted text-sm font-light">de projets infrastructure, réseaux et cloud en production</p>
          </div>

          <h4 className="font-semibold text-ink text-sm uppercase tracking-wide mb-4 text-muted">
            Projets Réalisés
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {PROJECTS.map((project) => (
              <div
                key={project.title}
                className="bg-white rounded-lg p-3.5 border border-[#e4e8ef] hover:border-sky/30 transition-all"
              >
                <div className="text-[1.2rem] mb-2">{project.icon}</div>
                <p className="font-semibold text-ink text-xs mb-1">
                  {project.title}
                </p>
                <p className="text-muted text-xs font-light">
                  {project.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}