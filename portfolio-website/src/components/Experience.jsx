import { motion } from 'framer-motion';
const Experience = () => {
  const jobs = [
    { title: 'IT Services Student Worker — USC', period: 'May 2025 – Present', link: 'https://itservices.usc.edu', items: ['Streamlined domain credential management with automated password-reset scripts, boosting security and reduced manual effort.','Developed a one-click software deployment toolkit for new workstations, reducing setup time by 80%','Created an RDP support utility for instant remote troubleshooting, cutting resolution times in half.' ] },
    { title: 'Software Developer Intern — Sarvatra Technologies', period: 'Aug 2023 – Jun 2024', link: 'https://drive.google.com/drive/folders/1JQ4DO6h_CHhtkOZFbcDbRfHctBAvX7pL?usp=sharing', items: ['Built a National Financial Switch simulator for UPI, integrating RSA encryption for secure transactions.', 'Improved transaction throughput by 30% through optimized microservice design in Flask and FastAPI.', 'Designed CI/CD pipelines with Docker and GitHub Actions, reducing deployment time by 50%'] },
    { title: 'Data Scientist — AlgoAnalytics', period: 'Aug 2023 – Dec 2023', link: 'https://drive.google.com/drive/folders/1b1ZEBKEHgjf0Gm5KsqqVeB1xaXFgxnNW?usp=sharing', items: ['Sentiment analysis on live financial news with SVM, MLP, Naive Bayes & Decision Trees, achieving 92% accuracy.', 'Extracted key stock‑related entities via NER and sequence labeling, boosting pipeline accuracy by 18%.', 'Automated end‑to‑end data ingestion and feature engineering in Python, reducing model training time by 35%.'] },
    { title: 'Machine Learning Intern — Suvidha Foundation', period: 'Sep 2023 – Nov 2023', link: 'https://drive.google.com/drive/folders/1OUodBU7p7wM6dO6_LRbWy5GBYtw0AzgC?usp=sharing', items: ['Developed an attention‑mechanism bridge in encoder–decoder models, reducing compute overhead by 40%.', 'Automated Python data‑preprocessing pipelines, slashing dataset prep time by 60%.', 'Built and fine‑tuned custom CNN architectures for sequence transduction, improving validation accuracy by 8%.'] },
    { title: 'Full-stack Developer Intern — Huf India', period: 'Jul 2022 – Dec 2022', link: 'https://drive.google.com/drive/folders/1SXlm00cpx4e73Tpc1eaWntcfTBof6Z9g?usp=sharing', items: ['Led front‑end coordination for Industry 4.0 project - set up Git, Figma & designed ReactJS UI for multi‑user UX.', 'Integrated Node.js REST APIs to surface real‑time IoT sensor data in React dashboards.', 'Authored Jest & Cypress tests covering 85% of code, improving stability and speeding up QA cycles.'] },
    { title: 'Research Intern — University of Limerick', period: 'Jun 2022 – Nov 2022', link: 'https://www.ul.ie', items: ['ML models to predict research outcomes; used heat maps & regression to boost feature‑selection accuracy by 15%.', 'Conducted exploratory analysis on 50 GB of sensor & survey data, uncovering three novel success predictors.', 'Packaged models as Flask REST endpoints, enabling non‑technical users to run predictions via a simple web form.'] }
  ];
  return (
      <section className="py-16 px-6 bg-gray-50 dark:bg-gray-800 text-center" id="experience">
      <motion.h2 className="text-3xl font-bold mb-10 text-gray-800" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        Experience
      </motion.h2>
      <div className="max-w-4xl mx-auto space-y-10">
        {jobs.map((job, i) => (
          <motion.div key={i} className="text-left bg-white dark:bg-gray-700 p-6 rounded-lg shadow hover:shadow-lg" initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <h3 className="text-xl font-semibold">{job.title} <span className="text-sm text-gray-500 block">{job.period}</span></h3>
            <a href={job.link} target="_blank" rel="noopener noreferrer" className="inline-block text-blue-600 hover:underline text-sm mt-1">🌐 Link </a>
            <ul className="list-disc ml-5 mt-2 text-sm text-gray-700 space-y-1">
              {job.items.map((item, j) => <li key={j}>{item}</li>)}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
export default Experience;