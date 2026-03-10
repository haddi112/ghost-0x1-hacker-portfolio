import { useEffect, useState } from "react";
import GlitchText from "./GlitchText";

const NAV_LINKS = [
  { label: "Home", href: "#home", id: "home" },
  { label: "About", href: "#about", id: "about" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Terminal", href: "#terminal", id: "terminal" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = [
        "home",
        "about",
        "skills",
        "projects",
        "terminal",
        "contact",
      ];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40"
      style={{
        background: scrolled ? "rgba(0,0,0,0.95)" : "transparent",
        borderBottom: "1px solid rgba(0,255,65,0.4)",
        boxShadow: scrolled ? "0 0 20px rgba(0,255,65,0.15)" : "none",
        backdropFilter: scrolled ? "blur(8px)" : "none",
        transition: "all 0.3s ease",
        fontFamily: "'JetBrains Mono', monospace",
      }}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#home" data-ocid="nav.link">
          <GlitchText
            text="CIPHER_X"
            continuous
            className="text-xl font-bold text-matrix-green"
          />
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = active === link.id;
            return (
              <li key={link.id}>
                <a
                  href={link.href}
                  data-ocid={`nav.${link.id}.link`}
                  className="text-xs tracking-widest uppercase transition-all duration-200"
                  style={{
                    color: isActive ? "#00ff41" : "#00aa2b",
                    textShadow: isActive
                      ? "0 0 10px #00ff41, 0 0 20px #00ff41"
                      : "none",
                    borderBottom: isActive
                      ? "1px solid #00ff41"
                      : "1px solid transparent",
                    paddingBottom: "2px",
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.color = "#00ff41";
                    (e.target as HTMLElement).style.textShadow =
                      "0 0 10px #00ff41";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      (e.target as HTMLElement).style.color = "#00aa2b";
                      (e.target as HTMLElement).style.textShadow = "none";
                    }
                  }}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div
          className="hidden md:flex items-center gap-2 text-xs"
          style={{ color: "#00aa2b" }}
        >
          <span
            className="w-2 h-2 rounded-full animate-pulse-glow"
            style={{ background: "#00ff41" }}
          />
          ONLINE
        </div>

        <button
          type="button"
          data-ocid="nav.toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-matrix-green text-xl"
          aria-label="Toggle menu"
        >
          {menuOpen ? "[×]" : "[≡]"}
        </button>
      </nav>

      {menuOpen && (
        <div
          className="md:hidden border-t border-matrix-dim-green"
          style={{ background: "rgba(0,0,0,0.98)" }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={link.href}
              data-ocid={`nav.mobile.${link.id}.link`}
              className="block px-6 py-3 text-xs tracking-widest uppercase border-b border-matrix-dim-green"
              style={{ color: "#00aa2b" }}
              onClick={() => setMenuOpen(false)}
            >
              &gt; {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
