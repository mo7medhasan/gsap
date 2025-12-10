"use client";

import { memo, useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const splitText = (text: string) => {
  return text.split("").map((char, i) => (
    <span key={i} className="char inline-block will-change-transform">
      {char === " " ? "\u00A0" : char}
    </span>
  ));
};

export const LargeHeroCard = memo(function LargeHeroCard() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const titleEl = titleRef.current;
    const subtitleEl = subtitleRef.current;

    if (!root || !titleEl || !subtitleEl) return;

    const titleChars = [...titleEl.querySelectorAll(".char")].reverse();
    const subtitleChars = [...subtitleEl.querySelectorAll(".char")].reverse();

    const tLen = titleChars.length;
    const sLen = subtitleChars.length;

    // إحنا عايزين اللي فوق يتحرك ببطء واللي تحت بسرعة
    // علشان يخلصوا في نفس التوقيت
    const totalSteps = Math.max(tLen, sLen);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: "top top",
        end: "+=1000",
        scrub: 1,
        anticipatePin:1,
        pin: true,
      },
    });

    for (let step = 0; step < totalSteps; step++) {
      // نجيب index مناسب لكل خطوة
      const tIndex = Math.round((step / (totalSteps - 1)) * (tLen - 1));
      const sIndex = Math.round((step / (totalSteps - 1)) * (sLen - 1));

      const tChar = titleChars[tIndex];
      const sChar = subtitleChars[sIndex];

      const pos = step * 0.05; // نفس اللحظة بين الاثنين

      if (tChar) {
        tl.fromTo(
          tChar,
          { x: 0, opacity: 1 },
          { x: "+=200vw", opacity: 0.4, ease: "none", duration: 0.5 },
          pos
        );
      }

      if (sChar) {
        tl.fromTo(
          sChar,
          { x: 0, opacity: 1 },
          { x: "+=200vw", opacity: 0.4, ease: "none", duration: 0.25 },
          pos // **نفس لحظة حركة اللي فوق EXACT**
        );
      }
    }

    return () => {
      tl.kill();
    };
    }, []);

  return (
    <section
      ref={rootRef}
      className="h-screen flex items-center justify-center px-4 relative overflow-hidden"
    >
      <div className="fixed text-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-4">
        <h1
          ref={titleRef}
          className="text-2xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 whitespace-nowrap"
        >
          {splitText("A Beautiful Title")}
        </h1>

        <p
          ref={subtitleRef}
          className="sm:text-xl md:text-3xl text-purple-300 "
        >
          {splitText(
            "A descriptive subtitle that will animate letter by letter as you scroll."
          )}
        </p>
      </div>
    </section>
  );
});
