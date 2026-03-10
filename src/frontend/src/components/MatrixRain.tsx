import { useEffect, useRef } from "react";

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const katakana =
      "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    const latin = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const nums = "0123456789";
    const symbols = "@#$%^&*(){}[]|/<>!?";
    const chars = katakana + latin + nums + symbols;

    const fontSize = 14;
    let drops: number[] = [];

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
      const cols = Math.floor(window.innerWidth / fontSize);
      drops = Array(cols)
        .fill(0)
        .map(() => Math.random() * -100);
    }

    resize();
    window.addEventListener("resize", resize);

    let animId: number;
    let lastTime = 0;
    const fps = 20;
    const interval = 1000 / fps;

    function draw(now: number) {
      animId = requestAnimationFrame(draw);
      if (now - lastTime < interval) return;
      lastTime = now;

      ctx!.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height);

      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;

        if (y * fontSize > 0) {
          ctx!.fillStyle = "#ffffff";
          ctx!.shadowBlur = 8;
          ctx!.shadowColor = "#00ff41";
          ctx!.font = `bold ${fontSize}px monospace`;
          ctx!.fillText(char, x, y * fontSize);
        }

        const gradient = ctx!.createLinearGradient(
          x,
          (y - 20) * fontSize,
          x,
          y * fontSize,
        );
        gradient.addColorStop(0, "rgba(0,255,65,0)");
        gradient.addColorStop(0.7, "rgba(0,170,43,0.6)");
        gradient.addColorStop(1, "rgba(0,255,65,0.9)");
        ctx!.fillStyle = gradient;
        ctx!.shadowBlur = 0;
        ctx!.font = `${fontSize}px monospace`;
        ctx!.fillText(
          chars[Math.floor(Math.random() * chars.length)],
          x,
          (y - 1) * fontSize,
        );

        if (drops[i] * fontSize > canvas!.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += 0.5;
      });
    }

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: 0, opacity: 0.35 }}
    />
  );
}
