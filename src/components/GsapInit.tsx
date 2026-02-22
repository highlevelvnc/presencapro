"use client";

import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export function GsapInit() {
  useEffect(() => {
    // Se o user prefere reduzir movimento, não anima
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    // Usa context pra não bugar no Strict Mode
    const ctx = gsap.context(() => {
      // HERO intro
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      // IMPORTANTÍSSIMO: immediateRender false evita "travar" opacity 0
      if (document.querySelector("[data-hero-badge]")) {
        tl.fromTo(
          "[data-hero-badge]",
          { opacity: 0, y: -16 },
          { opacity: 1, y: 0, duration: 0.55, immediateRender: false },
          0.15
        );
      }

      if (document.querySelector("[data-hero-headline]")) {
        tl.fromTo(
          "[data-hero-headline]",
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.85, immediateRender: false },
          0.25
        );
      }

      if (document.querySelector("[data-hero-sub]")) {
        tl.fromTo(
          "[data-hero-sub]",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.75, immediateRender: false },
          0.5
        );
      }

      const ctas = document.querySelectorAll("[data-hero-cta]");
      if (ctas.length) {
        tl.fromTo(
          ctas,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, stagger: 0.12, duration: 0.55, immediateRender: false },
          0.65
        );
      }

      // Reveal genérico por seção
      document.querySelectorAll("[data-reveal]").forEach((el) => {
        const type = el.getAttribute("data-reveal") || "fade-up";
        const delay = parseFloat(el.getAttribute("data-delay") || "0");

        const fromVars: Record<string, any> = {
          "fade-up": { opacity: 0, y: 40 },
          "fade-down": { opacity: 0, y: -30 },
          "fade-left": { opacity: 0, x: 40 },
          "fade-right": { opacity: 0, x: -40 },
          scale: { opacity: 0, scale: 0.92 },
          fade: { opacity: 0 },
        };

        gsap.fromTo(
          el,
          { ...(fromVars[type] ?? fromVars["fade-up"]) },
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.85,
            delay,
            ease: "power3.out",
            immediateRender: false,
            scrollTrigger: { trigger: el, start: "top 88%" },
          }
        );
      });
    });

    return () => {
      // Reverte tudo que foi aplicado pelo context (inclui inline styles)
      ctx.revert();
    };
  }, []);

  return null;
}