import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin } from "react-icons/fi";
import { SiLeetcode, SiGeeksforgeeks } from "react-icons/si";

const socials = [
  { label: "GitHub", href: "https://github.com/ABHISHEKSOUNDALGEKAR", icon: FiGithub },
  { label: "LinkedIn", href: "https://linkedin.com/in/abhishekmsoundalgekar", icon: FiLinkedin },
  { label: "LeetCode", href: "https://leetcode.com/u/abhishek_soundalgekar", icon: SiLeetcode },
  { label: "GeeksforGeeks", href: "https://geeksforgeeks.org/user/itsabhisheks", icon: SiGeeksforgeeks },
];

const Row = ({ icon: Icon, children }) => (
  <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
    <span className="w-9 h-9 shrink-0 rounded-lg bg-accent-500/10 text-accent-600 dark:text-accent-400 flex items-center justify-center">
      <Icon size={16} />
    </span>
    {children}
  </div>
);

const Contact = () => (
  <section className="py-20 md:py-28">
    <motion.span
      className="section-eyebrow"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      Let's talk
    </motion.span>
    <motion.h2
      className="section-heading"
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      Get In Touch
    </motion.h2>
    <motion.p
      className="mt-4 max-w-xl mx-auto text-center text-gray-600 dark:text-gray-400"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.15 }}
    >
      Actively seeking Fall 2026 co-op/internship opportunities. Reach out — I'd
      love to talk about backend engineering, ML systems, or anything you're
      building.
    </motion.p>

    <motion.div
      className="mt-10 max-w-lg mx-auto card p-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <div className="space-y-4">
        <Row icon={FiMail}>
          <a href="mailto:soundalg@usc.edu" className="hover:text-accent-500 transition-colors">
            soundalg@usc.edu
          </a>
        </Row>
        <Row icon={FiPhone}>
          <a href="tel:+12133488132" className="hover:text-accent-500 transition-colors">
            +1 (213) 348-8132
          </a>
        </Row>
        <Row icon={FiMapPin}>
          <span>Los Angeles, CA</span>
        </Row>
      </div>

      <a href="mailto:soundalg@usc.edu" className="mt-6 w-full btn-primary flex items-center justify-center">
        Say Hello
      </a>

      <div className="mt-6 pt-6 border-t border-black/5 dark:border-white/10 flex items-center justify-center gap-3">
        {socials.map(({ label, href, icon: Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-black/10 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:text-accent-600 dark:hover:text-accent-400 hover:border-accent-500/50 hover:-translate-y-0.5 transition-all"
          >
            <Icon size={17} />
          </a>
        ))}
      </div>
    </motion.div>
  </section>
);

export default Contact;
