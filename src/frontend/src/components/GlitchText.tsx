import { useEffect, useState } from "react";

interface GlitchTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  as?: "h1" | "h2" | "h3" | "span" | "div";
  continuous?: boolean;
}

export default function GlitchText({
  text,
  className = "",
  style = {},
  as: Tag = "span",
  continuous = false,
}: GlitchTextProps) {
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    if (!continuous) {
      const scheduleGlitch = () => {
        const delay = 2000 + Math.random() * 4000;
        const timer = setTimeout(() => {
          setGlitching(true);
          setTimeout(() => setGlitching(false), 300);
          scheduleGlitch();
        }, delay);
        return timer;
      };
      const timer = scheduleGlitch();
      return () => clearTimeout(timer);
    }
  }, [continuous]);

  return (
    <Tag
      className={`relative inline-block select-none ${className}`}
      style={{
        ...style,
        animation: continuous ? "glitch-main 4s infinite" : undefined,
      }}
      data-text={text}
    >
      {/* Main text */}
      <span
        style={{
          position: "relative",
          display: "inline-block",
          textShadow: glitching
            ? "3px 0 #00d4ff, -3px 0 #ff0040, 0 0 20px #00ff41"
            : "0 0 10px #00ff41, 0 0 20px #00ff41",
          transform: glitching
            ? `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`
            : "none",
          transition: "transform 0.05s",
        }}
      >
        {text}
      </span>
      {/* Glitch layers */}
      {glitching && (
        <>
          <span
            aria-hidden
            style={{
              position: "absolute",
              top: `${Math.random() * 10}%`,
              left: "2px",
              color: "#00d4ff",
              clipPath: `inset(${Math.random() * 50}% 0 ${Math.random() * 50}% 0)`,
              textShadow: "none",
            }}
          >
            {text}
          </span>
          <span
            aria-hidden
            style={{
              position: "absolute",
              top: `${Math.random() * 10}%`,
              left: "-2px",
              color: "#ff0040",
              clipPath: `inset(${Math.random() * 50}% 0 ${Math.random() * 50}% 0)`,
              textShadow: "none",
            }}
          >
            {text}
          </span>
        </>
      )}
    </Tag>
  );
}
