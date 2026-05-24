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
import { Canvas, useFrame } from "@react-three/fiber";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";

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

const projects = [
  { icon: Fence, label: "Perimeter and retaining walls" },
  { icon: Play, label: "Football fields and playgrounds" },
  { icon: Bike, label: "Walkways and cycling lanes" },
  { icon: Zap, label: "Solar energy deployments" },
  { icon: Map, label: "Roads and access networks" },
  { icon: Leaf, label: "Native tree programs" }
];

const sceneNodes = [
  { label: "Road access", position: [-2.8, -0.4, 0.6], color: "#55d6c2" },
  { label: "Drainage", position: [-0.35, 0.15, -0.55], color: "#7aa7d9" },
  { label: "Solar", position: [2.65, 0.55, 0.25], color: "#e9c46a" },
  { label: "Public space", position: [1.15, -0.82, 0.8], color: "#c6e56b" }
] as const;

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

function RouteLine({
  points,
  color,
  delay = 0
}: {
  points: THREE.Vector3[];
  color: string;
  delay?: number;
}) {
  const lineRef = useRef<THREE.Line>(null);
  const line = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(points);
    const geometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(96));
    const material = new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity: 0.72
    });
    return new THREE.Line(geometry, material);
  }, [points]);

  useFrame(({ clock }) => {
    const line = lineRef.current;
    if (!line) return;

    const material = line.material as THREE.LineBasicMaterial;
    const pulse = Math.sin(clock.elapsedTime * 1.4 + delay) * 0.18 + 0.62;
    material.opacity = pulse;
  });

  return <primitive ref={lineRef} object={line} />;
}

function InfrastructureNode({
  label,
  position,
  color
}: {
  label: string;
  position: readonly [number, number, number];
  color: string;
}) {
  const [hovered, setHovered] = useState(false);
  const nodeRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const node = nodeRef.current;
    if (!node) return;
    node.position.y = position[1] + Math.sin(clock.elapsedTime * 1.6 + position[0]) * 0.045;
    node.scale.setScalar(hovered ? 1.22 : 1);
  });

  return (
    <group position={[position[0], position[1], position[2]]}>
      <mesh
        ref={nodeRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.13, 32, 32]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.24, 0.26, 48]} />
        <meshBasicMaterial color={color} transparent opacity={hovered ? 0.78 : 0.38} />
      </mesh>
      <mesh position={[0, -0.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.08, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.22} />
      </mesh>
    </group>
  );
}

function IntelligentInfrastructureScene() {
  const rigRef = useRef<THREE.Group>(null);
  const particleGeometry = useMemo(() => {
    const positions = new Float32Array(360 * 3);
    for (let i = 0; i < 360; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 7.4;
      positions[i * 3 + 1] = Math.random() * 2.8 - 0.9;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4.6;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);

  useFrame(({ clock, pointer }) => {
    const rig = rigRef.current;
    if (!rig) return;
    rig.rotation.y = pointer.x * 0.16 + Math.sin(clock.elapsedTime * 0.15) * 0.04;
    rig.rotation.x = -0.22 + pointer.y * 0.08;
  });

  return (
    <>
      <fog attach="fog" args={["#071012", 4.5, 9.2]} />
      <ambientLight intensity={0.56} />
      <directionalLight position={[3, 4, 3]} intensity={1.35} color="#effbf6" />
      <pointLight position={[-3, 2, 2]} intensity={2.2} color="#55d6c2" />
      <pointLight position={[3, 1.2, -1.8]} intensity={1.4} color="#e9c46a" />

      <group ref={rigRef} position={[0, -0.25, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.08, 0]}>
          <planeGeometry args={[7.8, 5.2, 36, 24]} />
          <meshStandardMaterial
            color="#11211d"
            emissive="#14362f"
            emissiveIntensity={0.28}
            roughness={0.72}
            metalness={0.22}
            wireframe
          />
        </mesh>

        <RouteLine
          color="#55d6c2"
          points={[
            new THREE.Vector3(-3.2, -0.76, 0.62),
            new THREE.Vector3(-1.8, -0.5, 0.18),
            new THREE.Vector3(-0.36, 0.1, -0.55),
            new THREE.Vector3(1.35, -0.42, 0.28),
            new THREE.Vector3(2.8, 0.48, 0.24)
          ]}
        />
        <RouteLine
          color="#e9c46a"
          delay={0.8}
          points={[
            new THREE.Vector3(-2.7, 0.36, -1.1),
            new THREE.Vector3(-1.18, 0.08, -0.18),
            new THREE.Vector3(0.72, 0.64, -0.88),
            new THREE.Vector3(2.72, -0.28, 0.42)
          ]}
        />
        <RouteLine
          color="#7aa7d9"
          delay={1.35}
          points={[
            new THREE.Vector3(-3.25, -0.86, -0.55),
            new THREE.Vector3(-1.55, -0.94, -0.16),
            new THREE.Vector3(0.45, -0.52, 0.72),
            new THREE.Vector3(2.35, -0.88, -0.4)
          ]}
        />

        {sceneNodes.map((node) => (
          <InfrastructureNode
            key={node.label}
            label={node.label}
            position={node.position}
            color={node.color}
          />
        ))}

        <group position={[0, -0.28, 0]}>
          {[-2.5, -1.3, -0.2, 1, 2.1].map((x, index) => (
            <mesh key={x} position={[x, -0.48 + index * 0.06, -1.25 + (index % 2) * 0.62]}>
              <boxGeometry args={[0.34, 0.55 + index * 0.16, 0.34]} />
              <meshStandardMaterial
                color={index % 2 ? "#1e4138" : "#26372d"}
                emissive={index % 2 ? "#55d6c2" : "#e9c46a"}
                emissiveIntensity={0.16}
                roughness={0.52}
                metalness={0.38}
              />
            </mesh>
          ))}
        </group>

        <points geometry={particleGeometry}>
          <pointsMaterial color="#effbf6" size={0.014} transparent opacity={0.42} />
        </points>
      </group>
    </>
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
          <a href="#values">Values</a>
        </div>
      </nav>

      <header id="top" className="hero" ref={heroRef}>
        <motion.div className="hero-halo" style={{ y: heroGlow }} />
        <div className="hero-copy">
          <p className="eyebrow">
            <Sparkles size={16} aria-hidden="true" />
            Intelligent engineering · Kenya
          </p>
          <h1>Engineering Kenya&apos;s intelligent infrastructure.</h1>
          <p className="hero-lede">
            Sichon Engineering Company identifies real infrastructure gaps,
            designs viable solutions, executes responsibly, and builds trust
            through disciplined performance.
          </p>
          <div className="hero-actions">
            <a className="primary-action" href="#works">
              Explore works <ArrowRight size={18} aria-hidden="true" />
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
          <Canvas
            className="hero-canvas"
            camera={{ position: [0, 1.7, 5.7], fov: 45 }}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: "high-performance",
              preserveDrawingBuffer: true
            }}
          >
            <IntelligentInfrastructureScene />
          </Canvas>
          <div className="scene-overlay">
            {sceneNodes.map((node) => (
              <div className="scene-label" key={node.label}>
                <i style={{ background: node.color }} />
                <span>{node.label}</span>
              </div>
            ))}
          </div>
          <div className="scene-status">
            <ClipboardCheck size={22} aria-hidden="true" />
            <div>
              <span>Delivery standard</span>
              <strong>Survey · Design · Build · Maintain</strong>
            </div>
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
            Digital tools and AI-assisted analysis support the mission by
            improving evidence capture, option review, cost visibility, and
            documentation. The center remains responsible engineering and
            accountable construction.
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
            <h2>Visible gaps call for reliable local execution.</h2>
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

      <FadeSection className="values-section" id="values">
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

      <FadeSection className="invest-section">
        <div className="invest-panel">
          <div>
            <div className="section-kicker">Build With Us</div>
            <h2>Make infrastructure practical, safe, maintainable, and worthy of the communities it serves.</h2>
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
