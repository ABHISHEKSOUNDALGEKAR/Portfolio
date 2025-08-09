import { motion } from "framer-motion";

const tag = "px-2.5 py-1 rounded-full text-xs border border-black/10 dark:border-white/10 bg-gray-50 dark:bg-gray-800/60 text-gray-800 dark:text-gray-100";

const Card = ({ title, desc, tags, link }) => (
  <motion.div
    className="p-6 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-gray-800"
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
      {title}
    </h3>
    <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{desc}</p>
    <div className="mt-3 flex flex-wrap gap-2">
      {tags.map(t => (
        <span key={t} className={tag}>{t}</span>
      ))}
    </div>
    {link && (
      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-block text-sm text-blue-600 dark:text-blue-400 hover:underline"
      >
        ⭐ View Project
      </a>
    )}
  </motion.div>
);

const Projects = () => (
  <section id="projects" className="py-16 px-6">
    <motion.h2
      className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100"
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      Projects
    </motion.h2>

    <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
      <Card
        title="WorkLens (Smart India Hackathon)"
        desc="Web + Android app providing employment data with AR navigation."
        tags={["HTML", "CSS", "JavaScript", "Django", "Node.js", "Kotlin"]}
        link="https://youtu.be/NZftNvbplik"
      />
      <Card
        title="ThesisHub: PG Dissertation System"
        desc="End-to-end dissertation management for students and supervisors."
        tags={["HTML", "CSS", "JavaScript", "Django", "Node.js", "Kotlin"]}
        link="https://github.com/ABHISHEKSOUNDALGEKAR"
      />
      <Card
        title="EcoLens: Medicinal Plant Platform"
        desc="Identify, classify, and forecast medicinal plants; community features."
        tags={["TensorFlow", "Python", "HTML", "JavaScript", "Kotlin"]}
        link="https://github.com/ABHISHEKSOUNDALGEKAR"
      />
      <Card
        title="AI Mega-Project (CSCI-561, USC)"
        desc="Genetic TSP solvers, Go AI, and Viterbi POMDP inference engine."
        tags={["C++", "Python", "TensorFlow", "OpenAI Gym"]}
        link="https://github.com/ABHISHEKSOUNDALGEKAR"
      />
      <Card
        title="Analysis of Algorithms Final Project"
        desc="Memory-efficient sequence alignment with 100% accuracy."
        tags={["C++", "Python", "NumPy", "Matplotlib"]}
        link="https://github.com/ABHISHEKSOUNDALGEKAR"
      />
      <Card
        title="Smart Home Intercom System"
        desc="Smart visitor validation via photo & admin approval."
        tags={["Java", "Android Studio"]}
        link="https://github.com/ABHISHEKSOUNDALGEKAR"
      />
    </div>
  </section>
);

export default Projects;
