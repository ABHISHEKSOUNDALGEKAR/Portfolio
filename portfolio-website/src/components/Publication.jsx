// src/components/Publication.jsx
import { motion } from 'framer-motion';
const Publication = () => (
  <section className="py-16 px-6 bg-gradient-to-b from-white to-gray-100 text-center" id="publication">
    <motion.h2 className="text-3xl font-bold mb-6 text-gray-800" initial={{opacity:0,scale:0.9}} whileInView={{opacity:1,scale:1}} transition={{duration:0.7}}>📄 Research Publication</motion.h2>
    <motion.div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-6 text-left border-l-8 border-blue-500" initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} transition={{duration:0.6,delay:0.3}}>
      <h3 className="text-xl font-semibold mb-2 text-gray-800">National Financial Switch Simulator Using Mobile and Backend SDK</h3>
      <p className="text-sm text-gray-600 mb-3"><span className="font-medium">Journal:</span> IJRASET (Vol 11, Issue XII, Dec 2023)</p>
      <p className="text-sm text-gray-700 mb-4">This paper discusses a secure API backend and mobile SDK for UPI integration using RSA encryption, simulating the national financial switch to improve transaction reliability and security.</p>
      <a href="https://www.ijraset.com/best-journal/national-financial-switch-simulator-api-backend-and-mobile-app-sdk-for-upi" target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">🔗 View Full Paper</a>
    </motion.div>
  </section>
);
export default Publication;