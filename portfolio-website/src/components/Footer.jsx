import { SiGithub, SiLeetcode, SiGeeksforgeeks, SiGmail } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";

const links = [
  { label: "GitHub", href: "https://github.com/ABHISHEKSOUNDALGEKAR", icon: SiGithub, className: "text-gray-900 dark:text-white" },
  { label: "LinkedIn", href: "https://linkedin.com/in/abhishekmsoundalgekar", icon: FaLinkedin, color: "#0A66C2" },
  { label: "LeetCode", href: "https://leetcode.com/u/abhishek_soundalgekar", icon: SiLeetcode, color: "#FFA116" },
  { label: "GeeksforGeeks", href: "https://geeksforgeeks.org/user/itsabhisheks", icon: SiGeeksforgeeks, color: "#2F8D46" },
  { label: "Email", href: "mailto:abhimsound@gmail.com", icon: SiGmail, color: "#EA4335" },
];

const Footer = () => (
  <footer className="mt-8 border-t border-black/5 dark:border-white/10 py-10 px-4">
    <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} Abhishek Soundalgekar
      </p>
      <div className="flex items-center gap-3">
        {links.map(({ label, href, icon: Icon, color, className }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-accent-500/10 hover:scale-110 transition-all"
          >
            <Icon size={22} color={color} className={className} />
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
