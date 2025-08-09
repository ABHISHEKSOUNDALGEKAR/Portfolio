import { motion } from "framer-motion";

const chip = "px-3 py-1.5 rounded-full border text-sm hover:bg-blue-600 hover:text-white transition";

const groups = [
  { title: "Languages", items: ["C++", "Python", "Java", "JavaScript", "SQL"] },
  { title: "Frameworks", items: ["React", "Node.js", "Django", "Flask", "FastAPI"] },
  { title: "ML/AI", items: ["TensorFlow", "OpenAI Gym", "NER", "Genetic Algorithms"] },
  { title: "DevOps", items: ["Docker", "GitHub Actions", "Linux", "CI/CD"] },
];

const Skills = () => (
  <section id="skills" className="py-16 px-6">
    <motion.h2
      className="text-3xl font-bold mb-8 text-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      Skills
    </motion.h2>

    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      {groups.map(g => (
        <motion.div
          key={g.title}
          className="p-5 rounded-2xl border border-black/10 dark:border-white/10"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="font-semibold mb-3">{g.title}</h3>
          <div className="flex flex-wrap gap-2">
            {g.items.map(it => (
              <span key={it} className={chip}>{it}</span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default Skills;
