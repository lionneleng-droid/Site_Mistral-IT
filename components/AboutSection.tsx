import Image from 'next/image';

export default function AboutSection() {
  return (
    <section id="about" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">À propos de moi et de Mistral-IT</h2>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="flex-shrink-0">
            <Image
              src="/images/ENG-Lionnel.jpg" // Remplacez par le chemin de votre photo
              alt="Lionnel ENG"
              width={400}
              height={400}
              className="rounded-full object-cover"
            />
          </div>
          <div className="text-center md:text-left">
            <p className="text-lg mb-4">
              Je suis Lionnel ENG, fondateur et expert en informatique chez Mistral-IT. Avec plus de 6 années d'expérience dans le domaine, je me consacre à protéger les entreprises contre les menaces numériques.
            </p>
            <p className="text-lg mb-4">
              Mistral-IT est une entreprise spécialisée en solutions informatiques, offrant des services de consultation, d'audit et de remédiation pour aider mes clients à naviguer dans un monde numérique de plus en plus complexe.
            </p>
            <p className="text-lg">
              Ma mission : rendre l'informatique accessible et efficace pour tous, en combinant expertise technique et approche personnalisée.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}