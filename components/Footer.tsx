const FOOTER_LINKS = [
  { label: "Mentions légales", href: "#" },
  { label: "Confidentialité", href: "#" },
  { label: "CGV", href: "#" },
  { label: "Contact", href: "mailto:contact@mistral-it.fr" },
];

export default function Footer() {
  return (
    <footer className="bg-ink py-10 px-6 lg:px-20">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
        {/* Logo */}
        <div>
          <p className="font-playfair font-bold text-white text-lg mb-0.5">
            Mistral IT
          </p>
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} Mistral IT SAS — Tous droits réservés
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-6 justify-center">
          {FOOTER_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-white/40 text-xs hover:text-white/80 transition-colors"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
