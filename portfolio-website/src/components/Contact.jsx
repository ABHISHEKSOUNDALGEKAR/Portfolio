// src/components/Contact.jsx
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => (
  <section id="contact" className="py-16 px-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
    <motion.h2
      className="text-3xl font-bold mb-6 text-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >Contact</motion.h2>
    <motion.div
      className="max-w-lg mx-auto space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.8 }}
    >
      <div className="flex items-center">
        <FaEnvelope className="text-blue-600 dark:text-blue-400 mr-3" />
        <a href="mailto:soundalg@usc.edu" className="hover:underline">soundalg@usc.edu</a>
      </div>
      <div className="flex items-center">
        <FaPhone className="text-blue-600 dark:text-blue-400 mr-3" />
        <a href="tel:+12133488132" className="hover:underline">+1 (213) 348-8132</a>
      </div>
      <div className="flex items-center">
        <FaMapMarkerAlt className="text-blue-600 dark:text-blue-400 mr-3" />
        <span>Los Angeles, CA</span>
      </div>
    </motion.div>
  </section>
);

export default Contact;