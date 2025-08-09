import { motion } from "framer-motion";

const Item = ({ role, place, time, bullets, href }) => (
  <div className="p-6 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-gray-800">
    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        {role} — {place}
      </h3>
      <span className="mt-1 sm:mt-0 text-sm text-gray-600 dark:text-gray-400">
        {time}
      </span>
    </div>
    {href && (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="inline-block mt-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
      >
        🌐 Company Website
      </a>
    )}
    <ul className="mt-3 list-disc pl-5 space-y-1">
      {bullets.map((b, i) => (
        <li key={i} className="text-gray-700 dark:text-gray-300">{b}</li>
      ))}
    </ul>
  </div>
);

const Experience = () => (
  <section id="experience" className="py-16 px-6">
    <motion.h2
      className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100"
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      Experience
    </motion.h2>

    <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
      <Item
        role="IT Services Student Worker"
        place="USC"
        time="May 2025 – Present"
        href="https://itservices.usc.edu/"
        bullets={[
          "Automated domain password rotations for admins & users via scripted workflows.",
          "Building zero-touch provisioning script to install baseline apps on new machines.",
          "Prototyping fast, secure RDP onboarding to support remote users."
        ]}
      />
      <Item
        role="Software Developer Intern"
        place="Sarvatra Technologies"
        time="Aug 2023 – Jun 2024"
        href="https://sarvatra.in/"
        bullets={[
          "UPI switch simulator with RSA; optimized Flask/FastAPI microservices.",
          "CI/CD with Docker & GitHub Actions; faster, safer releases."
        ]}
      />
      <Item
        role="Data Scientist"
        place="AlgoAnalytics"
        time="Aug 2023 – Dec 2023"
        href="https://www.algoanalytics.com/"
        bullets={[
          "Live news sentiment ML; boosted NER pipeline accuracy by 18%.",
          "Automated ingestion & features; cut training time by 35%."
        ]}
      />
      <Item
        role="Full-stack Developer Intern"
        place="Huf India"
        time="Jul 2022 – Dec 2022"
        href="https://www.huf-group.com/"
        bullets={[
          "React dashboards for IoT; Node.js APIs; 85% test coverage with Jest/Cypress."
        ]}
      />
      <Item
        role="Research Intern"
        place="University of Limerick"
        time="Jun 2022 – Nov 2022"
        href="https://www.ul.ie/"
        bullets={[
          "Predicted outcomes from 50GB sensor/survey data; exposed models via Flask."
        ]}
      />
      <Item
        role="Machine Learning Intern"
        place="Suvidha Foundation"
        time="Sep 2023 – Nov 2023"
        href="https://www.suvidhafoundationedutech.org/"
        bullets={[
          "Attention bridges for seq2seq; automated preprocessing; custom CNNs."
        ]}
      />
    </div>
  </section>
);

export default Experience;
