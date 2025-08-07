import { motion } from 'framer-motion';
const Education = () => (
  <section className="py-16 px-6 bg-white text-center" id="education">
    <motion.h2 className="text-3xl font-bold mb-10 text-gray-800" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      Education
    </motion.h2>
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div className="bg-blue-50 rounded-xl p-6 shadow-md" initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
        <h3 className="text-xl font-semibold">University of Southern California</h3>
        <p className="text-gray-600">Masters in Computer Science | Jan 2025 – Dec 2026</p>
        <p className="text-sm text-gray-500 mt-2">Courses: Analysis of Algorithms, Foundations of AI, Machine Learning for Data Science</p>
      </motion.div>
      <motion.div className="bg-purple-50 rounded-xl p-6 shadow-md" initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
        <h3 className="text-xl font-semibold">Pune Institute of Computer Technology</h3>
        <p className="text-gray-600">Bachelor’s in Computer Science | June 2020 – July 2024</p>
      </motion.div>
    </div>
  </section>
);
export default Education;