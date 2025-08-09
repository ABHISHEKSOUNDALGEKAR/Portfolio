import { motion } from "framer-motion";

const Card = ({ children }) => (
  <div className="p-6 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-gray-800">
    {children}
  </div>
);

const Education = () => (
  <section id="education" className="py-16 px-6">
    <motion.h2
      className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100"
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      Education
    </motion.h2>

    <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
      <Card>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          University of Southern California
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Masters in Computer Science · Jan 2025 – Dec 2026
        </p>
        <p className="mt-3 text-gray-700 dark:text-gray-300">
          Courses: Analysis of Algorithms · Foundations of AI · ML for Data Science
        </p>
      </Card>

      <Card>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Pune Institute of Computer Technology
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Bachelor’s in Computer Science · June 2020 – July 2024
        </p>
      </Card>
    </div>
  </section>
);

export default Education;
