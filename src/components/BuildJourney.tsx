import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useReducedMotion,
  type MotionValue,
} from 'motion/react'
import styles from './BuildJourney.module.css'

/**
 * The signature scroll experience: an engineer's drawing that builds itself.
 * Dark "gap" → survey → roads → wall → solar & light → green → the nation.
 * Performance: only opacity / transform / SVG pathLength are animated (GPU-
 * friendly). Respects prefers-reduced-motion by rendering the final built
 * scene statically with no scroll pinning.
 */
const GROUND = 640

export default function BuildJourney() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })
  const staticProgress = useMotionValue(1)
  const p = reduced ? staticProgress : scrollYProgress

  // A cinematic sunrise, not a flat grey: night → deep blue → pre-dawn indigo
  // → dawn mauve → warm sand → morning light → paper.
  const bg = useTransform(
    p,
    [0, 0.34, 0.5, 0.6, 0.72, 0.85, 0.95],
    ['#0a0b11', '#101423', '#241f33', '#5a4f5a', '#b8a99a', '#e7e1d5', '#f5f4ef'],
  )
  const captionColor = useTransform(p, [0, 0.68, 0.82], ['#f5f4ef', '#f5f4ef', '#16150f'])
  const gridOpacity = useTransform(p, [0, 0.1, 0.7, 0.9], [0.16, 0.16, 0.08, 0])

  return (
    <section
      ref={ref}
      id="top"
      className={styles.track}
      style={{ height: reduced ? '100svh' : '380vh' }}
    >
      <div className={styles.sticky}>
        <motion.div className={styles.bg} style={{ backgroundColor: bg }} />
        <motion.div className={styles.grid} style={{ opacity: gridOpacity }} />

        <svg className={styles.scene} viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          {/* ground datum */}
          <line x1="0" y1={GROUND} x2="1440" y2={GROUND} stroke="var(--steel)" strokeWidth="1.2" opacity="0.6" />
          <Contours p={p} />
          <Benchmark p={p} />
          <Survey p={p} />
          <City p={p} />
          <Wall p={p} />
          <Road p={p} />
          <SolarArray p={p} />
          <Sun p={p} />
          <Lights p={p} />
          <Trees p={p} />
        </svg>

        <motion.div className={styles.captions} style={{ color: captionColor }}>
          <Caption p={p} range={[0.0, 0.03, 0.1, 0.15]} entry={false}>
            <span className={styles.coord}>01°17′S · 36°49′E — NAIROBI, KENYA</span>
            <h1 className={styles.headline}>There is a gap.</h1>
            <p className={styles.sub}>
              84.9% of Kenya’s roads are unpaved. One in four Kenyans still lives without power.
              Engineering is the discipline that closes the distance.
            </p>
            <span className={styles.scrollHint}>Scroll to build ↓</span>
          </Caption>

          <Caption p={p} range={[0.15, 0.19, 0.25, 0.29]}>
            <span className={styles.step}>01 — Identify</span>
            <h2 className={styles.headline2}>We find the real problem.</h2>
            <p className={styles.sub}>Survey, assessment, and analysis — before a single line is drawn.</p>
          </Caption>

          <Caption p={p} range={[0.3, 0.34, 0.43, 0.47]}>
            <span className={styles.step}>02 — Design & Build</span>
            <h2 className={styles.headline2}>Roads, walls, drainage.</h2>
            <p className={styles.sub}>The built environment — practical, durable, held to global standards.</p>
          </Caption>

          <Caption p={p} range={[0.48, 0.52, 0.61, 0.65]}>
            <span className={styles.step}>03 — Power</span>
            <h2 className={styles.headline2}>The lights come on.</h2>
            <p className={styles.sub}>Clean, affordable solar — reliable energy access, low-carbon by design.</p>
          </Caption>

          <Caption p={p} range={[0.66, 0.7, 0.77, 0.81]}>
            <span className={styles.step}>04 — Sustain</span>
            <h2 className={styles.headline2}>We leave it greener.</h2>
            <p className={styles.sub}>Native tree planting and lasting environmental care for the next generation.</p>
          </Caption>

          <Caption p={p} range={[0.85, 0.91, 1, 1]}>
            <span className={styles.step}>Jenga Taifa</span>
            <h2 className={styles.finale}>Build the Nation.</h2>
            <p className={styles.sub}>
              We identify real gaps, design viable solutions, execute responsibly, and build trust through performance.
            </p>
          </Caption>
        </motion.div>
      </div>
    </section>
  )
}

/* ── Caption wrapper ─────────────────────────────────────── */
function Caption({
  p,
  range,
  entry = true,
  children,
}: {
  p: MotionValue<number>
  range: [number, number, number, number]
  /** When false, the caption is visible on load and only fades out. */
  entry?: boolean
  children: React.ReactNode
}) {
  const [a, b, c, d] = range
  const opacity = useTransform(
    p,
    entry ? [a, b, c, d] : [a, c, d],
    entry ? [0, 1, 1, d === 1 ? 1 : 0] : [1, 1, 0],
  )
  const y = useTransform(p, [a, b], [entry ? 26 : 0, 0])
  return (
    <motion.div className={styles.caption} style={{ opacity, y }}>
      {children}
    </motion.div>
  )
}

/* ── Scene elements (draftsman line-art) ─────────────────── */
function Contours({ p }: { p: MotionValue<number> }) {
  const draw = useTransform(p, [0.0, 0.12], [0, 1])
  const opacity = useTransform(p, [0.0, 0.06, 0.28, 0.4], [0, 0.5, 0.5, 0])
  return (
    <motion.g stroke="var(--steel)" fill="none" strokeWidth="1" style={{ opacity }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.path
          key={i}
          style={{ pathLength: draw }}
          d={`M-40 ${430 + i * 48} C 260 ${390 + i * 48}, 560 ${470 + i * 48}, 860 ${420 + i * 48} S 1320 ${370 + i * 48}, 1480 ${430 + i * 48}`}
        />
      ))}
    </motion.g>
  )
}

function Benchmark({ p }: { p: MotionValue<number> }) {
  const opacity = useTransform(p, [0.0, 0.04, 0.24, 0.32], [0, 1, 1, 0])
  return (
    <motion.g style={{ opacity }} stroke="var(--accent)" strokeWidth="1.4" fill="none">
      <circle cx="720" cy={GROUND} r="8" />
      <line x1="720" y1={GROUND - 16} x2="720" y2={GROUND + 16} />
      <line x1="704" y1={GROUND} x2="736" y2={GROUND} />
      <text x="742" y={GROUND - 12} fill="var(--accent)" stroke="none" fontFamily="var(--font-mono)" fontSize="15">
        BM · 1795m
      </text>
    </motion.g>
  )
}

function Survey({ p }: { p: MotionValue<number> }) {
  const draw = useTransform(p, [0.12, 0.24], [0, 1])
  const opacity = useTransform(p, [0.12, 0.16, 0.44, 0.52], [0, 1, 1, 0])
  return (
    <motion.g style={{ opacity }} stroke="var(--draft)" strokeWidth="1" fill="none" strokeDasharray="2 6">
      <motion.line style={{ pathLength: draw }} x1="120" y1={GROUND + 40} x2="1320" y2={GROUND + 40} />
      <motion.line style={{ pathLength: draw }} x1="120" y1={GROUND + 34} x2="120" y2={GROUND + 46} />
      <motion.line style={{ pathLength: draw }} x1="1320" y1={GROUND + 34} x2="1320" y2={GROUND + 46} />
    </motion.g>
  )
}

function Road({ p }: { p: MotionValue<number> }) {
  const draw = useTransform(p, [0.2, 0.36], [0, 1])
  const opacity = useTransform(p, [0.2, 0.26], [0, 1])
  const centerDraw = useTransform(p, [0.28, 0.4], [0, 1])
  return (
    <motion.g style={{ opacity }} fill="none">
      <motion.path
        style={{ pathLength: draw }}
        d={`M470 ${GROUND + 130} L672 470 L768 470 L970 ${GROUND + 130}`}
        stroke="var(--steel)"
        strokeWidth="1.6"
      />
      <motion.line
        style={{ pathLength: centerDraw }}
        x1="720"
        y1={GROUND + 130}
        x2="720"
        y2="470"
        stroke="var(--accent)"
        strokeWidth="2"
        strokeDasharray="10 12"
      />
    </motion.g>
  )
}

function Wall({ p }: { p: MotionValue<number> }) {
  const draw = useTransform(p, [0.32, 0.46], [0, 1])
  const opacity = useTransform(p, [0.32, 0.37], [0, 1])
  const hatch = useTransform(p, [0.4, 0.48], [0, 0.5])
  return (
    <motion.g style={{ opacity }} fill="none" stroke="var(--steel)">
      <motion.path
        style={{ pathLength: draw }}
        strokeWidth="1.6"
        d={`M150 ${GROUND} L150 560 L250 560 L250 540 L360 540 L360 560 L440 560 L440 ${GROUND}`}
      />
      <motion.g style={{ opacity: hatch }} strokeWidth="0.8">
        {Array.from({ length: 7 }).map((_, i) => (
          <line key={i} x1={165 + i * 40} y1={GROUND} x2={150 + i * 40} y2={568} />
        ))}
      </motion.g>
    </motion.g>
  )
}

function SolarArray({ p }: { p: MotionValue<number> }) {
  const opacity = useTransform(p, [0.46, 0.56], [0, 1])
  const y = useTransform(p, [0.46, 0.58], [50, 0])
  const panels = [1030, 1140, 1250]
  return (
    <motion.g style={{ opacity, y }} stroke="var(--solar)" strokeWidth="1.4" fill="var(--solar)" fillOpacity="0.14">
      {panels.map((x) => (
        <g key={x}>
          {/* panel */}
          <path d={`M${x} 566 L${x + 78} 542 L${x + 78} 588 L${x} 612 Z`} />
          {/* grid lines */}
          <line x1={x + 26} y1="558" x2={x + 26} y2="604" stroke="var(--solar)" strokeWidth="0.7" fill="none" />
          <line x1={x + 52} y1="550" x2={x + 52} y2="596" stroke="var(--solar)" strokeWidth="0.7" fill="none" />
          {/* leg */}
          <line x1={x + 39} y1="597" x2={x + 39} y2={GROUND} stroke="var(--steel)" strokeWidth="1.2" fill="none" />
        </g>
      ))}
    </motion.g>
  )
}

function Sun({ p }: { p: MotionValue<number> }) {
  const y = useTransform(p, [0.46, 0.72], [GROUND - 20, 210])
  const opacity = useTransform(p, [0.46, 0.56, 0.9], [0, 0.9, 0.7])
  const scale = useTransform(p, [0.46, 0.72], [0.6, 1])
  return (
    <motion.g style={{ opacity }}>
      <motion.circle cx="1180" style={{ y, scale }} r="42" fill="var(--glow)" fillOpacity="0.9" stroke="var(--accent)" strokeWidth="1" />
    </motion.g>
  )
}

function Lights({ p }: { p: MotionValue<number> }) {
  const opacity = useTransform(p, [0.56, 0.66], [0, 1])
  const xs = [360, 520, 900, 1060]
  return (
    <motion.g style={{ opacity }}>
      {xs.map((x) => (
        <g key={x}>
          <line x1={x} y1={GROUND} x2={x} y2={GROUND - 70} stroke="var(--steel)" strokeWidth="1.2" />
          <circle cx={x} cy={GROUND - 74} r="6" fill="var(--glow)" />
          <circle cx={x} cy={GROUND - 74} r="14" fill="var(--glow)" fillOpacity="0.18" />
        </g>
      ))}
    </motion.g>
  )
}

function Trees({ p }: { p: MotionValue<number> }) {
  const opacity = useTransform(p, [0.66, 0.74], [0, 1])
  const scale = useTransform(p, [0.66, 0.8], [0, 1])
  const trees = [
    { x: 470, s: 1 },
    { x: 980, s: 1.15 },
    { x: 250, s: 0.85 },
    { x: 1360, s: 1.1 },
  ]
  return (
    <motion.g style={{ opacity }} stroke="var(--leaf)" strokeWidth="1.4" fill="var(--leaf)" fillOpacity="0.12">
      {trees.map((t) => (
        <motion.g key={t.x} style={{ scale, originX: `${t.x}px`, originY: `${GROUND}px` }}>
          <line x1={t.x} y1={GROUND} x2={t.x} y2={GROUND - 44 * t.s} stroke="var(--steel)" strokeWidth="1.4" fill="none" />
          <circle cx={t.x} cy={GROUND - 60 * t.s} r={26 * t.s} />
          <circle cx={t.x - 16 * t.s} cy={GROUND - 44 * t.s} r={18 * t.s} />
          <circle cx={t.x + 16 * t.s} cy={GROUND - 44 * t.s} r={18 * t.s} />
        </motion.g>
      ))}
    </motion.g>
  )
}

function City({ p }: { p: MotionValue<number> }) {
  const opacity = useTransform(p, [0.72, 0.8], [0, 1])
  const scaleY = useTransform(p, [0.72, 0.9], [0, 1])
  const buildings = [
    { x: 600, w: 46, h: 150 },
    { x: 652, w: 40, h: 220 },
    { x: 698, w: 52, h: 180 },
    { x: 756, w: 44, h: 260 },
    { x: 806, w: 48, h: 200 },
    { x: 860, w: 38, h: 160 },
  ]
  return (
    <motion.g style={{ opacity }} stroke="var(--steel)" strokeWidth="1.3" fill="none">
      {buildings.map((b) => (
        <motion.rect
          key={b.x}
          x={b.x}
          width={b.w}
          height={b.h}
          y={GROUND - b.h}
          style={{ scaleY, originY: `${GROUND}px` }}
        />
      ))}
    </motion.g>
  )
}
