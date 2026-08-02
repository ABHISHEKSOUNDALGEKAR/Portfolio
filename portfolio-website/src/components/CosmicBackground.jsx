import { useEffect, useMemo, useRef } from "react";

// A pure DOM + CSS "universe" backdrop, pinned to the viewport (position:
// fixed) so it stays behind every section as the page scrolls, instead of
// living inside the Hero section and scrolling away with it. Dark-mode
// only — see index.css, sections turn translucent under `.dark` so this
// shows through; in light mode it's hidden entirely via CSS.
//
// No canvas/WebGL, no requestAnimationFrame loop — everything here is a
// normal DOM/SVG element with a CSS animation, painted by the browser's
// regular layout pipeline like any other element on the page.

function useStarField(count) {
  return useMemo(() => {
    const stars = Array.from({ length: count }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 2.2,
      bright: Math.random() < 0.65,
      duration: 2.2 + Math.random() * 3.2,
      delay: -Math.random() * 6,
    }));

    // Precompute a light constellation network between nearby stars.
    const lines = [];
    const maxDist = 9;
    for (let i = 0; i < stars.length; i++) {
      let connections = 0;
      for (let j = i + 1; j < stars.length && connections < 2; j++) {
        const dx = stars[i].x - stars[j].x;
        const dy = stars[i].y - stars[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          lines.push({
            x1: stars[i].x, y1: stars[i].y,
            x2: stars[j].x, y2: stars[j].y,
            opacity: Math.max(0.05, 0.22 * (1 - dist / maxDist)),
          });
          connections++;
        }
      }
    }
    return { stars, lines };
  }, [count]);
}

export default function CosmicBackground() {
  const { stars, lines } = useStarField(110);
  const shootingStars = useMemo(
    () =>
      [0, 1, 2].map((i) => ({
        top: 6 + Math.random() * 35,
        left: 4 + Math.random() * 45,
        delay: i * 4.5 + Math.random() * 3,
        duration: 8 + Math.random() * 6,
      })),
    []
  );

  const layerRef = useRef(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;
    const fine = window.matchMedia?.("(pointer: fine)").matches;
    if (!fine) return;

    const onMove = (e) => {
      const px = e.clientX / window.innerWidth - 0.5;
      const py = e.clientY / window.innerHeight - 0.5;
      layer.style.transform = `translate(${px * -10}px, ${py * -8}px)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      className="hidden dark:block fixed inset-0 overflow-hidden bg-ink-950"
      style={{ zIndex: -1 }}
      aria-hidden="true"
    >
      <div className="hero-nebula hero-nebula-a" />
      <div className="hero-nebula hero-nebula-b" />
      <div className="hero-nebula hero-nebula-c" />
      <div className="absolute inset-0 bg-grid opacity-[0.06]" />

      <div ref={layerRef} className="absolute inset-0" style={{ transition: "transform 0.3s ease-out" }}>
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {lines.map((l, i) => (
            <line
              key={i}
              x1={l.x1}
              y1={l.y1}
              x2={l.x2}
              y2={l.y2}
              stroke="rgb(148, 163, 253)"
              strokeWidth="0.08"
              style={{ opacity: l.opacity }}
            />
          ))}
        </svg>

        {stars.map((s, i) => (
          <span
            key={i}
            className="hero-star"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              background: s.bright ? "#e0e7ff" : "#a5b4fc",
              boxShadow: `0 0 ${s.size * 3}px ${s.size * 0.6}px ${s.bright ? "rgba(224,231,255,0.55)" : "rgba(165,180,252,0.4)"}`,
              animationDuration: `${s.duration}s`,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}

        {shootingStars.map((s, i) => (
          <span
            key={i}
            className="hero-shooting-star"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              animationDuration: `${s.duration}s`,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
