import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Education from './components/Education';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Publication from './components/Publication';
import About from './components/About';
import Contact from './components/Contact';

function App() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  return (
    <div className="min-h-screen transition-colors">
      {/* Dark mode toggle button */}
      <button
        onClick={() => setDark(!dark)}
        className="fixed top-4 right-4 p-2 bg-gray-200 dark:bg-gray-700 rounded-full shadow"
        aria-label="Toggle Dark Mode"
      >
        {dark ? '☀️' : '🌙'}
      </button>

      <Hero />
      <About />
      <Education />
      <Experience />
      <Projects />
      <Publication />
      <Contact />     {/* ← make sure this is in place */}
      <Footer />
    </div>
  );
}

export default App;
