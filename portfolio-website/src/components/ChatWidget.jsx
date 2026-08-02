import { useEffect, useRef, useState } from "react";
import { FiMessageCircle, FiX, FiSend, FiMail } from "react-icons/fi";

const FAQ = [
  {
    id: "who",
    q: "Who is Abhishek?",
    keywords: ["who", "about", "intro", "yourself"],
    a: "I'm a Master's student in Computer Science at USC, currently a Software Engineering Intern at HPE (Aruba) building an ML-powered network traffic classifier. I've previously worked at USC ATRI, AlgoAnalytics, and Sarvatra Technologies on backend systems, ML pipelines, and a UPI payment simulator.",
  },
  {
    id: "experience",
    q: "What's his work experience?",
    keywords: ["experience", "work", "job", "intern", "career", "companies"],
    a: "HPE Aruba (SWE Intern, May 2026–present) · USC ATRI (SDE Intern, Jan–May 2026) · USC IT Systems (Software Developer, May 2025–present) · AlgoAnalytics (Data Scientist) · Sarvatra Technologies (Software Developer Intern). Full details are in the Experience section below.",
  },
  {
    id: "stack",
    q: "What's his tech stack?",
    keywords: ["stack", "tech", "language", "tools", "skills", "framework", "python", "react"],
    a: "Python, C++, Java, TypeScript, Go on the languages side; React, Django, Flask, FastAPI, Node.js for web; Docker, Kubernetes, AWS, CI/CD for infra; PyTorch, TensorFlow, scikit-learn for ML. Full breakdown in the Skills section.",
  },
  {
    id: "availability",
    q: "Is he open to opportunities?",
    keywords: ["available", "opportunit", "hiring", "internship", "open to", "looking for"],
    a: "Yes — actively seeking Fall 2026 co-op/internship opportunities in software engineering. Feel free to reach out!",
  },
  {
    id: "education",
    q: "What's he studying?",
    keywords: ["study", "school", "education", "degree", "university", "usc", "college"],
    a: "Master's in Computer Science at USC (Jan 2025–Dec 2026), coursework in AI, ML, Algorithms, OS, Information Retrieval, NLP, and Deep Learning. Bachelor's in Computer Engineering with Honors in AI/ML from Pune Institute of Computer Technology.",
  },
  {
    id: "projects",
    q: "What are his notable projects?",
    keywords: ["project", "built", "portfolio", "github"],
    a: "A genetic-algorithm/search-agent AI mega-project (USC CSCI-561), a distributed cloud file system with sharding + replication, and a memory-optimized sequence-alignment algorithms project (USC CSCI-570). See the Projects section for the full writeups and links.",
  },
  {
    id: "contact",
    q: "How can I contact him?",
    keywords: ["contact", "email", "reach", "phone", "linkedin", "message"],
    a: "Best via email at soundalg@usc.edu, or connect on LinkedIn — both linked in the Contact section below.",
  },
];

const FALLBACK =
  "Sorry, I don't have a canned answer for that one. Feel free to reach out directly and Abhishek will get back to you personally!";

function matchAnswer(text) {
  const q = text.toLowerCase();
  for (const item of FAQ) {
    if (item.keywords.some((k) => q.includes(k))) return item.a;
  }
  return null;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hey! I'm a quick FAQ bot for Abhishek's portfolio — ask me something, or tap a suggestion below.",
    },
  ]);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  const send = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const answer = matchAnswer(trimmed);
    setMessages((m) => [
      ...m,
      { role: "user", text: trimmed },
      { role: "bot", text: answer || FALLBACK, fallback: !answer },
    ]);
    setInput("");
  };

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open FAQ chat"
        className="fixed bottom-6 right-6 z-[70] w-14 h-14 rounded-full bg-gradient-to-br from-accent-600 to-indigo-500 text-white shadow-glow flex items-center justify-center hover:brightness-110 active:scale-95 transition-all"
      >
        {open ? <FiX size={22} /> : <FiMessageCircle size={22} />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-[70] w-[calc(100vw-3rem)] max-w-sm h-[28rem] card !bg-white dark:!bg-ink-900 shadow-2xl flex flex-col overflow-hidden">
          <div className="px-4 py-3 border-b border-black/5 dark:border-white/10 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Ask about Abhishek</p>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-accent-600 text-white rounded-br-sm"
                      : "bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-gray-200 rounded-bl-sm"
                  }`}
                >
                  {m.text}
                  {m.fallback && (
                    <a
                      href="mailto:soundalg@usc.edu"
                      className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-accent-600 dark:text-accent-400 hover:underline"
                    >
                      <FiMail size={12} /> Email soundalg@usc.edu
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="px-3 py-2 flex flex-wrap gap-1.5 border-t border-black/5 dark:border-white/10">
            {FAQ.slice(0, 4).map((item) => (
              <button
                key={item.id}
                onClick={() => send(item.q)}
                className="chip !text-[11px] !py-1 !px-2"
              >
                {item.q}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="px-3 pb-3 flex items-center gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a question…"
              className="flex-1 rounded-xl border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm outline-none focus:border-accent-500/50 text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
            />
            <button
              type="submit"
              aria-label="Send"
              className="w-9 h-9 shrink-0 rounded-xl bg-accent-600 text-white flex items-center justify-center hover:brightness-110 active:scale-95 transition-all"
            >
              <FiSend size={14} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
