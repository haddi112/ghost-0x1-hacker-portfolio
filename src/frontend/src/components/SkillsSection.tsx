import { useEffect, useRef, useState } from "react";
import GlitchText from "./GlitchText";

const SKILLS = [
  { name: "Penetration Testing", icon: "⚡", pct: 95, color: "#00ff41" },
  { name: "Network Security", icon: "🌐", pct: 90, color: "#00ff41" },
  { name: "Cryptography", icon: "🔐", pct: 85, color: "#00d4ff" },
  { name: "Python", icon: "🐍", pct: 92, color: "#00ff41" },
  { name: "C / C++", icon: "⚙️", pct: 80, color: "#00d4ff" },
  { name: "Social Engineering", icon: "🎭", pct: 88, color: "#00ff41" },
  { name: "Malware Analysis", icon: "🦠", pct: 78, color: "#00d4ff" },
  { name: "OSINT", icon: "👁", pct: 93, color: "#00ff41" },
];

export default function SkillsSection() {
  const [started, setStarted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStarted(true);
      },
      { threshold: 0.15 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      data-ocid="skills.section"
      ref={sectionRef}
      className="relative py-24 px-6"
      style={{ zIndex: 1 }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <GlitchText
            text="[SYS_CAPABILITIES]"
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SKILLS.map((skill, i) => (
            <div
              key={skill.name}
              data-ocid={`skills.item.${i + 1}`}
              className="p-5 border group transition-all duration-300 cursor-default"
              style={{
                borderColor: "rgba(0,255,65,0.3)",
                background: "rgba(0,0,0,0.8)",
                opacity: started ? 1 : 0,
                transform: started ? "translateY(0)" : "translateY(30px)",
                transition: `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s, box-shadow 0.3s ease, border-color 0.3s ease`,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "#00ff41";
                el.style.boxShadow =
                  "0 0 20px rgba(0,255,65,0.3), 0 0 40px rgba(0,255,65,0.1)";
                el.style.background = "rgba(0,255,65,0.04)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "rgba(0,255,65,0.3)";
                el.style.boxShadow = "none";
                el.style.background = "rgba(0,0,0,0.8)";
              }}
            >
              <div className="text-2xl mb-3">{skill.icon}</div>
              <div
                className="text-xs tracking-widest mb-4 font-bold"
                style={{
                  color: skill.color,
                  textShadow: `0 0 6px ${skill.color}`,
                }}
              >
                {skill.name}
              </div>

              {/* Progress bar */}
              <div
                className="relative h-1 mb-2"
                style={{ background: "rgba(0,255,65,0.1)" }}
              >
                <div
                  style={{
                    height: "100%",
                    background: skill.color,
                    boxShadow: `0 0 8px ${skill.color}`,
                    width: started ? `${skill.pct}%` : "0%",
                    transition: `width 1.2s ease ${i * 0.1 + 0.3}s`,
                  }}
                />
              </div>

              <div
                className="text-right text-xs font-bold"
                style={{
                  color: skill.color,
                  textShadow: `0 0 6px ${skill.color}`,
                }}
              >
                {skill.pct}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
