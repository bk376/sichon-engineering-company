"use client";

import {
  ArrowRight,
  Bike,
  Bot,
  BrainCircuit,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  DraftingCompass,
  Eye,
  Fence,
  Leaf,
  Lightbulb,
  Map,
  Play,
  ShieldCheck,
  Sparkles,
  SunMedium,
  Trees,
  UsersRound,
  Zap
} from "lucide-react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";

const focusAreas = [
  {
    icon: DraftingCompass,
    title: "Design intelligence",
    text: "High-quality drawings, regulatory-ready plans, and buildable designs optimized for time, cost, safety, and long-term performance."
  },
  {
    icon: Building2,
    title: "Built environment",
    text: "Roads, access infrastructure, pedestrian walkways, cycling lanes, drainage, retaining systems, playfields, and public spaces."
  },
  {
    icon: SunMedium,
    title: "Clean energy",
    text: "Solar projects for residential, commercial, and institutional needs, built around affordability, reliability, and low-carbon growth."
  },
  {
    icon: Trees,
    title: "Environmental resilience",
    text: "Tree planting and landscape decisions guided by native species, biodiversity, ecological balance, and future generations."
  }
];

const deliveryLoop = [
  "Identify the practical gap through field observation, community needs, maps, and site evidence.",
  "Design viable options against budget, safety, drainage, energy, environmental, and maintenance constraints.",
  "Execute responsibly with transparent documentation, cost control, and quality checkpoints.",
  "Handover work that can be inspected, maintained, and improved over time."
];

const heroStats = [
  { value: "04", label: "delivery lanes" },
  { value: "05", label: "operating values" },
  { value: "01", label: "mission standard" }
];

const signalPoints = [
  { label: "Road access", x: "18%", y: "44%" },
  { label: "Drainage", x: "56%", y: "24%" },
  { label: "Solar", x: "78%", y: "58%" },
  { label: "Public space", x: "34%", y: "70%" }
];

const projects = [
  { icon: Fence, label: "Perimeter and retaining walls" },
  { icon: Play, label: "Football fields and playgrounds" },
  { icon: Bike, label: "Walkways and cycling lanes" },
  { icon: Zap, label: "Solar energy deployments" },
  { icon: Map, label: "Roads and access networks" },
  { icon: Leaf, label: "Native tree programs" }
];

const values = [
  {
    icon: ShieldCheck,
    title: "Safety",
    text: "The first measure of engineering success. Human life sets the standard."
  },
  {
    icon: BrainCircuit,
    title: "Competence",
    text: "Technical skill, coordination, leadership, and disciplined resource management."
  },
  {
    icon: CheckCircle2,
    title: "Integrity",
    text: "Transparent budgeting, documentation, and communication embedded in the process."
  },
  {
    icon: UsersRound,
    title: "Respect",
    text: "Community needs, environmental responsibility, and professional fairness."
  },
  {
    icon: Eye,
    title: "Aesthetics",
    text: "Engineering that improves utility and visual harmony together."
  }
];

function FadeSection({
  children,
  className = "",
  id
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <motion.section
      id={id}
      className={`fade-section ${className}`}
      initial={{ opacity: 0, y: 42, filter: "blur(16px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: false, amount: 0.26 }}
      transition={{ duration: 0.85, ease: [0.21, 0.8, 0.32, 1] }}
    >
      {children}
    </motion.section>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 30 });
  const heroGlow = useTransform(progress, [0, 0.45, 1], [0, 120, 260]);

  return (
    <main>
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      <nav className="topbar" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="Sichon Engineering home">
          <span className="brand-mark">S</span>
          <span>Sichon Engineering</span>
        </a>
        <div className="nav-links">
          <a href="#mission">Mission</a>
          <a href="#platform">Delivery</a>
          <a href="#works">Works</a>
          <a href="#invest">Invest</a>
        </div>
      </nav>

      <header id="top" className="hero" ref={heroRef}>
        <motion.div className="hero-halo" style={{ y: heroGlow }} />
        <div className="hero-copy">
          <p className="eyebrow">
            <Sparkles size={16} aria-hidden="true" />
            Investor presentation · May 24, 2026
          </p>
          <h1>Engineering practical works for Kenya&apos;s next infrastructure leap.</h1>
          <p className="hero-lede">
            Sichon Engineering Company identifies real infrastructure gaps,
            designs viable solutions, executes responsibly, and builds trust
            through disciplined performance.
          </p>
          <div className="hero-actions">
            <a className="primary-action" href="#invest">
              Investor thesis <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a className="secondary-action" href="#platform">
              View delivery model
            </a>
          </div>
          <div className="hero-proof" aria-label="Company proof points">
            {heroStats.map((stat) => (
              <div key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="hero-visual" aria-label="Infrastructure delivery system visualization">
          <div className="terrain-wash" />
          <div className="signal-grid" />
          <svg className="route-map" viewBox="0 0 640 560" role="img" aria-label="Animated infrastructure route network">
            <path className="route route-base" d="M72 430 C150 340 205 380 276 284 S432 110 558 186" />
            <path className="route route-alt" d="M96 142 C178 215 248 160 318 248 S416 406 552 344" />
            <path className="route route-water" d="M120 484 C230 440 268 512 356 458 S478 398 594 464" />
          </svg>
          {signalPoints.map((point) => (
            <div
              className="field-signal"
              key={point.label}
              style={{ left: point.x, top: point.y }}
            >
              <i />
              <span>{point.label}</span>
            </div>
          ))}
          <div className="city-line">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="ai-core">
            <ClipboardCheck size={42} aria-hidden="true" />
            <span>Delivery Standard</span>
          </div>
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="site-card">
            <span>Active pipeline</span>
            <strong>Built environment · Energy · Sustainability</strong>
          </div>
        </div>
      </header>

      <FadeSection className="mission-band" id="mission">
        <div className="section-kicker">Mission</div>
        <div className="split">
          <h2>Engineering is a civic responsibility, not just a technical service.</h2>
          <p>
            Kenya&apos;s infrastructure gap shows up in transport inefficiency,
            unreliable energy, weak drainage, unsafe pedestrian systems, and
            poorly maintained public spaces. Sichon Engineering turns those
            gaps into a disciplined pipeline: identify, design, execute,
            verify, and improve.
          </p>
        </div>
      </FadeSection>

      <FadeSection className="platform-section" id="platform">
        <div className="section-kicker">Delivery Model</div>
        <div className="centered">
          <h2>A practical operating model for work that must last.</h2>
          <p>
            Digital tools, including AI-assisted analysis where appropriate,
            support the mission by improving evidence capture, option review,
            cost visibility, and documentation. The center remains responsible
            engineering.
          </p>
        </div>
        <div className="ai-loop">
          {deliveryLoop.map((item, index) => (
            <motion.article
              className="loop-card"
              key={item}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{item}</p>
            </motion.article>
          ))}
        </div>
      </FadeSection>

      <FadeSection className="focus-section" id="works">
        <div className="section-kicker">Works</div>
        <div className="section-head">
          <h2>Focused delivery areas with shared data, standards, and accountability.</h2>
          <p>
            The portfolio begins where the mission statement is strongest:
            built infrastructure, solar energy, environmental sustainability,
            and consulting that saves time and money.
          </p>
        </div>
        <div className="focus-grid">
          {focusAreas.map((area) => (
            <article className="focus-card" key={area.title}>
              <area.icon size={28} aria-hidden="true" />
              <h3>{area.title}</h3>
              <p>{area.text}</p>
            </article>
          ))}
        </div>
      </FadeSection>

      <FadeSection className="project-strip">
        <div className="project-list">
          {projects.map((project) => (
            <div className="project-pill" key={project.label}>
              <project.icon size={20} aria-hidden="true" />
              <span>{project.label}</span>
            </div>
          ))}
        </div>
      </FadeSection>

      <FadeSection className="evidence-section">
        <div className="section-kicker">Why Now</div>
        <div className="evidence-grid">
          <div className="evidence-copy">
            <h2>Visible gaps create investable demand for reliable local execution.</h2>
            <p>
              The opportunity is grounded in problems people can see: unsafe
              pedestrian paths, poor drainage, unreliable energy, underused
              public spaces, and infrastructure that is not maintained well
              after delivery.
            </p>
          </div>
          <div className="evidence-board">
            <div>
              <span>01</span>
              <strong>Local context</strong>
              <p>Designs adapted to site conditions, budgets, users, and regulatory requirements.</p>
            </div>
            <div>
              <span>02</span>
              <strong>Global standards</strong>
              <p>Technical quality, documentation discipline, and safety-first delivery.</p>
            </div>
            <div>
              <span>03</span>
              <strong>Maintainable works</strong>
              <p>Solutions planned for usability, durability, inspection, and future improvement.</p>
            </div>
          </div>
        </div>
      </FadeSection>

      <FadeSection className="values-section">
        <div className="section-kicker">Operating Values</div>
        <div className="values-grid">
          {values.map((value) => (
            <article className="value-card" key={value.title}>
              <value.icon size={24} aria-hidden="true" />
              <h3>{value.title}</h3>
              <p>{value.text}</p>
            </article>
          ))}
        </div>
      </FadeSection>

      <FadeSection className="invest-section" id="invest">
        <div className="invest-panel">
          <div>
            <div className="section-kicker">Investor Thesis</div>
            <h2>Build the trusted engineering company for infrastructure markets that need execution, not slogans.</h2>
          </div>
          <div className="thesis-grid">
            <div>
              <Lightbulb size={24} aria-hidden="true" />
              <h3>Clear market pain</h3>
              <p>Safety, drainage, transport, energy, and public-space gaps are visible, measurable, and economically costly.</p>
            </div>
            <div>
              <Bot size={24} aria-hidden="true" />
              <h3>Digital delivery discipline</h3>
              <p>Data capture, design assistance, estimation, documentation, and maintenance learning strengthen project control.</p>
            </div>
            <div>
              <ShieldCheck size={24} aria-hidden="true" />
              <h3>Trust as moat</h3>
              <p>Transparent budgets, competent delivery, and documented quality create repeatable credibility with clients and institutions.</p>
            </div>
          </div>
        </div>
      </FadeSection>
    </main>
  );
}
