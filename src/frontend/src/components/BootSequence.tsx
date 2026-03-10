import { useEffect, useRef, useState } from "react";

const BOOT_LINES = [
  "> Initializing GHOST_0x1 system...",
  "> Booting Cyber Security Kernel v6.1.0...",
  "> Connecting to Secure Network...",
  "> Decrypting classified data...",
  "> Bypassing firewall protocols...",
  "> Authenticating biometric signature...",
  "> [████████████████████] 100%",
  "> ACCESS GRANTED",
];

interface BootSequenceProps {
  onComplete: () => void;
}

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLineText, setCurrentLineText] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [fading, setFading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lineIndex >= BOOT_LINES.length) {
      setDone(true);
      const t = setTimeout(() => {
        setFading(true);
        setTimeout(onComplete, 800);
      }, 1000);
      return () => clearTimeout(t);
    }

    const line = BOOT_LINES[lineIndex];
    if (charIndex < line.length) {
      const delay = lineIndex === BOOT_LINES.length - 1 ? 60 : 30;
      const t = setTimeout(() => {
        setCurrentLineText(line.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      }, delay);
      return () => clearTimeout(t);
    }
    const pause = lineIndex === BOOT_LINES.length - 1 ? 0 : 400;
    const t = setTimeout(() => {
      setLines((prev) => [...prev, line]);
      setCurrentLineText("");
      setCharIndex(0);
      setLineIndex((idx) => idx + 1);
    }, pause);
    return () => clearTimeout(t);
  }, [lineIndex, charIndex, onComplete]);

  // Auto-scroll
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  });

  const skip = () => {
    setFading(true);
    setTimeout(onComplete, 800);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
      style={{
        transition: "opacity 0.8s ease",
        opacity: fading ? 0 : 1,
        pointerEvents: fading ? "none" : "auto",
      }}
    >
      {!done && (
        <button
          type="button"
          data-ocid="boot.button"
          onClick={skip}
          className="absolute top-6 right-8 text-xs border border-matrix-green text-matrix-green px-3 py-1 hover:bg-matrix-green hover:text-black transition-all duration-200"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            letterSpacing: "0.1em",
          }}
        >
          [SKIP]
        </button>
      )}

      <div
        className="w-full max-w-2xl mx-4 border border-matrix-green"
        style={{
          boxShadow: "0 0 30px rgba(0,255,65,0.3), 0 0 60px rgba(0,255,65,0.1)",
        }}
      >
        <div
          className="flex items-center gap-2 px-4 py-2 border-b border-matrix-green"
          style={{ background: "#0a0a0a" }}
        >
          <span
            className="w-3 h-3 rounded-full bg-red-500"
            style={{ boxShadow: "0 0 6px #ff5f57" }}
          />
          <span
            className="w-3 h-3 rounded-full bg-yellow-500"
            style={{ boxShadow: "0 0 6px #ffbd2e" }}
          />
          <span
            className="w-3 h-3 rounded-full"
            style={{ background: "#00ff41", boxShadow: "0 0 6px #00ff41" }}
          />
          <span className="ml-4 text-xs text-matrix-green opacity-60">
            GHOST_0x1 — boot_sequence.sh
          </span>
        </div>

        <div
          ref={containerRef}
          className="p-6 overflow-y-auto"
          style={{
            background: "#000",
            minHeight: "320px",
            maxHeight: "400px",
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          {lines.map((line) => (
            <div
              key={line}
              className="mb-1 text-sm leading-relaxed"
              style={{
                color: line.includes("ACCESS GRANTED")
                  ? "#00ff41"
                  : line.includes("100%")
                    ? "#00d4ff"
                    : "#00aa2b",
                textShadow: line.includes("ACCESS GRANTED")
                  ? "0 0 10px #00ff41, 0 0 20px #00ff41"
                  : "0 0 5px #00aa2b",
              }}
            >
              {line}
            </div>
          ))}
          {lineIndex < BOOT_LINES.length && (
            <div
              className="mb-1 text-sm leading-relaxed"
              style={{ color: "#00ff41", textShadow: "0 0 5px #00ff41" }}
            >
              {currentLineText}
              <span className="animate-blink" style={{ color: "#00ff41" }}>
                █
              </span>
            </div>
          )}
          {done && (
            <div
              className="mt-4 text-base font-bold"
              style={{
                color: "#00ff41",
                textShadow: "0 0 15px #00ff41, 0 0 30px #00ff41",
                animation: "fade-in-boot 0.5s ease",
              }}
            >
              ▶ SYSTEM ONLINE. WELCOME, AGENT.
            </div>
          )}
        </div>
      </div>

      <div
        className="mt-6 text-xs opacity-40"
        style={{ color: "#00ff41", fontFamily: "'JetBrains Mono', monospace" }}
      >
        GHOST_OS v6.1.0 | CLASSIFIED | RESTRICTED ACCESS
      </div>
    </div>
  );
}
