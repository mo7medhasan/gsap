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

    const imgs = root.querySelectorAll(".sq-img");

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "center center",
          end: "bottom",
          scrub: 1,
          pin: true,
        },
      });
      tl.fromTo(
        imgs,
        { x: "100vw", opacity: 0.5 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.12,
          ease: "power2.out",
         
        }
      );
      tl.to(imgs, {
        opacity:1,
        x: 0,
        stagger: 0.06,
      
      });
      // fade out gradually after passing
      tl.to(imgs, {
        opacity: 0.5,
        x: "-100vw",
        stagger: 0.06,
      
      });
    }, root);

    return () => ctx.revert();
  }, [items]);

  return (
    <section
      ref={rootRef}
      className="min-h-screen flex items-center overflow-hidden"
    >
      <div className="w-full max-w-5xl mx-auto px-6 ">
        <div className="flex gap-6 ">
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
