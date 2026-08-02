import { useEffect, useMemo, useRef, useState } from "react";
import {
  FiHome,
  FiUser,
  FiBookOpen,
  FiBriefcase,
  FiFolder,
  FiCode,
  FiMail,
  FiSun,
  FiMoon,
  FiGithub,
  FiLinkedin,
  FiDownload,
  FiSearch,
} from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";

export default function CommandPalette({ open, onClose, dark, setDark }) {
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const inputRef = useRef(null);

  const commands = useMemo(
    () => [
      { id: "home", label: "Go to Home", icon: FiHome, keywords: "top hero", action: () => scrollTo("home") },
      { id: "about", label: "Go to About", icon: FiUser, keywords: "bio summary", action: () => scrollTo("about") },
      { id: "education", label: "Go to Education", icon: FiBookOpen, keywords: "usc pict school", action: () => scrollTo("education") },
      { id: "experience", label: "Go to Experience", icon: FiBriefcase, keywords: "work hpe atri internship", action: () => scrollTo("experience") },
      { id: "projects", label: "Go to Projects", icon: FiFolder, keywords: "work portfolio code", action: () => scrollTo("projects") },
      { id: "skills", label: "Go to Skills", icon: FiCode, keywords: "languages tools stack", action: () => scrollTo("skills") },
      { id: "contact", label: "Go to Contact", icon: FiMail, keywords: "email reach out", action: () => scrollTo("contact") },
      {
        id: "theme",
        label: dark ? "Switch to Light Mode" : "Switch to Dark Mode",
        icon: dark ? FiSun : FiMoon,
        keywords: "theme dark light toggle appearance",
        action: () => setDark((v) => !v),
      },
      {
        id: "resume",
        label: "Download Resume (PDF)",
        icon: FiDownload,
        keywords: "cv download",
        action: () => window.open(`${import.meta.env.BASE_URL}assets/resume.pdf`, "_blank"),
      },
      {
        id: "email",
        label: "Email Abhishek",
        icon: FiMail,
        keywords: "contact mail soundalg@usc.edu",
        action: () => (window.location.href = "mailto:soundalg@usc.edu"),
      },
      {
        id: "github",
        label: "Open GitHub Profile",
        icon: FiGithub,
        keywords: "code repos",
        action: () => window.open("https://github.com/ABHISHEKSOUNDALGEKAR", "_blank"),
      },
      {
        id: "linkedin",
        label: "Open LinkedIn Profile",
        icon: FiLinkedin,
        keywords: "connect network",
        action: () => window.open("https://linkedin.com/in/abhishekmsoundalgekar", "_blank"),
      },
      {
        id: "leetcode",
        label: "Open LeetCode Profile",
        icon: SiLeetcode,
        keywords: "dsa competitive programming",
        action: () => window.open("https://leetcode.com/u/abhishek_soundalgekar", "_blank"),
      },
    ],
    [dark, setDark]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(
      (c) => c.label.toLowerCase().includes(q) || c.keywords.toLowerCase().includes(q)
    );
  }, [query, commands]);

  useEffect(() => {
    setIndex(0);
  }, [query, open]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setIndex((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const cmd = filtered[index];
        if (cmd) {
          cmd.action();
          onClose();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered, index, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[90] flex items-start justify-center pt-24 sm:pt-32 px-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg card !bg-white dark:!bg-ink-900 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-black/5 dark:border-white/10">
          <FiSearch className="text-gray-400" size={16} />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Jump to a section or run a command…"
            className="flex-1 bg-transparent outline-none text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
          />
          <kbd className="hidden sm:block text-[10px] font-mono px-1.5 py-0.5 rounded border border-black/10 dark:border-white/10 text-gray-400">
            ESC
          </kbd>
        </div>

        <div className="max-h-80 overflow-y-auto py-2">
          {filtered.length === 0 && (
            <p className="px-4 py-6 text-sm text-gray-400 text-center">No matching commands.</p>
          )}
          {filtered.map((cmd, i) => (
            <button
              key={cmd.id}
              onClick={() => {
                cmd.action();
                onClose();
              }}
              onMouseEnter={() => setIndex(i)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors ${
                i === index
                  ? "bg-accent-500/10 text-accent-600 dark:text-accent-400"
                  : "text-gray-700 dark:text-gray-200"
              }`}
            >
              <cmd.icon size={15} />
              {cmd.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function scrollTo(id) {
  const el = document.getElementById(id);
  el?.scrollIntoView({ behavior: "smooth" });
}
