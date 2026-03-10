import GlitchText from "./GlitchText";

const STATS = [
  "THREATS NEUTRALIZED: 2,847",
  "SYSTEMS SECURED: 143",
  "UPTIME: 99.97%",
  "VULNERABILITIES PATCHED: 4,291",
  "EXPLOITS DEVELOPED: 87",
  "DARK WEB INTEL OPS: 312",
  "FIREWALL BYPASSES: 1,447",
  "ZERO-DAYS DISCOVERED: 23",
];

const STATS_A = STATS.map((s, i) => ({
  key: `a${i}`,
  stat: s,
  isEven: i % 2 === 0,
}));
const STATS_B = STATS.map((s, i) => ({
  key: `b${i}`,
  stat: s,
  isEven: i % 2 === 0,
}));

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  key: `p${i}`,
  color: i % 3 === 0 ? "#00d4ff" : "#00ff41",
  glow: i % 3 === 0 ? "0 0 6px #00d4ff" : "0 0 6px #00ff41",
  size: `${2 + (i % 3)}px`,
  left: `${5 + ((i * 4.7) % 90)}%`,
  top: `${10 + ((i * 7.3) % 80)}%`,
  dur: 4 + (i % 4),
  delay: i * 0.4,
}));

export default function HeroSection() {
  return (
    <section
      id="home"
      data-ocid="home.section"
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden"
      style={{ zIndex: 1 }}
    >
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        {PARTICLES.map(({ key, color, glow, size, left, top, dur, delay }) => (
          <div
            key={key}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              background: color,
              boxShadow: glow,
              left,
              top,
              animation: `float-particle ${dur}s ease-in-out ${delay}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div
          className="mb-6 text-xs tracking-widest uppercase opacity-70"
          style={{ color: "#00d4ff", textShadow: "0 0 8px #00d4ff" }}
        >
          ▶ CLASSIFIED PERSONNEL FILE — LEVEL 5 CLEARANCE REQUIRED
        </div>

        <GlitchText
          text="CIPHER_X"
          as="h1"
          continuous
          className="block text-6xl md:text-8xl lg:text-9xl font-bold mb-6 tracking-tight"
          style={{ color: "#00ff41" }}
        />

        <div
          className="mb-2 text-base md:text-lg tracking-wider font-semibold"
          style={{ color: "#00ff41", textShadow: "0 0 10px #00ff41" }}
        >
          Alex Mercer
        </div>

        <div
          className="mb-4 text-sm md:text-base tracking-wider"
          style={{ color: "#00aa2b", textShadow: "0 0 8px #00aa2b" }}
        >
          Offensive Security Specialist | Penetration Tester | Red Team Operator
        </div>

        <div
          className="mb-10 text-xs tracking-widest"
          style={{ color: "#00d4ff", textShadow: "0 0 8px #00d4ff" }}
        >
          <span>CIPHER@X:~$ </span>
          <span className="animate-blink" style={{ color: "#00ff41" }}>
            █
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#projects"
            data-ocid="hero.primary_button"
            className="px-8 py-3 text-sm tracking-widest uppercase font-bold transition-all duration-300"
            style={{
              border: "1px solid #00ff41",
              color: "#00ff41",
              textShadow: "0 0 8px #00ff41",
              boxShadow:
                "0 0 10px rgba(0,255,65,0.3), inset 0 0 20px rgba(0,255,65,0.05)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.boxShadow =
                "0 0 20px rgba(0,255,65,0.6), 0 0 40px rgba(0,255,65,0.3)";
              el.style.transform = "scale(1.05)";
              el.style.background = "rgba(0,255,65,0.05)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.boxShadow =
                "0 0 10px rgba(0,255,65,0.3), inset 0 0 20px rgba(0,255,65,0.05)";
              el.style.transform = "scale(1)";
              el.style.background = "transparent";
            }}
          >
            [&gt; EXPLORE_SYSTEMS]
          </a>
          <a
            href="#contact"
            data-ocid="hero.secondary_button"
            className="px-8 py-3 text-sm tracking-widest uppercase font-bold transition-all duration-300"
            style={{
              border: "1px solid #00d4ff",
              color: "#00d4ff",
              textShadow: "0 0 8px #00d4ff",
              boxShadow:
                "0 0 10px rgba(0,212,255,0.3), inset 0 0 20px rgba(0,212,255,0.05)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.boxShadow =
                "0 0 20px rgba(0,212,255,0.6), 0 0 40px rgba(0,212,255,0.3)";
              el.style.transform = "scale(1.05)";
              el.style.background = "rgba(0,212,255,0.05)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.boxShadow =
                "0 0 10px rgba(0,212,255,0.3), inset 0 0 20px rgba(0,212,255,0.05)";
              el.style.transform = "scale(1)";
              el.style.background = "transparent";
            }}
          >
            [&gt; CONTACT_AGENT]
          </a>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 overflow-hidden border-t"
        style={{
          borderColor: "rgba(0,255,65,0.3)",
          background: "rgba(0,0,0,0.8)",
          backdropFilter: "blur(4px)",
        }}
      >
        <div className="py-3 flex" style={{ width: "200%" }}>
          <div
            className="flex gap-12 animate-marquee whitespace-nowrap"
            style={{ width: "50%" }}
          >
            {STATS_A.map(({ key, stat, isEven }) => (
              <span
                key={key}
                className="text-xs tracking-widest px-4"
                style={{
                  color: isEven ? "#00ff41" : "#00d4ff",
                  textShadow: isEven ? "0 0 6px #00ff41" : "0 0 6px #00d4ff",
                }}
              >
                ◆ {stat}
              </span>
            ))}
          </div>
          <div
            className="flex gap-12 animate-marquee whitespace-nowrap"
            aria-hidden="true"
            style={{ width: "50%" }}
          >
            {STATS_B.map(({ key, stat, isEven }) => (
              <span
                key={key}
                className="text-xs tracking-widest px-4"
                style={{
                  color: isEven ? "#00ff41" : "#00d4ff",
                  textShadow: isEven ? "0 0 6px #00ff41" : "0 0 6px #00d4ff",
                }}
              >
                ◆ {stat}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div
        className="absolute right-8 top-1/2 -translate-y-1/2 text-xs opacity-50"
        style={{ color: "#00aa2b", writingMode: "vertical-rl" }}
      >
        SCROLL DOWN ▼
      </div>
    </section>
  );
}
