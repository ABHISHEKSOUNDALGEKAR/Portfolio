import { useEffect, useRef, useState } from "react";

/**
 * A small dot glued to the pointer + a trailing ring that eases toward it.
 * Desktop (fine-pointer) only, and skipped entirely for reduced-motion users.
 */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const [enabled, setEnabled] = useState(false);
  const [hoveringLink, setHoveringLink] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia?.("(pointer: fine)").matches;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const on = Boolean(fine && !reduced);
    setEnabled(on);
    document.body.classList.toggle("custom-cursor-active", on);
    return () => document.body.classList.remove("custom-cursor-active");
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
      const target = e.target;
      setHoveringLink(Boolean(target.closest?.("a, button, [role='button']")));
    };

    let raf;
    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.18;
      ring.current.y += (pos.current.y - ring.current.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0)`;
      }
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[100] w-1.5 h-1.5 -ml-[3px] -mt-[3px] rounded-full bg-accent-400"
        style={{ willChange: "transform" }}
      />
      <div
        ref={ringRef}
        className={`pointer-events-none fixed top-0 left-0 z-[100] rounded-full border transition-[width,height,border-color] duration-200 ease-out ${
          hoveringLink
            ? "w-10 h-10 -ml-5 -mt-5 border-accent-400/80"
            : "w-6 h-6 -ml-3 -mt-3 border-white/30"
        }`}
        style={{ willChange: "transform" }}
      />
    </>
  );
}
