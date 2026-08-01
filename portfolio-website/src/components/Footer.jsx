import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { SiLeetcode, SiGeeksforgeeks } from "react-icons/si";

const links = [
  { label: "GitHub", href: "https://github.com/ABHISHEKSOUNDALGEKAR", icon: FiGithub },
  { label: "LinkedIn", href: "https://linkedin.com/in/abhishekmsoundalgekar", icon: FiLinkedin },
  { label: "LeetCode", href: "https://leetcode.com/u/abhishek_soundalgekar", icon: SiLeetcode },
  { label: "GeeksforGeeks", href: "https://geeksforgeeks.org/user/itsabhisheks", icon: SiGeeksforgeeks },
  { label: "Email", href: "mailto:soundalg@usc.edu", icon: FiMail },
];

const Footer = () => (
  <footer className="mt-8 border-t border-black/5 dark:border-white/10 py-10 px-4">
    <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} Abhishek Soundalgekar · Built with React, Tailwind & Three.js
      </p>
      <div className="flex items-center gap-2">
        {links.map(({ label, href, icon: Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            className="w-9 h-9 flex items-center justify-center rounded-full text-gray-500 dark:text-gray-400 hover:text-accent-600 dark:hover:text-accent-400 hover:bg-accent-500/10 transition-colors"
          >
            <Icon size={16} />
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
