import { useEffect, useRef, useState } from "react";
import { FiMusic } from "react-icons/fi";

// Plays a royalty-free lo-fi study track ("Dreamer's Study" — lofcosmos,
// copyright-free). Lazy-loaded: the MP3 only downloads on first play.
const TRACK_SRC = `${import.meta.env.BASE_URL}assets/ambient-lofi.mp3`;
const TARGET_VOLUME = 0.6;
const FADE_MS = 1200;

export default function AmbientMusic() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);
  const fadeRef = useRef(null);

  const fadeTo = (audio, target, done) => {
    clearInterval(fadeRef.current);
    const stepMs = 50;
    const steps = FADE_MS / stepMs;
    const delta = (target - audio.volume) / steps;
    fadeRef.current = setInterval(() => {
      const next = Math.min(1, Math.max(0, audio.volume + delta));
      audio.volume = next;
      if (Math.abs(next - target) < 0.02) {
        audio.volume = target;
        clearInterval(fadeRef.current);
        done?.();
      }
    }, stepMs);
  };

  const toggle = () => {
    if (!audioRef.current) {
      const audio = new Audio(TRACK_SRC);
      audio.loop = true;
      audio.preload = "none";
      audioRef.current = audio;
    }
    const audio = audioRef.current;

    if (playing) {
      fadeTo(audio, 0, () => audio.pause());
    } else {
      audio.volume = audio.paused ? 0 : audio.volume;
      audio.play().catch(() => {});
      fadeTo(audio, TARGET_VOLUME);
    }
    setPlaying((v) => !v);
  };

  useEffect(() => {
    return () => {
      clearInterval(fadeRef.current);
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  return (
    <button
      onClick={toggle}
      aria-label={playing ? "Pause lo-fi music" : "Play lo-fi music"}
      title={playing ? "Pause lo-fi music" : "Play lo-fi music"}
      className="fixed bottom-6 left-6 z-[70] w-12 h-12 rounded-full glass border border-black/10 dark:border-white/10 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-accent-500 hover:border-accent-500/40 active:scale-95 transition-all"
    >
      {playing ? (
        <span className="flex items-end gap-0.5 h-4">
          <span className="w-0.5 bg-accent-500 animate-[float_0.6s_ease-in-out_infinite]" style={{ height: "60%" }} />
          <span className="w-0.5 bg-accent-500 animate-[float_0.8s_ease-in-out_infinite]" style={{ height: "100%" }} />
          <span className="w-0.5 bg-accent-500 animate-[float_0.5s_ease-in-out_infinite]" style={{ height: "45%" }} />
        </span>
      ) : (
        <FiMusic size={17} />
      )}
    </button>
  );
}
