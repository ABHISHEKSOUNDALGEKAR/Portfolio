import { motion } from 'framer-motion';

const About = () => (
  <section id="about" className="py-16 px-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
    <motion.h2
      className="text-3xl font-bold mb-4 text-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >About Me</motion.h2>
    <motion.p
      className="max-w-3xl mx-auto leading-relaxed"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.8 }}
    >
      I'm a passionate Software Developer specializing in Full-Stack engineering and AI/ML solutions.  
      With hands-on experience building scalable web applications, automated pipelines, and robotics integrations,  
      I thrive on transforming complex problems into user-centric, performant products.
    </motion.p>
  </section>
);

export default About;