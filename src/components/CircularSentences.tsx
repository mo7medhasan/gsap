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
        /** 1) INITIAL distribution (small circle but spaced) */
        const baseRadius = 120; // ← المسافة الأولية بين الجمل
        items.forEach((item, idx) => {
          const angle = (idx / items.length) * Math.PI * 2;
          const x = Math.cos(angle) * baseRadius;
          const y = Math.sin(angle) * baseRadius;
          gsap.set(item, { x, y });
        });

        /** 2) SCROLL animation */
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "center center",
            end: "bottom bottom",
            scrub: true,
            anticipatePin: 1,
            pinReparent: true,
            pin: true,
          },
        });

        const radius = { value: baseRadius };
        const endRadius = 1200;

        tl.fromTo(
          radius,
          { value: baseRadius },
          {
            value: endRadius,
            ease: "power2.out",
            onUpdate() {
              const r = radius.value;
              items.forEach((item, idx) => {
                const angle = (idx / items.length) * Math.PI * 2;
                const x = Math.cos(angle) * r;
                const y = Math.sin(angle) * r;
                gsap.set(item, { x, y });
              });
            },
          }
        );

        tl.to(root, { opacity: 0, ease: "power1.in" });
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
