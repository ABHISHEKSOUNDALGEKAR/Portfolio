import { motion } from 'framer-motion';

const Hero = () => (
  <section className="w-full h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-blue-50 via-white to-purple-100 text-center">
    <motion.h1
      className="text-4xl md:text-6xl font-extrabold text-gray-900 drop-shadow-lg"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      Abhishek Soundalgekar
    </motion.h1>

    <motion.p
      className="mt-4 text-lg md:text-2xl text-gray-700 font-medium max-w-2xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 1 }}
    >
      Software Developer · AI & ML Enthusiast · Full-Stack Engineer
    </motion.p>

    <motion.div
      className="mt-6 text-gray-600"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 1 }}
    >
      Please scroll down to explore more!
    </motion.div>

    <motion.div
      className="flex flex-wrap justify-center gap-6 mt-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 1 }}
    >
      <a
        href="https://github.com/ABHISHEKSOUNDALGEKAR"
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-600 hover:text-white transition"
      >
        GitHub
      </a>

      <a
        href="https://linkedin.com/in/abhishekmsoundalgekar"
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-600 hover:text-white transition"
      >
        LinkedIn
      </a>

      <a
        href={`${import.meta.env.BASE_URL}assets/resume.pdf`}
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-600 hover:text-white transition"
      >
        Resume
      </a>
    </motion.div>
  </section>
);

export default Hero;
