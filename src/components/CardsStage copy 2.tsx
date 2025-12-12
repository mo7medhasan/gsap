import React, { useEffect, useRef, memo } from "react";
import gsap from "gsap";


export const CardsStage = memo(function CardsStage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const cards = gsap.utils.toArray<HTMLElement>(".stage-card");
    const screenW = window.innerWidth;

    const ctx = gsap.context(() => {
      cards.forEach((card, index) => {
        // Timeline لكل كارت
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: `center center`, // توقيت كل كارت
            end: `${index+1 * 40 + 100}% center`,
            scrub: 1.2,
          pin:true
          },
        });

        tl.fromTo(
          card,
          {
            x: screenW, // يدخل من اليمين
            scale: 0.3,
            opacity: 0,
          },
          {
            x: 0, // يصل إلى المنتصف
            scale: 1.2,
            opacity: 1,
            ease: "power3.out",
          }
        )

          // بعد المنتصف → يبدأ ينكمش
          .to(card, {
            x: -screenW / 2,
            scale: 0.6,
            opacity: 0.6,
            ease: "power3.inOut",
          })

          // النهاية → يخرج شمال نهائي
          .to(card, {
            x: -screenW,
            scale: 0.3,
            opacity: 0,
            ease: "power3.in",
          });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="min-h-[300vh] flex items-center justify-center overflow-hidden"
    >
      <div className="flex gap-10 content-cards">
        {[1, 2, 3].map((i) => (
          <article
            key={i}
            className="stage-card w-64 h-48 rounded-xl bg-white/80 border p-4 shadow-lg"
          >
            <div className="flex items-center justify-center h-full">
              Card {i}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
});
