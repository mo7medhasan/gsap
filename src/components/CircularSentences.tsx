import React, { memo, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { sampleSentences } from "../constants/data";

gsap.registerPlugin(ScrollTrigger);

export const CircularSentences: React.FC<{ sentences?: string[] }> = memo(
  function CircularSentences({ sentences = sampleSentences }) {
    const rootRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      const root = rootRef.current;
      if (!root) return;
      const items = gsap.utils.toArray<HTMLDivElement>(".circle-item");

      const ctx = gsap.context(() => {
        /** INITIAL distribution */
        const baseRadius = 100;
        items.forEach((item, idx) => {
          const angle = (idx / items.length) * Math.PI * 2;
          const x = Math.cos(angle) * baseRadius;
          const y = Math.sin(angle) * baseRadius;
          gsap.set(item, { x, y });
        });

        /** SCROLL animation */
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "center center",
            end: "+=600", // ← توسّع أبطأ
            scrub: 1.5, // ← حركة أنعم جداً
            pin: true,
          },
        });

        const radius = { value: baseRadius };
        const endRadius = Math.max(window.innerWidth, window.innerHeight) * 1.2;

        tl.from(items, { opacity: 0.3 });
        tl.fromTo(
          radius,
          { value: baseRadius },
          {
            value: endRadius / 2,
            ease: "power3.out", // smoother
            duration:2,
            onUpdate() {
              const r = radius.value;
              items.forEach((item, idx) => {
                 const progress = tl.progress();
              
                const angle =
                progress * Math.PI * 2+ (idx / items.length) * Math.PI * 2;

                const x = Math.cos(angle) * r;
                const y = Math.sin(angle) * r;
                gsap.set(item, { x, y });
              });
            },
         
          }
        );
      
        tl.to(items, {
          value: endRadius,
          ease: "power3.out", // smoother
          onUpdate() {
            const r = radius.value;
            items.forEach((item, idx) => {
              const angle = (idx / items.length) * Math.PI * 2;
              const x = Math.cos(angle) * r;
              const y = Math.sin(angle) * r;
              gsap.set(item, { x, y });
            });
          },
        });
        tl.to(items, { opacity: 0, ease: "power2.out" });
      }, root);

      return () => ctx.revert();
    }, [sentences]);

    return (
      <section
        ref={rootRef}
        className="min-h-[300vh] flex items-center justify-center overflow-hidden"
      >
        <div className="relative w-60 h-60">
          {sentences.map((s, idx) => (
            <div
              key={idx}
              className="circle-item absolute left-1/2 top-1/2 w-40 text-center text-sm font-medium"
              style={{ transform: "translate(-50%, -50%)" }}
            >
              {s}
            </div>
          ))}
        </div>
      </section>
    );
  }
);
