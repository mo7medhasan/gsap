import { memo, useEffect, useRef } from "react";
import gsap from "gsap";

export const PageFooter: React.FC = memo(function PageFooter() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        root,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: root, start: "top bottom" },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={rootRef} className="w-full bg-gray-900 text-white py-12">
      <div className="max-w-5xl mx-auto px-6 text-center">
        Footer content — end of page
      </div>
    </footer>
  );
});
