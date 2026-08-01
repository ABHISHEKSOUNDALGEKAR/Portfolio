import { motion } from "framer-motion";
import { FiFileText, FiExternalLink } from "react-icons/fi";

const Publication = () => (
  <section className="py-20 md:py-28">
    <motion.span
      className="section-eyebrow"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      Research
    </motion.span>
    <motion.h2
      className="section-heading"
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      Publication
    </motion.h2>

    <motion.div
      className="mt-10 max-w-3xl mx-auto card p-7 border-l-4 !border-l-accent-500"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <div className="flex items-start gap-3">
        <span className="w-10 h-10 shrink-0 rounded-xl bg-accent-500/10 text-accent-600 dark:text-accent-400 flex items-center justify-center">
          <FiFileText size={18} />
        </span>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            National Financial Switch Simulator Using Mobile and Backend SDK
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            <span className="font-medium">IJRASET</span> · Vol 11, Issue XII, Dec 2023
          </p>
        </div>
      </div>
      <p className="mt-4 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
        Discusses a secure API backend and mobile SDK for UPI integration using
        RSA encryption, simulating the national financial switch to improve
        transaction reliability and security.
      </p>
      <a
        href="https://www.ijraset.com/best-journal/national-financial-switch-simulator-api-backend-and-mobile-app-sdk-for-upi"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center gap-2 btn-outline"
      >
        View Full Paper <FiExternalLink size={14} />
      </a>
    </motion.div>
  </section>
);

export default Publication;
