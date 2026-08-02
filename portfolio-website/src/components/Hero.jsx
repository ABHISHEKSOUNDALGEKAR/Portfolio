import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { SiGithub, SiLeetcode, SiGmail } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";

// three.js is heavy — load the 3D scene lazily so the initial bundle stays lean.
const HeroScene = lazy(() => import("./three/HeroScene"));

const links = [
  { label: "GitHub", href: "https://github.com/ABHISHEKSOUNDALGEKAR", icon: SiGithub, color: "#f5f5f5" },
  { label: "LinkedIn", href: "https://linkedin.com/in/abhishekmsoundalgekar", icon: FaLinkedin, color: "#0A66C2" },
  { label: "LeetCode", href: "https://leetcode.com/u/abhishek_soundalgekar", icon: SiLeetcode, color: "#FFA116" },
  { label: "Email", href: "mailto:abhimsound@gmail.com", icon: SiGmail, color: "#EA4335" },
];

const roles = [
  "Software Engineer",
  "Backend & ML Systems",
  "USC Grad Student",
  "Fall '26 Co-op · FT Jan '27",
];

const Hero = () => (
  <section
    id="home"
    className="relative w-full min-h-screen flex flex-col justify-center px-6 sm:px-10 lg:px-16 overflow-hidden bg-ink-950 text-white"
  >
    {/* 3D animated starfield background (lazy-loaded) */}
    <Suspense fallback={null}>
      <HeroScene />
    </Suspense>
    <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-ink-950/40 via-ink-950/10 to-ink-950" />

    {/* Top-left brand mark */}
    <motion.div
      className="absolute top-6 left-6 sm:left-10 lg:left-16 flex items-center gap-2 text-xs font-mono tracking-widest text-gray-400"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.8 }}
    >
      <span className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-[10px] text-accent-400">
        AS
      </span>
      Abhishek Soundalgekar
    </motion.div>

    {/* Top-right meta label */}
    <motion.span
      className="absolute top-6 right-6 sm:right-10 lg:right-16 text-xs font-mono tracking-[0.25em] text-gray-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.8 }}
    >
      PORTFOLIO — 2026
    </motion.span>

    <div className="max-w-4xl">
      <motion.p
        className="font-mono text-xs sm:text-sm tracking-[0.2em] text-accent-400 uppercase mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Los Angeles, CA · Fall 2026 Co-op/Internship & Full-Time from Jan 2027
      </motion.p>

      <motion.h1
        className="font-display font-bold leading-[0.95] select-none"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <span
          className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-transparent"
          style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.75)" }}
        >
          ABHISHEK
        </span>
        <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl gradient-text">
          SOUNDALGEKAR
        </span>
      </motion.h1>

      <motion.p
        className="mt-6 max-w-xl text-base sm:text-lg text-gray-300 leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        I build software that solves real problems — from a UPI payment switch
        simulator to production ML classifiers running on Aruba network
        hardware.
      </motion.p>

      <motion.ul
        className="mt-6 flex flex-wrap gap-x-8 gap-y-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55, duration: 0.8 }}
      >
        {roles.map((r, i) => (
          <li key={r} className="flex items-center gap-2 text-sm sm:text-base text-gray-300">
            <span className="text-accent-400 font-mono text-xs">
              {i % 2 === 0 ? "+" : "×"}
            </span>
            {r}
          </li>
        ))}
      </motion.ul>

      <motion.div
        className="flex flex-wrap gap-3 mt-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      >
        <a href="#projects" className="btn-primary">
          View Projects
        </a>
        <a
          href={`${import.meta.env.BASE_URL}assets/resume.pdf`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline !border-white/20 !text-gray-100 hover:!text-accent-400"
        >
          Download Resume
        </a>
      </motion.div>

      <motion.div
        className="flex items-center gap-4 mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.85, duration: 0.8 }}
      >
        {links.map(({ label, href, icon: Icon, color }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="w-12 h-12 flex items-center justify-center rounded-full border border-white/15 hover:border-accent-500/50 hover:-translate-y-0.5 hover:scale-110 transition-all"
          >
            <Icon size={22} color={color} />
          </a>
        ))}
      </motion.div>
    </div>

    {/* Bottom-center: section watermark + scroll prompt (kept away from the
        fixed music/chat buttons which live in the bottom corners globally) */}
    <motion.div
      className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.8 }}
    >
      <a
        href="#about"
        aria-label="Scroll to About section"
        className="flex flex-col items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-gray-500 hover:text-accent-400 transition-colors"
      >
        Scroll to explore
        <span className="w-px h-8 bg-gradient-to-b from-gray-400 to-transparent animate-float" />
      </a>
      <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest">
        <span className="text-gray-500">Section</span>
        <span className="text-accent-400">Intro</span>
      </div>
    </motion.div>
  </section>
);

export default Hero;
