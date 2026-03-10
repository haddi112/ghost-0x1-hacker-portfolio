import { useState } from "react";
import { useActor } from "../hooks/useActor";
import GlitchText from "./GlitchText";

export default function ContactSection() {
  const { actor } = useActor();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) return;
    setStatus("sending");
    try {
      await actor.submitMessage(form.name, form.email, form.message);
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const inputStyle: React.CSSProperties = {
    background: "rgba(0,255,65,0.03)",
    border: "1px solid rgba(0,255,65,0.4)",
    color: "#00ff41",
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "13px",
    padding: "10px 12px",
    outline: "none",
    width: "100%",
    caretColor: "#00ff41",
    transition: "border-color 0.2s, box-shadow 0.2s",
  };

  const focusStyle = {
    borderColor: "#00ff41",
    boxShadow: "0 0 10px rgba(0,255,65,0.3)",
  };

  return (
    <section
      id="contact"
      data-ocid="contact.section"
      className="relative py-24 px-6"
      style={{ zIndex: 1 }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="mb-16 text-center">
          <GlitchText
            text="[ESTABLISH_CONNECTION]"
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

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div
              className="border p-6"
              style={{
                borderColor: "rgba(0,255,65,0.4)",
                boxShadow: "0 0 20px rgba(0,255,65,0.1)",
                background: "#000",
              }}
            >
              <div
                className="flex items-center gap-2 mb-6 pb-4 border-b"
                style={{ borderColor: "rgba(0,255,65,0.3)" }}
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
                  style={{
                    background: "#00ff41",
                    boxShadow: "0 0 6px #00ff41",
                  }}
                />
                <span className="ml-2 text-xs" style={{ color: "#00aa2b" }}>
                  secure_contact.sh
                </span>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-5">
                  <label
                    htmlFor="agent-name"
                    className="block text-xs tracking-widest mb-2"
                    style={{ color: "#00aa2b" }}
                  >
                    &gt; AGENT_NAME:
                  </label>
                  <input
                    id="agent-name"
                    data-ocid="contact.input"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    style={inputStyle}
                    placeholder="Enter your designation..."
                    onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(0,255,65,0.4)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="secure-channel"
                    className="block text-xs tracking-widest mb-2"
                    style={{ color: "#00aa2b" }}
                  >
                    &gt; SECURE_CHANNEL (email):
                  </label>
                  <input
                    id="secure-channel"
                    data-ocid="contact.input"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    style={inputStyle}
                    placeholder="your@secure.channel"
                    onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(0,255,65,0.4)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="transmission"
                    className="block text-xs tracking-widest mb-2"
                    style={{ color: "#00aa2b" }}
                  >
                    &gt; TRANSMISSION (message):
                  </label>
                  <textarea
                    id="transmission"
                    data-ocid="contact.textarea"
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    style={{ ...inputStyle, resize: "none" }}
                    placeholder="Enter encrypted message..."
                    onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(0,255,65,0.4)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>

                {status === "success" && (
                  <div
                    data-ocid="contact.success_state"
                    className="mb-4 px-4 py-3 border text-sm"
                    style={{
                      borderColor: "#00ff41",
                      color: "#00ff41",
                      textShadow: "0 0 10px #00ff41",
                      boxShadow: "0 0 15px rgba(0,255,65,0.3)",
                      background: "rgba(0,255,65,0.05)",
                    }}
                  >
                    &gt; MESSAGE ENCRYPTED AND TRANSMITTED SUCCESSFULLY ✓
                  </div>
                )}
                {status === "error" && (
                  <div
                    data-ocid="contact.error_state"
                    className="mb-4 px-4 py-3 border text-sm"
                    style={{
                      borderColor: "#ff0040",
                      color: "#ff0040",
                      background: "rgba(255,0,64,0.05)",
                    }}
                  >
                    &gt; TRANSMISSION FAILED. RETRY OR USE ALTERNATE CHANNEL.
                  </div>
                )}

                <button
                  type="submit"
                  data-ocid="contact.submit_button"
                  disabled={status === "sending"}
                  className="w-full py-3 text-sm tracking-widest font-bold uppercase border transition-all duration-200"
                  style={{
                    borderColor: "#00ff41",
                    color: status === "sending" ? "#00aa2b" : "#00ff41",
                    textShadow: "0 0 8px #00ff41",
                    boxShadow: "0 0 10px rgba(0,255,65,0.3)",
                    background: "transparent",
                    cursor: status === "sending" ? "not-allowed" : "pointer",
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                  onMouseEnter={(e) => {
                    if (status !== "sending") {
                      e.currentTarget.style.background = "rgba(0,255,65,0.1)";
                      e.currentTarget.style.boxShadow =
                        "0 0 20px rgba(0,255,65,0.5)";
                      e.currentTarget.style.transform = "scale(1.02)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.boxShadow =
                      "0 0 10px rgba(0,255,65,0.3)";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  {status === "sending"
                    ? "> ENCRYPTING & TRANSMITTING..."
                    : "[TRANSMIT_MESSAGE]"}
                </button>
              </form>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-4">
            <div
              className="text-xs tracking-widest mb-2"
              style={{ color: "#00aa2b" }}
            >
              ▶ SECURE_CHANNELS
            </div>
            {[
              { label: "GITHUB", href: "#" },
              { label: "LINKEDIN", href: "#" },
              { label: "TWITTER", href: "#" },
            ].map((social, i) => (
              <a
                key={social.label}
                href={social.href}
                data-ocid={`contact.item.${i + 1}.link`}
                className="block px-4 py-3 border text-sm tracking-widest transition-all duration-200"
                style={{
                  borderColor: "rgba(0,212,255,0.4)",
                  color: "#00d4ff",
                  textShadow: "0 0 6px #00d4ff",
                  background: "rgba(0,212,255,0.03)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = "#00d4ff";
                  el.style.boxShadow = "0 0 15px rgba(0,212,255,0.4)";
                  el.style.background = "rgba(0,212,255,0.08)";
                  el.style.transform = "translateX(4px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = "rgba(0,212,255,0.4)";
                  el.style.boxShadow = "none";
                  el.style.background = "rgba(0,212,255,0.03)";
                  el.style.transform = "translateX(0)";
                }}
              >
                [&gt; {social.label}]
              </a>
            ))}
            <div
              className="mt-4 p-4 border text-xs"
              style={{
                borderColor: "rgba(0,255,65,0.2)",
                color: "rgba(0,170,43,0.6)",
                background: "rgba(0,0,0,0.5)",
                lineHeight: "1.6",
              }}
            >
              <div style={{ color: "#00aa2b", marginBottom: "4px" }}>
                PGP FINGERPRINT:
              </div>
              <div>4A7F 2B9C 1E8D 3F6A</div>
              <div>0C5E 7D4B 8A2F 9E1C</div>
              <div>3B6A 5D0F 2C8E 4F7B</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
