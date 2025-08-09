import { motion } from "framer-motion";

const Row = ({ icon, children }) => (
  <div className="flex items-center">
    <span className="mr-3">{icon}</span>
    {children}
  </div>
);

const Contact = () => (
  <section id="contact" className="py-16 px-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
    <motion.h2
      className="text-3xl font-bold mb-6 text-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      Contact
    </motion.h2>

    <motion.div
      className="max-w-lg mx-auto space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.8 }}
    >
      <Row icon="✉️">
        <a href="mailto:soundalg@usc.edu" className="hover:underline">soundalg@usc.edu</a>
      </Row>
      <Row icon="📞">
        <a href="tel:+12133488132" className="hover:underline">+1 (213) 348-8132</a>
      </Row>
      <Row icon="📍">
        <span>Los Angeles, CA</span>
      </Row>
    </motion.div>
  </section>
);

export default Contact;
