"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

const NAV_LINKS = [
  { href: "#audits", label: "Audits" },
  { href: "#services", label: "Services" },
  { href: "#processus", label: "Processus" },
  { href: "#pourquoi", label: "Expertise" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/92 backdrop-blur-md border-b border-[#e4e8ef] shadow-sm"
          : "bg-white/70 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-20 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-baseline gap-1.5">
          <span className="font-playfair font-bold text-[1.3rem] text-ink tracking-tight">
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
                className="text-sm font-medium text-slate hover:text-sky transition-colors"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 bg-ink text-white rounded-lg hover:bg-sky transition-colors"
        >
          Demander un devis
        </a>

        {/* Mobile burger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className={`block w-5 h-0.5 bg-ink transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-0.5 bg-ink transition-all ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-ink transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-[#e4e8ef] px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-slate"
            >
              {label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="text-sm font-semibold px-4 py-2.5 bg-ink text-white rounded-lg text-center"
          >
            Demander un devis
          </a>
        </div>
      )}
    </nav>
  );
}
