/* ═══════════════════════════════════════════════════════════
   CONTENT — single source of truth.
   Copy is drawn from the company brief (Sichon Engineering
   Company.pdf) and kept faithful to its wording and ordering.
   ═══════════════════════════════════════════════════════════ */

export const company = {
  name: 'Sichon Engineering Company',
  short: 'Sichon',
  tagline: 'Build the Nation',
  location: 'Nairobi, Kenya',
  founded: '2026',
  email: 'croptoo@gmail.com',
  phone: '+254 718 223 111',
  phoneHref: '+254718223111',
} as const

export const nav = [
  { label: 'Mission', href: '#mission' },
  { label: 'Services', href: '#services' },
  { label: 'Values', href: '#values' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
] as const

export const hero = {
  kicker: 'Engineering firm · Est. 2026 · Nairobi',
  line1: 'Building the nation,',
  line2: 'responsibly.',
  statement:
    'Engineering is not merely a technical profession — it is a civic responsibility. Sichon Engineering Company was formed to address Kenya’s measurable infrastructure gap.',
  method: ['Identify real gaps', 'Design viable solutions', 'Execute responsibly', 'Build trust through performance'],
}

export const mission = {
  quote:
    'We identify real gaps, design viable solutions, execute responsibly, and build trust through performance.',
  paragraphs: [
    'Technology is a defining feature of the 21st Century. Nations that harness it thrive; those that neglect it stagnate. Across Kenya, there remains a measurable technological and infrastructure gap — visible in transportation inefficiencies, unreliable energy systems, inadequate drainage, unsafe pedestrian infrastructure, and poorly maintained public spaces.',
    'Engineering is the discipline most directly responsible for confronting and correcting these deficiencies. Our team was formed to address practical infrastructure and technological shortcomings through structured, disciplined work — providing reliable solutions that improve safety, efficiency, and sustainability.',
  ],
  stats: [
    { value: '04', label: 'Service areas' },
    { value: '05', label: 'Core values' },
    { value: '2026', label: 'Founded' },
    { value: '100%', label: 'Commitment' },
  ],
}

export type Service = {
  id: string
  index: string
  title: string
  summary: string
  items: string[]
}

export const services: Service[] = [
  {
    id: 'built-environment',
    index: '01',
    title: 'Built Environment',
    summary:
      'The built environment should balance functionality, sustainability, and aesthetic value. We deliver practical, cost-effective, and durable solutions tailored to local contexts and global standards.',
    items: [
      'Drawing & Design',
      'Fencing & Retaining Walls',
      'Football Fields & Playgrounds',
      'Roads & Access Infrastructure',
      'Integrated Drainage Systems',
    ],
  },
  {
    id: 'energy',
    index: '02',
    title: 'Clean Energy',
    summary:
      'Clean, affordable energy. We advance solar systems designed for residential, commercial, and institutional needs — supporting reliable, affordable, sustainable energy access and the transition toward low-carbon development.',
    items: ['Solar Design & Implementation', 'Residential Systems', 'Commercial & Institutional', 'Low-carbon Development'],
  },
  {
    id: 'environment',
    index: '03',
    title: 'Environmental Sustainability',
    summary:
      'As we shape our environment, it is incumbent upon us to ensure our impact is positive and lasting. We enhance the natural landscape so future generations inherit a stronger foundation for growth.',
    items: ['Tree Planting', 'Native & Indigenous Species Selection', 'Biodiversity & Ecological Balance', 'Long-term Sustainability'],
  },
  {
    id: 'consulting',
    index: '04',
    title: 'Consulting',
    summary:
      'Good advice saves time and money, and builds trust. We provide strategic engineering counsel grounded in genuine field expertise — from feasibility through delivery.',
    items: ['Project Feasibility', 'Regulatory Compliance', 'Strategic Planning', 'Technical Advisory'],
  },
]

export type Value = { index: string; title: string; body: string }

export const values: Value[] = [
  {
    index: '01',
    title: 'Safety',
    body: 'Safety is the first measure of engineering success. No compromise is acceptable where human life is concerned.',
  },
  {
    index: '02',
    title: 'Competence',
    body: 'Excellence requires technical skill, coordination, leadership, and disciplined resource management.',
  },
  {
    index: '03',
    title: 'Integrity',
    body: 'Transparency in budgeting, documentation, and communication is foundational. Integrity is embedded in our process.',
  },
  {
    index: '04',
    title: 'Respect',
    body: 'We design with community needs, environmental responsibility, and professional fairness in mind.',
  },
  {
    index: '05',
    title: 'Aesthetics',
    body: 'Function and beauty can coexist. Good engineering enhances both utility and visual harmony.',
  },
]

export type Step = { index: string; title: string; body: string }

export const process: Step[] = [
  {
    index: '01',
    title: 'Identify the Gap',
    body: 'We start by understanding the real problem — site assessment, stakeholder consultation, and analysis to define scope accurately before a single line is drawn.',
  },
  {
    index: '02',
    title: 'Design with Rigour',
    body: 'High-quality drawings are the foundation of resilient structures. We optimise cost, material use, and structural performance before construction begins.',
  },
  {
    index: '03',
    title: 'Execute Responsibly',
    body: 'Every project ships with clear documentation, transparent budgeting, and regular reporting. Safety, compliance, and community respect are non-negotiable.',
  },
]
