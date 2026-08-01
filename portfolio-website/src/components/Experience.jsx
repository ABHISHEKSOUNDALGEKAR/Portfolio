import { motion } from "framer-motion";
import { FiExternalLink } from "react-icons/fi";

const roles = [
  {
    role: "Software Engineering Intern",
    company: "Hewlett Packard Enterprise (HPE) — Aruba",
    time: "May 2026 – Aug 2026",
    location: "San Jose, California",
    href: "https://www.hpe.com/us/en/aruba-networking.html",
    current: true,
    tags: ["C++", "Python", "ML", "PCAP", "Edge Inference"],
    bullets: [
      "Developing an ML-powered network traffic classifier for HPE Aruba Access Points, enabling real-time identification of Teams, AirPlay, bulk file transfers, and video streams across 4+ distinct application traffic classes.",
      "Engineered a high-performance C++ packet analytics pipeline from scratch with custom PCAP parsing, per-flow feature extraction, and model validation across 23 network telemetry features, producing labeled training datasets at scale.",
      "Designed a lightweight MLP classifier for edge deployment on constrained Aruba APs, achieving sub-millisecond inference and 95%+ accuracy; architected integration hooks for Aruba QoS and traffic-management systems infrastructure-wide.",
    ],
  },
  {
    role: "Software Developer Intern (SWE)",
    company: "USC Alzheimer's Therapeutic Research Institute (ATRI)",
    time: "Jan 2026 – May 2026",
    location: "Remote / San Diego, California",
    href: "https://atri.usc.edu/",
    tags: ["Django", "React", "PostgreSQL", "Jira", "TDD"],
    bullets: [
      "Built 6 full-stack clinical research modules using Django, React, and PostgreSQL, serving 20+ active researchers across Agile sprints tracked in Jira, accelerating clinical trial data collection and workflows by 30%.",
      "Enforced Test-Driven Development (TDD) across all backend Django services, implementing unit, integration, and functional test suites achieving 84% code coverage and reducing post-deployment defects by 45% across 6 modules.",
      "Engineered MedDRA Adverse Event Coding platform features including role-based access controls, automated reporting dashboards, and REST API integrations for EHR systems, improving AE documentation speed for 25+ clinical staff.",
    ],
  },
  {
    role: "Software Developer, IT Systems",
    company: "University of Southern California",
    time: "May 2025 – Present",
    location: "Los Angeles, California",
    href: "https://itservices.usc.edu/",
    tags: ["Python", "Automation", "GenAI", "Anomaly Detection"],
    bullets: [
      "Engineered Python-based automation and provisioning workflows using anomaly detection techniques, reducing operational workload by 70% and account setup time by 80%.",
      "Developed predictive analytics and Generative AI applications to automate 100+ operational workflows, reducing ticket resolution time by 50% and improving scalability of technology support services.",
    ],
  },
  {
    role: "Data Scientist",
    company: "AlgoAnalytics Private Limited",
    time: "Aug 2023 – Dec 2023",
    location: "Pune, India",
    href: "https://www.algoanalytics.com/",
    tags: ["SVM", "Naive Bayes", "NER", "Python"],
    bullets: [
      "Engineered sentiment analysis pipelines using SVM, Naive Bayes, and Decision Tree models on 50k+ financial news articles, achieving 92% classification accuracy for large-scale market intelligence and forecasting applications.",
      "Built automated NER and feature engineering pipelines in Python, processing 5 GB of financial data daily, improving forecasting accuracy by 18% and reducing model training time by 35% for scalable production model training pipelines.",
    ],
  },
  {
    role: "Software Developer Intern",
    company: "Sarvatra Technologies Private Limited",
    time: "Aug 2023 – Jun 2024",
    location: "Pune, India",
    href: "https://sarvatra.in/",
    tags: ["RSA-2048", "Flask", "FastAPI", "Docker", "CI/CD"],
    bullets: [
      "Built a secure UPI switch simulator using RSA-2048 encryption, emulating end-to-end digital payment workflows across bank and merchant nodes and sustaining 500+ simulated transactions per second under load testing environments.",
      "Optimized Flask and FastAPI microservices via async I/O and query tuning, improving system throughput by 30%; implemented Docker CI/CD with GitHub Actions across 6 services, cutting deploy time by 50% in production.",
    ],
  },
];

const RoleCard = ({ item, index }) => (
  <motion.div
    className="relative pl-10 md:pl-14"
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.6, delay: (index % 3) * 0.05 }}
  >
    {/* Timeline rail */}
    <div className="absolute left-3 md:left-5 top-1 bottom-0 w-px bg-gradient-to-b from-accent-500/60 via-black/10 dark:via-white/10 to-transparent" />
    <div
      className={`absolute left-[7px] md:left-[13px] top-1.5 w-3 h-3 rounded-full border-2 ${
        item.current
          ? "bg-accent-500 border-accent-500 shadow-glow"
          : "bg-white dark:bg-ink-950 border-accent-500/60"
      }`}
    />

    <div className="card card-hover p-6 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {item.role}
        </h3>
        <span className="text-xs font-mono text-gray-500 dark:text-gray-400 shrink-0">
          {item.time}
        </span>
      </div>
      <a
        href={item.href}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1.5 mt-1 text-sm font-medium text-accent-600 dark:text-accent-400 hover:underline"
      >
        {item.company}
        <FiExternalLink size={12} />
      </a>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.location}</p>

      <ul className="mt-4 space-y-2">
        {item.bullets.map((b, i) => (
          <li key={i} className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed flex gap-2">
            <span className="text-accent-500 mt-1.5 shrink-0">▹</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex flex-wrap gap-2">
        {item.tags.map((t) => (
          <span key={t} className="chip !py-1 !px-2.5 !text-xs">
            {t}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

const Experience = () => (
  <section className="py-20 md:py-28">
    <motion.span
      className="section-eyebrow"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      Career so far
    </motion.span>
    <motion.h2
      className="section-heading"
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      Experience
    </motion.h2>

    <div className="mt-10 max-w-3xl mx-auto">
      {roles.map((item, i) => (
        <RoleCard key={item.company} item={item} index={i} />
      ))}
    </div>
  </section>
);

export default Experience;
