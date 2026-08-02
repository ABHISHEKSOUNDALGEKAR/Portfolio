import { useEffect, useRef, useState } from "react";
import { FiMusic } from "react-icons/fi";

// A tiny, original, procedurally-generated ambient pad — no licensed audio
// involved. Built once on first play, then just faded in/out on toggle.
function buildAmbientGraph(ctx) {
  const master = ctx.createGain();
  master.gain.value = 0;
  master.connect(ctx.destination);

  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 900;
  filter.Q.value = 0.6;

  // Slow LFO breathing the filter cutoff for movement.
  const lfo = ctx.createOscillator();
  lfo.frequency.value = 0.05;
  const lfoGain = ctx.createGain();
  lfoGain.gain.value = 250;
  lfo.connect(lfoGain);
  lfoGain.connect(filter.frequency);
  lfo.start();

  // Simple feedback delay for a spacious, reverb-like tail.
  const delay = ctx.createDelay(2);
  delay.delayTime.value = 0.42;
  const feedback = ctx.createGain();
  feedback.gain.value = 0.36;
  const wet = ctx.createGain();
  wet.gain.value = 0.3;
  delay.connect(feedback);
  feedback.connect(delay);
  delay.connect(wet);
  wet.connect(master);

  filter.connect(master);
  filter.connect(delay);

  // Soft detuned chord (Cmaj9-ish): C3 E3 G3 B3 D4
  const notes = [130.81, 164.81, 196.0, 246.94, 293.66];
  const oscillators = notes.map((freq, i) => {
    const osc = ctx.createOscillator();
    osc.type = i % 2 === 0 ? "sine" : "triangle";
    osc.frequency.value = freq;
    osc.detune.value = (Math.random() - 0.5) * 6;
    const g = ctx.createGain();
    g.gain.value = 0.05 + Math.random() * 0.02;
    osc.connect(g);
    g.connect(filter);
    osc.start();
    return osc;
  });

  return { master, oscillators, lfo };
}

export default function AmbientMusic() {
  const [playing, setPlaying] = useState(false);
  const ctxRef = useRef(null);
  const graphRef = useRef(null);

  const toggle = () => {
    if (!ctxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      ctxRef.current = new AudioCtx();
      graphRef.current = buildAmbientGraph(ctxRef.current);
    }
    const ctx = ctxRef.current;
    const { master } = graphRef.current;
    if (ctx.state === "suspended") ctx.resume();

    const now = ctx.currentTime;
    master.gain.cancelScheduledValues(now);
    if (playing) {
      master.gain.linearRampToValueAtTime(0, now + 1.2);
    } else {
      master.gain.setValueAtTime(master.gain.value, now);
      master.gain.linearRampToValueAtTime(0.5, now + 1.5);
    }
    setPlaying((v) => !v);
  };

  useEffect(() => {
    return () => {
      ctxRef.current?.close?.();
    };
  }, []);

  return (
    <button
      onClick={toggle}
      aria-label={playing ? "Pause ambient music" : "Play ambient music"}
      title={playing ? "Pause ambient music" : "Play ambient music"}
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
