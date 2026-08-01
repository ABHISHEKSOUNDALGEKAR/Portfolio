import { motion } from "framer-motion";
import { FiBookOpen } from "react-icons/fi";

const items = [
  {
    school: "University of Southern California",
    degree: "Master's in Computer Science",
    time: "Jan 2025 – Dec 2026",
    location: "Los Angeles, California",
    courses: [
      "Artificial Intelligence",
      "Machine Learning",
      "Algorithms",
      "Operating Systems",
      "Information Retrieval",
      "NLP",
      "Deep Learning",
    ],
  },
  {
    school: "Pune Institute of Computer Technology",
    degree: "B.Tech, Computer Science & Honors in AI/ML",
    time: "June 2020 – July 2024",
    location: "Pune, India",
    courses: [],
  },
];

const Card = ({ item }) => (
  <motion.div
    className="card card-hover p-6"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 shrink-0 rounded-xl bg-accent-500/10 text-accent-600 dark:text-accent-400 flex items-center justify-center">
        <FiBookOpen size={18} />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {item.school}
        </h3>
        <p className="text-sm text-accent-600 dark:text-accent-400 font-medium">
          {item.degree}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {item.time} · {item.location}
        </p>
      </div>
    </div>
    {item.courses.length > 0 && (
      <div className="mt-4 flex flex-wrap gap-2">
        {item.courses.map((c) => (
          <span key={c} className="chip !py-1 !px-2.5 !text-xs">
            {c}
          </span>
        ))}
      </div>
    )}
  </motion.div>
);

const Education = () => (
  <section className="py-20 md:py-28">
    <motion.span
      className="section-eyebrow"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      Academics
    </motion.span>
    <motion.h2
      className="section-heading"
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      Education
    </motion.h2>

    <div className="mt-10 max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
      {items.map((item) => (
        <Card key={item.school} item={item} />
      ))}
    </div>
  </section>
);

export default Education;
