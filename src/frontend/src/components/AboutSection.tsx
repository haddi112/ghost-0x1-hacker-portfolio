import { useEffect, useRef, useState } from "react";
import GlitchText from "./GlitchText";

const BIO_LINES = [
  { id: "cmd-whoami", prompt: "$ ", command: "whoami", output: null },
  {
    id: "out-1",
    prompt: null,
    command: null,
    output: "CIPHER_X — Alex Mercer",
  },
  {
    id: "out-2",
    prompt: null,
    command: null,
    output: "Offensive security specialist & penetration tester.",
  },
  {
    id: "out-3",
    prompt: null,
    command: null,
    output: "7 years in the field. Former red team operator.",
  },
  {
    id: "out-4",
    prompt: null,
    command: null,
    output: "Expert in network exploitation & malware analysis.",
  },
  {
    id: "out-5",
    prompt: null,
    command: null,
    output: "Zero-day researcher. Hunter of the complacent.",
  },
  { id: "out-6", prompt: null, command: null, output: "" },
  { id: "cmd-status", prompt: "$ ", command: "cat /etc/status", output: null },
  {
    id: "out-7",
    prompt: null,
    command: null,
    output: "Status: ACTIVE | Clearance: TOP SECRET",
  },
  {
    id: "out-8",
    prompt: null,
    command: null,
    output: "Last Login: TODAY FROM [REDACTED]",
  },
  { id: "cursor", prompt: "$ ", command: "_", output: null },
];

const SYS_INFO = [
  { label: "Alias", value: "CIPHER_X" },
  { label: "Real Name", value: "Alex Mercer" },
  { label: "OS", value: "Kali Linux 2025" },
  { label: "Experience", value: "7+ years" },
  { label: "Speciality", value: "Offensive Security" },
  { label: "Rank", value: "[REDACTED]" },
];

export default function AboutSection() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [started, setStarted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true);
      },
      { threshold: 0.2 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    if (visibleLines >= BIO_LINES.length) return;
    const t = setTimeout(() => setVisibleLines((v) => v + 1), 200);
    return () => clearTimeout(t);
  }, [started, visibleLines]);

  return (
    <section
      id="about"
      data-ocid="about.section"
      ref={sectionRef}
      className="relative py-24 px-6"
      style={{ zIndex: 1 }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <GlitchText
            text="[ABOUT_AGENT]"
            as="h2"
            className="text-3xl md:text-4xl font-bold tracking-widest"
            style={{ color: "#00ff41" }}
          />
          <div
            className="mt-3 text-xs tracking-widest"
            style={{ color: "#00aa2b" }}
          >
            ═══════════════════════════════════
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div
            className="border"
            style={{
              borderColor: "#00ff41",
              boxShadow:
                "0 0 20px rgba(0,255,65,0.2), 0 0 40px rgba(0,255,65,0.05)",
              background: "#000",
            }}
          >
            <div
              className="flex items-center gap-2 px-4 py-2 border-b"
              style={{ borderColor: "#00ff41", background: "#0a0a0a" }}
            >
              <span
                className="w-3 h-3 rounded-full"
                style={{ background: "#ff5f57" }}
              />
              <span
                className="w-3 h-3 rounded-full"
                style={{ background: "#ffbd2e" }}
              />
              <span
                className="w-3 h-3 rounded-full"
                style={{ background: "#00ff41", boxShadow: "0 0 6px #00ff41" }}
              />
              <span className="ml-4 text-xs" style={{ color: "#00aa2b" }}>
                cipher@terminal:~
              </span>
            </div>
            <div
              className="p-5 min-h-64"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {BIO_LINES.slice(0, visibleLines).map((line) => (
                <div key={line.id} className="mb-1 text-sm leading-relaxed">
                  {line.prompt !== null ? (
                    <span>
                      <span
                        style={{
                          color: "#00d4ff",
                          textShadow: "0 0 6px #00d4ff",
                        }}
                      >
                        {line.prompt}
                      </span>
                      <span
                        style={{
                          color: "#00ff41",
                          textShadow: "0 0 6px #00ff41",
                        }}
                      >
                        {line.command}
                      </span>
                    </span>
                  ) : (
                    <span
                      style={{
                        color: line.output?.startsWith("Status")
                          ? "#00d4ff"
                          : "#00aa2b",
                        textShadow: line.output?.startsWith("Status")
                          ? "0 0 6px #00d4ff"
                          : "none",
                        paddingLeft: "1rem",
                      }}
                    >
                      {line.output}
                    </span>
                  )}
                </div>
              ))}
              {visibleLines < BIO_LINES.length && (
                <span className="animate-blink" style={{ color: "#00ff41" }}>
                  █
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div
              className="text-xs tracking-widest mb-2"
              style={{ color: "#00aa2b" }}
            >
              ▶ SYSTEM_INFORMATION
            </div>
            {SYS_INFO.map((info, i) => (
              <div
                key={info.label}
                data-ocid={`about.item.${i + 1}`}
                className="flex justify-between items-center px-4 py-3 border-l-2"
                style={{
                  borderColor: "#00ff41",
                  background: "rgba(0,255,65,0.03)",
                  opacity: started ? 1 : 0,
                  transform: started ? "translateX(0)" : "translateX(20px)",
                  transition: `opacity 0.4s ease ${i * 0.1}s, transform 0.4s ease ${i * 0.1}s`,
                }}
              >
                <span
                  className="text-xs tracking-widest"
                  style={{ color: "#00aa2b" }}
                >
                  {info.label}:
                </span>
                <span
                  className="text-sm font-bold"
                  style={{ color: "#00ff41", textShadow: "0 0 6px #00ff41" }}
                >
                  {info.value}
                </span>
              </div>
            ))}
            <div
              className="mt-4 p-4 border text-center text-xs tracking-widest"
              style={{
                borderColor: "#00d4ff",
                color: "#00d4ff",
                textShadow: "0 0 8px #00d4ff",
                boxShadow: "0 0 15px rgba(0,212,255,0.2)",
                background: "rgba(0,212,255,0.03)",
              }}
            >
              ◆ AVAILABLE FOR CLASSIFIED CONTRACTS ◆
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
