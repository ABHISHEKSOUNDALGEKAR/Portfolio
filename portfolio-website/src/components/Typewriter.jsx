import { useEffect, useState } from "react";

/**
 * Simple looping typewriter effect — types a phrase, pauses, deletes, moves on.
 */
export default function Typewriter({ phrases, typingMs = 55, deletingMs = 30, pauseMs = 1400 }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[index % phrases.length];
    let timeout;

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pauseMs);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % phrases.length);
    } else {
      timeout = setTimeout(() => {
        const next = deleting
          ? current.slice(0, text.length - 1)
          : current.slice(0, text.length + 1);
        setText(next);
      }, deleting ? deletingMs : typingMs);
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, index, phrases, typingMs, deletingMs, pauseMs]);

  return (
    <span>
      {text}
      <span className="inline-block w-[2px] h-[1em] bg-accent-500 ml-1 align-middle animate-blink" />
    </span>
  );
}
