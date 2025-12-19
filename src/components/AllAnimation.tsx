import React from "react";
import { memo, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { sampleSentences, sampleSquares } from "@/constants/data";

const splitText = (text: string) => {
  return text.split("").map((char, i) => (
    <span key={i} className="char inline-block will-change-transform">
      {char === " " ? "\u00A0" : char}
    </span>
  ));
};

export const AllAnimation = memo(function AllAnimation() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const titleEl = titleRef.current;
    const subtitleEl = subtitleRef.current;
    const move = window.innerWidth * 1.2;
    if (!root || !titleEl || !subtitleEl) return;
    const ctx = gsap.context(() => {
      const imgs = root.querySelectorAll(".sq-img");
      const titleChars = [...titleEl.querySelectorAll(".char")].reverse();
      const subtitleChars = [...subtitleEl.querySelectorAll(".char")].reverse();
      const circleItem = gsap.utils.toArray<HTMLDivElement>(".circle-item");

      const tLen = titleChars.length;
      const sLen = subtitleChars.length;

      // إحنا عايزين اللي فوق يتحرك ببطء واللي تحت بسرعة
      // علشان يخلصوا في نفس التوقيت
      const totalSteps = Math.max(tLen, sLen);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=2000",
          scrub: 1.2,
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
            {
              x: 0,
              opacity: 1,
            },
            {
              x: "+=200vw",
              opacity: 0.4,
              ease: "none",
              duration: 0.5,
              yPercent: "random(-200, 200)",
              rotation: "random(-20, 20)",
            },
            pos
          );
        }

        if (sChar) {
          tl.fromTo(
            sChar,
            { x: 0, opacity: 1 },
            {
              x: "+=200vw",
              opacity: 0.4,
              ease: "none",
              duration: 0.25,
              yPercent: "random(-200, 200)",
              rotation: "random(-20, 20)",
            },
            pos // **نفس لحظة حركة اللي فوق EXACT**
          );
        }
      }

      gsap.set(imgs, { opacity: 0 });

      tl.fromTo(
        imgs,
        {
          x: move,
          opacity: 0.5,
          delay: 3,
          yPercent: "random(-200, 200)",
          rotation: "random(-20, 20)",
        },
        {
          x: 0,
          opacity: 1,
          duration: 5,
          delay:5,
          stagger: 0.12,
          // ease: "power2.out",
        }
      );
      [...imgs].map((img) =>
        tl.fromTo(
          img,
          {
            x: 0,
            opacity: 1, duration: 5,
          delay:5,
          },
          {
            opacity: 0.5,
            x: -move, duration: 5,
          delay:5,
          }
        )
      );

      /** INITIAL distribution */
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="overflow-x-hidden relative ">
      <section className="h-svh flex items-center justify-center px-4 relative overflow-hidden">
        <div className="w-full  fixed h-screen inset-0 flex items-center justify-center flex-col">
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
      <section className="h-screen flex items-center overflow-hidden relative custom-scrollbar">
        <div className="w-full  fixed h-screen top-0 flex items-center justify-center flex-col bg-amber-300">
          <div className="flex gap-6 mx-auto items-center justify-center flex-wrap">
            {sampleSquares.map((it) => (
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
      </section>{" "}
      {/* <section className="h-screen relative flex items-center justify-center overflow-hidden">
        <div className="w-full overflow-hidden bg-black sticky h-screen inset-0 flex items-center justify-center flex-col">
          <div className="relative w-60 h-60 bg-amber-400">
            {sampleSentences.map((s, idx) => (
              <div
                key={idx}
                className="circle-item absolute left-1/2 top-1/2 w-40 text-center text-sm font-medium"
                style={{ transform: "translate(-50%, -50%)" }}
              >
                {s}
              </div>
            ))}
          </div>
        </div>
      </section> */}
    </div>
  );
});
