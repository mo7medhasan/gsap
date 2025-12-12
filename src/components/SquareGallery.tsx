import React, { memo, useEffect, useRef } from "react";
import { sampleSquares } from "../constants/data";
import gsap from "gsap";

export const SquareGallery: React.FC<{
  items?: { id: number; src?: string }[];
}> = memo(function SquareGallery({ items = sampleSquares }) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const move = window.innerWidth * 1.2;
    const imgs = root.querySelectorAll(".sq-img");
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "center center",
          end: "+=2000",
          scrub: 1.2,
          pin: true,
        },
      });
      tl.fromTo(
        imgs,
        { x: move, opacity: 0.5 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.12,
          // ease: "power2.out",
        }
      );
      [...imgs].map((img) =>
        tl.fromTo(
          img,
          {
            x: 0,
            opacity: 1,
          },
          {
            opacity: 0.5,
            x: -move,
          }
        )
      );
    
    }, root);

    return () => ctx.revert();
  }, [items]);

  return (
    <section
      ref={rootRef}
      className="min-h-screen flex items-center overflow-hidden"
    >
      <div className="w-full max-w-5xl mx-auto  ">
        <div className="flex gap-6 mx-auto items-center justify-center flex-wrap">
          {items.map((it) => (
            <div
              key={it.id}
              className="sq-img w-28 h-28 rounded-lg shrink-0 border overflow-hidden bg-gray-100"
            >
              {/* Use next/image in real project; using div for demo */}
              <div className="w-full h-full flex items-center justify-center text-sm text-gray-600">
                Img {it.id + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
