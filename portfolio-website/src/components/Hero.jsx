import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiArrowDown } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";
import Typewriter from "./Typewriter";

// three.js is heavy — load the 3D scene lazily so the initial bundle stays lean.
const HeroScene = lazy(() => import("./three/HeroScene"));

const links = [
  { label: "GitHub", href: "https://github.com/ABHISHEKSOUNDALGEKAR", icon: FiGithub },
  { label: "LinkedIn", href: "https://linkedin.com/in/abhishekmsoundalgekar", icon: FiLinkedin },
  { label: "LeetCode", href: "https://leetcode.com/u/abhishek_soundalgekar", icon: SiLeetcode },
  { label: "Email", href: "mailto:soundalg@usc.edu", icon: FiMail },
];

const Hero = () => (
  <section
    id="home"
    className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 text-center overflow-hidden bg-white dark:bg-ink-950"
  >
    {/* 3D animated background (lazy-loaded) */}
    <Suspense fallback={null}>
      <HeroScene />
    </Suspense>

    {/* Gradient wash + grid overlay for depth */}
    <div className="pointer-events-none absolute inset-0 -z-10 bg-radial-fade" />
    <div className="pointer-events-none absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)] opacity-60 dark:opacity-40" />

    <motion.span
      className="section-eyebrow"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      Los Angeles, CA · Open to Summer / Fall 2026 opportunities
    </motion.span>

    <motion.h1
      className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white px-2"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1 }}
    >
      Abhishek <span className="gradient-text">Soundalgekar</span>
    </motion.h1>

    <motion.div
      className="mt-5 min-h-[2rem] sm:min-h-[2.5rem] px-4 text-xs sm:text-lg md:text-2xl font-mono text-gray-600 dark:text-gray-300 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.8 }}
    >
      <Typewriter
        phrases={[
          "Software Engineer Intern @ HPE Aruba",
          "SDE Intern @ USC ATRI",
          "MS Computer Science @ USC",
          "Backend & ML Systems Builder",
        ]}
      />
    </motion.div>

    <motion.p
      className="mt-6 max-w-2xl text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.7, duration: 0.8 }}
    >
      I build software that solves real problems — from a UPI payment switch
      simulator to production ML classifiers running on Aruba network
      hardware. Currently sharpening backend engineering and distributed
      systems skills at USC.
    </motion.p>

    <motion.div
      className="flex flex-wrap justify-center gap-3 mt-8"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.8 }}
    >
      <a href="#projects" className="btn-primary">
        View Projects
      </a>
      <a
        href={`${import.meta.env.BASE_URL}assets/resume.pdf`}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-outline"
      >
        Download Resume
      </a>
    </motion.div>

    <motion.div
      className="flex items-center justify-center gap-4 mt-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.1, duration: 0.8 }}
    >
      {links.map(({ label, href, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="w-10 h-10 flex items-center justify-center rounded-full border border-black/10 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:text-accent-600 dark:hover:text-accent-400 hover:border-accent-500/50 hover:-translate-y-0.5 transition-all"
        >
          <Icon size={18} />
        </a>
      ))}
    </motion.div>

    <motion.a
      href="#about"
      aria-label="Scroll to About section"
      className="absolute bottom-8 text-gray-400 dark:text-gray-500 animate-float"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.4, duration: 1 }}
    >
      <FiArrowDown size={22} />
    </motion.a>
  </section>
);

export default Hero;
