import { useEffect, useRef, useState } from "react";
import { FiMusic } from "react-icons/fi";

// A tiny, original, procedurally-generated lo-fi loop — no licensed audio
// involved. A soft sustained pad plus a gently picked "guitar-like" arpeggio
// over a warm lowpass filter, for a chill reading-music vibe.

const NOTE = {
  A2: 110.0,
  C3: 130.81,
  D3: 146.83,
  E3: 164.81,
  F3: 174.61,
  G3: 196.0,
  A3: 220.0,
  C4: 261.63,
  E4: 329.63,
};

// Chill i–VI–III–VII style progression, four picked notes per chord.
const PROGRESSION = [
  [NOTE.A2, NOTE.E3, NOTE.C3, NOTE.G3], // Am7
  [NOTE.F3, NOTE.C3, NOTE.A3, NOTE.E3], // Fmaj7
  [NOTE.C3, NOTE.G3, NOTE.E3, NOTE.C4], // Cmaj7
  [NOTE.G3, NOTE.D3, NOTE.G3, NOTE.E3], // G6
];

function buildAmbientGraph(ctx) {
  const master = ctx.createGain();
  master.gain.value = 0;
  master.connect(ctx.destination);

  // Warm overall tone — rolls off harsh highs for a lo-fi feel.
  const warmFilter = ctx.createBiquadFilter();
  warmFilter.type = "lowpass";
  warmFilter.frequency.value = 3200;
  warmFilter.Q.value = 0.4;
  warmFilter.connect(master);

  // Soft feedback delay for a bit of room/space around the plucks.
  const delay = ctx.createDelay(1.5);
  delay.delayTime.value = 0.34;
  const feedback = ctx.createGain();
  feedback.gain.value = 0.22;
  const wet = ctx.createGain();
  wet.gain.value = 0.22;
  delay.connect(feedback);
  feedback.connect(delay);
  delay.connect(wet);
  wet.connect(master);

  // Sustained pad underneath the plucks — very low, just for warmth.
  const padNotes = [NOTE.A2, NOTE.C3, NOTE.E3];
  const padOscillators = padNotes.map((freq, i) => {
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = freq;
    osc.detune.value = (Math.random() - 0.5) * 4;
    const g = ctx.createGain();
    g.gain.value = 0.028 + i * 0.004;
    osc.connect(g);
    g.connect(warmFilter);
    osc.start();
    return osc;
  });

  // Faint vinyl-style texture — filtered noise at a very low level.
  const bufferSize = ctx.sampleRate * 2;
  const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
  const noise = ctx.createBufferSource();
  noise.buffer = noiseBuffer;
  noise.loop = true;
  const noiseFilter = ctx.createBiquadFilter();
  noiseFilter.type = "bandpass";
  noiseFilter.frequency.value = 3500;
  noiseFilter.Q.value = 0.5;
  const noiseGain = ctx.createGain();
  noiseGain.gain.value = 0.012;
  noise.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(master);
  noise.start();

  // Plucked-string style arpeggio, scheduled on a simple self-rescheduling
  // timer (doesn't depend on rAF, so it keeps time even in a background tab).
  const playing = { current: true };
  let chordIndex = 0;
  let noteIndex = 0;
  const pluckInterval = 0.85;

  function pluck(freq, time) {
    const osc = ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.value = freq;

    const shimmer = ctx.createOscillator();
    shimmer.type = "sine";
    shimmer.frequency.value = freq * 2;

    const env = ctx.createGain();
    env.gain.setValueAtTime(0, time);
    env.gain.linearRampToValueAtTime(0.16, time + 0.01);
    env.gain.exponentialRampToValueAtTime(0.05, time + 0.18);
    env.gain.exponentialRampToValueAtTime(0.0001, time + 1.3);

    const shimmerEnv = ctx.createGain();
    shimmerEnv.gain.setValueAtTime(0, time);
    shimmerEnv.gain.linearRampToValueAtTime(0.02, time + 0.006);
    shimmerEnv.gain.exponentialRampToValueAtTime(0.0001, time + 0.5);

    const pluckFilter = ctx.createBiquadFilter();
    pluckFilter.type = "lowpass";
    pluckFilter.frequency.setValueAtTime(2600, time);
    pluckFilter.frequency.exponentialRampToValueAtTime(600, time + 1.0);
    pluckFilter.Q.value = 0.6;

    osc.connect(env);
    shimmer.connect(shimmerEnv);
    env.connect(pluckFilter);
    shimmerEnv.connect(pluckFilter);
    pluckFilter.connect(warmFilter);
    pluckFilter.connect(delay);

    osc.start(time);
    osc.stop(time + 1.4);
    shimmer.start(time);
    shimmer.stop(time + 0.6);
  }

  function loop() {
    if (!playing.current) return;
    const chord = PROGRESSION[chordIndex % PROGRESSION.length];
    pluck(chord[noteIndex % chord.length], ctx.currentTime + 0.02);
    noteIndex++;
    if (noteIndex % chord.length === 0) chordIndex++;
    setTimeout(loop, pluckInterval * 1000);
  }
  loop();

  return { master, padOscillators, noise, playing, restart: loop };
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
    const { master, playing: playingRef } = graphRef.current;
    if (ctx.state === "suspended") ctx.resume();

    const now = ctx.currentTime;
    master.gain.cancelScheduledValues(now);
    if (playing) {
      master.gain.linearRampToValueAtTime(0, now + 1.2);
      playingRef.current = false;
    } else {
      master.gain.setValueAtTime(master.gain.value, now);
      master.gain.linearRampToValueAtTime(0.55, now + 1.5);
      if (!playingRef.current) {
        playingRef.current = true;
        graphRef.current.restart();
      }
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
