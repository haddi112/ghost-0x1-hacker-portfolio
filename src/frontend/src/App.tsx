import { useState } from "react";
import AboutSection from "./components/AboutSection";
import BootSequence from "./components/BootSequence";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import MatrixRain from "./components/MatrixRain";
import Navbar from "./components/Navbar";
import ProjectsSection from "./components/ProjectsSection";
import SkillsSection from "./components/SkillsSection";
import TerminalSection from "./components/TerminalSection";

export default function App() {
  const [booted, setBooted] = useState(false);

  return (
    <div
      className="relative min-h-screen"
      style={{ background: "#000", fontFamily: "'JetBrains Mono', monospace" }}
    >
      {/* Matrix rain canvas — always present */}
      <MatrixRain />

      {/* Boot sequence overlay */}
      {!booted && <BootSequence onComplete={() => setBooted(true)} />}

      {/* Main content */}
      <div
        style={{
          opacity: booted ? 1 : 0,
          transition: "opacity 0.5s ease",
          pointerEvents: booted ? "auto" : "none",
        }}
      >
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <TerminalSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
