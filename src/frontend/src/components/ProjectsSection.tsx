import { useEffect, useRef, useState } from "react";
import GlitchText from "./GlitchText";

const PROJECTS = [
  {
    codename: "OP_PHANTOM",
    status: "ACTIVE",
    description:
      "Advanced network packet analyzer and real-time traffic interceptor. Detects anomalies using ML-based behavioral analysis. Capable of deep packet inspection across encrypted tunnels.",
    tags: ["Python", "Scapy", "ML", "PyTorch"],
    clearance: "LEVEL 4",
  },
  {
    codename: "OP_DARKWEB",
    status: "DEPLOYED",
    description:
      "Automated OSINT aggregator for deep web intelligence gathering. Crawls onion services, correlates identities, and generates threat assessment reports with NLP processing.",
    tags: ["Python", "Tor", "NLP", "Scrapy"],
    clearance: "LEVEL 5",
  },
  {
    codename: "OP_SPECTRE",
    status: "CLASSIFIED",
    description:
      "Zero-day exploit framework for authorized penetration testing engagements. Modular architecture supports custom payload delivery, privilege escalation, and lateral movement.",
    tags: ["C++", "Assembly", "Bash", "LLVM"],
    clearance: "LEVEL 5",
  },
];

export default function ProjectsSection() {
  const [started, setStarted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStarted(true);
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      data-ocid="projects.section"
      ref={sectionRef}
      className="relative py-24 px-6"
      style={{ zIndex: 1 }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <GlitchText
            text="[CLASSIFIED_OPERATIONS]"
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

        <div className="grid md:grid-cols-3 gap-6">
          {PROJECTS.map((proj, i) => (
            <div
              key={proj.codename}
              data-ocid={`projects.item.${i + 1}`}
              className="relative border overflow-hidden group cursor-default"
              style={{
                borderColor: "rgba(0,255,65,0.3)",
                background: "#000",
                opacity: started ? 1 : 0,
                transform: started ? "translateY(0)" : "translateY(40px)",
                transition: `opacity 0.6s ease ${i * 0.15}s, transform 0.6s ease ${i * 0.15}s`,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "#00ff41";
                el.style.boxShadow =
                  "0 0 25px rgba(0,255,65,0.4), 0 0 50px rgba(0,255,65,0.15)";
                el.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "rgba(0,255,65,0.3)";
                el.style.boxShadow = "none";
                el.style.transform = started
                  ? "translateY(0)"
                  : "translateY(40px)";
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background:
                    "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,255,65,0.03) 3px, rgba(0,255,65,0.03) 4px)",
                }}
              />

              <div
                className="flex justify-between items-center px-4 py-3 border-b"
                style={{
                  borderColor: "rgba(0,255,65,0.3)",
                  background: "#0a0a0a",
                }}
              >
                <span
                  className="px-2 py-0.5 border"
                  style={{
                    borderColor: "#00ff41",
                    color: "#00ff41",
                    textShadow: "0 0 6px #00ff41",
                    fontSize: "9px",
                    letterSpacing: "0.1em",
                  }}
                >
                  [CLASSIFIED]
                </span>
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{
                      background:
                        proj.status === "ACTIVE"
                          ? "#00ff41"
                          : proj.status === "DEPLOYED"
                            ? "#00d4ff"
                            : "#ffaa00",
                      boxShadow: `0 0 6px ${proj.status === "ACTIVE" ? "#00ff41" : proj.status === "DEPLOYED" ? "#00d4ff" : "#ffaa00"}`,
                      animation: "pulse-glow 2s ease-in-out infinite",
                    }}
                  />
                  <span className="text-xs" style={{ color: "#00aa2b" }}>
                    {proj.status}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <GlitchText
                  text={proj.codename}
                  as="h3"
                  className="text-xl font-bold mb-1 tracking-widest"
                  style={{ color: "#00ff41" }}
                />
                <div className="text-xs mb-4" style={{ color: "#00aa2b" }}>
                  CLEARANCE: {proj.clearance}
                </div>
                <p
                  className="text-sm leading-relaxed mb-5"
                  style={{ color: "rgba(0,170,43,0.8)", lineHeight: "1.7" }}
                >
                  {proj.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {proj.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 border"
                      style={{
                        borderColor: "rgba(0,212,255,0.4)",
                        color: "#00d4ff",
                        textShadow: "0 0 4px #00d4ff",
                        background: "rgba(0,212,255,0.05)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 px-5 pb-5">
                <button
                  type="button"
                  data-ocid={`projects.item.${i + 1}.primary_button`}
                  className="flex-1 py-2 text-xs tracking-widest border transition-all duration-200"
                  style={{
                    borderColor: "#00ff41",
                    color: "#00ff41",
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(0,255,65,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  [VIEW_FILES]
                </button>
                <button
                  type="button"
                  data-ocid={`projects.item.${i + 1}.secondary_button`}
                  className="flex-1 py-2 text-xs tracking-widest border transition-all duration-200"
                  style={{
                    borderColor: "#00d4ff",
                    color: "#00d4ff",
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(0,212,255,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  [DEPLOY]
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
