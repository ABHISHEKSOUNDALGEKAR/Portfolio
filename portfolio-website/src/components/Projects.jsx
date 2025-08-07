import { motion } from 'framer-motion';
const projects = [
  { title: 'WorkLens (Smart India Hackathon)', stack: ['HTML','CSS','JavaScript','Django','Node.js','Kotlin'], description: 'Web + Android app providing employment data via AR navigation.', youtube:'https://www.youtube.com/embed/NZftNvbplik', link:'https://github.com/ABHISHEKSOUNDALGEKAR/WorkLens' },
  { title: 'ThesisHub: PG Dissertation System', stack:['HTML','CSS','JavaScript','Django','Node.js','Kotlin'], description:'Dissertation management system for students and supervisors.', youtube:'https://www.youtube.com/embed/AD2z4A7N24Q', link:'https://github.com/ABHISHEKSOUNDALGEKAR/ThesisHub' },
  { title: 'EcoLens: Medicinal Plant Platform', stack:['TensorFlow','Python','HTML','JavaScript','Kotlin'], description:'Platform for identifying medicinal plants and community building.', link:'https://github.com/ABHISHEKSOUNDALGEKAR/EcoLens' },
  { title: 'Smart Home Intercom System', stack:['Java','Android Studio'], description:'Smart visitor validation system via photo and admin verification.', link:'https://github.com/ABHISHEKSOUNDALGEKAR/SmartHomeIntercom' },
  { title: 'Analysis of Algorithms Final Project', stack:['C++','Python','NumPy','Matplotlib'], description:'Memory-efficient sequence alignment with 100% accuracy.', link:'https://github.com/ABHISHEKSOUNDALGEKAR/Sequence-Alignment' },
  { title: 'AI Mega-Project (CSCI-561, USC)', stack:['C++','Python','TensorFlow','OpenAI Gym'], description:'Genetic TSP solvers, Go AI, and Viterbi POMDP inference engine.', link:'https://github.com/ABHISHEKSOUNDALGEKAR/AI-Mega-Project' }
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
