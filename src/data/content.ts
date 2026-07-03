/* ═══════════════════════════════════════════════════════════
   CONTENT — single source of truth.
   Copy is drawn from the company brief (Sichon Engineering
   Company.pdf) and kept faithful to its wording and ordering.
   ═══════════════════════════════════════════════════════════ */

export const company = {
  name: 'Sichon Engineering Company',
  short: 'Sichon',
  tagline: 'Build the Nation',
  taglineSw: 'Jenga Taifa',
  location: 'Nairobi, Kenya',
  coords: '01°17′S · 36°49′E',
  founded: '2026',
  email: 'croptoo@gmail.com',
  phone: '+254 718 223 111',
  phoneHref: '+254718223111',
} as const

/**
 * The infrastructure gap, in real, cited figures — the "before photo".
 * Each maps to a Sichon service. Sources current as of July 2026.
 */
export type GapStat = {
  figure: string
  label: string
  detail: string
  source: string
  answer: string
}

export const gap: GapStat[] = [
  {
    figure: '84.9%',
    label: 'of Kenya’s roads are unpaved',
    detail: '140,099 of 164,967 km remain earth or gravel. County roads are just 2.5% paved.',
    source: 'KNBS Economic Survey 2024',
    answer: 'Roads & Access Infrastructure',
  },
  {
    figure: '1 in 4',
    label: 'Kenyans live without electricity',
    detail: '76% had power by 2023, up from 37% a decade earlier. The last mile is the hardest.',
    source: 'World Bank · Our World in Data',
    answer: 'Clean Energy · Solar',
  },
  {
    figure: '2M+',
    label: 'housing units short — and growing',
    detail: 'A national deficit widening by roughly 200,000 homes every single year.',
    source: 'UN-Habitat · Vision 2030',
    answer: 'Built Environment',
  },
  {
    figure: '46.5%',
    label: 'of urban Kenyans live in informal settlements',
    detail: 'More than twice the global average — a call for drainage, walls, and dignified public space.',
    source: 'UN-Habitat',
    answer: 'Drainage & Public Space',
  },
]

/**
 * Selling the life, not the concrete. Taste as the product — a promise a
 * new firm can make from day one, before a single project is built.
 */
export const aspiration = {
  eyebrow: 'A matter of taste',
  heading: 'We don’t sell concrete. We sell the life it makes possible.',
  lede: 'Infrastructure is not the product. The product is the morning it makes ordinary — a lit road, a dry crossing, a powered home, a green square. Taste is not a luxury we add at the end. It is respect, made physical.',
  scenes: [
    {
      moment: 'The school run',
      line: 'A child crosses a lit, paved road in the rain — and arrives dry.',
      tag: 'Roads · Drainage',
    },
    {
      moment: 'The evening',
      line: 'A home glows on power it gathered from its own roof at noon.',
      tag: 'Clean Energy',
    },
    {
      moment: 'The commons',
      line: 'A green square where a neighbourhood remembers how to gather.',
      tag: 'Public Space · Trees',
    },
    {
      moment: 'The line',
      line: 'A wall holds the hillside — and looks like it always meant to.',
      tag: 'Retaining Walls',
    },
  ],
  close: 'A firm is not measured only by what it has built, but by the standard it refuses to lower. Ours is set on day one.',
}

export const manifesto = {
  eyebrow: 'Our Standard · Est. 2026',
  heading: 'We are new. That is the point.',
  body: [
    'Sichon Engineering was founded in 2026. We will not pretend to a portfolio we have not yet earned — because integrity is not a marketing line for us, it is the first thing we build.',
    'What we offer today is a standard: disciplined process, transparent budgeting, honest documentation, and safety that is never negotiated. We are open for briefs, and we intend to earn every project on performance.',
  ],
  promise: [
    'Transparent budgeting & documentation',
    'Safety without compromise',
    'Exactly what we promise — delivered',
  ],
}

export const brief = {
  // To enable inline submission, create a free key at https://web3forms.com
  // (bound to the email below) and paste it here. Until then, the form
  // gracefully falls back to composing an email to the address above.
  web3formsKey: 'REPLACE_WITH_WEB3FORMS_ACCESS_KEY',
  focusOptions: ['Built Environment', 'Clean Energy', 'Environmental Sustainability', 'Consulting', 'Not sure yet'],
}

export const nav = [
  { label: 'The Gap', href: '#gap' },
  { label: 'The Life', href: '#taste' },
  { label: 'Standard', href: '#standard' },
  { label: 'Services', href: '#services' },
  { label: 'Values', href: '#values' },
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
