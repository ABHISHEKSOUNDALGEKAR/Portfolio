const Footer = () => (
  <footer className="mt-16 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
    <p>
      © {new Date().getFullYear()} Abhishek Soundalgekar ·
      {" "}
      <a className="underline hover:text-blue-600" href="https://github.com/ABHISHEKSOUNDALGEKAR" target="_blank" rel="noreferrer">GitHub</a> ·
      {" "}
      <a className="underline hover:text-blue-600" href="https://linkedin.com/in/abhishekmsoundalgekar" target="_blank" rel="noreferrer">LinkedIn</a>
    </p>
  </footer>
);

export default Footer;
