import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiMapPin, FiSend, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { SiGithub, SiLeetcode, SiGeeksforgeeks } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";

const socials = [
  { label: "GitHub", href: "https://github.com/ABHISHEKSOUNDALGEKAR", icon: SiGithub, className: "text-gray-900 dark:text-white" },
  { label: "LinkedIn", href: "https://linkedin.com/in/abhishekmsoundalgekar", icon: FaLinkedin, color: "#0A66C2" },
  { label: "LeetCode", href: "https://leetcode.com/u/abhishek_soundalgekar", icon: SiLeetcode, color: "#FFA116" },
  { label: "GeeksforGeeks", href: "https://geeksforgeeks.org/user/itsabhisheks", icon: SiGeeksforgeeks, color: "#2F8D46" },
];

// Free-tier form relay (https://web3forms.com) — no backend needed. Set
// VITE_WEB3FORMS_KEY in your environment to enable direct email delivery;
// until then, submissions gracefully fall back to opening a pre-filled
// mailto: link so the form always works.
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

const Row = ({ icon: Icon, children }) => (
  <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
    <span className="w-9 h-9 shrink-0 rounded-lg bg-accent-500/10 text-accent-600 dark:text-accent-400 flex items-center justify-center">
      <Icon size={16} />
    </span>
    {children}
  </div>
);

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;

    if (!WEB3FORMS_KEY) {
      // No relay configured yet — fall back to opening the user's mail client
      // with everything pre-filled so the message still gets through.
      const subject = encodeURIComponent(`Portfolio message from ${form.name}`);
      const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
      window.location.href = `mailto:abhimsound@gmail.com?subject=${subject}&body=${body}`;
      setStatus("success");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: form.name,
          email: form.email,
          message: form.message,
          subject: `Portfolio message from ${form.name}`,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center text-center gap-3 py-10">
        <FiCheckCircle className="text-emerald-500" size={32} />
        <p className="font-semibold text-gray-900 dark:text-gray-100">Message sent!</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
          Thanks for reaching out — I'll get back to you soon.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-2 text-sm font-medium text-accent-600 dark:text-accent-400 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        required
        placeholder="Your name"
        value={form.name}
        onChange={update("name")}
        className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-accent-500/50 text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
      />
      <input
        type="email"
        required
        placeholder="Your email"
        value={form.email}
        onChange={update("email")}
        className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-accent-500/50 text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
      />
      <textarea
        required
        rows={4}
        placeholder="What's on your mind?"
        value={form.message}
        onChange={update("message")}
        className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-accent-500/50 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 resize-none"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send Message"}
        {status !== "sending" && <FiSend size={14} />}
      </button>
      {status === "error" && (
        <p className="flex items-center gap-1.5 text-xs text-red-500">
          <FiAlertCircle size={13} /> Something went wrong — email me directly instead.
        </p>
      )}
    </form>
  );
}

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
      Actively seeking Fall 2026 co-op/internship opportunities, as well as
      full-time roles starting January 2027. Reach out — I'd love to talk
      about backend engineering, ML systems, or anything you're building.
    </motion.p>

    <div className="mt-10 max-w-4xl mx-auto grid md:grid-cols-2 gap-6 items-start">
      <motion.div
        className="card p-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="space-y-4">
          <Row icon={FiMail}>
            <a href="mailto:abhimsound@gmail.com" className="hover:text-accent-500 transition-colors">
              abhimsound@gmail.com
            </a>
          </Row>
          <Row icon={FiMapPin}>
            <span>Los Angeles, CA</span>
          </Row>
        </div>

        <a href="mailto:abhimsound@gmail.com" className="mt-6 w-full btn-primary flex items-center justify-center">
          Say Hello
        </a>

        <div className="mt-6 pt-6 border-t border-black/5 dark:border-white/10 flex items-center justify-center gap-3">
          {socials.map(({ label, href, icon: Icon, color, className }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-12 h-12 flex items-center justify-center rounded-full border border-black/10 dark:border-white/10 hover:border-accent-500/50 hover:-translate-y-0.5 hover:scale-110 transition-all"
            >
              <Icon size={22} color={color} className={className} />
            </a>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="card p-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Send a message</h3>
        <ContactForm />
      </motion.div>
    </div>
  </section>
);

export default Contact;
