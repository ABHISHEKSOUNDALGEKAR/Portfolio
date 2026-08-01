import { motion } from "framer-motion";
import { FiGithub, FiExternalLink, FiStar } from "react-icons/fi";
import TiltCard from "./TiltCard";

const flagship = [
  {
    title: "Foundations of AI Mega-Project",
    meta: "CSCI-561, USC · Spring 2025",
    desc: "Genetic algorithms for 3D TSP, minimax/alpha-beta search agents for Go and Pac-Man, and a Viterbi POMDP engine for hidden-state inference.",
    highlights: [
      "98.3% optimality on 3D TSP across 188 peers under constrained compute",
      "Top-ranked search agents in the class AI tournament (5×5 Go & Pac-Man)",
      "100% decoding accuracy over 20-step sequences at <10ms/step",
    ],
    tags: ["C++", "Python", "TensorFlow", "OpenAI Gym"],
    link: "https://github.com/ABHISHEKSOUNDALGEKAR",
  },
  {
    title: "Distributed Cloud File System",
    meta: "Personal Project · Ongoing",
    desc: "A distributed file system with sharding, replication, and S3-backed caching, built for high availability and near-linear scaling.",
    highlights: [
      "99.99% availability with near-linear scaling under sharding + replication",
      "45% lower read/write latency via load balancing and S3-backed caching",
      "Docker + Kubernetes CI/CD for automated, fault-tolerant deployment",
    ],
    tags: ["C++", "Python", "AWS S3", "Docker", "Kubernetes"],
    link: "https://github.com/ABHISHEKSOUNDALGEKAR",
  },
  {
    title: "Analysis of Algorithms Final Project",
    meta: "CSCI-570, USC · Spring 2025",
    desc: "Memory-optimized dynamic programming for DNA/RNA sequence alignment, benchmarked across dataset sizes for runtime and memory efficiency.",
    highlights: [
      "0.08s runtime aligning 100+ DNA/RNA pairs up to 20 kbp",
      "Space complexity cut from O(mn) to O(n), a 70% memory reduction",
      "Automated benchmarking across 10 dataset sizes (1–20 Kb)",
    ],
    tags: ["C++", "Python", "NumPy", "Matplotlib"],
    link: "https://github.com/ABHISHEKSOUNDALGEKAR",
  },
];

const more = [
  {
    title: "WorkLens",
    meta: "Smart India Hackathon",
    desc: "Web + Android app surfacing employment data with AR-assisted navigation.",
    tags: ["Django", "Node.js", "Kotlin"],
    link: "https://youtu.be/NZftNvbplik",
  },
  {
    title: "ThesisHub",
    meta: "PG Dissertation System",
    desc: "End-to-end dissertation management platform for students and supervisors.",
    tags: ["Django", "Node.js", "JavaScript"],
    link: "https://github.com/ABHISHEKSOUNDALGEKAR",
  },
  {
    title: "EcoLens",
    meta: "Medicinal Plant Platform",
    desc: "Identify, classify, and forecast medicinal plants with community features.",
    tags: ["TensorFlow", "Python", "Kotlin"],
    link: "https://github.com/ABHISHEKSOUNDALGEKAR",
  },
  {
    title: "Smart Home Intercom System",
    meta: "Android",
    desc: "Smart visitor validation via photo capture and admin approval.",
    tags: ["Java", "Android Studio"],
    link: "https://github.com/ABHISHEKSOUNDALGEKAR",
  },
];

const FlagshipCard = ({ p, index }) => (
  <TiltCard className="card card-hover p-6 flex flex-col h-full">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.08 }}
      className="flex flex-col h-full"
    >
      <div className="flex items-center gap-2 text-accent-500 mb-2">
        <FiStar size={14} />
        <span className="text-[11px] font-mono uppercase tracking-wider text-gray-500 dark:text-gray-400">
          {p.meta}
        </span>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        {p.title}
      </h3>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{p.desc}</p>

      <ul className="mt-3 space-y-1.5 flex-1">
        {p.highlights.map((h, i) => (
          <li key={i} className="text-xs text-gray-600 dark:text-gray-400 flex gap-2">
            <span className="text-cyan-400 mt-0.5">▹</span>
            <span>{h}</span>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex flex-wrap gap-2">
        {p.tags.map((t) => (
          <span key={t} className="chip !py-1 !px-2.5 !text-xs">
            {t}
          </span>
        ))}
      </div>

      <a
        href={p.link}
        target="_blank"
        rel="noreferrer"
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent-600 dark:text-accent-400 hover:underline"
      >
        <FiGithub size={14} /> View Code
      </a>
    </motion.div>
  </TiltCard>
);

const MoreCard = ({ p, index }) => (
  <motion.a
    href={p.link}
    target="_blank"
    rel="noreferrer"
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: (index % 4) * 0.06 }}
    className="card card-hover p-5 group"
  >
    <div className="flex items-center justify-between">
      <h4 className="font-semibold text-gray-900 dark:text-gray-100">{p.title}</h4>
      <FiExternalLink
        size={14}
        className="text-gray-400 group-hover:text-accent-500 transition-colors"
      />
    </div>
    <p className="text-xs text-accent-600 dark:text-accent-400 font-mono mt-0.5">{p.meta}</p>
    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{p.desc}</p>
    <div className="mt-3 flex flex-wrap gap-1.5">
      {p.tags.map((t) => (
        <span key={t} className="chip !py-0.5 !px-2 !text-[11px]">
          {t}
        </span>
      ))}
    </div>
  </motion.a>
);

const Projects = () => (
  <section className="py-20 md:py-28">
    <motion.span
      className="section-eyebrow"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      Selected work
    </motion.span>
    <motion.h2
      className="section-heading"
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      Projects
    </motion.h2>

    <div className="mt-10 grid md:grid-cols-3 gap-6">
      {flagship.map((p, i) => (
        <FlagshipCard key={p.title} p={p} index={i} />
      ))}
    </div>

    <motion.h3
      className="mt-16 text-center font-display text-xl font-semibold text-gray-800 dark:text-gray-200"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      More Projects
    </motion.h3>
    <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {more.map((p, i) => (
        <MoreCard key={p.title} p={p} index={i} />
      ))}
    </div>
  </section>
);

export default Projects;
