import Image from 'next/image';

export default function AboutSection() {
  return (
    <section id="about" className="py-20 px-6 lg:px-20 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <p className="text-xs font-semibold text-sky tracking-widest uppercase mb-3">A propos</p>
        <h2 className="font-playfair font-bold text-ink text-3xl sm:text-[2.6rem] leading-tight tracking-tight mb-8">
          Mon parcours et ma facon de travailler
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-10 items-start">
          <div className="flex-shrink-0 mx-auto lg:mx-0">
            <Image
              src="/images/ENG-Lionnel.jpg" // Remplacez par le chemin de votre photo
              alt="Lionnel ENG"
              width={450}
              height={400}
              className="rounded-2xl object-cover border border-[#e4e8ef]"
            />
          </div>

          <div className="text-left">
            <p className="text-base lg:text-lg mb-4 text-slate leading-relaxed">
              Je suis Lionnel ENG, fondateur de Mistral IT. J'accompagne les TPE, PME et structures multi-sites
              dans l'audit, la remediation et la structuration complete de leur environnement IT.
            </p>

            <p className="text-base lg:text-lg mb-6 text-slate leading-relaxed">
              Mon approche est terrain: je pars de vos contraintes metier, je priorise les actions qui ont un impact
              reel, puis je vous livre un plan concret avec un accompagnement operationnel.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              {[
                "6+ ans d'experience en infrastructures critiques",
                "Specialisation audit, Active Directory et securite reseau",
                "Interventions ponctuelles ou accompagnement long terme",
                "Methodologie claire avec livrables actionnables",
              ].map((item) => (
                <div key={item} className="rounded-xl border border-[#e4e8ef] bg-white px-4 py-3 text-sm text-slate">
                  {item}
                </div>
              ))}
            </div>

            <p className="text-base lg:text-lg text-slate leading-relaxed">
              Ma mission: rendre votre informatique lisible, robuste et evolutive, sans complexite inutile.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}