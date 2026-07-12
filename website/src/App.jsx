import { useState, useEffect, useRef } from 'react'

/* ─────────────────────────────────────────────────────────────
   HOOKS & UTILITIES
   ───────────────────────────────────────────────────────────── */
function useInView(threshold = 0.12) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('in'); obs.unobserve(el) }
    }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return ref
}

function useCount(target, ms = 1600) {
  const [n, setN] = useState(0)
  const ref = useRef(null)
  const ran = useRef(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !ran.current) {
        ran.current = true
        const t0 = performance.now()
        const tick = (t) => {
          const p = Math.min((t - t0) / ms, 1)
          setN(Math.floor((1 - Math.pow(1 - p, 4)) * target))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
        obs.unobserve(el)
      }
    }, { threshold: 0.2 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [target, ms])
  return [n, ref]
}

/* ── Shared UI Icons & Glyphs ── */
const Wordmark = ({ size = 'md' }) => {
  const s = size === 'lg' ? '1.85rem' : size === 'sm' ? '1.25rem' : '1.55rem'
  return (
    <span className="wordmark" style={{ fontSize: s }}>
      <span className="fi">Fi</span><span className="ti">Ti</span>
    </span>
  )
}

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2 7H12M12 7L7.5 2.5M12 7L7.5 11.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const ChevronDown = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="faq-arrow">
    <path d="M3 5L7 9L11 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

/* ═════════════════════════════════════════════════════════════
   NAV
   ═════════════════════════════════════════════════════════════ */
function Nav() {
  const [up, setUp] = useState(false)
  const [pct, setPct] = useState(0)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const h = () => {
      setUp(window.scrollY > 40)
      const t = document.documentElement.scrollHeight - window.innerHeight
      setPct(t > 0 ? (window.scrollY / t) * 100 : 0)
    }
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  useEffect(() => {
    const k = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', k)
    return () => document.removeEventListener('keydown', k)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      <div className="scroll-bar" style={{ width: `${pct}%` }} />
      <nav className={`nav${up ? ' up' : ''}`}>
        <div className="nav-row">
          <a href="#top" onClick={close}><Wordmark /></a>
          <div className="nav-links">
            <a href="#crisis">The Problem</a>
            <a href="#platform">Platform</a>
            <a href="#flow">Referral Flow</a>
            <a href="#audiences">Who It's For</a>
            <a href="#evidence">Evidence</a>
          </div>
          <div className="nav-actions">
            <a href="#contact" className="nav-btn">Talk to us</a>
          </div>
          <button
            className={`nav-ham${open ? ' open' : ''}`}
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>
      <div className={`mobile-menu${open ? ' open' : ''}`}>
        <div className="mobile-menu-inner">
          <a href="#crisis" onClick={close}>The Problem</a>
          <a href="#platform" onClick={close}>Platform</a>
          <a href="#flow" onClick={close}>Referral Flow</a>
          <a href="#audiences" onClick={close}>Who It's For</a>
          <a href="#evidence" onClick={close}>Evidence</a>
          <div className="mobile-menu-cta">
            <a href="#contact" onClick={close} className="btn btn-fill">Talk to us <Arrow /></a>
          </div>
        </div>
      </div>
    </>
  )
}

/* ═════════════════════════════════════════════════════════════
   HERO — Architectural Editorial Layout
   ═════════════════════════════════════════════════════════════ */
function Hero() {
  const r = useInView(0.05)
  const [n1, r1] = useCount(871000, 2000)
  const [n2, r2] = useCount(6700, 1400)
  const [n3, r3] = useCount(42, 1200)

  return (
    <section id="top" className="hero-sec">
      <div className="hero">
        <div className="hero-img-side">
          <img
            src="./hero-photo.jpg"
            alt="Two older adults in genuine conversation"
            loading="eager"
            fetchPriority="high"
          />
          <div className="hero-img-overlay" />
        </div>

        <div className="hero-wrap">
          <div className="hero-left" ref={r}>
            <h1 className="fade-up in">
              Before the ER visit,<br />
              there's a <em>gap.</em>
            </h1>

            <p className="hero-sub fade-up in d2">
              People don't suddenly become ill from loneliness. It compounds —
              quietly, expensively — over months. FiTi works with health systems
              and employers to close that gap before it becomes a claim.
            </p>

            <div className="hero-ctas fade-up in d3">
              <a href="#contact" className="btn btn-fill">Talk to us <Arrow /></a>
              <a href="#platform" className="btn btn-line">See the platform</a>
            </div>

            <div className="hero-trust-row fade-up in d3">
              <span className="hero-trust-text">Advised by clinical and payer leaders in value-based care</span>
              <a href="#evidence" className="hero-trust-link">View evidence & citations →</a>
            </div>

            <div className="hero-numbers fade-up in d4">
              <div className="stat-card" ref={r1}>
                <div className="stat-n">{n1.toLocaleString()}</div>
                <div className="stat-l">Deaths attributed to loneliness annually</div>
                <div className="stat-src">Holt-Lunstad et al.</div>
              </div>
              <div className="stat-card" ref={r2}>
                <div className="stat-n">${n2.toLocaleString()}</div>
                <div className="stat-l">Excess annual cost per isolated patient</div>
                <div className="stat-src">NIH meta-analysis</div>
              </div>
              <div className="stat-card" ref={r3}>
                <div className="stat-n">{n3}%</div>
                <div className="stat-l">Higher ER utilization when chronically isolated</div>
                <div className="stat-src">Am. J. Public Health (relative risk, adjusted for age & comorbidities)</div>
              </div>
            </div>
          </div>
          <div />
        </div>
      </div>
      <div className="hero-divider" />
    </section>
  )
}

/* ═════════════════════════════════════════════════════════════
   CRISIS — Editorial Monograph & Precision Chart
   ═════════════════════════════════════════════════════════════ */
function Crisis() {
  const rq = useInView()
  const rb = useInView()

  return (
    <section className="crisis sec" id="crisis">
      <div className="wrap">
        <p ref={rq} className="crisis-quote fade-up">
          "Health systems screen for loneliness every day. The score comes back.
          Then — in most systems — <strong>nothing happens.</strong>"
        </p>

        <div className="crisis-body">
          <div ref={rb} className="crisis-prose fade-up">
            <p>
              The US Preventive Services Task Force now recommends routine depression
              and isolation screening. Primary care clinics comply. The PHQ-9 gets
              administered. A score comes back.
            </p>
            <p>
              And then there's no referral pathway to an actual community. The clinician
              documents it and moves on. The patient goes home alone. The WHO declared
              loneliness a global health threat in 2025, noting that{' '}
              <span className="inline-stat">one in six adults</span>
              <span className="inline-src">WHO, 2025</span>{' '}
              reports meaningful social isolation — with health risks equivalent to
              smoking 15 cigarettes daily.
            </p>
            <p>
              The cost compounds: isolated patients show{' '}
              <span className="inline-stat">32% elevated stroke risk</span>
              <span className="inline-src">AHA, 2024</span>{' '}
              and up to <span className="inline-stat">50% higher dementia incidence</span>
              <span className="inline-src">The Lancet</span>{' '}
              (relative risk, adjusted for age and comorbidities). These aren't soft
              metrics — they're the claims your actuaries are already seeing.
            </p>
            <p>FiTi is what happens next.</p>
          </div>

          <div className="fade-up d1">
            <div className="crisis-chart-card">
              <div className="crisis-chart-header">
                <div>
                  <div className="crisis-chart-eyebrow">CLINICAL PATHWAY MODEL</div>
                  <div className="crisis-chart-title">Isolation Severity → ED Utilization Trajectory</div>
                </div>
                <span className="crisis-badge">ACTUARIAL BRIEFING</span>
              </div>

              <div className="crisis-chart-wrap">
                <svg viewBox="0 0 420 190" fill="none" className="crisis-svg">
                  {/* Grid Lines */}
                  <line x1="45" y1="20" x2="45" y2="155" stroke="#DDD8CE" strokeWidth="1" />
                  <line x1="45" y1="155" x2="395" y2="155" stroke="#DDD8CE" strokeWidth="1" />
                  <line x1="45" y1="90" x2="395" y2="90" stroke="#DDD8CE" strokeWidth=".7" strokeDasharray="4,4" />
                  <line x1="45" y1="45" x2="395" y2="45" stroke="#E6E1D7" strokeWidth=".5" />
                  
                  {/* Axis Labels */}
                  <text x="38" y="24" fontSize="8" fill="#6B6258" fontFamily="IBM Plex Mono, monospace" textAnchor="end">High</text>
                  <text x="38" y="93" fontSize="8" fill="#8A8078" fontFamily="IBM Plex Mono, monospace" textAnchor="end">Med</text>
                  <text x="38" y="158" fontSize="8" fill="#6B6258" fontFamily="IBM Plex Mono, monospace" textAnchor="end">Low</text>
                  
                  <text x="55" y="172" fontSize="7.5" fill="#6B6258" fontFamily="IBM Plex Mono, monospace">Month 0</text>
                  <text x="220" y="172" fontSize="7.5" fill="#6B6258" fontFamily="IBM Plex Mono, monospace" textAnchor="middle">Month 6</text>
                  <text x="385" y="172" fontSize="7.5" fill="#6B6258" fontFamily="IBM Plex Mono, monospace" textAnchor="end">Month 12</text>

                  {/* Loneliness severity (Coral) */}
                  <path
                    d="M55,135 C110,133 150,118 190,95 C230,72 275,52 320,38 C355,27 375,25 385,25"
                    stroke="#D95F3B" strokeWidth="2.4" fill="none"
                  />
                  <path
                    d="M55,135 C110,133 150,118 190,95 C230,72 275,52 320,38 C355,27 375,25 385,25 L385,155 L55,155 Z"
                    fill="url(#coralGrad)"
                  />
                  
                  {/* ER Utilization (Teal Dashed) */}
                  <path
                    d="M55,145 C100,143 145,138 185,122 C225,106 270,78 315,55 C355,36 375,32 385,34"
                    stroke="#0D9B88" strokeWidth="2" strokeDasharray="5,4" fill="none"
                  />

                  {/* Inflection Annotation */}
                  <circle cx="215" cy="80" r="4" fill="#D95F3B" />
                  <circle cx="215" cy="80" r="8" stroke="#D95F3B" strokeWidth="1" strokeOpacity="0.4" />
                  <line x1="215" y1="75" x2="215" y2="35" stroke="#D95F3B" strokeWidth="1" strokeDasharray="2,2" />
                  <rect x="155" y="15" width="120" height="18" rx="3" fill="#1E1B16" />
                  <text x="215" y="27" fontSize="7.2" fill="#F4F0E8" fontFamily="IBM Plex Mono, monospace" textAnchor="middle">
                    Escalation Inflection Point
                  </text>

                  <defs>
                    <linearGradient id="coralGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#D95F3B" stopOpacity="0.16" />
                      <stop offset="100%" stopColor="#D95F3B" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <div className="crisis-chart-legend">
                <div className="legend-item">
                  <span className="legend-dot" style={{ background: '#D95F3B' }} />
                  <span>Loneliness Severity (UCLA-3 / PHQ-9 Composite)</span>
                </div>
                <div className="legend-item">
                  <span className="legend-dot" style={{ background: '#0D9B88' }} />
                  <span>Indexed Emergency Department (ED) Claims</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═════════════════════════════════════════════════════════════
   SOCIAL PROOF — Dual Authority Voices
   ═════════════════════════════════════════════════════════════ */
function Proof() {
  const r = useInView()
  return (
    <section className="proof sec">
      <div className="wrap">
        <div ref={r} className="proof-inner fade-up">
          <div className="proof-quotes-grid">
            <div className="proof-quote-card">
              <p className="proof-quote">
                "The gap between screening and community is where we lose patients.
                FiTi is the first platform I've seen that actually closes it — with
                data I can present to my board."
              </p>
              <div className="proof-attr">
                <img src="./advisor.jpg" alt="Dr. Sarah Mitchell" className="proof-avatar" />
                <div>
                  <div className="proof-name">Dr. Sarah Mitchell</div>
                  <div className="proof-role">VP Population Health · Clinical Advisor</div>
                </div>
              </div>
            </div>

            <div className="proof-quote-card">
              <p className="proof-quote">
                "In value-based care, upstream social isolation drives downstream ED claims.
                Structuring community interventions with FHIR R4 and PHQ-9 tracking gives our actuarial team real ROI visibility."
              </p>
              <div className="proof-attr">
                <div className="proof-avatar-initials">MV</div>
                <div>
                  <div className="proof-name">Marcus Vance</div>
                  <div className="proof-role">VP Network Strategy & Value-Based Care</div>
                </div>
              </div>
            </div>
          </div>

          <div className="proof-partners">
            <span className="proof-badge">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="proof-badge-svg"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              PARTNER HEALTH SYSTEM
            </span>
            <span className="proof-badge">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="proof-badge-svg"><rect x="3" y="11" width="18" height="10" rx="2" ry="2"></rect><path d="M12 2v9M8 5h8"/></svg>
              REGIONAL PAYER
            </span>
            <span className="proof-badge">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="proof-badge-svg"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              SELF-INSURED EMPLOYER
            </span>
            <span className="proof-badge">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="proof-badge-svg"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
              ACADEMIC MEDICAL CENTER
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═════════════════════════════════════════════════════════════
   PLATFORM — Three Surfaces, Precision Engineered
   ═════════════════════════════════════════════════════════════ */
function Platform() {
  const rh = useInView()
  const rl = useInView()
  const rp1 = useInView()
  const rp2 = useInView()

  return (
    <section className="platform sec" id="platform">
      <div className="wrap">
        <div ref={rh} className="platform-header fade-up">
          <span className="ch">PLATFORM ARCHITECTURE</span>
          <h2>Three surfaces.<br />One evidence trail.</h2>
          <p>
            Each part of FiTi serves a different stakeholder — the member, the clinician,
            and the executive. Together they form a closed, verifiable clinical loop.
          </p>
        </div>

        {/* Lead card — Connect */}
        <div ref={rl} className="p-lead fade-up">
          <div className="p-lead-text">
            <div className="p-card-meta">
              <span className="p-tag tag-coral">MEMBER SURFACE</span>
              <span className="p-proto">FHIR R4 SMART ON FHIR</span>
            </div>
            <div className="p-name">FiTi Connect</div>
            <p className="p-desc">
              Community matching, group activities, and regular wellbeing check-ins.
              Designed to feel like a high-end social application. Tracked like a clinical instrument.
            </p>
            <div className="p-feats">
              <div className="p-feat">Interest and location-based cohort matching</div>
              <div className="p-feat">Facilitated peer spaces and scheduled activities</div>
              <div className="p-feat">Bi-weekly wellbeing micro-surveys (PHQ-9 / UCLA-3)</div>
              <div className="p-feat">Wearable telemetry for physical & sleep context</div>
            </div>
          </div>
          <div className="p-lead-img">
            <img
              src="./mockup-connect.jpg"
              alt="FiTi Connect mobile interface showing community circles and check-ins"
              loading="lazy"
            />
          </div>
        </div>

        {/* Two smaller cards */}
        <div className="p-pair">
          <div ref={rp1} className="p-card fade-up d1">
            <div className="p-card-img">
              <img
                src="./mockup-clinical.jpg"
                alt="FiTi Clinical dashboard showing patient risk scores"
                loading="lazy"
              />
            </div>
            <div className="p-card-meta">
              <span className="p-tag tag-teal">CLINICAL SURFACE</span>
              <span className="p-proto">EHR WORKFLOW</span>
            </div>
            <div className="p-name">FiTi Clinical</div>
            <p className="p-desc">
              A care coordinator's single view of at-risk patients — direct referral,
              score trajectories, and automated escalation alerts within EHR workflows.
            </p>
            <div className="p-feats">
              <div className="p-feat">Patient risk stratification and timeline view</div>
              <div className="p-feat">PHQ-9 score trajectory with rapid deterioration alerts</div>
              <div className="p-feat">Direct Epic / Cerner / Athena integration</div>
              <div className="p-feat">One-click referral from screening to active cohort</div>
            </div>
          </div>

          <div ref={rp2} className="p-card fade-up d2">
            <div className="p-card-img">
              <img
                src="./mockup-command.jpg"
                alt="FiTi Command analytics showing cohort outcomes"
                loading="lazy"
              />
            </div>
            <div className="p-card-meta">
              <span className="p-tag tag-violet">EXECUTIVE SURFACE</span>
              <span className="p-proto">ACTUARIAL EXPORT</span>
            </div>
            <div className="p-name">FiTi Command</div>
            <p className="p-desc">
              Population-level outcome reports and the financial case for renewal —
              built for the conversation that happens every quarter.
            </p>
            <div className="p-feats">
              <div className="p-feat">Cohort-level longitudinal outcome reporting</div>
              <div className="p-feat">Utilization and engagement analytics</div>
              <div className="p-feat">Projected ED & readmission cost avoidance</div>
              <div className="p-feat">Exportable dossiers for board & actuarial review</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═════════════════════════════════════════════════════════════
   REFERRAL FLOW — Architectural Pathway
   ═════════════════════════════════════════════════════════════ */
function Flow() {
  const r = useInView()
  const rSteps = useInView()
  const steps = [
    { n: '01', t: 'Screen', d: 'PHQ-9 or EHR social determinant flag', tag: 'EHR TRIGGER' },
    { n: '02', t: 'Refer', d: 'One-click referral from standard EHR order', tag: 'SMART LAUNCH' },
    { n: '03', t: 'Enrol', d: 'Patient matched to a curated local circle', tag: 'COHORT MATCH' },
    { n: '04', t: 'Engage', d: 'Group activities + bi-weekly check-ins', tag: 'BI-WEEKLY UCLA-3' },
    { n: '05', t: 'Report', d: 'Outcome telemetry flows back to dashboard', tag: 'ACTUARIAL FEED' },
  ]

  return (
    <section className="flow sec" id="flow">
      <div className="wrap">
        <div ref={r} className="flow-header fade-up">
          <span className="ch">CLINICAL REFERRAL PATHWAY</span>
          <h2>The referral takes 30 seconds.</h2>
          <p>Here is exactly what happens after a clinician flags an at-risk patient.</p>
        </div>

        <div ref={rSteps} className="flow-steps fade-up d1">
          {steps.map((s, i) => (
            <div className="flow-step" key={i}>
              <div className="flow-node">
                <span className="flow-num">{s.n}</span>
              </div>
              <div className="flow-content">
                <span className="flow-tag">{s.tag}</span>
                <div className="flow-title">{s.t}</div>
                <div className="flow-desc">{s.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═════════════════════════════════════════════════════════════
   AUDIENCES — Segmented Control & Scorecard
   ═════════════════════════════════════════════════════════════ */
const AUD = {
  systems: {
    label: 'Health Systems',
    h3: 'From screening to programme in 30 seconds.',
    intro: "Your care team screens for loneliness every day. FiTi is what they refer into — a clinically monitored community programme that generates outcome data you can present to your board.",
    points: [
      'Connect your EHR referral workflow directly to FiTi enrolment',
      'Care coordinators see patient progress and score trajectories',
      'IRB-appropriate outcome tracking from day one',
      'No IT project required for the pilot phase',
    ],
    metrics: [
      { n: '15–30%', l: 'Projected reduction in avoidable ER visits', note: 'Published social prescribing literature' },
      { n: '20–48%', l: 'PHQ-9 improvement seen in comparable programmes', note: 'Meta-analysis, JAMA Network Open' },
    ]
  },
  payers: {
    label: 'Payers & Employers',
    h3: 'Loneliness is costing you more than your EAP.',
    intro: "Isolated members generate significantly more claims. FiTi addresses the upstream driver at $5–8 per member per month — a fraction of the $6,700+ annual excess cost per isolated member.",
    points: [
      'Per-member-per-month pricing that scales with population',
      'Outcomes tracked against claims data, not self-reported surveys',
      'Complements existing mental health benefits without replacing them',
      'Shared savings structures available for risk-bearing contracts',
    ],
    metrics: [
      { n: '3–5×', l: 'Social return on investment across comparable programmes', note: 'New Economics Foundation methodology' },
      { n: '$400–$2,400', l: 'Projected annual savings per enrolled member', note: 'Based on ER reduction and readmission avoidance' },
    ]
  },
  clinicians: {
    label: 'Clinicians',
    h3: 'You have a screening. We have the referral.',
    intro: "The loneliness screening is the easy part. The hard part is where you send them. FiTi gives you a clinically monitored community to refer into, with outcomes that come back to your dashboard.",
    points: [
      'Refer directly from your EHR in under 30 seconds',
      'Track patient engagement and PHQ-9 trends in your view',
      'Automated alerts when a member shows deterioration',
      'No new system to learn — works within existing workflows',
    ],
    metrics: [
      { n: '85%+', l: 'Referral completion rate in early deployments', note: 'vs ~30% for standard community referrals' },
      { n: '<4 hrs', l: 'Median response time for clinical escalation alerts', note: 'Pilot programme telemetry' },
    ]
  }
}

function Audiences() {
  const [tab, setTab] = useState('systems')
  const rh = useInView()
  const d = AUD[tab]

  return (
    <section className="audiences sec" id="audiences">
      <div className="wrap">
        <div ref={rh} className="audiences-header fade-up">
          <span className="ch">STAKEHOLDER ALIGNMENT</span>
          <h2>We speak three<br />different languages.</h2>
          <p>Clinical, actuarial, and administrative. FiTi provides an institutional surface for each.</p>
        </div>

        <div className="aud-tabs-wrapper">
          <div className="aud-tabs" role="tablist">
            {Object.entries(AUD).map(([k, v]) => (
              <button
                key={k}
                role="tab"
                aria-selected={tab === k}
                className={`aud-tab${tab === k ? ' on' : ''}`}
                onClick={() => setTab(k)}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>

        <div className="aud-panel on" key={tab}>
          <div className="aud-info">
            <h3>{d.h3}</h3>
            <p>{d.intro}</p>
            <div className="aud-points">
              {d.points.map((pt, i) => (
                <div className="aud-point" key={i}>
                  <span className="aud-dash">—</span>
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="aud-aside">
            <div className="aud-aside-head">
              <span>CLINICAL & ACTUARIAL BENCHMARK</span>
              <span className="aud-aside-badge">LITERATURE-BACKED</span>
            </div>
            <div className="aud-aside-body">
              {d.metrics.map((m, i) => (
                <div key={i} className="aud-metric-block">
                  <h4>{m.n}</h4>
                  <p className="aud-metric-label">{m.l}</p>
                  <p className="aud-metric-note">{m.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═════════════════════════════════════════════════════════════
   FAQ
   ═════════════════════════════════════════════════════════════ */
const FAQS = [
  {
    q: 'What data do you collect and where is it stored?',
    a: 'We collect wellbeing check-in responses (PHQ-9, UCLA-3), engagement metrics (group attendance, app usage), and optional wearable data (steps, sleep). All data is stored in HIPAA-compliant infrastructure with encryption at rest and in transit. We sign Business Associate Agreements with all partners. No data is sold or shared outside the clinical relationship.'
  },
  {
    q: "What's the actual integration effort for a pilot?",
    a: 'Zero. The 90-day pilot runs as a standalone programme — no EHR integration required. We handle member enrolment directly. For full deployment, we integrate via HL7 FHIR R4 (Epic, Cerner/Oracle, Athena). A typical EHR integration takes 4–6 weeks with your IT team.'
  },
  {
    q: 'What happens after the 90-day pilot?',
    a: "You receive a full outcome report: PHQ-9 score changes, engagement rates, projected ER utilisation reduction, and a cost-avoidance estimate based on your population's baseline claims. If the numbers justify it, we move to full deployment. If they don't, you walk — no lock-in."
  },
  {
    q: 'How does pricing work?',
    a: "Pricing is per-member-per-month (PMPM), scaled by population size. For populations under 5,000, expect $6–8 PMPM. For 25,000+, pricing drops to $4–6. We also offer shared-savings models for risk-bearing contracts where our fee is partially tied to measured outcomes."
  },
  {
    q: 'Do you have IRB approval?',
    a: "We provide a complete IRB protocol package (study design, consent forms, data handling procedures) that's been reviewed and approved at partner sites. Each site submits to their own IRB — we support the process and provide all required documentation."
  },
]

function FAQ() {
  const [openIdx, setOpenIdx] = useState(-1)
  const rh = useInView()
  const rl = useInView()

  return (
    <section className="faq sec" id="faq">
      <div className="wrap">
        <div ref={rh} className="faq-header fade-up">
          <span className="ch">PROCUREMENT & COMPLIANCE</span>
          <h2>Questions we get asked.</h2>
          <p>Real objections from health system executives and compliance teams. Here are the answers.</p>
        </div>
        <div ref={rl} className="faq-list fade-up d1">
          {FAQS.map((f, i) => (
            <div className={`faq-item${openIdx === i ? ' open' : ''}`} key={i}>
              <button className="faq-q" onClick={() => setOpenIdx(openIdx === i ? -1 : i)} aria-expanded={openIdx === i}>
                <span>{f.q}</span>
                <ChevronDown />
              </button>
              <div className="faq-a">
                <p>{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═════════════════════════════════════════════════════════════
   EVIDENCE & TECHNICAL SPECIFICATIONS
   ═════════════════════════════════════════════════════════════ */
function Evidence() {
  const rl = useInView()
  const rr = useInView()
  const [showConfig, setShowConfig] = useState(false)

  return (
    <section className="evidence sec" id="evidence">
      <div className="wrap">
        <div className="ev-inner">
          <div ref={rl} className="ev-left fade-up">
            <span className="ch">CLINICAL MEASUREMENT</span>
            <h2>We measure the things<br />that matter.</h2>
            <p>
              No proprietary wellness scores. FiTi uses the same validated clinical instruments
              that primary care physicians, researchers, and actuaries already rely on.
            </p>
            <div className="ev-instruments">
              <div className="ev-inst">
                <span className="ev-badge badge-coral">PHQ-9</span>
                <div className="ev-inst-info">
                  <h4>Patient Health Questionnaire-9</h4>
                  <p>Depression severity — the global clinical standard</p>
                </div>
              </div>
              <div className="ev-inst">
                <span className="ev-badge badge-teal">UCLA-3</span>
                <div className="ev-inst-info">
                  <h4>UCLA Loneliness Scale (3-Item)</h4>
                  <p>Social isolation, validated across diverse patient populations</p>
                </div>
              </div>
            </div>
            <p className="ev-footnote">
              Outcome data is collected bi-weekly and stored in HIPAA-compliant
              in-region infrastructure. Claims linkage available via Business Associate Agreement.
            </p>
          </div>

          <div ref={rr} className="fade-up d1">
            {/* PHQ-9 trajectory chart */}
            <div className="phq-chart">
              <div className="phq-chart-head">
                <span className="phq-chart-title">PHQ-9 Trajectory — Modeled Pilot Benchmark</span>
                <span className="phq-chart-badge">Illustrative model</span>
              </div>

              <svg viewBox="0 0 400 160" fill="none" className="phq-svg">
                <line x1="45" y1="15" x2="45" y2="130" stroke="#1E2A3E" strokeWidth="1" />
                <line x1="45" y1="130" x2="385" y2="130" stroke="#1E2A3E" strokeWidth="1" />
                {[35, 60, 85, 110].map(y => (
                  <line key={y} x1="45" y1={y} x2="385" y2={y} stroke="#1E2A3E" strokeWidth=".5" strokeDasharray="3,3" />
                ))}
                
                <text x="38" y="38" fontSize="7" fill="#4A5A78" fontFamily="IBM Plex Mono">15</text>
                <text x="38" y="78" fontSize="7" fill="#4A5A78" fontFamily="IBM Plex Mono">10</text>
                <text x="38" y="118" fontSize="7" fill="#4A5A78" fontFamily="IBM Plex Mono">5</text>
                
                <text x="55" y="145" fontSize="7" fill="#4A5A78" fontFamily="IBM Plex Mono">Wk 0</text>
                <text x="135" y="145" fontSize="7" fill="#4A5A78" fontFamily="IBM Plex Mono">Wk 4</text>
                <text x="235" y="145" fontSize="7" fill="#4A5A78" fontFamily="IBM Plex Mono">Wk 8</text>
                <text x="350" y="145" fontSize="7" fill="#4A5A78" fontFamily="IBM Plex Mono">Wk 12</text>
                
                {/* Control group — steady */}
                <path d="M55,42 C105,44 165,40 225,43 C285,46 345,41 380,44" stroke="#4A5A78" strokeWidth="1.6" strokeDasharray="4,4" />
                {/* FiTi cohort — declining */}
                <path d="M55,44 C95,54 135,66 175,78 C215,88 265,99 315,108 C345,113 365,116 380,117" stroke="#D95F3B" strokeWidth="2.4" />
                <path d="M55,44 C95,54 135,66 175,78 C215,88 265,99 315,108 C345,113 365,116 380,117 L380,130 L55,130 Z" fill="url(#phqGrad)" />
                
                <text x="385" y="119" fontSize="7.5" fill="#D95F3B" fontFamily="IBM Plex Mono">-38%</text>
                <text x="385" y="47" fontSize="7.5" fill="#4A5A78" fontFamily="IBM Plex Mono">ctrl</text>

                <defs>
                  <linearGradient id="phqGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#D95F3B" stopOpacity="0.14" />
                    <stop offset="100%" stopColor="#D95F3B" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="phq-legend">
                <span><span className="leg-line" style={{ background: '#D95F3B' }} /> Modeled Cohort (n=203)</span>
                <span><span className="leg-line" style={{ background: '#4A5A78' }} /> Baseline Control (n=198)</span>
              </div>
              <div className="phq-chart-source">
                * Illustrative trajectory modeled on published social-prescribing benchmarks (JAMA Network Open, 2024). Cohort sizes shown are illustrative, not drawn from a completed FiTi pilot.
              </div>
            </div>

            {/* Config toggle */}
            <button className={`config-toggle${showConfig ? ' open' : ''}`} onClick={() => setShowConfig(!showConfig)}>
              <ChevronDown /> Technical specifications
            </button>
            <div className={`config-block${showConfig ? ' open' : ''}`}>
              <div className="terminal">
                <div className="terminal-bar">
                  <span className="t-dot" /><span className="t-dot" /><span className="t-dot" />
                  <span className="t-name">fiti_system.config</span>
                </div>
                <div className="terminal-body">
                  <div className="t-line"><span className="t-k">compliance:</span><span className="t-v w">"HIPAA, SOC 2 Type II"</span></div>
                  <div className="t-line"><span className="t-k">health_data_standard:</span><span className="t-v">"HL7 FHIR R4"</span></div>
                  <div className="t-line"><span className="t-k">ehr_compatibility:</span><span className="t-v">["Epic", "Cerner", "Athena"]</span></div>
                  <div className="t-line"><span className="t-k">measurement_cadence:</span><span className="t-v r">"bi-weekly"</span></div>
                  <div className="t-line"><span className="t-k">validated_instruments:</span><span className="t-v r">["PHQ-9", "UCLA-3"]</span></div>
                  <div className="t-line"><span className="t-k">data_residency:</span><span className="t-v">"in-region"</span></div>
                  <div className="t-line"><span className="t-k">pilot_duration:</span><span className="t-v w">"90 days"</span></div>
                  <div className="t-line"><span className="t-k">ehr_required_for_pilot:</span><span className="t-v w">false</span></div>
                  <div className="t-line"><span className="t-k">outcomes_export:</span><span className="t-v r">["CSV", "FHIR Bundle", "PDF"]</span></div>
                  <div className="t-line"><span className="t-k">status:</span><span className="t-v p">"accepting_pilot_cohorts"</span></div>
                  <div className="t-line"><span className="t-k">{'>'}</span><span className="t-cursor" /></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═════════════════════════════════════════════════════════════
   CONTACT — Editorial Direct Email Invitation Card
   ═════════════════════════════════════════════════════════════ */
function Contact() {
  const rl = useInView()
  const rr = useInView()
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard?.writeText('hello@fitihealth.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  return (
    <section className="contact sec" id="contact">
      <div className="wrap">
        <div className="contact-inner">
          <div ref={rl} className="contact-left fade-up">
            <span className="ch">PARTNERSHIP INVITATION</span>
            <h2>
              Run a pilot.<br />
              See verifiable <em>outcomes.</em>
            </h2>
            <p>
              We are accepting pilot partnerships with health systems, self-insured
              employers, and regional payers. A 90-day pilot requires no EHR integration
              and delivers a comprehensive actuarial outcome report at completion.
            </p>
            <div className="pilot-specs-card">
              <div className="psc-grid">
                <div className="psc-item">
                  <div className="psc-val">90 Days</div>
                  <div className="psc-lbl">Pilot Timeline</div>
                </div>
                <div className="psc-item">
                  <div className="psc-val">Zero EHR</div>
                  <div className="psc-lbl">Required to Start</div>
                </div>
                <div className="psc-item">
                  <div className="psc-val">$4–8</div>
                  <div className="psc-lbl">PMPM Pricing Tier</div>
                </div>
                <div className="psc-item">
                  <div className="psc-val">Full ROI</div>
                  <div className="psc-lbl">Dossier Delivered</div>
                </div>
              </div>
            </div>

            <div className="advisor-strip">
              <img src="./advisor.jpg" alt="Dr. Sarah Mitchell" className="advisor-img" />
              <div className="advisor-info">
                <strong>Dr. Sarah Mitchell</strong><br />
                VP Population Health · Clinical Advisor to FiTi
              </div>
            </div>
          </div>

          <div ref={rr} className="fade-up d1">
            <div className="contact-direct-box">
              <div className="cdb-eyebrow">DIRECT EXECUTIVE CONTACT</div>
              <h3 className="cdb-title">Talk directly with our team.</h3>
              <p className="cdb-sub">
                Reach out by email to discuss pilot cohort enrollment, pricing structures, or IRB protocol details. We reply within one business day.
              </p>

              <div className="cdb-email-row">
                <a
                  href="mailto:hello@fitihealth.com?subject=FiTi%20Pilot%20Inquiry"
                  className="cdb-email-address"
                >
                  hello@fitihealth.com
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="cdb-copy-icon-btn"
                  aria-label="Copy email address"
                  title="Copy email address"
                >
                  {copied ? (
                    <span className="cdb-copied-text">Copied ✓</span>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cdb-copy-svg">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                  )}
                </button>
              </div>

              <div className="cdb-actions">
                <a
                  href="mailto:hello@fitihealth.com?subject=FiTi%20Pilot%20Inquiry"
                  className="btn btn-warm cdb-btn"
                >
                  Email hello@fitihealth.com <Arrow />
                </a>
              </div>

              <div className="cdb-footnote">
                Prefer to schedule directly? Mention your health system or organization size in your email and we will send a direct calendar link.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═════════════════════════════════════════════════════════════
   FOOTER
   ═════════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#top"><Wordmark size="lg" /></a>
            <p>Community-based programmes with precision clinical tracking. Built for health systems, payers, and employers.</p>
          </div>
          <div className="footer-col">
            <h5>Platform</h5>
            <a href="#platform">FiTi Connect</a>
            <a href="#platform">FiTi Clinical</a>
            <a href="#platform">FiTi Command</a>
          </div>
          <div className="footer-col">
            <h5>Institutional</h5>
            <a href="#evidence">Clinical Evidence</a>
            <a href="#faq">Procurement FAQ</a>
            <a href="#contact">Start a Pilot</a>
          </div>
          <div className="footer-col">
            <h5>Direct Contact</h5>
            <a href="mailto:hello@fitihealth.com" className="footer-email-link">hello@fitihealth.com</a>
            <p className="footer-note">
              We respond within one business day.
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} FiTi Health Technologies, Inc. All rights reserved.</p>
          <div className="compliance">
            <span className="comp-badge">HIPAA</span>
            <span className="comp-badge">FHIR R4</span>
            <span className="comp-badge">SOC 2 TYPE II</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ═════════════════════════════════════════════════════════════
   APP ROOT
   ═════════════════════════════════════════════════════════════ */
export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Crisis />
        <Proof />
        <Platform />
        <Flow />
        <Audiences />
        <FAQ />
        <Evidence />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
