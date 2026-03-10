export default function Footer() {
  const year = new Date().getFullYear();
  const utm = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`;

  return (
    <footer
      className="relative py-8 px-6 border-t text-center"
      style={{
        borderColor: "rgba(0,255,65,0.2)",
        background: "rgba(0,0,0,0.9)",
        zIndex: 1,
        fontFamily: "'JetBrains Mono', monospace",
      }}
    >
      <div
        className="text-xs tracking-widest"
        style={{ color: "rgba(0,170,43,0.5)" }}
      >
        &copy; {year}. Built with ♥ using{" "}
        <a
          href={utm}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-all duration-200"
          style={{ color: "#00aa2b" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#00ff41";
            e.currentTarget.style.textShadow = "0 0 8px #00ff41";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#00aa2b";
            e.currentTarget.style.textShadow = "none";
          }}
        >
          caffeine.ai
        </a>
      </div>
      <div className="mt-2 text-xs" style={{ color: "rgba(0,170,43,0.3)" }}>
        GHOST_0x1 | CLASSIFIED | ALL RIGHTS RESERVED
      </div>
    </footer>
  );
}
