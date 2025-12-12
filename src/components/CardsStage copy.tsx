import React, { memo, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { sampleCards } from "../constants/data";

gsap.registerPlugin(ScrollTrigger);

export const CardsStage = memo(function CardsStage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const cards = gsap.utils.toArray<HTMLElement>(".stage-card");

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "center 70%",
          end: "+=1000",
          scrub: 1.2,

          pin: true,
        },
      });

      tl.from(
        cards,

        {
        x:0,
          ease: "power3.out", // smoother
          duration: 2,
          stagger: 0.1,
          opacity: 0.2,
          scale: 0.5,
          onUpdate() {
            cards.forEach((card, idx) => {
              const progress = tl.progress();
              const angle =
                progress * Math.PI * 2 + (idx / cards.length) * Math.PI * 2;
              const r = 300;
              const x = Math.cos(angle) * r;
              const y = Math.sin(angle) * r;
              gsap.set(card, { x, y });
            });
          },
        }
      );
      tl.to(
        cards,

        {
          x: 100,
          ease: "power3.out", // smoother
          duration: 2,
          stagger: 0.1,
          opacity: 0.8,
          scale: 1,
          onUpdate() {
            cards.forEach((card, idx) => {
              const progress = tl.progress();
              const angle =
                progress * Math.PI * 2 + (idx / cards.length) * Math.PI * 2;
              const r = 200;
              const x = Math.cos(angle) * r;
              const y = Math.sin(angle) * r;
              gsap.set(card, { x, y });
            });
          },
        }
      );
      tl.to(
        cards,

        {
          x: 0,
          ease: "power3.out", // smoother
          duration: 2,
          stagger: 0.1,
          opacity: 1,
          scale: 1,
          onUpdate() {
            cards.forEach((card, idx) => {
              const progress = tl.progress();
              const angle =
                progress * Math.PI * 2 + (idx / cards.length) * Math.PI * 2;
              const r = 100;
              const x = Math.cos(angle) * r;
              const y = Math.sin(angle) * r;
              gsap.set(card, { x, y });
            });
          },
        }
      );
      tl.to(
        cards,

        {
          x: -200,
          ease: "power3.out", // smoother
          duration: 2,
          stagger: 0.1,
          opacity: 0.6,
          scale: 0.5,
          onUpdate() {
            cards.forEach((card, idx) => {
              const progress = tl.progress();
              const angle =
                progress * Math.PI * 2 + (idx / cards.length) * Math.PI * 2;
              const r = 200;
              const x = Math.cos(angle) * r;
              const y = Math.sin(angle) * r;
              gsap.set(card, { x, y });
            });
          },
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="min-h-[250vh] flex items-center">
      <div className="w-full max-w-6xl mx-auto px-6 flex gap-8 items-center justify-center">
        {sampleCards.map((c) => (
          <article
            key={c.id}
            className="stage-card w-64 h-44 rounded-2xl bg-white/80 border p-4 shadow-md will-change-transform will-change-opacity"
          >
            <div className="flex-1 flex items-center justify-center">IMG</div>
            <h3 className="mt-2 font-semibold">{c.title}</h3>
            <p className="text-sm text-gray-600">{c.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
});
