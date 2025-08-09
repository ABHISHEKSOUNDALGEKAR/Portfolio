import React, { useEffect, useState } from "react";
import Hero from "./components/Hero";
import About from "./components/About";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Publication from "./components/Publication";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const [dark, setDark] = useState(false);

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

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <header className="sticky top-0 z-40 backdrop-blur border-b border-black/5 dark:border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href={import.meta.env.BASE_URL} className="font-bold tracking-tight">
            Abhishek • Portfolio
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#about" className="hover:text-blue-600">About</a>
            <a href="#education" className="hover:text-blue-600">Education</a>
            <a href="#experience" className="hover:text-blue-600">Experience</a>
            <a href="#projects" className="hover:text-blue-600">Projects</a>
            <a href="#skills" className="hover:text-blue-600">Skills</a>
            <a href="#contact" className="hover:text-blue-600">Contact</a>
          </nav>
          <button
            aria-label="Toggle theme"
            onClick={() => setDark(v => !v)}
            className="rounded-xl border px-3 py-1.5 text-sm hover:bg-black/5 dark:hover:bg-white/10"
          >
            {dark ? "🌙" : "☀️"}
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4">
        <Hero />
        <section id="about"><About /></section>
        <section id="education"><Education /></section>
        <section id="experience"><Experience /></section>
        <section id="projects"><Projects /></section>
        <section id="skills"><Skills /></section>
        <Publication />
        <section id="contact"><Contact /></section>
      </main>

      <Footer />
    </div>
  );
}
