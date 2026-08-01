import { motion } from "framer-motion";
import CountUp from "react-countup";

const stats = [
  { value: 500, suffix: "+", label: "DSA problems solved on GfG" },
  { value: 500, suffix: "+", label: "LeetCode problems solved" },
  { value: 6, suffix: "", label: "Companies & research labs" },
  { value: 1, suffix: "", label: "Published research paper" },
];

const About = () => (
  <section className="py-20 md:py-28">
    <motion.span
      className="section-eyebrow"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      Get to know me
    </motion.span>
    <motion.h2
      className="section-heading"
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      About Me
    </motion.h2>

    <div className="mt-10 grid md:grid-cols-5 gap-10 items-start">
      <motion.div
        className="md:col-span-3 space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <p>
          I'm a Master's student in Computer Science at the{" "}
          <span className="text-gray-900 dark:text-white font-semibold">
            University of Southern California
          </span>
          , currently building an ML-powered network traffic classifier as a{" "}
          <span className="text-gray-900 dark:text-white font-semibold">
            Software Engineer Intern at Hewlett Packard Enterprise (Aruba)
          </span>
          . I previously shipped full-stack clinical research tooling as an SDE
          Intern at{" "}
          <span className="text-gray-900 dark:text-white font-semibold">
            USC's Alzheimer's Therapeutic Research Institute
          </span>
          , and I currently automate infrastructure workflows as a Software
          Developer with USC IT Systems.
        </p>
        <p>
          My background spans secure backend systems, financial simulators, and
          data-driven machine learning. At{" "}
          <span className="text-gray-900 dark:text-white font-semibold">
            Sarvatra Technologies
          </span>
          , I helped build a National Financial Switch (UPI) simulator secured
          with RSA-2048 encryption. At{" "}
          <span className="text-gray-900 dark:text-white font-semibold">
            AlgoAnalytics
          </span>
          , I built sentiment-analysis pipelines over large-scale financial news
          datasets.
        </p>
        <p>
          I care about operating systems, backend engineering, AI/ML
          applications, and scalable system design — and I'm always looking to
          learn, build, and ship things that hold up under real load.
        </p>
      </motion.div>

      <motion.div
        className="md:col-span-2 grid grid-cols-2 gap-4"
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.15 }}
      >
        {stats.map((s) => (
          <div key={s.label} className="card p-5">
            <div className="font-display text-3xl font-bold gradient-text">
              <CountUp end={s.value} duration={2} enableScrollSpy scrollSpyOnce suffix={s.suffix} />
            </div>
            <p className="mt-1.5 text-xs text-gray-600 dark:text-gray-400 leading-snug">
              {s.label}
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default About;
