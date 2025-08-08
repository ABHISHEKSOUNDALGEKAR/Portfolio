// src/components/Contact.jsx
import { motion } from 'framer-motion'
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'

const contactItems = [
  {
    Icon: FaEnvelope,
    label: 'soundalg@usc.edu',
    href: 'mailto:soundalg@usc.edu',
    color: 'text-blue-600 dark:text-blue-400',
  },
  {
    Icon: FaPhone,
    label: '+1 (213) 348-8132',
    href: 'tel:+12133488132',
    color: 'text-green-600 dark:text-green-400',
  },
  {
    Icon: FaMapMarkerAlt,
    label: 'Los Angeles, CA',
    href: null,
    color: 'text-red-600 dark:text-red-400',
  },
]

const Contact = () => (
  <section
    id="contact"
    className="py-16 px-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
  >
    <motion.h2
      className="text-3xl font-bold mb-6 text-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      Contact
    </motion.h2>

    <div className="max-w-lg mx-auto grid gap-4">
      {contactItems.map(({ Icon, label, href, color }, i) => (
        <motion.a
          key={i}
          href={href || '#'}
          className="flex items-center p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 * i + 0.3, duration: 0.6 }}
          {...(href ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          <Icon className={`${color} mr-4 text-2xl`} />
          <span className="text-lg font-medium">{label}</span>
        </motion.a>
      ))}
    </div>
  </section>
)

export default Contact
