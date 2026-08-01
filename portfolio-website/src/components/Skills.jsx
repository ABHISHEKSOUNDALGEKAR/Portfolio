import { motion } from "framer-motion";
import { FiCode, FiLayers, FiTool, FiServer, FiCpu, FiAward } from "react-icons/fi";

const groups = [
  {
    title: "Languages",
    icon: FiCode,
    items: ["Python", "C++", "Java", "SQL", "TypeScript", "Go"],
  },
  {
    title: "Concepts",
    icon: FiLayers,
    items: [
      "OOP",
      "System Design",
      "Data Structures & Algorithms",
      "Distributed Systems",
      "Agile/Scrum",
      "Scalability",
    ],
  },
  {
    title: "Tools & Cloud",
    icon: FiTool,
    items: [
      "LightGBM",
      "Kubernetes",
      "AWS (EC2, Lambda, SageMaker)",
      "GitHub Actions",
      "Bash",
      "React",
      "Django",
    ],
  },
  {
    title: "Systems & Backend",
    icon: FiServer,
    items: ["Linux", "Git", "Docker", "REST APIs", "Flask", "FastAPI", "Node.js", "PostgreSQL", "CI/CD"],
  },
  {
    title: "AI / ML",
    icon: FiCpu,
    items: [
      "NumPy",
      "Pandas",
      "scikit-learn",
      "PyTorch",
      "TensorFlow",
      "Reinforcement Learning",
      "Transformers",
      "Optimization",
    ],
  },
];

const achievements = [
  "500+ DSA problems solved on GeeksforGeeks — USC Rank 1",
  "LeetCode: 500+ problems solved, 20+ badges — Institute Rank 1",
  "5★ CodeChef rated competitive programmer",
];

const Skills = () => (
  <section className="py-20 md:py-28">
    <motion.span
      className="section-eyebrow"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      Toolbox
    </motion.span>
    <motion.h2
      className="section-heading"
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      Skills
    </motion.h2>

    <div className="mt-10 grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
      {groups.map((g, i) => (
        <motion.div
          key={g.title}
          className="card p-5"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: (i % 5) * 0.06 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-8 rounded-lg bg-accent-500/10 text-accent-600 dark:text-accent-400 flex items-center justify-center">
              <g.icon size={16} />
            </span>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">{g.title}</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {g.items.map((it) => (
              <span key={it} className="chip">
                {it}
              </span>
            ))}
          </div>
        </motion.div>
      ))}

      <motion.div
        className="card p-5 bg-gradient-to-br from-accent-500/10 to-cyan-400/5"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="w-8 h-8 rounded-lg bg-accent-500/10 text-accent-600 dark:text-accent-400 flex items-center justify-center">
            <FiAward size={16} />
          </span>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">Achievements</h3>
        </div>
        <ul className="space-y-2">
          {achievements.map((a) => (
            <li key={a} className="text-sm text-gray-700 dark:text-gray-300 flex gap-2">
              <span className="text-accent-500 mt-0.5">▹</span>
              <span>{a}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  </section>
);

export default Skills;
