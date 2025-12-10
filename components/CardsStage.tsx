import React, { memo, useEffect, useRef } from "react";
import { CardData } from "../types";
import { sampleCards } from "../constants/data";
import gsap from "gsap";

export const CardsStage: React.FC<{ cards?: CardData[] }> = memo(function CardsStage({
  cards = sampleCards,
}) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const cardEls = root.querySelectorAll<HTMLElement>(".stage-card");

    const ctx = gsap.context(() => {
      // first pass: bring cards into view with small scale and low opacity -> full size & opacity
      gsap.fromTo(
        cardEls,
        { x: -120, scale: 0.85, opacity: 0.25 },
        {
          x: (i) => i * 40,
          scale: 1,
          opacity: 1,
          stagger: 0.18,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root,
            start: "top center",
            end: "+=400",
            scrub: true,
          },
        }
      );

      // second pass: push them and fade out
      gsap.to(cardEls, {
        x: (i) => i * 200,
        opacity: 0,
        scale: 0.8,
        stagger: 0.08,
        scrollTrigger: {
          trigger: root,
          start: "center center",
          end: "+=400",
          scrub: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, [cards]);

  return (
    <section ref={rootRef} className="min-h-[80vh] flex items-center">
      <div className="w-full max-w-6xl mx-auto px-6 flex gap-6 items-center justify-center">
        {cards.map((c) => (
          <article
            key={c.id}
            className="stage-card w-64 h-44 rounded-2xl bg-white/80 border p-4 flex flex-col shadow-md"
          >
            <div className="flex-1 flex items-center justify-center">Img</div>
            <h3 className="mt-2 font-semibold">{c.title}</h3>
            <p className="text-sm text-gray-600">{c.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
});
