import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";

/**
 * Lightweight 3D tilt-on-hover wrapper with a subtle glow that follows the cursor.
 */
export default function TiltCard({ children, className = "" }) {
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const springX = useSpring(rx, { stiffness: 150, damping: 15 });
  const springY = useSpring(ry, { stiffness: 150, damping: 15 });
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const glow = useMotionTemplate`radial-gradient(220px circle at ${mx}% ${my}%, rgba(99,102,241,0.15), transparent 70%)`;

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    ry.set((px - 0.5) * 10);
    rx.set((0.5 - py) * 10);
    mx.set(px * 100);
    my.set(py * 100);
  };

  const handleLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX: springX, rotateY: springY, transformPerspective: 800 }}
      className={`relative ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{ backgroundImage: glow }}
      />
      {children}
    </motion.div>
  );
}
