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
    const moveX = window.innerWidth;
    const cards = gsap.utils.toArray<HTMLElement>(".stage-card");

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "center center",
          end: "+=1000",
          scrub: 1.2,

          pin: true,
        },
      });

      tl.fromTo(
        cards,

        {
          x: `+=${moveX}`,
          ease: "power3.out", // smoother
          stagger: 0.1,
          opacity: 0.2,
          scale: 0.5,
        },
        {
          x: "+=200%",
          stagger: 0.1,
          opacity: 0.5,
          scale: 0.6,
          ease: "power3.out", // smoother

          onUpdate() {
            cards.forEach((card, idx) => {
              const progress = tl.progress();
              const opacity = 0.2 + progress * 0.8;
              const scale = 0.5 + progress * 0.5;
              const x = moveX - progress * moveX + 200;

              if (idx === 0) {
                gsap.set(card, {
                  opacity: opacity + 0.3,
                  scale: scale + 0.2,
                  x: x,
                });
              } else {
                gsap.set(card, {
                  opacity: opacity - 0.3,
                  scale: scale - 0.2,
                  x: x + 100,
                });
              }
            });
          },
        }
      );
      cards.forEach((card, idx) => {
        tl.to(
          card,
          idx == 0
            ? {
                x: 100,
                ease: "power3.out", // smoother
                duration: 2,
                opacity: 1,
                scale: 1.2,
              }
            : {
                x: 100,
                ease: "power3.out", // smoother
                duration: 2,
                opacity: 0.8,
                scale: 0.3,
              }
        );
      });

      cards.forEach((card, idx) => {
        tl.to(
          card,
          idx == 1
            ? {
                x: 0,
                ease: "power3.out", // smoother
                duration: 2,
                opacity: 1,
                scale: 1.2,
              }
            : {
                x: 0,
                ease: "power3.out", // smoother
                duration: 2,
                opacity: 0.8,
                scale: 0.3,
              }
        );
      });
      cards.forEach((card, idx) => {
        tl.to(
          card,
          idx == 2
            ? {
                x: -200,
                ease: "power3.out", // smoother
                duration: 2,
                opacity: 1,
                scale: 1.2,
              }
            : {
                x: -200,
                ease: "power3.out", // smoother
                duration: 2,
                opacity: 0.8,
                scale: 0.3,
              }
        );
      });
      cards.forEach((card, idx) => {
        tl.to(card, {
          x: -moveX,
          ease: "power3.out", // smoother
          duration: 2,
          opacity: 0.8,
          scale: 0.3,
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="min-h-[250vh] flex items-center overflow-hidden"
    >
      <div className=" content w-full max-w-6xl mx-auto px-6 flex gap-8 items-center justify-center">
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
