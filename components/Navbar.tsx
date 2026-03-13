"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

const NAV_LINKS = [
  { href: "#audits", label: "Audits" },
  { href: "#services", label: "Services" },
  { href: "#processus", label: "Processus" },
  { href: "#pourquoi", label: "Pourquoi Mistral IT" },
  { href: "#about", label: "À propos" },
  { href: "#cybersecurity", label: "Contexte Cybersécurité" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isOverDark, setIsOverDark] = useState(false);

  useEffect(() => {
    const checkDarkSection = () => {
      const section = document.getElementById('processus');
      if (section) {
        const rect = section.getBoundingClientRect();
        const navbarHeight = 64; // h-16 = 4rem = 64px
        const isOver = rect.top <= navbarHeight && rect.bottom > 0;
        setIsOverDark(isOver);
      }
      setScrolled(window.scrollY > 20);
    };

    checkDarkSection(); // Initial check
    window.addEventListener("scroll", checkDarkSection, { passive: true });
    return () => window.removeEventListener("scroll", checkDarkSection);
  }, []);

  const textColor = isOverDark ? "text-white" : "text-slate";
  const logoColor = isOverDark ? "text-white" : "text-ink";
  const ctaClasses = isOverDark
    ? "bg-white text-ink hover:bg-gray-100"
    : "bg-ink text-white hover:bg-sky";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isOverDark
          ? "bg-ink/92 backdrop-blur-md border-b border-gray-700 shadow-sm"
          : scrolled
          ? "bg-white/92 backdrop-blur-md border-b border-[#e4e8ef] shadow-sm"
          : "bg-white/70 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-20 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/Logo-entier.png" // Assurez-vous que le fichier logo.png est dans public/images/
            alt="Mistral IT"
            width={40}
            height={60}
            className="object-contain"
          />
          <span className={`font-playfair font-bold text-[1.3rem] ${logoColor} tracking-tight`}>
            Mistral IT
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-sky mb-0.5 flex-shrink-0" />
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className={`text-sm font-medium ${textColor} hover:text-sky transition-colors`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          className={`hidden md:inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors ${ctaClasses}`}
        >
          Demander un devis
        </a>

        {/* Mobile burger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className={`block w-5 h-0.5 ${isOverDark ? "bg-white" : "bg-ink"} transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-0.5 ${isOverDark ? "bg-white" : "bg-ink"} transition-all ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 ${isOverDark ? "bg-white" : "bg-ink"} transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className={`md:hidden ${isOverDark ? "bg-ink border-gray-700" : "bg-white"} border-t border-[#e4e8ef] px-6 py-4 flex flex-col gap-4`}>
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={`text-sm font-medium ${isOverDark ? "text-white" : "text-slate"}`}
            >
              {label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className={`text-sm font-semibold px-4 py-2.5 rounded-lg text-center ${ctaClasses}`}
          >
            Demander un devis
          </a>
        </div>
      )}
    </nav>
  );
}
