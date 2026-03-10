import { useEffect, useRef, useState } from "react";
import GlitchText from "./GlitchText";

type OutputLine = {
  type: "input" | "output" | "system";
  text: string;
  id: string;
};

let lineCounter = 0;
const mkLine = (type: OutputLine["type"], text: string): OutputLine => ({
  type,
  text,
  id: `line-${lineCounter++}`,
});

const COMMANDS: Record<string, () => string[]> = {
  help: () => [
    "Available commands:",
    "  help       — show this help message",
    "  whoami     — display agent information",
    "  scan       — scan local network for hosts",
    "  decrypt    — run decryption routine",
    "  status     — system status report",
    "  clear      — clear terminal output",
    "  date       — current timestamp",
    "  ping       — check network connectivity",
  ],
  whoami: () => [
    "╔══════════════════════════════════╗",
    "║  AGENT: GHOST_0x1               ║",
    "║  RANK:  [REDACTED]              ║",
    "║  CLEARANCE: TOP SECRET / SAP    ║",
    "║  SPECIALITY: APT / RED TEAM     ║",
    "║  STATUS: ACTIVE DEPLOYMENT      ║",
    "╚══════════════════════════════════╝",
  ],
  scan: () => [
    "Initializing network scan...",
    "Scanning subnet 192.168.1.0/24...",
    "HOST DISCOVERED: 192.168.1.1   [ROUTER]   PORTS: 22,80,443",
    "HOST DISCOVERED: 192.168.1.14  [WORKSTATION] PORTS: 135,445",
    "HOST DISCOVERED: 192.168.1.99  [UNKNOWN]  PORTS: 8080,22",
    "HOST DISCOVERED: 192.168.1.103 [SERVER]   PORTS: 80,443,3306",
    "Scan complete. 4 hosts found. 2 potential vulnerabilities.",
  ],
  decrypt: () => [
    "Loading decryption engine...",
    "Algorithm: AES-256-GCM + RSA-4096",
    "[████░░░░░░░░░░░░░░░░] 20%",
    "[████████░░░░░░░░░░░░] 40%",
    "[████████████░░░░░░░░] 60%",
    "[████████████████░░░░] 80%",
    "[████████████████████] 100%",
    "DECRYPTION COMPLETE. 47 classified files unlocked.",
    "ENCRYPTION KEY: 4f7a2b9c1e8d3f6a... [TRUNCATED]",
  ],
  status: () => [
    "SYSTEM STATUS REPORT",
    "══════════════════",
    "CPU Usage:    12% [▓▓░░░░░░░░░░░░░░░░░░]",
    "RAM Usage:    3.2GB / 64GB [▓░░░░░░░░░░░░░░░░░░░]",
    "Network I/O:  ↑ 2.4 Mbps  ↓ 847 Kbps",
    "Active VPNs:  7 (Tor + Commercial)",
    "Firewall:     ACTIVE — 12,847 blocked today",
    "Threats:      0 active | 2 quarantined",
  ],
  date: () => [`${new Date().toISOString()} [UTC]`, "Local time: [CLASSIFIED]"],
  ping: () => [
    "PING secured-relay.ghost.net (REDACTED):",
    "64 bytes from relay: icmp_seq=1 ttl=64 time=2.41 ms",
    "64 bytes from relay: icmp_seq=2 ttl=64 time=1.87 ms",
    "64 bytes from relay: icmp_seq=3 ttl=64 time=2.09 ms",
    "3 packets transmitted, 3 received, 0% packet loss",
  ],
};

export default function TerminalSection() {
  const [history, setHistory] = useState<OutputLine[]>([
    mkLine("system", "GHOST_OS v6.1.0 — Secure Terminal Interface"),
    mkLine("system", "Type 'help' for available commands."),
    mkLine("system", "──────────────────────────────────────────"),
  ]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll when history changes
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newHistory: OutputLine[] = [
      ...history,
      mkLine("input", `GHOST@0x1:~$ ${cmd}`),
    ];

    if (trimmed === "clear") {
      setHistory([
        mkLine("system", "Terminal cleared."),
        mkLine("system", "──────────────────────────────────────────"),
      ]);
    } else if (trimmed === "") {
      setHistory(newHistory);
    } else if (COMMANDS[trimmed]) {
      const lines = COMMANDS[trimmed]();
      setHistory([...newHistory, ...lines.map((l) => mkLine("output", l))]);
    } else {
      setHistory([
        ...newHistory,
        mkLine("output", `Command not recognized: '${trimmed}'. Type 'help'.`),
      ]);
    }

    setCmdHistory((prev) => [cmd, ...prev]);
    setHistIdx(-1);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const newIdx = Math.min(histIdx + 1, cmdHistory.length - 1);
      setHistIdx(newIdx);
      setInput(cmdHistory[newIdx] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const newIdx = Math.max(histIdx - 1, -1);
      setHistIdx(newIdx);
      setInput(newIdx === -1 ? "" : cmdHistory[newIdx]);
    }
  };

  return (
    <section
      id="terminal"
      data-ocid="terminal.section"
      className="relative py-24 px-6"
      style={{ zIndex: 1 }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="mb-16 text-center">
          <GlitchText
            text="[COMMAND_INTERFACE]"
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

        <div
          className="border"
          style={{
            borderColor: "#00ff41",
            boxShadow:
              "0 0 30px rgba(0,255,65,0.3), 0 0 60px rgba(0,255,65,0.1)",
            background: "#000",
          }}
        >
          <div
            className="flex items-center gap-2 px-4 py-3 border-b"
            style={{ borderColor: "rgba(0,255,65,0.4)", background: "#0a0a0a" }}
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
            <span className="ml-4 text-xs flex-1" style={{ color: "#00aa2b" }}>
              GHOST_0x1 — secure_shell_v2.sh
            </span>
            <span className="text-xs" style={{ color: "#00d4ff" }}>
              ● ENCRYPTED
            </span>
          </div>

          <div
            role="log"
            aria-live="polite"
            className="p-4 overflow-y-auto"
            style={{
              height: "380px",
              fontFamily: "'JetBrains Mono', monospace",
              cursor: "text",
            }}
            onClick={() => inputRef.current?.focus()}
            onKeyDown={() => inputRef.current?.focus()}
          >
            {history.map((line) => (
              <div key={line.id} className="text-sm leading-relaxed mb-0.5">
                {line.type === "input" ? (
                  <span
                    style={{ color: "#00d4ff", textShadow: "0 0 6px #00d4ff" }}
                  >
                    {line.text}
                  </span>
                ) : line.type === "system" ? (
                  <span style={{ color: "rgba(0,170,43,0.6)" }}>
                    {line.text}
                  </span>
                ) : (
                  <span style={{ color: "#00aa2b" }}>
                    &nbsp;&nbsp;{line.text}
                  </span>
                )}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <div
            className="flex items-center px-4 py-3 border-t"
            style={{ borderColor: "rgba(0,255,65,0.3)", background: "#050505" }}
          >
            <span
              className="text-sm mr-2"
              style={{
                color: "#00d4ff",
                textShadow: "0 0 6px #00d4ff",
                whiteSpace: "nowrap",
              }}
            >
              GHOST@0x1:~$
            </span>
            <input
              ref={inputRef}
              data-ocid="terminal.input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              autoComplete="off"
              spellCheck={false}
              className="flex-1 bg-transparent outline-none text-sm"
              style={{
                color: "#00ff41",
                textShadow: "0 0 6px #00ff41",
                caretColor: "#00ff41",
                fontFamily: "'JetBrains Mono', monospace",
              }}
              placeholder="Type a command..."
            />
          </div>
        </div>

        <div
          className="mt-4 text-xs text-center"
          style={{ color: "rgba(0,170,43,0.5)" }}
        >
          ↑↓ command history | Enter to execute | Try: help, scan, decrypt,
          status
        </div>
      </div>
    </section>
  );
}
