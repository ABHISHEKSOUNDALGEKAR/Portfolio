import { useEffect, useRef } from "react";

// A dependency-free canvas "universe" backdrop: layered twinkling stars
// connected by faint constellation/circuit lines (stars + tech, as
// requested), gentle mouse parallax, and the occasional shooting star.
// Plain Canvas2D on purpose — no WebGL/three.js — so there's no risk of the
// canvas-sizing/z-index/attenuation pitfalls that broke earlier attempts,
// and it drops ~950KB of three.js from the bundle entirely.

function buildStars(width, height, count) {
  const stars = [];
  for (let i = 0; i < count; i++) {
    const layer = Math.random(); // 0 = far/small/slow, 1 = near/large/fast
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 0.6 + layer * 1.6,
      layer,
      vx: (Math.random() - 0.5) * (0.06 + layer * 0.1),
      vy: (Math.random() - 0.5) * (0.06 + layer * 0.1),
      phase: Math.random() * Math.PI * 2,
      speed: 0.6 + Math.random() * 0.9,
      hue: Math.random() < 0.75 ? "199, 210, 254" : "165, 243, 252", // indigo-200 / cyan-200
    });
  }
  return stars;
}

export default function HeroScene() {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d");
    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let stars = [];
    let raf = null;
    let running = true;
    let mouse = { x: -9999, y: -9999, active: false };
    let shooting = null;
    let shootTimer = 3 + Math.random() * 4;

    function resize() {
      width = wrap.clientWidth;
      height = wrap.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const density = Math.min(170, Math.max(70, Math.round((width * height) / 9000)));
      stars = buildStars(width, height, density);
    }

    function spawnShootingStar() {
      const startX = Math.random() * width * 0.6;
      const startY = Math.random() * height * 0.4;
      shooting = {
        x: startX,
        y: startY,
        vx: 5 + Math.random() * 4,
        vy: 2.5 + Math.random() * 2,
        life: 0,
        maxLife: 0.9,
      };
    }

    // `draw` never depends on requestAnimationFrame actually firing — it's
    // called directly for a guaranteed first paint, and again on every rAF
    // tick for animation. Some environments throttle/delay rAF (tab
    // occlusion, low-power mode, background tabs); without this split the
    // canvas could stay permanently blank until the first tick finally runs.
    function draw(t) {
      const time = t / 1000;

      ctx.clearRect(0, 0, width, height);

      // Constellation lines between nearby stars — cheap O(n^2) at this count.
      const maxDist = Math.min(140, width / 8);
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const a = stars[i];
          const b = stars[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.12 * ((a.layer + b.layer) / 2 + 0.3);
            ctx.strokeStyle = `rgba(148, 163, 253, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Stars themselves, with twinkle + slow drift + gentle mouse parallax.
      for (const s of stars) {
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < -10) s.x = width + 10;
        if (s.x > width + 10) s.x = -10;
        if (s.y < -10) s.y = height + 10;
        if (s.y > height + 10) s.y = -10;

        let dx = 0;
        let dy = 0;
        if (mouse.active) {
          const mdx = s.x - mouse.x;
          const mdy = s.y - mouse.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          const radius = 110;
          if (mdist < radius) {
            const push = ((radius - mdist) / radius) * 6 * s.layer;
            dx = (mdx / (mdist || 1)) * push;
            dy = (mdy / (mdist || 1)) * push;
          }
        }

        const twinkle = 0.35 + 0.55 * Math.max(0, Math.sin(time * s.speed + s.phase));
        const glowR = s.r * (2.4 + s.layer * 2);
        const grad = ctx.createRadialGradient(
          s.x + dx, s.y + dy, 0,
          s.x + dx, s.y + dy, glowR
        );
        grad.addColorStop(0, `rgba(${s.hue}, ${twinkle})`);
        grad.addColorStop(1, `rgba(${s.hue}, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(s.x + dx, s.y + dy, glowR, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(255, 255, 255, ${twinkle})`;
        ctx.beginPath();
        ctx.arc(s.x + dx, s.y + dy, s.r * 0.55, 0, Math.PI * 2);
        ctx.fill();
      }

      // Occasional shooting star.
      const dt = 1 / 60;
      shootTimer -= dt;
      if (!shooting && shootTimer <= 0) {
        spawnShootingStar();
        shootTimer = 6 + Math.random() * 9;
      }
      if (shooting) {
        shooting.life += dt;
        shooting.x += shooting.vx;
        shooting.y += shooting.vy;
        const p = shooting.life / shooting.maxLife;
        const alpha = p < 0.15 ? p / 0.15 : Math.max(0, 1 - (p - 0.15) / 0.85);
        const tailX = shooting.x - shooting.vx * 6;
        const tailY = shooting.y - shooting.vy * 6;
        const trail = ctx.createLinearGradient(tailX, tailY, shooting.x, shooting.y);
        trail.addColorStop(0, "rgba(224, 231, 255, 0)");
        trail.addColorStop(1, `rgba(224, 231, 255, ${alpha})`);
        ctx.strokeStyle = trail;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(shooting.x, shooting.y);
        ctx.stroke();
        if (p >= 1) shooting = null;
      }
    }

    function frame(t) {
      if (!running) return;
      raf = requestAnimationFrame(frame);
      draw(t);
    }

    resize();
    draw(performance.now()); // guaranteed first paint, independent of rAF

    if (prefersReducedMotion) {
      running = false;
    } else {
      raf = requestAnimationFrame(frame);
    }

    const onResize = () => {
      resize();
      draw(performance.now());
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(wrap);

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top, active: true };
    };
    const onMouseLeave = () => {
      mouse.active = false;
    };
    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        if (raf) cancelAnimationFrame(raf);
      } else {
        draw(performance.now());
        if (!prefersReducedMotion) {
          running = true;
          raf = requestAnimationFrame(frame);
        }
      }
    };

    wrap.addEventListener("mousemove", onMouseMove);
    wrap.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      wrap.removeEventListener("mousemove", onMouseMove);
      wrap.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0 overflow-hidden" style={{ zIndex: -20 }} aria-hidden="true">
      {/* Soft nebula glow blobs, pure CSS — cheap, GPU-accelerated */}
      <div className="hero-nebula hero-nebula-a" />
      <div className="hero-nebula hero-nebula-b" />
      <div className="hero-nebula hero-nebula-c" />
      {/* Faint tech grid */}
      <div className="absolute inset-0 bg-grid opacity-[0.05]" />
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
