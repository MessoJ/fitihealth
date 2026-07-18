import { useState, useEffect, useRef } from 'react'
import './index.css'

/* ═══════════════════════════════════════════════════════════════════════════
   HOOKS
   ═══════════════════════════════════════════════════════════════════════════ */
function useInView(opts = { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }) {
  const ref = useRef(null)
  const [v, setV] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setV(true); obs.disconnect() }
    }, opts)
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return [ref, v]
}

/* ═══════════════════════════════════════════════════════════════════════════
   NAV — CLEAN, UNIQUE IDENTITY LOCKUP
   ═══════════════════════════════════════════════════════════════════════════ */
function Nav() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const h = () => setSolid(window.scrollY > 8)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])
  const LINKS = [
    ['#evidence', 'The Gap & Evidence'],
    ['#platform', 'How It Works'],
    ['#security', 'Clinical & Privacy'],
    ['#interface', 'Two Surfaces'],
    ['#modeler', 'Pilot Modeler'],
    ['#audiences', 'For Partners'],
  ]
  return (
    <nav className={`nav${solid ? ' nav--solid' : ''}`}>
      <div className="nav-inner wrap">
        <a href="#" className="nav-brand-lockup" aria-label="FiTi home">
          <div className="nav-wordmark">
            <span className="logo-fi">Fi</span>
            <span className="logo-ti">Ti</span>
            <span className="logo-dot" />
          </div>
          <span className="nav-tagline-micro">CLINICAL SOCIAL HEALTH</span>
        </a>
        <div className="nav-links">
          {LINKS.map(([h, l]) => <a href={h} key={h}>{l}</a>)}
        </div>
        <a href="#contact" className="nav-cta" id="nav-pilot-cta">Request pilot access</a>
        <button className="nav-burger" onClick={() => setOpen(o => !o)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </div>
      {open && (
        <div className="nav-mobile">
          {LINKS.map(([h, l]) => <a href={h} key={h} onClick={() => setOpen(false)}>{l}</a>)}
          <a href="#contact" className="nav-mobile-cta" onClick={() => setOpen(false)}>Request pilot access →</a>
        </div>
      )}
    </nav>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   HERO — CLEAR CLINICAL SOCIAL HEALTH POSITIONING + MULTI-PHOTO COLLAGE
   ═══════════════════════════════════════════════════════════════════════════ */
function Hero() {
  const STATS = [
    { n: '871,000', u: 'deaths/yr', l: 'attributed to social isolation globally', s: 'WHO Commission on Social Connection, 2025' },
    { n: '$2–25B', u: 'excess spend', l: 'annual global healthcare cost burden', s: 'Systematic reviews, older adult populations' },
    { n: '10×', u: 'more scalable', l: 'AI-matched group circles vs. 1:1 human visits', s: 'Software + community infrastructure model' },
  ]

  return (
    <section className="hero" id="home">
      <div className="hero-grid" />
      <div className="hero-glow" />
      <div className="hero-wrap wrap">
        <div className="hero-left">
          <div className="hero-eyebrow">
            <span className="h-pulse amber-pulse" />
            THE POPULATION-LEVEL SOCIAL HEALTH PLATFORM
          </div>
          <h1 className="hero-h1">
            Closing the gap between a <span className="h1-dim">loneliness screening</span> and real <span className="h1-serif">community support.</span>
          </h1>
          <p className="hero-body">
            Every health system screens for social isolation using PHQ-9 and UCLA-3 questionnaires. But what happens after a patient checks the box? Usually nothing—or expensive 1:1 home visits that don't scale. FiTi algorithmically matches isolated members into local community circles and tracks longitudinal clinical outcomes, turning social connection into measurable health data.
          </p>
          <div className="hero-ctas">
            <a href="#contact" className="h-cta-primary" id="hero-pilot-cta">Request 90-day pilot access</a>
            <a href="#evidence" className="h-cta-ghost">Explore clinical evidence ↓</a>
          </div>
          <div className="hero-stats-grid">
            {STATS.map((s, i) => (
              <div className="hstat" key={i}>
                <div className="hstat-n">{s.n} <span className="hstat-u">{s.u}</span></div>
                <div className="hstat-l">{s.l}</div>
                <div className="hstat-s">{s.s}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-collage">
            <div className="hero-photo-main-wrap">
              <img
                src="/hero_connect.png"
                alt="Care coordinator reviewing patient engagement data and community circle attendance"
                className="hero-photo-main"
                loading="eager"
              />
              <div className="hero-photo-badge">
                <span className="h-pulse amber-pulse" />
                CARE COORDINATOR VIEW · COHORT TRACKING
              </div>
              <div className="hero-card-floating">
                <div className="hcf-greeting">James R. · PHQ-9 Baseline: 14</div>
                <div className="hcf-score-row">
                  <span className="hcf-score">Wk 8</span>
                  <span className="hcf-label">Joined Riverside Walking Circle · PHQ-9: 9 (Δ −5)</span>
                </div>
              </div>
            </div>
            <div className="hero-sub-card">
              <img
                src="/morning_checkin.png"
                alt="Member checking in with a single bi-weekly question while having morning tea"
                className="hsc-photo"
                loading="eager"
              />
              <div className="hsc-content">
                <span className="hsc-tag">MEMBER APP · BI-WEEKLY CHECK-IN</span>
                <p className="hsc-quote">"How connected have you felt this week?" One question every two weeks + Apple Health step trends.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   EVIDENCE & THE GAP — REALITY OF INACTION & COMMUNITY CIRCLES
   ═══════════════════════════════════════════════════════════════════════════ */
function Evidence() {
  const [rh, hv] = useInView()
  const [rs, sv] = useInView()
  const [rc, cv] = useInView()
  const [rw, wv] = useInView()

  const CRISIS = [
    { n: '+42%', l: 'Higher emergency department visitation rate among isolated older adults', s: '67.8 vs 47.9 visits per 100 beneficiary-years (IRR = 1.15)' },
    { n: '+32%', l: 'Elevated stroke and cardiovascular disease risk with chronic isolation', s: 'American Heart Association, 2022 — Cené et al.' },
    { n: '+50%', l: 'Higher dementia incidence in socially isolated longitudinal cohorts', s: 'UK Biobank cohort analysis, HR ≈ 1.6, age-adjusted' },
    { n: '$1,600+', l: 'Conservative excess annual healthcare expenditure per isolated member', s: 'Baseline benchmark from systematic health economics reviews' },
  ]

  return (
    <section className="evidence sec" id="evidence">
      <div className="wrap">
        <div ref={rh} className={`sec-hdr snap${hv ? ' in' : ''}`}>
          <span className="sec-tag">01 · THE CLINICAL GAP</span>
          <h2>Screening without intervention<br />is where chronic disease compounds.</h2>
          <p>
            Healthcare systems have successfully standardized loneliness screening across primary care and intake workflows. Yet when a patient screens positive, the typical clinical response is a static handout or filing the score in the EHR. Inaction remains our primary competitor—and the highest cost driver.
          </p>
        </div>

        {/* Community Walk Photo Grid */}
        <div ref={rs} className={`story-feature-grid snap${sv ? ' in' : ''}`}>
          <div className="story-feature-img-wrap">
            <img
              src="/community_walk.png"
              alt="Community walking circle members connecting on a sunny park trail"
              className="story-feature-img"
              loading="lazy"
            />
          </div>
          <div className="story-feature-content">
            <span className="sfc-tag">THE FITI INTERVENTION</span>
            <h3 className="sfc-h3">AI-matched community circles that scale beyond 1:1 visits.</h3>
            <p className="sfc-body">
              While legacy models rely on expensive 1:1 human companionship visits that cost hundreds of dollars per session and face workforce constraints, FiTi algorithmically matches isolated members into sustained, small-group community circles based on geography, mobility, and shared interests.
            </p>
            <div className="sfc-stat-box">
              <span className="sfc-stat-n">Group vs 1:1</span>
              <span className="sfc-stat-l">Peer-to-peer social formation creates long-term resilience without requiring paid facilitators for every single interaction.</span>
            </div>
          </div>
        </div>

        <div ref={rc} className={`crisis-grid snap${cv ? ' in' : ''}`}>
          {CRISIS.map((c, i) => (
            <div className="crisis-stat" key={i}>
              <div className="cs-n">{c.n}</div>
              <div className="cs-l">{c.l}</div>
              <div className="cs-s">{c.s}</div>
            </div>
          ))}
        </div>

        <div ref={rw} className={`waveform-block snap${wv ? ' in' : ''}`}>
          <div className="waveform-eyebrow">LONGITUDINAL CLINICAL PATHWAY · PHQ-9 SCORE TRAJECTORY ACROSS 12-WEEK COHORT · MODELED ESTIMATES</div>
          <img
            src="/clinical_waveform.png"
            alt="Modeled PHQ-9 clinical outcome trajectory comparing FiTi community intervention against waitlist control"
            className="waveform-img"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   PLATFORM — HOW IT WORKS (HONEST, REALISTIC SIGNALS)
   ═══════════════════════════════════════════════════════════════════════════ */
function Platform() {
  const [rh, hv] = useInView()
  const [rg, gv] = useInView()

  const CONSUMER = [
    { label: 'Step Count Only', desc: 'Raw steps without context of outdoor mobility or isolation.' },
    { label: 'Unvalidated Check-ins', desc: 'Generic emoji mood pickers that cannot map to EHR clinical codes.' },
    { label: 'Solo Chatbots', desc: 'Replacing human interaction with AI conversational agents.' },
    { label: 'Static Directory Links', desc: 'Giving patients a PDF or URL of local food banks and community centers.' },
  ]

  const CLINICAL = [
    { label: 'AI Circle Matching', desc: 'Collaborative filtering based on zip code, schedule availability, mobility level, and shared affinities.' },
    { label: 'Bi-Weekly PHQ-9 / UCLA-3', desc: 'Validated clinical assessment instruments delivered via 30-second low-friction check-ins.' },
    { label: 'Apple Health / Google Fit Trends', desc: 'Privacy-preserving aggregate step and movement trends (`Δ days consecutive drop`) to flag acute withdrawal.' },
    { label: 'Care Coordinator Alerts', desc: 'Real-time notifications sent to the care team when circle attendance or mobility drops significantly.' },
  ]

  return (
    <section className="wedge sec" id="platform">
      <div className="wrap">
        <div ref={rh} className={`sec-hdr snap${hv ? ' in' : ''}`}>
          <span className="sec-tag">02 · HOW IT WORKS</span>
          <h2>Software infrastructure, not just services.<br />Built for clinical accountability.</h2>
          <p>
            Consumer wellness apps measure comfort metrics. Service-heavy human companionship models cannot scale to entire patient populations. FiTi combines intelligent circle formation with rigorous clinical measurement.
          </p>
        </div>
        <div ref={rg} className={`wedge-grid snap${gv ? ' in' : ''}`}>
          <div className="wedge-side dim-side">
            <div className="ws-hdr">
              <span className="ws-tag">THE STATUS QUO & CONSUMER APPS</span>
              <span className="ws-sub">Unstructured or unscalable</span>
            </div>
            {CONSUMER.map((m, i) => (
              <div className="wedge-row" key={i}>
                <div className="wr-label">{m.label}</div>
                <div className="wr-desc" style={{ marginTop: '0.25rem', color: '#8E8E93', fontSize: '0.85rem' }}>{m.desc}</div>
              </div>
            ))}
          </div>
          <div className="wedge-sep">
            <div className="wsep-line" />
            <div className="wsep-lbl">THE SHIFT</div>
            <div className="wsep-line" />
          </div>
          <div className="wedge-side lit-side">
            <div className="ws-hdr">
              <span className="ws-tag cobalt">THE FITI PLATFORM</span>
              <span className="ws-sub">Structured, scalable, clinically validated</span>
            </div>
            {CLINICAL.map((m, i) => (
              <div className="wedge-row active-row" key={i}>
                <div className="wr-label" style={{ color: '#F5F5F7' }}>{m.label}</div>
                <div className="wr-desc" style={{ marginTop: '0.25rem', color: '#C7C7CC', fontSize: '0.85rem' }}>{m.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECURITY & PRIVACY — REALISTIC HEALTHKIT/FIT + FHIR INTEGRATION
   ═══════════════════════════════════════════════════════════════════════════ */
function Security() {
  const [rh, hv] = useInView()
  const [rj, jv] = useInView()

  const LOG = [
    { p: 'SYS', m: 'FITI_CONNECT_APP v1.4.0  status=ONLINE', t: 'ok' },
    { p: 'DAT', m: 'apple_health_kit  sync=steps_daily_trend  status=OK', t: 'ok' },
    { p: 'EMA', m: 'biweekly_checkin  instrument=PHQ9_UCLA3  patient_id=4471', t: 'ok' },
    { p: 'ALT', m: 'mobility_trend_alert  score=consecutive_3day_drop  [NOTIFY_CARE_TEAM]', t: 'alt' },
    { p: 'NET', m: 'HL7_FHIR_R4_Observation  bundle_generated=TRUE', t: 'ok' },
    { p: 'SEC', m: 'PII_data_residency  region=us-east-1  encryption=AES256_GCM', t: 'ok' },
    { p: 'SYS', m: 'status=ACCEPTING_90DAY_PILOT_COHORTS', t: 'ok' },
  ]

  const FHIR = [
    { k: '"resourceType"', v: '"Observation"', t: 'str' },
    { k: '"id"', v: '"fiti-phq9-20260718-4471"', t: 'str' },
    { k: '"status"', v: '"final"', t: 'str' },
    { k: '"code"', v: '{ "system": "http://loinc.org", "code": "44261-6", "display": "PHQ-9 total score" }', t: 'obj' },
    { k: '"subject"', v: '"Patient/4471-pseudonymized"', t: 'str' },
    { k: '"effectiveDateTime"', v: '"2026-07-18T08:00:00Z"', t: 'str' },
    { k: '"valueInteger"', v: '9', t: 'num' },
    { k: '"interpretation"', v: '[{ "code": "M", "display": "Moderate depression improvement (Δ −5)" }]', t: 'obj' },
    { k: '"note"', v: '"Member joined Riverside Walking Circle. Attendance rate 85% across 8 weeks."', t: 'str' },
  ]

  return (
    <section className="moat sec" id="security">
      <div className="wrap">
        <div ref={rh} className={`sec-hdr snap${hv ? ' in' : ''}`}>
          <span className="sec-tag">03 · CLINICAL INTEGRATION & PRIVACY</span>
          <h2>HIPAA-ready architecture.<br />No invasive background tracking.</h2>
          <p>
            We never scrape call logs, raw GPS traces, or invasive device metrics. FiTi operates strictly on explicit bi-weekly check-ins and standard Apple Health / Google Fit step trends. For health systems, all outcomes export directly to standard HL7 FHIR R4 payloads.
          </p>
        </div>

        {/* Runtime Log */}
        <div className="runtime-log">
          <div className="rlog-hdr">
            <span className="rlog-title">FITI CLINICAL ENGINE · SYSTEM LOG</span>
            <span className="rlog-live"><span className="h-pulse cobalt-pulse" />READY</span>
          </div>
          <div className="rlog-body">
            {LOG.map((l, i) => (
              <div className={`rlog-line rlog-${l.t}`} key={i}>
                <span className="rlog-prefix">[{l.p}]</span>
                <span className="rlog-msg">{l.m}</span>
              </div>
            ))}
          </div>
          <div className="rlog-ftr">
            <span>PLATFORM: FLUTTER + NESTJS</span>
            <span>STANDARD: HL7 FHIR R4</span>
            <span>PILOT SETUP: 0 DAYS EHR BLOCKER</span>
            <span>COMPLIANCE: SOC2 TYPE II ROADMAP INITIATED</span>
            <span>EHR TARGET: EPIC SHOWROOM / CONNECTION HUB READY</span>
          </div>
        </div>

        {/* FHIR JSON */}
        <div ref={rj} className={`fhir-wrap snap${jv ? ' in' : ''}`} style={{ marginTop: '3rem' }}>
          <div className="fhir-eyebrow">HL7 FHIR R4 · OBSERVATION RESOURCE EXPORT</div>
          <div className="fhir-block">
            <div className="fhir-top">
              <span className="fhir-resource-id">Observation/fiti-phq9-20260718-4471</span>
              <span className="fhir-badge">CLINICAL EXPORT FORMAT</span>
            </div>
            <div className="fhir-code">
              <div className="fhir-brace">{'{'}</div>
              {FHIR.map((l, i) => (
                <div className="fhir-line" key={i}>
                  <span className="fhir-key">{l.k}</span>
                  <span className="fhir-colon">: </span>
                  <span className={`fhir-val ft-${l.t}`}>{l.v}</span>
                  {i < FHIR.length - 1 && <span className="fhir-comma">,</span>}
                </div>
              ))}
              <div className="fhir-brace">{'}'}</div>
            </div>
          </div>
          <div className="fhir-note">
            During Phase 1 pilots, care coordinators utilize a standalone secure web dashboard—requiring zero IT queue or EHR integration delays to launch. When ready for production rollout, FHIR R4 bundles connect directly to Epic Connection Hub, Cerner, or Athena APIs.
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   UI ICON SYSTEM (PURE INLINE SVG FOR SCALE & ZERO DEPENDENCY)
   ═══════════════════════════════════════════════════════════════════════════ */
function IconPhone({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  )
}

function IconDashboard({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="9" rx="1" />
      <rect x="14" y="3" width="7" height="5" rx="1" />
      <rect x="14" y="12" width="7" height="9" rx="1" />
      <rect x="3" y="16" width="7" height="5" rx="1" />
    </svg>
  )
}

function IconAI({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function IconChat({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

function IconActivity({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  )
}

function IconCheck({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}

function IconAlert({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  )
}

function IconPhoneCall({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

function IconCode({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  )
}

function IconUsers({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function IconShield({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   INTERFACE — TWO SURFACES (MEMBER APP + CARE COORDINATOR DASHBOARD)
   ═══════════════════════════════════════════════════════════════════════════ */
function Interface() {
  const [tab, setTab] = useState('member')
  const [rh, hv] = useInView()

  return (
    <section className="interface-sec sec" id="interface">
      <div className="wrap">
        <div ref={rh} className={`sec-hdr snap${hv ? ' in' : ''}`}>
          <span className="sec-tag">04 · TWO SURFACES & DUAL AI ENGINES</span>
          <h2>Dignity for the member.<br />Actionable data for the clinician.</h2>
          <p>
            The member experience feels supportive and engaging—powered by <strong>FiTi Match-AI™</strong> for peer chemistry. The care coordinator dashboard provides instant visibility into cohort engagement, risk flags, and PHQ-9 improvements—powered by <strong>FiTi Triage-AI™</strong>.
          </p>
        </div>

        {/* Care Connection Photo Banner */}
        <div className="story-feature-grid" style={{ marginBottom: '3.5rem' }}>
          <div className="story-feature-img-wrap">
            <img
              src="/care_connection.png"
              alt="Care coordinator having a warm, empathetic conversation with a community member"
              className="story-feature-img"
              loading="lazy"
            />
          </div>
          <div className="story-feature-content">
            <span className="sfc-tag" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <IconAI size={14} color="var(--amber)" /> HUMAN-IN-THE-LOOP + AI EARLY WARNING
            </span>
            <h3 className="sfc-h3">Empowering care coordinators right when it matters.</h3>
            <p className="sfc-body">
              When FiTi Triage-AI™ detects that a member has missed circle meetings or shows a sustained drop in Apple Health mobility trends, it alerts the care coordinator with a synthesized call script. Instead of generic check-ins, the care team reaches out with precision and warmth, bridging the gap before acute isolation leads to an ED visit.
            </p>
          </div>
        </div>

        <div className="if-tabs">
          <button
            id="tab-member"
            className={`if-tab${tab === 'member' ? ' if-tab--active-member' : ''}`}
            onClick={() => setTab('member')}
            style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            <IconPhone size={18} color={tab === 'member' ? 'var(--amber)' : 'var(--text-dark)'} />
            <span>FiTi Connect — Member Mobile App</span>
          </button>
          <button
            id="tab-clinician"
            className={`if-tab${tab === 'clinician' ? ' if-tab--active-system' : ''}`}
            onClick={() => setTab('clinician')}
            style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            <IconDashboard size={18} color={tab === 'clinician' ? '#82B1FF' : 'var(--text-dark)'} />
            <span>FiTi Clinical — Care Coordinator Web Dashboard</span>
          </button>
        </div>
        <div className="if-panel">
          {tab === 'member' ? <MemberPanel /> : <ClinicianPanel />}
        </div>
      </div>
    </section>
  )
}

function MemberPanel() {
  const [phq, setPhq] = useState(2)
  const [saved, setSaved] = useState(false)
  const [rsvp, setRsvp] = useState(false)
  const [activeTab, setActiveTab] = useState('checkin')
  const [persona, setPersona] = useState('James R.')
  const [chatReply, setChatReply] = useState(false)
  const [aiInviteSent, setAiInviteSent] = useState(false)

  const PERSONAS = {
    'James R.': {
      title: 'Active Senior · Week 8 in Circle',
      circle: 'Riverside Walking Circle',
      peers: 6,
      attendance: '85%',
      phqTrend: 'Baseline 14 → Now 9 (Δ −5 Moderate improvement)',
      steps: '5,420 avg steps/day (Stable)',
      aiMatch: '94% Match Score · Low friction peer chemistry',
      aiMatchFactors: 'Pace: 2.5 MPH · Morning Availability · Dog Owner · 1.2 mi radius',
      nextMeetup: 'Tomorrow · 10:00 am @ Park Entrance',
      messages: [
        { sender: 'Maria S. (Leader)', text: 'Looking forward to our morning walk by the river! Bringing herbal tea for everyone.', time: '9:15 am' },
        { sender: 'David K.', text: 'I will be at the north gate by 9:50 am.', time: '9:22 am' },
        { sender: 'Patricia M.', text: 'See you all tomorrow! My knees are feeling great this week.', time: '9:30 am' }
      ]
    },
    'Elena V.': {
      title: 'Post-Discharge · Week 4 in Circle',
      circle: 'Heart & Wellness Recovery Circle',
      peers: 8,
      attendance: '92%',
      phqTrend: 'Baseline 16 → Now 11 (Δ −5 Notable recovery)',
      steps: '3,100 avg steps/day (↑ 20% increase)',
      aiMatch: '96% Match Score · Post-discharge cardiac recovery peer group',
      aiMatchFactors: 'Pace: Gentle · Tuesday Check-ins · Shared discharge window',
      nextMeetup: 'Thursday · 2:00 pm @ Community Center Garden',
      messages: [
        { sender: 'Dr. Alistair (Facilitator)', text: 'Reminder: Gentle pacing is key. How is everyone feeling today?', time: '10:05 am' },
        { sender: 'Elena V. (You)', text: 'Feeling much steadier after our Tuesday check-in.', time: '10:12 am' }
      ]
    },
    'Marcus T.': {
      title: 'Remote Workforce · Week 6 in Circle',
      circle: 'Tech & Transit Morning Circle',
      peers: 10,
      attendance: '78%',
      phqTrend: 'Baseline 12 → Now 7 (Δ −5 Mild stress reduction)',
      steps: '6,800 avg steps/day (Active)',
      aiMatch: '91% Match Score · Downtown tech workers peer cluster',
      aiMatchFactors: 'Pace: Brisk · Noon Break Walks · Transit hub proximity',
      nextMeetup: 'Saturday · 9:00 am @ Downtown Coffee & Walk',
      messages: [
        { sender: 'Sam R.', text: 'Anyone up for a quick 20-min walking meeting break at noon?', time: '8:45 am' },
        { sender: 'Marcus T. (You)', text: 'Count me in, grabbing my sneakers now.', time: '8:47 am' }
      ]
    }
  }

  const pData = PERSONAS[persona]

  return (
    <div className="member-panel">
      <div className="mp-phone" style={{ position: 'relative' }}>
        <div className="mpp-statusbar">
          <span>9:41</span>
          <span style={{ fontSize: '0.65rem', background: 'rgba(224,138,62,0.2)', color: 'var(--amber)', padding: '2px 8px', borderRadius: '4px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <IconAI size={12} color="var(--amber)" /> {persona.split(' ')[0]}'s App
          </span>
          <span>●●● ▇▇</span>
        </div>
        <div className="mpp-body" style={{ minHeight: '480px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          
          {activeTab === 'checkin' && (
            <div>
              <div className="mpp-greeting">Good morning, {persona.split(' ')[0]}.</div>
              <div className="mpp-date">{pData.title}</div>
              
              <div className="mpp-score-block">
                <span className="mpp-score-n" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <IconActivity size={28} color="var(--amber)" /> {pData.attendance}
                </span>
                <span className="mpp-score-label">circle attendance rate</span>
              </div>

              {/* AI Group Chemistry Card */}
              <div style={{ background: '#1C1610', border: '1px solid rgba(224, 138, 62, 0.4)', borderRadius: '12px', padding: '0.9rem', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <span style={{ fontSize: '0.68rem', fontFamily: 'var(--mono)', color: 'var(--amber)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <IconAI size={13} color="var(--amber)" /> FITI MATCH-AI™ CHEMISTRY RADAR
                  </span>
                  <span style={{ background: 'var(--amber)', color: '#0A0806', fontSize: '0.65rem', fontWeight: 800, padding: '2px 6px', borderRadius: '4px' }}>
                    {pData.aiMatch.split(' ')[0]}
                  </span>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#F5F5F7', fontWeight: 600, marginBottom: '0.25rem' }}>
                  {pData.aiMatch}
                </div>
                <div style={{ fontSize: '0.72rem', color: '#C7C7CC', lineHeight: 1.3 }}>
                  Matched on: {pData.aiMatchFactors}
                </div>
              </div>

              <div className="mpp-ema-card">
                <div className="mpp-q" style={{ display: 'flex', gap: '6px', alignItems: 'flex-start' }}>
                  <IconCheck size={16} color="var(--amber)" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Bi-Weekly Check-in: Over the last 2 weeks, how often have you felt lonely or left out?</span>
                </div>
                <div className="mpp-scale-labels" style={{ marginTop: '0.75rem', marginBottom: '0.75rem', display: 'flex', gap: '0.4rem' }}>
                  <button onClick={() => { setPhq(0); setSaved(false) }} className={`mpp-btn ${phq === 0 ? 'active' : ''}`} style={{ flex: 1, padding: '0.45rem 0.4rem', borderRadius: '6px', background: phq === 0 ? '#E08A3E' : '#2C2C2E', border: 'none', color: '#fff', fontSize: '0.72rem', fontWeight: 600, cursor: 'pointer' }}>Hardly ever</button>
                  <button onClick={() => { setPhq(1); setSaved(false) }} className={`mpp-btn ${phq === 1 ? 'active' : ''}`} style={{ flex: 1, padding: '0.45rem 0.4rem', borderRadius: '6px', background: phq === 1 ? '#E08A3E' : '#2C2C2E', border: 'none', color: '#fff', fontSize: '0.72rem', fontWeight: 600, cursor: 'pointer' }}>Some of time</button>
                  <button onClick={() => { setPhq(2); setSaved(false) }} className={`mpp-btn ${phq === 2 ? 'active' : ''}`} style={{ flex: 1, padding: '0.45rem 0.4rem', borderRadius: '6px', background: phq === 2 ? '#E08A3E' : '#2C2C2E', border: 'none', color: '#fff', fontSize: '0.72rem', fontWeight: 600, cursor: 'pointer' }}>Often</button>
                </div>
                {!saved ? (
                  <button onClick={() => setSaved(true)} className="mpp-submit" style={{ width: '100%', marginTop: '0.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                    <span>Save check-in</span> →
                  </button>
                ) : (
                  <div style={{ background: 'rgba(52, 199, 89, 0.15)', border: '1px solid #34C759', borderRadius: '6px', padding: '0.5rem', textAlign: 'center', fontSize: '0.75rem', color: '#34C759', marginTop: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                    <IconCheck size={14} color="#34C759" /> Check-in saved securely. {pData.phqTrend}.
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'circle' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem', borderBottom: '1px solid #26201A', paddingBottom: '0.5rem' }}>
                <div>
                  <div style={{ fontSize: '0.68rem', fontFamily: 'var(--mono)', color: 'var(--amber)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <IconUsers size={12} color="var(--amber)" /> MATCHED STREAM CHAT CIRCLE
                  </div>
                  <div style={{ fontWeight: 700, color: '#F5F5F7', fontSize: '0.95rem' }}>{pData.circle} ({pData.peers} peers)</div>
                </div>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#34C759', display: 'inline-block' }} />
              </div>

              {/* AI Icebreaker Card */}
              <div style={{ background: 'rgba(224, 138, 62, 0.12)', border: '1px solid var(--amber)', borderRadius: '10px', padding: '0.75rem', marginBottom: '0.8rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.68rem', fontWeight: 700, color: 'var(--amber)', marginBottom: '0.3rem' }}>
                  <IconAI size={13} color="var(--amber)" /> FITI PULSE AI™ ICEBREAKER SUGGESTION
                </div>
                <div style={{ fontSize: '0.76rem', color: '#F5F5F7', lineHeight: 1.3, marginBottom: '0.5rem' }}>
                  "Apple Weather shows sunny skies Tuesday after your river walk! Would you like to invite the circle for tea at the park café?"
                </div>
                {!aiInviteSent ? (
                  <button
                    onClick={() => setAiInviteSent(true)}
                    style={{ background: 'var(--amber)', border: 'none', color: '#0A0806', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <IconChat size={12} color="#0A0806" /> Dispatch Invitation to Circle
                  </button>
                ) : (
                  <div style={{ fontSize: '0.72rem', color: '#34C759', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <IconCheck size={12} color="#34C759" /> AI-suggested invitation posted to group!
                  </div>
                )}
              </div>

              {/* Chat Simulation */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', maxHeight: '180px', overflowY: 'auto', marginBottom: '0.8rem', paddingRight: '0.3rem' }}>
                {pData.messages.map((m, idx) => (
                  <div key={idx} style={{ background: m.sender.includes('You') ? 'rgba(224, 138, 62, 0.15)' : '#181410', border: '1px solid #2C2C2E', borderRadius: '10px', padding: '0.65rem', alignSelf: m.sender.includes('You') ? 'flex-end' : 'flex-start', maxWidth: '88%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.6rem', marginBottom: '0.2rem' }}>
                      <span style={{ fontSize: '0.7rem', fontWeight: 700, color: m.sender.includes('You') ? 'var(--amber)' : '#82B1FF' }}>{m.sender}</span>
                      <span style={{ fontSize: '0.65rem', color: '#636366', fontFamily: 'var(--mono)' }}>{m.time}</span>
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#E2E8F0', lineHeight: 1.4 }}>{m.text}</div>
                  </div>
                ))}
                {aiInviteSent && (
                  <div style={{ background: 'rgba(224, 138, 62, 0.25)', border: '1px solid var(--amber)', borderRadius: '10px', padding: '0.65rem', alignSelf: 'flex-end', maxWidth: '88%' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--amber)' }}>You (via FiTi Pulse AI)</div>
                    <div style={{ fontSize: '0.82rem', color: '#fff' }}>Hey everyone! Since Tuesday is sunny, who wants to grab tea at the park café right after our walk? ☕☀️</div>
                  </div>
                )}
                {chatReply && (
                  <div style={{ background: 'rgba(224, 138, 62, 0.2)', border: '1px solid var(--amber)', borderRadius: '10px', padding: '0.65rem', alignSelf: 'flex-end', maxWidth: '88%' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--amber)' }}>You</div>
                    <div style={{ fontSize: '0.82rem', color: '#fff' }}>Count me in! Looking forward to seeing everyone. 👟</div>
                  </div>
                )}
              </div>

              {/* Quick Reply Bar */}
              <div style={{ background: '#181410', border: '1px solid #2C2C2E', borderRadius: '12px', padding: '0.6rem' }}>
                <div style={{ fontSize: '0.68rem', color: '#8E8E93', marginBottom: '0.4rem' }}>Quick Circle Response:</div>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <button
                    onClick={() => setChatReply(true)}
                    style={{ flex: 1, background: '#2C2C2E', border: 'none', color: '#F5F5F7', padding: '0.45rem', borderRadius: '6px', fontSize: '0.72rem', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
                  >
                    👋 See you there!
                  </button>
                  <button
                    onClick={() => setChatReply(true)}
                    style={{ flex: 1, background: 'var(--amber)', border: 'none', color: '#0A0806', padding: '0.45rem', borderRadius: '6px', fontSize: '0.72rem', cursor: 'pointer', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
                  >
                    💬 Post Check-in
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'trends' && (
            <div>
              <div style={{ fontSize: '0.72rem', fontFamily: 'var(--mono)', color: 'var(--amber)', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <IconActivity size={14} color="var(--amber)" /> APPLE HEALTH / GOOGLE FIT SYNC
              </div>
              <div style={{ fontWeight: 700, color: '#F5F5F7', fontSize: '1.1rem', marginBottom: '1rem' }}>Longitudinal Activity & Mood</div>
              
              <div style={{ background: '#181410', border: '1px solid #2C2C2E', borderRadius: '12px', padding: '1rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.78rem', color: '#C7C7CC' }}>Daily Movement Trend</span>
                  <span style={{ fontSize: '0.85rem', fontFamily: 'var(--mono)', color: '#34C759', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <IconActivity size={14} color="#34C759" /> {pData.steps}
                  </span>
                </div>
                <div style={{ height: '6px', background: '#2C2C2E', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: '82%', height: '100%', background: 'linear-gradient(90deg, #E08A3E, #34C759)' }} />
                </div>
              </div>

              {/* AI Longitudinal Synthesis Card */}
              <div style={{ background: '#1C1610', border: '1px solid rgba(224, 138, 62, 0.4)', borderRadius: '12px', padding: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.72rem', fontWeight: 700, color: 'var(--amber)', marginBottom: '0.4rem' }}>
                  <IconAI size={14} color="var(--amber)" /> FITI MATCH-AI™ LONGITUDINAL SYNTHESIS
                </div>
                <div style={{ fontSize: '0.82rem', color: '#E2E8F0', lineHeight: 1.4 }}>
                  AI trend engine confirms 8-week steady correlation between circle meetups (+2,400 steps on Tuesdays) and PHQ-9 improvement ({pData.phqTrend}).
                </div>
              </div>
            </div>
          )}

          {/* Interactive Phone Bottom Bar / Tabs with Icons */}
          <div style={{ display: 'flex', borderTop: '1px solid #26201A', paddingTop: '0.75rem', marginTop: '1rem', gap: '0.4rem' }}>
            <button
              onClick={() => setActiveTab('checkin')}
              style={{ flex: 1, padding: '0.5rem 0.2rem', borderRadius: '8px', background: activeTab === 'checkin' ? 'rgba(224, 138, 62, 0.2)' : 'transparent', border: activeTab === 'checkin' ? '1px solid var(--amber)' : '1px solid transparent', color: activeTab === 'checkin' ? 'var(--amber)' : '#8E8E93', fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
            >
              <IconPhone size={14} color={activeTab === 'checkin' ? 'var(--amber)' : '#8E8E93'} /> Check-in
            </button>
            <button
              onClick={() => { setActiveTab('circle'); setChatReply(false); setAiInviteSent(false) }}
              style={{ flex: 1, padding: '0.5rem 0.2rem', borderRadius: '8px', background: activeTab === 'circle' ? 'rgba(224, 138, 62, 0.2)' : 'transparent', border: activeTab === 'circle' ? '1px solid var(--amber)' : '1px solid transparent', color: activeTab === 'circle' ? 'var(--amber)' : '#8E8E93', fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
            >
              <IconChat size={14} color={activeTab === 'circle' ? 'var(--amber)' : '#8E8E93'} /> My Circle
            </button>
            <button
              onClick={() => setActiveTab('trends')}
              style={{ flex: 1, padding: '0.5rem 0.2rem', borderRadius: '8px', background: activeTab === 'trends' ? 'rgba(224, 138, 62, 0.2)' : 'transparent', border: activeTab === 'trends' ? '1px solid var(--amber)' : '1px solid transparent', color: activeTab === 'trends' ? 'var(--amber)' : '#8E8E93', fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
            >
              <IconActivity size={14} color={activeTab === 'trends' ? 'var(--amber)' : '#8E8E93'} /> Trends
            </button>
          </div>
        </div>
      </div>

      {/* Right Side Caption & Persona Switcher */}
      <div className="mp-caption">
        <div className="mpc-tag" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <IconPhone size={14} color="var(--amber)" /> MEMBER EXPERIENCE · FLUTTER MOBILE APP + AI MATCHING
        </div>
        <h3>Zero survey fatigue.<br />AI Chemistry first.</h3>
        <p>
          We deliberately avoid clinical jargon in the member app. <strong>FiTi Match-AI™</strong> quietly clusters seniors and workforce peers based on pace, schedule, and neighborhood chemistry, while <strong>FiTi Pulse AI™</strong> breaks the ice naturally when group activity dips. All clinical outcome mapping occurs securely on the backend.
        </p>

        {/* Persona Switcher with Icons */}
        <div style={{ background: '#12100E', border: '1px solid #2C2C2E', borderRadius: '12px', padding: '1.25rem', marginTop: '0.5rem' }}>
          <div style={{ fontSize: '0.75rem', fontFamily: 'var(--mono)', color: 'var(--amber)', fontWeight: 700, marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <IconUsers size={14} color="var(--amber)" /> TEST LIVE MEMBER COHORT PERSONAS & AI CHEMISTRY
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {Object.keys(PERSONAS).map((name) => (
              <button
                key={name}
                onClick={() => { setPersona(name); setSaved(false); setChatReply(false); setAiInviteSent(false) }}
                style={{
                  padding: '0.5rem 0.9rem',
                  borderRadius: '6px',
                  background: persona === name ? 'var(--amber)' : '#1C1C1E',
                  color: persona === name ? '#0A0806' : '#C7C7CC',
                  border: 'none',
                  fontWeight: 700,
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <IconPhone size={12} color={persona === name ? '#0A0806' : '#C7C7CC'} />
                {name} ({PERSONAS[name].circle.split(' ')[0]})
              </button>
            ))}
          </div>
        </div>

        <div className="mpc-specs">
          {[
            ['Targeted populations', 'Older adults, chronic care, post-discharge'],
            ['AI Chemistry Engine', 'FiTi Match-AI™ (Multi-factor group clustering)'],
            ['Active check-in schedule', 'Bi-weekly (PHQ-9 / UCLA-3 derived)'],
            ['Movement indicator', 'Apple Health / Google Fit step trends'],
            ['Group format', 'Small AI-matched cohorts (6–10 peers)'],
            ['Platform support', 'iOS + low-end Android optimized'],
          ].map(([k, v], i) => (
            <div className="mpc-row" key={i}>
              <span className="mpc-k">{k}</span>
              <span className="mpc-v">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ClinicianPanel() {
  const [selectedPatient, setSelectedPatient] = useState('Robert T.')
  const [filter, setFilter] = useState('ALL')
  const [searchQuery, setSearchQuery] = useState('')
  const [actionStatus, setActionStatus] = useState('')
  const [showFhirModal, setShowFhirModal] = useState(false)

  const patients = [
    { id: 'James R.', pseudonym: 'PT-4412-JR', status: 'ATTENDING', phq: 9, delta: 'Δ −5', alert: '8 weeks active · 85% attendance', flag: false, steps: '5,420 avg', isolation: 'Low (3/9)', edRisk: '12% (Low)', aiNote: 'Consistent attendance and high peer attachment. Zero clinical escalation required.', history: 'Baseline PHQ-9: 14. Joined Riverside Walking Circle Wk 2. Consistent attendance and high peer attachment.' },
    { id: 'Robert T.', pseudonym: 'PT-4471-RT', status: 'AT RISK', phq: 15, delta: 'Δ +2', alert: '3 consecutive circle meetups missed', flag: true, steps: '1,840 avg (⚠️ 66% drop)', isolation: 'High (7/9)', edRisk: '🔴 82% (High Risk)', aiNote: 'AI Multi-Modal Triage Alert: 66% drop in Apple Health step velocity over 72h coincides with consecutive missed circle walks. Immediate warm call required.', history: 'Baseline PHQ-9: 13. Missed last 3 meetups. Apple Health telemetry flags consecutive 3-day step reduction below 2,000 threshold.' },
    { id: 'Maria S.', pseudonym: 'PT-4390-MS', status: 'ATTENDING', phq: 6, delta: 'Δ −6', alert: 'High engagement · Circle leader', flag: false, steps: '6,100 avg', isolation: 'Low (3/9)', edRisk: '5% (Low)', aiNote: 'Strong circle facilitator chemistry. UCLA-3 isolation score improved by 4 points.', history: 'Baseline PHQ-9: 12. Excellent peer formation. UCLA-3 isolation score improved by 4 points.' },
    { id: 'Patricia M.', pseudonym: 'PT-4488-PM', status: 'ATTENDING', phq: 8, delta: 'Δ −4', alert: 'Stable step trends · Wk 8', flag: false, steps: '4,800 avg', isolation: 'Moderate (5/9)', edRisk: '14% (Low)', aiNote: 'Stable step patterns and zero missed check-ins. Attends Tuesday morning tea group.', history: 'Baseline PHQ-9: 12. Attends Tuesday morning tea group. Stable step patterns and zero missed check-ins.' },
    { id: 'David K.', pseudonym: 'PT-4502-DK', status: 'AT RISK', phq: 14, delta: 'Δ 0', alert: 'Apple Health trend: 3-day step drop', flag: true, steps: '2,100 avg (⚠️ 3-day drop)', isolation: 'High (6/9)', edRisk: '🟡 64% (Elevated)', aiNote: 'AI Telemetry Flag: Circle attendance dropped to 50%. Step reduction detected over weekend. Requires care coordinator warm check-in.', history: 'Baseline PHQ-9: 14. Circle attendance 50%. Step drop detected over weekend. Requires care coordinator warm check-in.' },
    { id: 'Elena V.', pseudonym: 'PT-4519-EV', status: 'ATTENDING', phq: 11, delta: 'Δ −5', alert: 'Post-discharge Wk 4 · Active', flag: false, steps: '3,100 avg (↑ 20% gain)', isolation: 'Moderate (4/9)', edRisk: '22% (Recovering)', aiNote: 'Enrolled 3 days post-discharge. Mobility increasing steadily (+20% step velocity gain).', history: 'Baseline PHQ-9: 16. Enrolled 3 days post-discharge. Mobility increasing steadily.' }
  ]

  const filteredPatients = patients.filter(p => {
    const matchesFilter = filter === 'ALL' || (filter === 'ALERT' && p.flag) || (filter === 'ATTENDING' && !p.flag)
    const matchesSearch = searchQuery === '' || p.id.toLowerCase().includes(searchQuery.toLowerCase()) || p.pseudonym.toLowerCase().includes(searchQuery.toLowerCase()) || p.alert.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const activeP = patients.find(p => p.id === selectedPatient) || patients[1]

  return (
    <div className="clinician-panel" style={{ background: '#0A0D14', border: '1px solid rgba(0, 85, 255, 0.4)', borderRadius: '24px', padding: '2.5rem', boxShadow: '0 24px 64px rgba(0, 85, 255, 0.15)', fontFamily: 'var(--mono)' }}>
      
      {/* Triage Status & Command KPI Bar with Icons & AI Indicator */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2rem', borderBottom: '1px solid #1E293B', paddingBottom: '2rem' }}>
        <div style={{ background: '#0F172A', border: '1px solid #1E293B', borderRadius: '12px', padding: '1.2rem' }}>
          <span style={{ fontSize: '0.72rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0.3rem' }}>
            <IconUsers size={14} color="#38BDF8" /> ACTIVE PILOT COHORT
          </span>
          <span style={{ fontSize: '1.8rem', fontWeight: 800, color: '#F8FAFC' }}>50 <span style={{ fontSize: '0.9rem', color: '#38BDF8', fontWeight: 600 }}>Patients</span></span>
        </div>
        <div 
          onClick={() => setFilter('ATTENDING')}
          style={{ background: filter === 'ATTENDING' ? 'rgba(52, 199, 89, 0.15)' : '#0F172A', border: filter === 'ATTENDING' ? '1px solid #34C759' : '1px solid #1E293B', borderRadius: '12px', padding: '1.2rem', cursor: 'pointer', transition: 'all 0.2s ease' }}
        >
          <span style={{ fontSize: '0.72rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0.3rem' }}>
            <IconCheck size={14} color="#34C759" /> ATTENDING & ENGAGED
          </span>
          <span style={{ fontSize: '1.8rem', fontWeight: 800, color: '#34C759' }}>45 <span style={{ fontSize: '0.8rem', color: '#94A3B8' }}>(90% Retention)</span></span>
        </div>
        <div 
          onClick={() => setFilter('ALERT')}
          style={{ background: filter === 'ALERT' ? 'rgba(255, 69, 58, 0.15)' : '#0F172A', border: filter === 'ALERT' ? '1px solid #FF453A' : '1px solid #1E293B', borderRadius: '12px', padding: '1.2rem', cursor: 'pointer', transition: 'all 0.2s ease' }}
        >
          <span style={{ fontSize: '0.72rem', color: '#FF6B6B', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0.3rem' }}>
            <IconAlert size={14} color="#FF453A" /> ⚠️ CRITICAL TRIAGE ALERTS
          </span>
          <span style={{ fontSize: '1.8rem', fontWeight: 800, color: '#FF453A' }}>2 <span style={{ fontSize: '0.8rem', color: '#FCA5A5' }}>(Require Call)</span></span>
        </div>
        <div style={{ background: '#0F172A', border: '1px solid #0055FF', borderRadius: '12px', padding: '1.2rem' }}>
          <span style={{ fontSize: '0.72rem', color: '#66A1FF', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0.3rem', fontWeight: 700 }}>
            <IconAI size={14} color="#66A1FF" /> FITI TRIAGE-AI™ ENGINE
          </span>
          <span style={{ fontSize: '1.05rem', fontWeight: 700, color: '#38BDF8', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '0.4rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#34C759' }} /> 4 Multi-Modal Vectors Active
          </span>
        </div>
      </div>

      {/* Filter and Search Triage Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {[
            ['ALL', 'All Patients (6)'],
            ['ALERT', '⚠️ Flagged / At Risk (2)'],
            ['ATTENDING', '✅ Attending (4)']
          ].map(([k, label]) => (
            <button
              key={k}
              onClick={() => setFilter(k)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                background: filter === k ? '#1E293B' : 'transparent',
                border: filter === k ? '1px solid #38BDF8' : '1px solid #1E293B',
                color: filter === k ? '#38BDF8' : '#94A3B8',
                fontWeight: 700,
                fontSize: '0.78rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              {k === 'ALERT' ? <IconAlert size={14} color={filter === k ? '#FF453A' : '#94A3B8'} /> : <IconUsers size={14} color={filter === k ? '#38BDF8' : '#94A3B8'} />}
              {label}
            </button>
          ))}
        </div>
        <div>
          <input
            type="text"
            placeholder="🔍 Search Patient ID or Alert..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              background: '#0F172A',
              border: '1px solid #1E293B',
              borderRadius: '8px',
              padding: '0.5rem 1rem',
              color: '#F8FAFC',
              fontSize: '0.8rem',
              fontFamily: 'var(--mono)',
              minWidth: '240px',
              outline: 'none'
            }}
          />
        </div>
      </div>

      {/* Main Clinical Command Layout: Left Data Grid + Right Patient Triage Drawer */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.35fr 1fr', gap: '2rem', alignItems: 'start' }}>
        
        {/* Left: Enterprise Clinical Data Grid with AI Column */}
        <div style={{ background: '#0F172A', border: '1px solid #1E293B', borderRadius: '16px', overflow: 'hidden' }}>
          <div style={{ background: '#1E293B', padding: '0.85rem 1.2rem', display: 'grid', gridTemplateColumns: '1fr 80px 110px 120px', fontWeight: 700, fontSize: '0.72rem', color: '#94A3B8', letterSpacing: '0.05em' }}>
            <span>PATIENT & ALERT FLAG</span>
            <span style={{ textAlign: 'right' }}>PHQ-9 / Δ</span>
            <span style={{ textAlign: 'right' }}>MOBILITY</span>
            <span style={{ textAlign: 'right', color: '#38BDF8' }}>✨ AI ED RISK</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {filteredPatients.map((p, i) => (
              <div
                key={i}
                onClick={() => { setSelectedPatient(p.id); setActionStatus(''); setShowFhirModal(false) }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 80px 110px 120px',
                  alignItems: 'center',
                  padding: '1rem 1.2rem',
                  borderBottom: i < filteredPatients.length - 1 ? '1px solid #1E293B' : 'none',
                  background: selectedPatient === p.id ? 'rgba(56, 189, 248, 0.12)' : (p.flag ? 'rgba(255, 69, 58, 0.04)' : 'transparent'),
                  borderLeft: selectedPatient === p.id ? '4px solid #38BDF8' : (p.flag ? '4px solid #FF453A' : '4px solid transparent'),
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#F8FAFC' }}>{p.id}</span>
                    <span style={{ fontSize: '0.68rem', color: '#64748B' }}>({p.pseudonym})</span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: p.flag ? '#FF6B6B' : '#34C759', marginTop: '0.2rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {p.flag ? <IconAlert size={12} color="#FF6B6B" /> : <IconCheck size={12} color="#34C759" />}
                    {p.status} · {p.alert}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#F8FAFC' }}>{p.phq}</div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: p.delta.includes('−') ? '#34C759' : (p.delta === 'Δ 0' ? '#94A3B8' : '#FF453A') }}>{p.delta}</div>
                </div>
                <div style={{ textAlign: 'right', fontSize: '0.78rem', color: p.flag ? '#FF6B6B' : '#CBD5E1', fontWeight: p.flag ? 700 : 500 }}>
                  {p.steps.split(' ')[0]}
                </div>
                <div style={{ textAlign: 'right', fontSize: '0.78rem', fontWeight: 800, color: p.edRisk.includes('🔴') ? '#FF453A' : (p.edRisk.includes('🟡') ? '#FDBA74' : '#38BDF8') }}>
                  {p.edRisk.split(' ')[0]} {p.edRisk.split(' ')[1]}
                </div>
              </div>
            ))}
            {filteredPatients.length === 0 && (
              <div style={{ padding: '2.5rem', textAlign: 'center', color: '#64748B', fontSize: '0.85rem' }}>
                No patients match the current filter criteria.
              </div>
            )}
          </div>
        </div>

        {/* Right: Comprehensive Patient Triage & Protocol Center with AI Script Generator */}
        <div style={{ background: '#0F172A', border: '1px solid #1E293B', borderRadius: '16px', padding: '1.8rem', position: 'sticky', top: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #1E293B', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <span style={{ fontSize: '0.72rem', color: activeP.flag ? '#FF6B6B' : '#38BDF8', fontWeight: 800, letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: '6px' }}>
                {activeP.flag ? <IconAlert size={14} color="#FF6B6B" /> : <IconCheck size={14} color="#38BDF8" />}
                {activeP.flag ? '⚠️ HIGH PRIORITY TRIAGE CASE' : '✅ ACTIVE MONITORING CASE'}
              </span>
              <h4 style={{ fontSize: '1.4rem', color: '#F8FAFC', margin: '0.3rem 0 0.1rem 0', fontWeight: 800 }}>
                {activeP.id} <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>{activeP.pseudonym}</span>
              </h4>
            </div>
            <span style={{ background: activeP.flag ? 'rgba(255, 69, 58, 0.2)' : 'rgba(52, 199, 89, 0.2)', color: activeP.flag ? '#FF453A' : '#34C759', padding: '0.35rem 0.75rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 800 }}>
              {activeP.status}
            </span>
          </div>

          {/* Clinical Telemetry Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.85rem', marginBottom: '1.25rem' }}>
            <div style={{ background: '#1E293B', padding: '0.85rem', borderRadius: '10px' }}>
              <span style={{ fontSize: '0.68rem', color: '#94A3B8', display: 'block' }}>PHQ-9 Depression Score</span>
              <span style={{ fontSize: '1.15rem', fontWeight: 800, color: activeP.phq >= 14 ? '#FF6B6B' : '#F8FAFC' }}>
                {activeP.phq} <span style={{ fontSize: '0.75rem', color: activeP.delta.includes('−') ? '#34C759' : '#FF6B6B' }}>({activeP.delta})</span>
              </span>
            </div>
            <div style={{ background: '#1E293B', padding: '0.85rem', borderRadius: '10px' }}>
              <span style={{ fontSize: '0.68rem', color: '#94A3B8', display: 'block' }}>UCLA-3 Isolation Index</span>
              <span style={{ fontSize: '1.15rem', fontWeight: 800, color: activeP.isolation.includes('High') ? '#FF6B6B' : '#34C759' }}>
                {activeP.isolation}
              </span>
            </div>
            <div style={{ background: '#1E293B', padding: '0.85rem', borderRadius: '10px', gridColumn: '1 / -1' }}>
              <span style={{ fontSize: '0.68rem', color: '#94A3B8', display: 'block' }}>Apple Health Mobility & Step Telemetry</span>
              <span style={{ fontSize: '1rem', fontWeight: 700, color: activeP.flag ? '#FF6B6B' : '#F8FAFC' }}>
                {activeP.steps}
              </span>
            </div>
          </div>

          {/* ✨ AI Triage Briefing & Call Script Generator */}
          <div style={{ background: 'linear-gradient(135deg, #0D1B2A 0%, #1B263B 100%)', border: '1px solid #38BDF8', borderRadius: '12px', padding: '1.1rem', marginBottom: '1.5rem', boxShadow: '0 8px 24px rgba(56, 189, 248, 0.12)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.72rem', color: '#38BDF8', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <IconAI size={15} color="#38BDF8" /> FITI CARE-AI™ TRIAGE BRIEFING & CALL SCRIPT
              </span>
              <span style={{ background: 'rgba(56, 189, 248, 0.2)', color: '#38BDF8', fontSize: '0.65rem', fontWeight: 700, padding: '2px 6px', borderRadius: '4px' }}>
                ED Risk: {activeP.edRisk}
              </span>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#E2E8F0', lineHeight: 1.5, margin: '0 0 0.6rem 0' }}>
              <strong style={{ color: '#fff' }}>Telemetry Synthesis:</strong> {activeP.aiNote}
            </p>
            <div style={{ background: '#0A0D14', borderLeft: '3px solid #38BDF8', padding: '0.75rem', borderRadius: '0 6px 6px 0', fontSize: '0.78rem', color: '#93C5FD', fontStyle: 'italic' }}>
              💡 <strong>AI Suggested Warm Call Script:</strong> "Start by asking about weekend physical comfort/knee stiffness before suggesting volunteer ride coordination for Tuesday's walk. Avoid direct clinical depression terminology."
            </div>
          </div>

          {/* Interactive Protocol Action Buttons with Icons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button
              onClick={() => setActionStatus('Outreach logged: Spoke with Robert T. and scheduled local community ride support for next meetup.')}
              style={{
                background: '#38BDF8',
                color: '#0F172A',
                border: 'none',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                fontWeight: 800,
                fontSize: '0.82rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.2s ease'
              }}
            >
              <IconPhoneCall size={16} color="#0F172A" /> Log Care Coordinator Outreach
            </button>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={() => setActionStatus('Dispatching automated Stream Chat care check-in ping to member mobile device... [DELIVERED]')}
                style={{
                  flex: 1,
                  background: '#1E293B',
                  color: '#F8FAFC',
                  border: '1px solid #334155',
                  padding: '0.7rem',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <IconChat size={14} color="#F8FAFC" /> Send Stream Chat Ping
              </button>
              <button
                onClick={() => setShowFhirModal(!showFhirModal)}
                style={{
                  flex: 1,
                  background: '#1E293B',
                  color: '#38BDF8',
                  border: '1px solid #38BDF8',
                  padding: '0.7rem',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <IconCode size={14} color="#38BDF8" /> {showFhirModal ? 'Hide FHIR R4 JSON' : 'Inspect FHIR R4 JSON'}
              </button>
            </div>
          </div>

          {/* Status Feedback Banner */}
          {actionStatus && (
            <div style={{ marginTop: '1rem', background: 'rgba(52, 199, 89, 0.15)', border: '1px solid #34C759', borderRadius: '8px', padding: '0.85rem', fontSize: '0.8rem', color: '#34C759', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <IconCheck size={16} color="#34C759" /> {actionStatus}
            </div>
          )}

          {/* FHIR R4 JSON Modal / Drawer Preview */}
          {showFhirModal && (
            <div style={{ marginTop: '1.25rem', background: '#05050A', border: '1px solid #334155', borderRadius: '10px', padding: '1.1rem', fontSize: '0.75rem', fontFamily: 'var(--mono)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#38BDF8', marginBottom: '0.5rem', fontWeight: 700, alignItems: 'center' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><IconCode size={14} color="#38BDF8" /> HL7 FHIR R4 Observation Payload</span>
                <span>STATUS: FINAL</span>
              </div>
              <pre style={{ margin: 0, color: '#A5B4FC', whiteSpace: 'pre-wrap', lineHeight: 1.4 }}>{`{
  "resourceType": "Observation",
  "id": "fiti-phq9-${activeP.pseudonym}",
  "status": "final",
  "code": { "system": "http://loinc.org", "code": "44261-6", "display": "PHQ-9 total score" },
  "subject": { "reference": "Patient/${activeP.pseudonym}" },
  "effectiveDateTime": "${new Date().toISOString().split('T')[0]}T08:00:00Z",
  "valueInteger": ${activeP.phq},
  "note": "${activeP.history}"
}`}</pre>
            </div>
          )}

        </div>

      </div>

      {/* Footer Specs with Icons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid #1E293B', fontSize: '0.75rem', color: '#64748B' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><IconDashboard size={14} color="#64748B" /> Web PWA · Zero hospital desktop installation required</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><IconCode size={14} color="#64748B" /> Exportable CSV & HL7 FHIR R4 Observation records</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><IconShield size={14} color="#64748B" /> HIPAA BAA & Row-Level Security Enforced</span>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   PILOT MODELER — INTERACTIVE COHORT & PMPM SIMULATOR
   ═══════════════════════════════════════════════════════════════════════════ */
function PilotModeler() {
  const [cohortSize, setCohortSize] = useState(200)
  const [segment, setSegment] = useState('older')
  const [rh, hv] = useInView()

  // Modeled metrics from systematic reviews (fiti_validation_report.md)
  const pmpm = segment === 'older' ? 8 : 6
  const annualInvest = cohortSize * pmpm * 12
  const baselineEDRate = segment === 'older' ? 0.678 : 0.42 // visits per member-year
  const edReductionPct = segment === 'older' ? 0.18 : 0.15 // conservative 15-18% reduction benchmark
  const avoidedEDVisits = Math.round(cohortSize * baselineEDRate * edReductionPct)
  const edCostPerVisit = 2100 // conservative ED visit cost
  const annualSavings = avoidedEDVisits * edCostPerVisit
  const netImpact = annualSavings - annualInvest

  return (
    <section className="modeler-sec sec" id="modeler" style={{ background: '#0A0806', borderBottom: '1px solid var(--border)', padding: '5rem 0' }}>
      <div className="wrap">
        <div ref={rh} className={`sec-hdr snap${hv ? ' in' : ''}`}>
          <span className="sec-tag">05 · PILOT & PMPM MODELER</span>
          <h2>Simulate your cohort economics.<br />Transparent, conservative benchmarks.</h2>
          <p>
            Adjust your target cohort size and clinical population to preview modeled group matching cost efficiencies (`10× vs 1:1 companionship`), projected emergency department avoidance, and PMPM economics.
          </p>
        </div>

        <div style={{ background: 'var(--warm-card)', border: '1px solid var(--warm-border)', borderRadius: '16px', padding: '2.5rem', marginTop: '2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem', alignItems: 'center' }}>
            
            {/* Controls */}
            <div>
              <div style={{ marginBottom: '1.8rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontFamily: 'var(--mono)', color: 'var(--amber)', fontWeight: 700, marginBottom: '0.6rem' }}>
                  TARGET POPULATION SEGMENT
                </label>
                <div style={{ display: 'flex', gap: '0.6rem' }}>
                  <button
                    onClick={() => setSegment('older')}
                    style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', background: segment === 'older' ? 'var(--amber)' : '#1C1C1E', color: segment === 'older' ? '#0A0806' : '#F5F5F7', border: 'none', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer' }}
                  >
                    Older Adults / Chronic Care ($8 PMPM)
                  </button>
                  <button
                    onClick={() => setSegment('workforce')}
                    style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', background: segment === 'workforce' ? 'var(--amber)' : '#1C1C1E', color: segment === 'workforce' ? '#0A0806' : '#F5F5F7', border: 'none', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer' }}
                  >
                    Employer / SDOH ($6 PMPM)
                  </button>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                  <label style={{ fontSize: '0.8rem', fontFamily: 'var(--mono)', color: 'var(--amber)', fontWeight: 700 }}>
                    PILOT COHORT SIZE (ACTIVE MEMBERS)
                  </label>
                  <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#F5F5F7', fontFamily: 'var(--mono)' }}>{cohortSize.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={30}
                  max={2400}
                  step={10}
                  value={cohortSize}
                  onChange={e => setCohortSize(+e.target.value)}
                  style={{ width: '100%', accentColor: 'var(--amber)', cursor: 'pointer' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#636366', marginTop: '0.4rem', fontFamily: 'var(--mono)' }}>
                  <span>30 (Initial Pilot)</span>
                  <span>500 (Hospital Cohort)</span>
                  <span>2,400 (Scale)</span>
                </div>
              </div>

              <div style={{ marginTop: '2rem', background: '#12100E', border: '1px solid #2C2C2E', borderRadius: '10px', padding: '1rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--amber)', fontFamily: 'var(--mono)', fontWeight: 700, display: 'block' }}>WHY FI-TI VS PAPA?</span>
                <p style={{ fontSize: '0.82rem', color: '#C7C7CC', margin: '0.4rem 0 0 0', lineHeight: 1.5 }}>
                  1:1 human companionship services cost ~$200+/month per member. FiTi's AI-matched group circles scale at just ${pmpm} PMPM—delivering <strong>10× to 25× software cost efficiency</strong> while measuring validated PHQ-9 improvements.
                </p>
              </div>
            </div>

            {/* Results Display */}
            <div style={{ background: '#0A0806', border: '1px solid #2C2C2E', borderRadius: '14px', padding: '2rem' }}>
              <div style={{ fontSize: '0.75rem', fontFamily: 'var(--mono)', color: '#8E8E93', letterSpacing: '0.05em', marginBottom: '1.2rem' }}>
                MODELED ANNUAL PROJECTIONS ({cohortSize} MEMBERS)
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.8rem' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#8E8E93', display: 'block' }}>Annual Platform Investment</span>
                  <span style={{ fontSize: '1.35rem', fontWeight: 800, color: '#F5F5F7', fontFamily: 'var(--mono)' }}>${annualInvest.toLocaleString()}</span>
                  <span style={{ fontSize: '0.72rem', color: '#636366', display: 'block', marginTop: '0.2rem' }}>at ${pmpm} PMPM</span>
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#8E8E93', display: 'block' }}>Avoided ED Visits (Modeled)</span>
                  <span style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0055FF', fontFamily: 'var(--mono)' }}>~{avoidedEDVisits} visits</span>
                  <span style={{ fontSize: '0.72rem', color: '#636366', display: 'block', marginTop: '0.2rem' }}>{(edReductionPct * 100).toFixed(0)}% benchmark reduction</span>
                </div>
              </div>

              <div style={{ borderTop: '1px solid #1C1C1E', paddingTop: '1.5rem' }}>
                <span style={{ fontSize: '0.78rem', color: '#8E8E93', display: 'block' }}>Modeled Annual Medical Cost Avoidance</span>
                <div style={{ fontSize: '2.1rem', fontWeight: 900, color: netImpact >= 0 ? '#34C759' : '#F5F5F7', fontFamily: 'var(--mono)', margin: '0.2rem 0' }}>
                  ${annualSavings.toLocaleString()}
                </div>
                <div style={{ fontSize: '0.82rem', color: '#C7C7CC' }}>
                  Estimated Net Impact: <strong style={{ color: netImpact >= 0 ? '#34C759' : '#FF453A' }}>{netImpact >= 0 ? '+' : ''}${netImpact.toLocaleString()}</strong> per year
                </div>
              </div>

              <div style={{ marginTop: '1.5rem', fontSize: '0.72rem', color: '#636366', lineHeight: 1.4, borderTop: '1px dashed #1C1C1E', paddingTop: '1rem' }}>
                * Note: All figures are conservative illustrative projections modeled from systematic health economics reviews (WHO 2025, Cené et al. AHA 2022). Actual cohort outcomes and cost avoidance are verified post-pilot via live FHIR Observation exports.
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   AUDIENCES / PARTNERS — LASER FOCUS ON 90-DAY PILOTS & VALUE-BASED CARE
   ═══════════════════════════════════════════════════════════════════════════ */
function Audiences() {
  const [rh, hv] = useInView()
  const [rg, gv] = useInView()

  const AUDS = [
    {
      tag: 'HEALTH SYSTEMS & HOSPITALS',
      head: 'Turn loneliness screenings into an active intervention pathway.',
      body: 'Your primary care clinics and discharge planners screen for social determinants daily. Give them a direct referral destination that tracks patient attendance and PHQ-9 improvements across a structured 90-day pilot.',
      items: [
        'Standalone care coordinator dashboard — no upfront IT queue',
        'Real-time tracking of PHQ-9 & UCLA-3 trajectory',
        'IRB-ready protocol template and data governance',
        'Targeted reduction in preventable ED re-admissions',
      ],
    },
    {
      tag: 'PAYERS & SELF-INSURED EMPLOYERS',
      head: 'Address the upstream social driver behind excess claims spend.',
      body: 'Isolated members incur significantly higher medical claims and ER visits. FiTi delivers scalable community circles at $5–8 PMPM—a fraction of the cost of 1:1 companionship models.',
      items: [
        'Predictable PMPM pricing tied to active cohort size',
        'Scalable software-matched group circles vs costly 1:1 visits',
        'Quarterly actuarial reporting on engagement and outcomes',
        'Designed to support value-based care risk contracts',
      ],
    },
    {
      tag: 'RESEARCH INSTITUTIONS',
      head: 'Generate longitudinal behavioral health datasets ethically.',
      body: 'Launch institutional studies with our pre-built infrastructure. Track community formation, retention, and validated psychological metrics across diverse demographic populations.',
      items: [
        'Standardized LOINC and FHIR data structure',
        'Configurable bi-weekly ecological momentary assessment (EMA)',
        'Full CSV and JSON data export with audit trails',
        'Collaborative research partnership models available',
      ],
    },
  ]

  return (
    <section className="audiences sec" id="audiences">
      <div className="wrap">
        <div ref={rh} className={`sec-hdr snap${hv ? ' in' : ''}`}>
          <span className="sec-tag">06 · PARTNERS & ROADMAP</span>
          <h2>Built for institutional rigor.<br />Structured to eliminate pilotitis.</h2>
          <p>
            To protect both your clinical operations and our unit economics from open-ended pilot fatigue, FiTi operates on a transparent, three-stage commercial and integration roadmap.
          </p>
        </div>

        {/* 3-Stage Commercial & Clinical Roadmap */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
          {[
            {
              stage: 'STAGE 1 · PROVE IT (MONTHS 1–5)',
              title: 'The $0 / Zero-EHR-Delay Pilot',
              desc: 'We deploy immediately as a standalone web PWA + Flutter mobile app for a 30–100 patient cohort. Zero hospital desktop installation, zero EHR administrative queue, and $0 upfront integration fees. We measure real PHQ-9 & UCLA-3 trajectory.',
              badge: 'ACTIVE PILOT PROTOCOL'
            },
            {
              stage: 'STAGE 2 · SCALE IT (MONTHS 6–12)',
              title: 'Enterprise PMPM & EHR Connection Hub',
              desc: 'Following validated pilot outcome milestones, contracts convert to predictable $5–8 PMPM pricing. We initiate SOC2 Type II audit certification and connect our HL7 FHIR R4 API directly to your Epic Showroom / Connection Hub workflows.',
              badge: 'EPIC SHOWROOM / CONNECTION HUB TARGET'
            },
            {
              stage: 'STAGE 3 · DEFEND IT (YEAR 2+)',
              title: 'Value-Based Care Shared Savings',
              desc: 'With longitudinal cohort data proving Emergency Department (ED) avoidance and sustained behavioral health gains, FiTi transitions into value-based risk contracts and shared savings arrangements with payers and self-insured employers.',
              badge: 'VALUE-BASED CARE ALIGNMENT'
            }
          ].map((r, i) => (
            <div key={i} style={{ background: '#12100E', border: '1px solid #2C2C2E', borderRadius: '14px', padding: '1.8rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '0.72rem', fontFamily: 'var(--mono)', color: 'var(--amber)', fontWeight: 700, letterSpacing: '0.06em' }}>{r.stage}</span>
                <h4 style={{ fontSize: '1.15rem', color: '#F5F5F7', margin: '0.5rem 0 0.8rem 0', fontWeight: 700 }}>{r.title}</h4>
                <p style={{ fontSize: '0.85rem', color: '#C7C7CC', lineHeight: 1.6, margin: 0 }}>{r.desc}</p>
              </div>
              <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px dashed #1C1C1E' }}>
                <span style={{ fontSize: '0.7rem', fontFamily: 'var(--mono)', background: 'rgba(224, 138, 62, 0.12)', color: 'var(--amber)', padding: '0.35rem 0.65rem', borderRadius: '6px', fontWeight: 600 }}>
                  {r.badge}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div ref={rg} className={`aud-grid snap${gv ? ' in' : ''}`}>
          {AUDS.map((a, i) => (
            <div className="aud-card" key={i}>
              <div className="ac-tag">{a.tag}</div>
              <h3 className="ac-head">{a.head}</h3>
              <p className="ac-body">{a.body}</p>
              <div className="ac-list">
                {a.items.map((item, j) => (
                  <div className="ac-item" key={j}>
                    <span className="ac-mark">→</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   FAQ — REALISTIC, VALIDATED, HONEST ANSWERS
   ═══════════════════════════════════════════════════════════════════════════ */
function FAQ() {
  const [open, setOpen] = useState(null)
  const [rh, hv] = useInView()

  const QS = [
    {
      q: 'How does the 90-day pilot work, and what is required from our IT team?',
      a: 'The 90-day pilot requires zero EHR integration or IT installation. We provide a standalone, secure care coordinator web dashboard and enroll an initial cohort of 30–100 patients. Your team gets weekly attendance insights and a full PHQ-9/UCLA-3 pre- and post-intervention outcome report.',
    },
    {
      q: 'When and how does FiTi integrate with our EHR (Epic/Cerner) and meet SOC2 Type II requirements?',
      a: 'During Stage 1 (the 90-day pilot), we operate standalone to avoid your 6–18 month EHR administrative queue. As the pilot validates outcomes, our backend generates standard HL7 FHIR R4 Observation structures, preparing us for direct workflow integration via the Epic Showroom / Connection Hub in Stage 2 scaling. Concurrently, we initiate our SOC2 Type II audit roadmap to support health system enterprise procurement.',
    },
    {
      q: 'How does FiTi differentiate from 1:1 companionship services like Papa?',
      a: '1:1 companionship services rely on paying human workers for individual home visits, making them expensive ($20+ per hour) and difficult to scale. FiTi uses software to match members into small, self-sustaining community circles (like walking groups or coffee meetups). This group-based peer connection is inherently more scalable, highly cost-effective ($5–8 PMPM), and tracks longitudinal clinical outcomes.',
    },
    {
      q: 'What data does FiTi track on the member phone?',
      a: 'We strictly collect explicit responses from bi-weekly check-ins (PHQ-9 and UCLA-3 items) and optional aggregate step/movement trends via Apple Health / Google Fit to notice sustained drops in physical activity. We never scrape call logs, raw GPS coordinates, or private messages.',
    },
    {
      q: 'Is FiTi an FDA-cleared Software as a Medical Device (SaMD)?',
      a: 'No. FiTi operates as a population health monitoring and social engagement platform, not a diagnostic device. We do not claim to diagnose or treat medical disorders independently. All assessments and risk alerts are tools to inform human care coordinators within your clinical workflow.',
    },
    {
      q: 'What is the pricing model after a successful pilot?',
      a: 'Production contracts are structured on a Per-Member-Per-Month (PMPM) basis, typically ranging from $5 to $8 PMPM depending on cohort volume and reporting requirements, or value-based shared savings models.',
    },
  ]

  return (
    <section className="faq sec" id="faq">
      <div className="wrap">
        <div ref={rh} className={`sec-hdr snap${hv ? ' in' : ''}`}>
          <span className="sec-tag">FREQUENTLY ASKED QUESTIONS</span>
          <h2>Clear answers for clinical & executive teams.</h2>
        </div>
        <div className="faq-list">
          {QS.map((q, i) => (
            <div className={`faq-item${open === i ? ' faq-open' : ''}`} key={i}>
              <button className="faq-q-btn" id={`faq-q-${i}`} onClick={() => setOpen(open === i ? null : i)}>
                <span className="faq-prompt">{'>'}</span>
                <span className="faq-qtext">{q.q}</span>
                <span className="faq-chevron">{open === i ? '↑' : '↓'}</span>
              </button>
              {open === i && (
                <div className="faq-a" id={`faq-a-${i}`}>
                  <span className="faq-a-prefix">// </span>
                  {q.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   CONTACT — LASER FOCUS ON THE 90-DAY PILOT LAUNCH
   ═══════════════════════════════════════════════════════════════════════════ */
function Contact() {
  const [email, setEmail] = useState('')
  const [org, setOrg] = useState('')
  const [role, setRole] = useState('')
  const [sent, setSent] = useState(false)
  const [rh, hv] = useInView()

  const handle = (e) => { e.preventDefault(); setSent(true) }

  return (
    <section className="contact-sec sec" id="contact">
      <div className="wrap">
        <div ref={rh} className={`sec-hdr snap${hv ? ' in' : ''}`}>
          <span className="sec-tag">06 · PILOT LAUNCH</span>
          <h2>Request 90-day pilot access.</h2>
          <p>
            We are accepting a limited number of 90-day pilot cohorts (30–100 patients) for qualifying hospitals, health systems, and employer health plans. Zero upfront EHR integration required.
          </p>
        </div>
        {!sent ? (
          <form className="contact-form" onSubmit={handle} id="pilot-request-form">
            <div className="cf-row">
              <div className="cf-field">
                <label className="cf-label" htmlFor="cf-email">WORK EMAIL</label>
                <input id="cf-email" type="email" className="cf-input" placeholder="name@healthsystem.org"
                  value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <div className="cf-field">
                <label className="cf-label" htmlFor="cf-org">ORGANIZATION</label>
                <input id="cf-org" type="text" className="cf-input" placeholder="Hospital / Health System / Payer"
                  value={org} onChange={e => setOrg(e.target.value)} required />
              </div>
            </div>
            <div className="cf-field" style={{ marginBottom: '1.25rem' }}>
              <label className="cf-label" htmlFor="cf-role">YOUR ROLE</label>
              <input id="cf-role" type="text" className="cf-input" placeholder="CMO / VP Population Health / Director of Clinical Operations"
                value={role} onChange={e => setRole(e.target.value)} />
            </div>
            <button type="submit" className="cf-submit" id="cf-submit-btn">Request pilot brief & sample protocol →</button>
            <div className="cf-note">We respond within 48 hours with our IRB-ready protocol template, clinical outcome methodology, and pilot timeline.</div>
          </form>
        ) : (
          <div className="contact-sent" id="contact-confirmation">
            <div className="cs-check">✓</div>
            <div className="cs-msg">Pilot request received. Our clinical ops team will send the protocol brief within 48 hours.</div>
            <div className="cs-ref">REF: {Date.now().toString(36).toUpperCase()}</div>
          </div>
        )}
        <div className="contact-alt">
          <span>Prefer a direct clinical discussion?</span>
          <a href="mailto:pilots@fitihealth.com">pilots@fitihealth.com</a>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════════════════════════ */
function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="ft-brand">
            <div className="ft-logo">
              <span className="logo-fi">Fi</span>
              <span className="logo-ti">Ti</span>
              <span className="logo-dot" />
            </div>
            <div className="ft-tagline">Clinical-Grade Social Health Platform</div>
            <div className="ft-legal">FiTi Health Technologies, Inc.</div>
            <div className="ft-certs">
              <span className="ft-cert">HIPAA READY</span>
              <span className="ft-cert">HL7 FHIR R4</span>
              <span className="ft-cert">IRB-COMPLIANT</span>
              <span className="ft-cert">ZERO EHR DELAY PILOT</span>
            </div>
          </div>
          <div className="ft-nav">
            {[
              { head: 'Platform', links: [['#platform','How It Works'],['#security','Clinical & Privacy'],['#interface','Two Surfaces']] },
              { head: 'Partners', links: [['#audiences','Health Systems'],['#audiences','Payers'],['#audiences','Research']] },
              { head: 'Pilot Program', links: [['#contact','Request 90-Day Pilot'],['#faq','FAQ'],['mailto:pilots@fitihealth.com','Contact']] },
            ].map(col => (
              <div className="ft-col" key={col.head}>
                <div className="ft-col-head">{col.head}</div>
                {col.links.map(([h, l]) => <a href={h} key={l}>{l}</a>)}
              </div>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <div className="fb-copy">
            © {year} FiTi Health Technologies, Inc. All outcome benchmarks and cost projections on this site are illustrative estimates modeled from published social-prescribing literature and systematic health economics reviews. Individual clinical results will vary.
          </div>
          <div className="fb-mono">ACCEPTING 90-DAY PILOT COHORTS</div>
        </div>
      </div>
    </footer>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   APP
   ═══════════════════════════════════════════════════════════════════════════ */
export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Evidence />
        <Platform />
        <Security />
        <Interface />
        <PilotModeler />
        <Audiences />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
