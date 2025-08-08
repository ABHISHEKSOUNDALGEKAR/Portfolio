import { motion } from 'framer-motion';
const projects = [
  { title: 'WorkLens (Smart India Hackathon)', stack: ['HTML','CSS','JavaScript','Django','Node.js','Kotlin'], description: 'Under the Government of Punjab\'s SIH, developed web and Android applications to provide employment data. Implemented job notifications based on geospatial coordinates for real-time job access. Built an AR navigation feature displaying company and job details via smartphone camera and map.', youtube:'https://www.youtube.com/embed/NZftNvbplik', link:'https://github.com/ABHISHEKSOUNDALGEKAR?tab=repositories' },
  { title: 'ThesisHub: PG Dissertation System', stack:['HTML','CSS','JavaScript','Django','Node.js','Kotlin'], description:'Dissertation management system for students and supervisors.', youtube:'https://www.youtube.com/embed/AD2z4A7N24Q', link:'https://github.com/ABHISHEKSOUNDALGEKAR?tab=repositories' },
  { title: 'EcoLens: Medicinal Plant Platform', stack:['TensorFlow','Python','HTML','JavaScript','Kotlin'], description:'Platform for identifying medicinal plants and community building.', link:'https://github.com/ABHISHEKSOUNDALGEKAR?tab=repositories' },
  { title: 'Smart Home Intercom System', stack:['Java','Android Studio'], description:'Smart visitor validation system via photo and admin verification.', link:'https://github.com/ABHISHEKSOUNDALGEKAR?tab=repositories' },
  { title: 'Analysis of Algorithms Final Project', stack:['C++','Python','NumPy','Matplotlib'], description:'Enhanced classic DP sequence alignment algorithm with gap penalty δ=30 and α-matrix mismatch costs, validating against 100+ sequence pairs (up to 20 kbp) with 100% accuracy and an average runtime of 0.08s per alignment. Designed a memory-optimized DP variant that lowered space requirements from O(mn) to O(n), successfully aligning sequences up to 20.000 bases while cutting peak memory usage by 70% without sacrificing alignment accuracy. Automated performance benchmarking across 10 dataset sizes (1 Kb-20 Kb), generated time vs. size and memory vs. size plots, and demonstrated a 60% average memory reduction while maintaining O(mn) runtime complexity.', link:'https://github.com/ABHISHEKSOUNDALGEKAR/USC/tree/main/CSCI-570%20Analysis%20of%20Algorithms%20(AoA)' },
  { title: 'AI Mega-Project (CSCI-561, USC)', stack:['C++','Python','TensorFlow','OpenAI Gym'], description:'Leveraged genetic algorithms for a 3D TSP, achieving 98.35% optimality across three homeworks in a cohort of 188. Developed search agents for 5x5 Go and Pac-Man, ranking top in class-wide AI tournaments v/s baselines. Implemented a Viterbi-based partially observable Markov decision process inference engine, decoding hidden states over 20-step sequences in 50+ simulation runs with 100% accuracy and an average inference time of <10 ms/step', link:'https://github.com/ABHISHEKSOUNDALGEKAR/USC_Private/blob/main/Ai' }
];
const Projects = () => (
  <section className="py-16 px-6 bg-white text-center" id="projects">
    <motion.h2 className="text-3xl font-bold mb-12 text-gray-800" initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} transition={{duration:0.6}}>Projects</motion.h2>
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
      {projects.map((proj,i)=>(
        <motion.div key={i} className="bg-gray-50 rounded-lg shadow-md p-5 text-left hover:shadow-xl transition relative" whileHover={{scale:1.02}} initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} transition={{delay:i*0.1,duration:0.5}}>
          <h3 className="text-xl font-semibold mb-2">{proj.title}</h3>
          <p className="text-gray-600 text-sm mb-4">{proj.description}</p>
          <div className="flex flex-wrap gap-2 mb-3">{proj.stack.map((tech,j)=><span key={j} className="bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded">{tech}</span>)}</div>
          {proj.youtube && <div className="w-full aspect-video rounded-md overflow-hidden mb-3"><iframe src={proj.youtube} title="YouTube Preview" frameBorder="0" allowFullScreen className="w-full h-full"></iframe></div>}
          {proj.link && <a href={proj.link} target="_blank" rel="noopener noreferrer" className="inline-block text-blue-600 hover:underline font-medium text-sm mt-2">⭐ View Project</a>}
        </motion.div>
      ))}
    </div>
  </section>
);
export default Projects;
