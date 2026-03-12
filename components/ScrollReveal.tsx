"use client";
import { useEffect } from "react";

/**
 * Attaches an IntersectionObserver to all elements
 * with the `.reveal` class, adding `.visible` when they enter the viewport.
 * Renders nothing — purely a side-effect component.
 */
export default function ScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
