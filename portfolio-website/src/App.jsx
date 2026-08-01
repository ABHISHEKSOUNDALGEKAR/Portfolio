import { useEffect, useRef, useState } from "react";
import { FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";
import Hero from "./components/Hero";
import About from "./components/About";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Publication from "./components/Publication";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export default function App() {
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("about");
  const [progress, setProgress] = useState(0);
  const observerRef = useRef(null);

  // Read saved theme or system preference
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const preferDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const next = saved ? saved === "dark" : preferDark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
  }, []);

  // Persist theme
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  // Scroll progress bar
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight || 1);
      setProgress(Math.min(1, Math.max(0, scrolled)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section highlighting — track cumulative visibility per section (the
  // observer only reports entries whose state *changed*, not the full set),
  // then pick a single winner: the lowest section still in the "active band".
  useEffect(() => {
    const sections = NAV_ITEMS.map((n) => document.getElementById(n.id)).filter(Boolean);
    const visible = new Map();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visible.set(entry.target.id, entry.isIntersecting);
        });
        const stillActive = NAV_ITEMS.map((n) => n.id).filter((id) => visible.get(id));
        if (stillActive.length > 0) {
          setActive(stillActive[stillActive.length - 1]);
        } else {
          setActive("");
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => observerRef.current.observe(s));
    return () => observerRef.current?.disconnect();
  }, []);

  // Close mobile menu on route hash change
  const handleNavClick = () => setMenuOpen(false);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white text-gray-900 dark:bg-ink-950 dark:text-gray-100 selection:bg-accent-500/30">
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[3px] z-50 bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-accent-500 via-indigo-400 to-cyan-400 transition-[width] duration-150"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <header className="sticky top-0 z-40 glass">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <a href="#home" className="font-display font-bold tracking-tight text-lg">
            Abhishek<span className="text-accent-500">.</span>dev
          </a>

          <nav className="hidden md:flex items-center gap-1 text-sm">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                  active === item.id
                    ? "text-accent-600 dark:text-accent-400"
                    : "text-gray-600 dark:text-gray-300 hover:text-accent-600 dark:hover:text-accent-400"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              aria-label="Toggle theme"
              onClick={() => setDark((v) => !v)}
              className="w-10 h-10 flex items-center justify-center rounded-xl border border-black/10 dark:border-white/10 hover:border-accent-500/50 text-gray-700 dark:text-gray-200 transition-colors active:scale-95"
            >
              {dark ? <FiSun size={16} /> : <FiMoon size={16} />}
            </button>
            <button
              aria-label="Toggle menu"
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl border border-black/10 dark:border-white/10 text-gray-700 dark:text-gray-200 active:scale-95"
            >
              {menuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="md:hidden glass border-t border-black/5 dark:border-white/10 px-4 py-3 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={handleNavClick}
                className={`px-3 py-2.5 rounded-lg text-sm font-medium ${
                  active === item.id
                    ? "text-accent-600 dark:text-accent-400 bg-accent-500/5"
                    : "text-gray-700 dark:text-gray-200"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}
      </header>

      <main>
        <Hero />
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <section id="about"><About /></section>
          <section id="education"><Education /></section>
          <section id="experience"><Experience /></section>
          <section id="projects"><Projects /></section>
          <section id="skills"><Skills /></section>
          <Publication />
          <section id="contact"><Contact /></section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
