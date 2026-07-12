import { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

/* ═══════════════════════════════════════
   DESIGN TOKENS
═══════════════════════════════════════ */
const C = {
  forest:       "#0D3B2E",
  forestMid:    "#1B5E42",
  amber:        "#E8A838",
  cream:        "#FAFAF7",
  white:        "#FFFFFF",
  clinical:     "#2A9D8F",
  clinicalLight:"#C8ECE9",
  alert:        "#D64F26",
  alertLight:   "#FDEADE",
  charcoal:     "#1A1A1A",
  mid:          "#6B6B6B",
  muted:        "#EEECE6",
  border:       "#E0DDD5",
};

/* ═══════════════════════════════════════
   DATA
═══════════════════════════════════════ */
const phqData = [
  { w: "Wk 1", v: 12.4 }, { w: "Wk 2", v: 11.8 },
  { w: "Wk 4", v: 10.1 }, { w: "Wk 6", v: 9.0 },
  { w: "Wk 8", v: 7.8 },  { w: "Wk 10", v: 7.1 },
  { w: "Wk 12", v: 6.4 },
];

const roiData = [
  { m: "Mo 1",  cost: 48, savings: 14  },
  { m: "Mo 3",  cost: 48, savings: 56  },
  { m: "Mo 6",  cost: 48, savings: 148 },
  { m: "Mo 9",  cost: 48, savings: 268 },
  { m: "Mo 12", cost: 48, savings: 416 },
];

const riskDist = [
  { tier: "Low Risk",    n: 1840, pct: 76.7, color: C.clinical },
  { tier: "Medium Risk", n: 420,  pct: 17.5, color: C.amber    },
  { tier: "High Risk",   n: 140,  pct: 5.8,  color: C.alert    },
];

/* ═══════════════════════════════════════
   SHARED COMPONENTS
═══════════════════════════════════════ */
const Card = ({ children, style = {} }) => (
  <div style={{
    background: C.white, border: `1px solid ${C.border}`,
    borderRadius: 12, padding: "20px 24px", ...style
  }}>
    {children}
  </div>
);

const SectionHeader = ({ label, title, desc }) => (
  <div style={{ marginBottom: 32 }}>
    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: C.amber, marginBottom: 8 }}>
      {label}
    </div>
    <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 28, fontWeight: 400, color: C.forest, margin: "0 0 10px" }}>
      {title}
    </h2>
    {desc && <p style={{ color: C.mid, fontSize: 14, lineHeight: 1.7, maxWidth: 580, margin: 0 }}>{desc}</p>}
  </div>
);

const Eyebrow = ({ children, color = C.amber }) => (
  <div style={{ fontSize: 10, fontWeight: 700, color, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>
    {children}
  </div>
);

const Logo = ({ light = false, size = 1 }) => {
  const col = light ? C.cream : C.forest;
  return (
    <svg width={88 * size} height={26 * size} viewBox="0 0 88 26">
      <circle cx={7} cy={7} r={3.5} fill={C.amber} />
      <circle cx={18} cy={20} r={3.5} fill={C.amber} />
      <line x1={7} y1={7} x2={18} y2={20} stroke={C.amber} strokeWidth={1.5} opacity={0.55} />
      <text x={28} y={21} fontFamily="Georgia,'Times New Roman',serif" fontSize={22} fontWeight={700} fill={col}>
        FiTi
      </text>
    </svg>
  );
};

const Phone = ({ children }) => (
  <div style={{ width: 250, background: "#1A1A1A", borderRadius: 36, padding: "12px 7px 22px", boxShadow: "0 24px 60px rgba(0,0,0,0.35)", margin: "0 auto" }}>
    <div style={{ height: 18, display: "flex", justifyContent: "center", alignItems: "center", marginBottom: 4 }}>
      <div style={{ width: 54, height: 5, background: "#333", borderRadius: 99 }} />
    </div>
    <div style={{ background: C.cream, borderRadius: 26, overflow: "hidden", minHeight: 468 }}>
      {children}
    </div>
  </div>
);

/* ═══════════════════════════════════════
   MEMBER APP SCREEN
═══════════════════════════════════════ */
const MemberScreen = () => (
  <div style={{ fontFamily: "'DM Sans',Arial,sans-serif", fontSize: 12 }}>
    <div style={{ background: C.forest, color: "rgba(255,255,255,0.6)", fontSize: 9, padding: "7px 13px", display: "flex", justifyContent: "space-between" }}>
      <span>9:41</span><span>●●●</span>
    </div>
    <div style={{ background: C.forest, padding: "12px 14px 20px" }}>
      <div style={{ fontSize: 9, color: "rgba(255,255,255,0.45)", marginBottom: 3 }}>Monday · June 23</div>
      <div style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: 17, color: C.cream, lineHeight: 1.2 }}>
        Good morning, Sarah.
      </div>
      <div style={{ fontSize: 10, color: C.amber, marginTop: 5 }}>Your circle is active today ↑</div>
    </div>

    {/* Wellness badge */}
    <div style={{ background: C.clinicalLight, margin: "10px 10px 0", borderRadius: 10, padding: "10px 12px", display: "flex", justifyContent: "space-between" }}>
      <div>
        <div style={{ fontSize: 8, fontWeight: 700, color: C.clinical, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 2 }}>Wellness Score</div>
        <div style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: 20, color: C.forest }}>
          6.4 <span style={{ fontSize: 10, fontFamily: "sans-serif", color: C.mid }}>PHQ-9</span>
        </div>
      </div>
      <div style={{ textAlign: "right" }}>
        <div style={{ fontSize: 10, color: C.clinical, fontWeight: 700 }}>↓ 48% better</div>
        <div style={{ fontSize: 9, color: C.mid }}>since week 1</div>
      </div>
    </div>

    {/* Circle */}
    <div style={{ padding: "12px 10px 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <div style={{ fontWeight: 700, color: C.charcoal }}>Your Circle</div>
        <div style={{ fontSize: 10, color: C.amber, fontWeight: 700 }}>8 people</div>
      </div>
      <div style={{ display: "flex", gap: 5, justifyContent: "center" }}>
        {["A","K","M","J","L","D","T","N"].map((l, i) => (
          <div key={i} style={{
            width: 25, height: 25, borderRadius: "50%",
            background: [C.forest, C.clinical, C.amber, C.forestMid][i % 4],
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 9, fontWeight: 700, color: C.white,
            border: `2px solid ${C.cream}`, flexShrink: 0,
          }}>{l}</div>
        ))}
      </div>
      <div style={{ fontSize: 8, textAlign: "center", color: C.mid, marginTop: 5 }}>avg 1.8 km apart · 3 active now</div>
    </div>

    {/* Activity card */}
    <div style={{ margin: "10px 10px 0", background: C.white, border: `1px solid ${C.border}`, borderRadius: 10, padding: "9px 11px" }}>
      <div style={{ fontSize: 8, color: C.amber, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>Tomorrow · 7:00 AM</div>
      <div style={{ fontWeight: 700, color: C.charcoal, margin: "2px 0" }}>Morning Walk · Uhuru Park</div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 10, color: C.mid }}>3 from your circle going</div>
        <button style={{ background: C.forest, color: C.white, border: "none", borderRadius: 7, padding: "5px 10px", fontSize: 9, fontWeight: 700 }}>Join</button>
      </div>
    </div>

    {/* Coach */}
    <div style={{ margin: "10px 10px 12px", padding: "9px 11px", background: `rgba(232,168,56,0.09)`, border: `1px solid rgba(232,168,56,0.3)`, borderRadius: 10 }}>
      <div style={{ fontSize: 8, color: C.amber, fontWeight: 700, marginBottom: 3 }}>✦ FiTi Coach</div>
      <div style={{ fontSize: 10, color: C.charcoal, lineHeight: 1.5 }}>Kelvin sent you a message 2h ago. Want to reply?</div>
    </div>

    {/* Bottom nav */}
    <div style={{ background: C.white, borderTop: `1px solid ${C.border}`, display: "flex", justifyContent: "space-around", padding: "7px 0 4px" }}>
      {[["🏠","Home"],["🔗","Circle"],["📅","Events"],["👤","Me"]].map(([icon, name], i) => (
        <div key={name} style={{ textAlign: "center" }}>
          <div style={{ fontSize: 14 }}>{icon}</div>
          <div style={{ fontSize: 7, color: i === 0 ? C.forest : C.mid, fontWeight: i === 0 ? 700 : 400 }}>{name}</div>
        </div>
      ))}
    </div>
  </div>
);

/* ═══════════════════════════════════════
   SECTION 1: BRAND
═══════════════════════════════════════ */
const BrandSection = () => {
  const palette = [
    { name: "Forest",        hex: "#0D3B2E", role: "Primary Brand",     note: "Navigation, headers, trust anchor. The backbone of every surface." },
    { name: "Forest Mid",    hex: "#1B5E42", role: "Interactive",        note: "Hover states, pressed backgrounds, secondary buttons." },
    { name: "Amber",         hex: "#E8A838", role: "CTA + Connection",   note: "Primary buttons, active states, connection nodes in logo + graph." },
    { name: "Clinical Teal", hex: "#2A9D8F", role: "Medical Data Only",  note: "PHQ-9 scores, health trend lines — reserved for clinical context exclusively." },
    { name: "Alert",         hex: "#D64F26", role: "High-Risk Flag",     note: "Critical patient alerts only. Treat it like a fire alarm — use it rarely." },
    { name: "Cream",         hex: "#FAFAF7", role: "App Background",     note: "Warm canvas. Never pure white at the background level — too sterile." },
    { name: "White",         hex: "#FFFFFF", role: "Card Surface",       note: "Cards, input fields, modal backgrounds. One level above cream." },
    { name: "Charcoal",      hex: "#1A1A1A", role: "Body Text",          note: "All primary text. Never pure #000 — it reads as harsh on cream." },
  ];

  const voices = [
    {
      ctx: "Member notification",
      do:   "It's been 5 days. Kelvin sent you a message — want to reply?",
      dont: "Alert: Social engagement below threshold.",
    },
    {
      ctx: "Clinical alert",
      do:   "James hasn't connected in 14 days. His PHQ-9 is rising.",
      dont: "High-risk patient flagged. Intervention recommended.",
    },
    {
      ctx: "Executive report",
      do:   "This cohort recovered 2.3× faster than your baseline.",
      dont: "Platform efficacy metrics exceed benchmark KPIs.",
    },
  ];

  return (
    <div>
      <SectionHeader
        label="01 — Brand System"
        title="Warm. Rigorous. Human."
        desc="FiTi needs to make a health system trust it and a lonely person want to open it. Every visual choice serves both of those goals simultaneously."
      />

      {/* Logo */}
      <Card style={{ marginBottom: 24 }}>
        <Eyebrow color={C.mid}>Wordmark</Eyebrow>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 20 }}>
          {[
            { bg: C.cream,   border: `1px solid ${C.border}`, light: false, label: "On cream"   },
            { bg: C.forest,  border: "none",                  light: true,  label: "On forest"  },
            { bg: C.amber,   border: "none",                  light: false, label: "On amber"   },
          ].map(({ bg, border, light, label }) => (
            <div key={label}>
              <div style={{ background: bg, border, borderRadius: 10, padding: "16px 26px", marginBottom: 6 }}>
                <Logo light={light} size={1.25} />
              </div>
              <div style={{ fontSize: 10, color: C.mid, textAlign: "center" }}>{label}</div>
            </div>
          ))}
        </div>
        <div style={{ padding: "12px 16px", background: C.muted, borderRadius: 8, fontSize: 12, color: C.mid, lineHeight: 1.7 }}>
          The two amber nodes (●—●) represent two people finding each other. The diagonal line is the connection. This motif repeats in the community graph, the risk heat map, and brand textures.{" "}
          <strong style={{ color: C.charcoal }}>Never use an ECG line, a cross, or a smiley face</strong> — every health company already does.
        </div>
      </Card>

      {/* Colors */}
      <Card style={{ marginBottom: 24 }}>
        <Eyebrow color={C.mid}>Color System</Eyebrow>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(185px, 1fr))", gap: 12, marginBottom: 16 }}>
          {palette.map(p => (
            <div key={p.name} style={{ borderRadius: 10, overflow: "hidden", border: `1px solid ${C.border}` }}>
              <div style={{ background: p.hex, height: 50 }} />
              <div style={{ padding: "10px 12px" }}>
                <div style={{ fontWeight: 700, fontSize: 13, color: C.charcoal }}>{p.name}</div>
                <div style={{ fontFamily: "monospace", fontSize: 11, color: C.mid, marginTop: 1 }}>{p.hex}</div>
                <div style={{ fontSize: 10, fontWeight: 700, color: C.amber, marginTop: 4, textTransform: "uppercase", letterSpacing: "0.04em" }}>{p.role}</div>
                <div style={{ fontSize: 11, color: C.mid, marginTop: 4, lineHeight: 1.5 }}>{p.note}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: "12px 16px", background: C.muted, borderRadius: 8, fontSize: 12, color: C.mid, lineHeight: 1.7 }}>
          <strong style={{ color: C.charcoal }}>Why not blue?</strong> Headspace correctly called healthcare a "dreary sea of blues and greys." Forest green + amber is warm enough to feel human, deep enough to feel credible. Clinical teal is reserved <em>exclusively</em> for clinical data — users learn to trust it as "this is a health number."
        </div>
      </Card>

      {/* Typography */}
      <Card style={{ marginBottom: 24 }}>
        <Eyebrow color={C.mid}>Typography System</Eyebrow>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }}>
          <div>
            <div style={{ fontSize: 9, color: C.amber, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>Display · DM Serif Display</div>
            <div style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: 26, color: C.forest, lineHeight: 1.2, marginBottom: 10 }}>
              Human connection, clinically proven.
            </div>
            <div style={{ fontSize: 11, color: C.mid, lineHeight: 1.6 }}>Hero headlines, emotional peaks (e.g. "Meet your circle"). Max 2 lines. Never in buttons or labels.</div>
          </div>
          <div>
            <div style={{ fontSize: 9, color: C.amber, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>UI + Body · DM Sans</div>
            <div style={{ fontSize: 14, color: C.charcoal, lineHeight: 1.7, marginBottom: 10 }}>
              FiTi detects early isolation signals and connects people before they become patients. Every match is optimized for geography, interest, and schedule.
            </div>
            <div style={{ fontSize: 11, color: C.mid, lineHeight: 1.6 }}>All interface text. Weight 400 for body, 600 for labels, 700 for numbers that matter.</div>
          </div>
          <div>
            <div style={{ fontSize: 9, color: C.amber, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>Clinical Data · IBM Plex Mono</div>
            <div style={{ fontFamily: "monospace", fontSize: 24, color: C.clinical, marginBottom: 4 }}>PHQ-9: 6.4</div>
            <div style={{ fontFamily: "monospace", fontSize: 14, color: C.mid, marginBottom: 10 }}>−48.3% · 12 weeks</div>
            <div style={{ fontSize: 11, color: C.mid, lineHeight: 1.6 }}>Clinical metrics only. Never use in marketing copy. Reserving monospace for numbers makes every number feel like evidence.</div>
          </div>
        </div>
      </Card>

      {/* Voice */}
      <Card>
        <Eyebrow color={C.mid}>Voice & Tone — Do / Don't</Eyebrow>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {voices.map(v => (
            <div key={v.ctx}>
              <div style={{ fontSize: 10, fontWeight: 700, color: C.mid, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>{v.ctx}</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div style={{ padding: "12px 14px", background: "#F0FAF5", border: "1px solid #B8E2C8", borderRadius: 8 }}>
                  <div style={{ fontSize: 9, fontWeight: 700, color: "#2D7A57", marginBottom: 6 }}>✓ DO</div>
                  <div style={{ fontSize: 13, color: C.charcoal, lineHeight: 1.5 }}>"{v.do}"</div>
                </div>
                <div style={{ padding: "12px 14px", background: "#FFF4F1", border: "1px solid #F5C0AC", borderRadius: 8 }}>
                  <div style={{ fontSize: 9, fontWeight: 700, color: C.alert, marginBottom: 6 }}>✗ DON'T</div>
                  <div style={{ fontSize: 13, color: C.charcoal, lineHeight: 1.5 }}>"{v.dont}"</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

/* ═══════════════════════════════════════
   SECTION 2: ARCHITECTURE
═══════════════════════════════════════ */
const ArchSection = () => {
  const surfaces = [
    {
      title: "Member App", sub: "iOS + Android", color: C.forest,
      who: "Patients, community members",
      modules: ["Passive sensing (opt-in)", "PHQ-9 + UCLA-3 check-ins", "AI community matching", "Activity discovery + RSVP", "Circle messaging", "AI coach nudges"],
      warn: "Must run on low-end Android. Offline mode for core features. 50MB install ceiling.",
    },
    {
      title: "Clinical Dashboard", sub: "Web · Desktop-first", color: C.clinical,
      who: "Nurses, care coordinators, social prescribers",
      modules: ["Population risk heat map", "High-risk alert feed", "Individual PHQ-9 timelines", "EHR write-back (FHIR R4)", "Outcome report export", "Intervention logging"],
      warn: "Epic/Cerner SSO login. HIPAA audit trail on every action. PDF export for payer reimbursement.",
    },
    {
      title: "Admin Portal", sub: "Web · Executive", color: C.amber,
      who: "VP Innovation, Population Health Directors, Payers",
      modules: ["Live ROI calculator", "Cohort-level analytics", "Contract + pilot tracking", "FHIR API health status", "Benchmark comparisons", "De-identified data export"],
      warn: "This surface IS your sales tool. When a payer logs in for the first time, they see their own projected savings.",
    },
  ];

  const layers = [
    { icon: "📍", name: "Passive Behavioral",    color: C.forest,
      items: ["Location diversity score (on-device)", "Calendar density (opt-in sync)", "Device usage patterns"],
      note: "On-device only. Differential privacy ε=0.1. Raw GPS never leaves the phone. This prevents FDA/regulatory exposure." },
    { icon: "💬", name: "Self-Reported Clinical", color: C.clinical,
      items: ["PHQ-9 (monthly · 7 questions)", "UCLA-3 Loneliness Scale (monthly)", "Daily mood check-in (1 tap · 30 sec)"],
      note: "This is your clinical evidence layer. PHQ-9 is what payers and hospitals trust. Never skip it or gamify it." },
    { icon: "🔗", name: "Community Engagement",   color: C.amber,
      items: ["Activity attendance rate", "Message frequency in circle", "Group participation score"],
      note: "Unique to FiTi. No competitor has this data. It's also your matching feedback loop — it makes matching smarter over time." },
    { icon: "🏥", name: "Clinical External (EHR)",color: C.alert,
      items: ["ER visit claims (FHIR read)", "Diagnosis codes (ICD-10)", "Prior hospitalization history"],
      note: "Requires signed BAA + FHIR integration. This is your ROI proof layer — the actuarial evidence payers require." },
  ];

  return (
    <div>
      <SectionHeader
        label="02 — Platform Architecture"
        title="Three surfaces. One data layer. One truth."
        desc="FiTi is not one app. It's three connected surfaces, each serving a different buyer, a different job, and a different trust contract."
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 40 }}>
        {surfaces.map(s => (
          <Card key={s.title} style={{ borderTop: `4px solid ${s.color}`, padding: 20 }}>
            <div style={{ fontWeight: 800, fontSize: 16, color: C.charcoal }}>{s.title}</div>
            <div style={{ fontSize: 11, color: C.mid, marginTop: 2, marginBottom: 14 }}>{s.sub}</div>
            <Eyebrow>Users</Eyebrow>
            <div style={{ fontSize: 12, color: C.charcoal, marginBottom: 14, lineHeight: 1.5 }}>{s.who}</div>
            <Eyebrow>Core Modules</Eyebrow>
            {s.modules.map(m => (
              <div key={m} style={{ fontSize: 12, color: C.charcoal, padding: "5px 0", borderBottom: `1px solid ${C.border}`, display: "flex", gap: 8 }}>
                <span style={{ color: s.color, fontWeight: 700, flexShrink: 0 }}>▸</span>{m}
              </div>
            ))}
            <div style={{ marginTop: 14, padding: "10px 12px", background: `rgba(0,0,0,0.03)`, border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 11, color: C.mid, lineHeight: 1.6 }}>
              ⚑ {s.warn}
            </div>
          </Card>
        ))}
      </div>

      <SectionHeader
        label="Data Architecture"
        title="Four layers. Each one earns more trust."
        desc="The combination of passive signals + clinical scores + community data + EHR integration is FiTi's defensible moat. No single layer is enough alone."
      />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {layers.map(d => (
          <Card key={d.name}>
            <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 14 }}>
              <span style={{ fontSize: 26 }}>{d.icon}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: C.charcoal }}>{d.name}</div>
                <div style={{ fontSize: 9, fontWeight: 700, color: d.color, textTransform: "uppercase", letterSpacing: "0.08em" }}>Data Layer</div>
              </div>
            </div>
            {d.items.map(item => (
              <div key={item} style={{ fontSize: 12, color: C.charcoal, padding: "5px 0", borderBottom: `1px solid ${C.border}`, display: "flex", gap: 8 }}>
                <span style={{ color: d.color, fontWeight: 700 }}>→</span>{item}
              </div>
            ))}
            <div style={{ marginTop: 12, padding: "10px 12px", background: `rgba(0,0,0,0.025)`, border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 11, color: C.charcoal, lineHeight: 1.6 }}>
              {d.note}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════
   SECTION 3: ONBOARDING
═══════════════════════════════════════ */
const OnboardSection = ({ role, setRole }) => {
  const [step, setStep] = useState(0);

  const flows = {
    Member: {
      hl:   "Consumer-grade warmth. Clinical-grade intent.",
      note: "The member never hears the words 'depression' or 'loneliness.' They hear 'connection.' The clinical value is built in, invisibly.",
      steps: [
        { title: "The Promise",       cta: "Get Started",      body: "You shouldn't have to earn connection.",               detail: "Single screen. Logo. One line of copy. A forest green button. No features list, no stats panel. Just the promise — and enough trust that it lands." },
        { title: "Permission Story",  cta: "Allow Location",   body: "Here's what we need — and exactly why.",              detail: "Explain each permission before requesting it. Location: 'to find activities near you.' Calendar: 'to suggest times when you're free.' Notifications: 'so your circle can reach you.' Each toggle has a one-sentence explanation. Never batch all requests." },
        { title: "Baseline Check-In", cta: "Continue →",       body: "How have you been feeling lately?",                   detail: "7 PHQ-9 questions reframed conversationally. 'Little interest or pleasure in doing things' becomes 'How often do you find things enjoyable?' Progress bar at top. No clinical language visible. Skip exists but is subtle." },
        { title: "What Energizes You?",cta: "Next →",          body: "Choose what sounds like you.",                        detail: "Tappable chips: Walking · Coffee chats · Books · Music · Cooking · Sports · Art · Markets. Feeds the matching algorithm. Require at least 2 selections. This is the first moment they feel seen by the product." },
        { title: "When Are You Free?",cta: "Find My Circle",   body: "Your circle will work around your life.",             detail: "Morning / Afternoon / Evenings preference. Weekdays / Weekends / Flexible toggle. This single step prevents timing mismatches, which are the #1 reason early users churn from community apps." },
        { title: "Meet Your Circle",  cta: "Meet Them",        body: "8 people. 2km from you. Things in common.",           detail: "Animated reveal: 8 profile cards fade in one by one. First names only. Shared interests shown as chips. Distance shown. Treat this like a movie reveal — it is the emotional peak of onboarding. Do not rush it." },
        { title: "First Connection",  cta: "Say Hello →",      body: "One small step.",                                     detail: "A single low-stakes action: 'Reply to Amara's greeting' or 'Join tomorrow's morning walk.' Remove all friction. This is your activation event. If they complete this, they will come back." },
      ],
    },
    Clinician: {
      hl:   "3 steps. Zero paper. You're monitoring a cohort.",
      note: "Clinical users are time-poor, change-skeptical, and already overwhelmed by bad software. Every extra screen costs you the contract. Make it feel like their EHR, not a startup.",
      steps: [
        { title: "SSO Login",         cta: "Sign in with Epic", body: "Sign in with your hospital credentials.",            detail: "SAML-based SSO through Epic or Cerner. No separate FiTi password. The login page looks like a hospital system — clean, dense, professional. If their institution isn't integrated yet: email + 2FA fallback with a clear integration timeline." },
        { title: "Cohort Assignment", cta: "Configure Cohort",  body: "Which patients are you monitoring?",                detail: "Pre-configured cohort dropdown (set by admin). Select: Primary Care / Mental Health / Chronic Disease / Post-Discharge. Set alert thresholds: flag if PHQ-9 > 12, or no community engagement in 7+ days. Two inputs. Done in 90 seconds." },
        { title: "Dashboard Ready",   cta: "Start 5-min Tour",  body: "Your population, right now.",                       detail: "Optional guided tour of 3 views: Risk heat map → Alert feed → Outcome report export. Skip is prominent — never trap clinicians in tutorials. Tour leads with the PHQ-9 trend chart since that's what they'll check every morning." },
      ],
    },
    Executive: {
      hl:   "You see your ROI before you sign anything.",
      note: "The executive buyer needs to feel like they already own this. Give them their population data in the demo. Show their savings, their breakeven date — before they've given you a cent.",
      steps: [
        { title: "Your Numbers First", cta: "See My ROI →",        body: "What's your member population?",                 detail: "Single input: member count. Dropdown: Health System / Payer / Self-insured Employer. Instant output: projected ER reduction, annual savings estimate, breakeven month. This IS the demo. Real numbers for their population, no commitment required." },
        { title: "90-Day Pilot",       cta: "Start My Pilot",      body: "Real results. Zero integration required.",       detail: "Pilot terms: 200 members, 90 days, $0 integration fee. FiTi provides setup, matching, clinical data collection, and an outcome report. They provide a signed BAA and patient consent language. No EHR integration required for the pilot — remove every barrier to yes." },
        { title: "EHR Integration",    cta: "Schedule Integration", body: "FHIR R4 API. Already listed on Epic App Orchard.", detail: "Step-by-step wizard: Authorize FiTi in Epic App Orchard → Map patient identifiers → Enable read access for relevant data types. Technical team executes this — the executive just approves. Estimated 2-week setup. FiTi engineers are on-call for the sprint." },
      ],
    },
  };

  const flow = flows[role];

  return (
    <div>
      <SectionHeader
        label="03 — Onboarding Flows"
        title="Three roles. Three completely different jobs."
        desc="Member onboarding should feel like Duolingo. Clinical onboarding should feel like their EHR. Executive onboarding should feel like a Bloomberg demo — show them their own data first."
      />

      <div style={{ display: "flex", gap: 8, marginBottom: 28 }}>
        {Object.keys(flows).map(r => (
          <button key={r} onClick={() => { setRole(r); setStep(0); }} style={{
            padding: "10px 22px", borderRadius: 8, cursor: "pointer",
            fontWeight: 600, fontSize: 13, fontFamily: "inherit",
            background: role === r ? C.forest : C.white,
            color: role === r ? C.cream : C.mid,
            border: `1px solid ${role === r ? C.forest : C.border}`,
          }}>
            {r}
          </button>
        ))}
      </div>

      <Card style={{ marginBottom: 24, borderLeft: `4px solid ${C.amber}` }}>
        <div style={{ fontWeight: 700, fontSize: 15, color: C.charcoal, marginBottom: 6 }}>{flow.hl}</div>
        <div style={{ fontSize: 13, color: C.mid, lineHeight: 1.7 }}>{flow.note}</div>
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {flow.steps.map((s, i) => (
            <div key={i} onClick={() => setStep(i)} style={{
              padding: "10px 14px", borderRadius: 10, cursor: "pointer",
              background: step === i ? C.forest : C.white,
              border: `1px solid ${step === i ? C.forest : C.border}`,
            }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <div style={{
                  width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
                  background: step === i ? C.amber : C.muted,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, fontWeight: 700,
                  color: step === i ? C.forest : C.mid,
                }}>{i + 1}</div>
                <div style={{ fontSize: 12, fontWeight: step === i ? 700 : 500, color: step === i ? C.cream : C.charcoal, lineHeight: 1.3 }}>
                  {s.title}
                </div>
              </div>
            </div>
          ))}
        </div>

        <Card style={{ borderTop: `3px solid ${C.amber}` }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: C.amber, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>
            Step {step + 1} of {flow.steps.length}
          </div>
          <div style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: 22, color: C.forest, lineHeight: 1.35, marginBottom: 12 }}>
            {flow.steps[step].body}
          </div>
          <div style={{ fontSize: 14, color: C.mid, lineHeight: 1.75, marginBottom: 22 }}>
            {flow.steps[step].detail}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <button style={{ background: C.forest, color: C.cream, border: "none", borderRadius: 8, padding: "12px 24px", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
              {flow.steps[step].cta}
            </button>
            {step < flow.steps.length - 1 && (
              <button onClick={() => setStep(s => Math.min(s + 1, flow.steps.length - 1))}
                style={{ background: "none", border: "none", color: C.mid, fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>
                Next step →
              </button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════
   SECTION 4: SCREENS
═══════════════════════════════════════ */
const ScreensSection = () => (
  <div>
    <SectionHeader
      label="04 — Screen Designs"
      title="The three screens that close deals."
      desc="The member app gets people to show up. The clinical dashboard gets hospitals to trust you. The executive portal gets payers to sign."
    />

    <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 40, alignItems: "start", marginBottom: 48 }}>
      {/* Phone mockup */}
      <div>
        <Eyebrow color={C.mid}>Member App · iOS/Android</Eyebrow>
        <Phone><MemberScreen /></Phone>
        <Card style={{ marginTop: 14, maxWidth: 250 }}>
          <Eyebrow color={C.mid}>Key Decisions</Eyebrow>
          {[
            "PHQ-9 shown as 'Wellness Score', not clinical label",
            "Circle = faces and first names, never usernames",
            "Coach uses amber (warmth), not clinical teal",
            "Community first. Health metrics second. Always.",
          ].map(d => (
            <div key={d} style={{ fontSize: 11, color: C.mid, padding: "5px 0", borderBottom: `1px solid ${C.border}`, display: "flex", gap: 6, lineHeight: 1.4 }}>
              <span style={{ color: C.amber, flexShrink: 0 }}>▪</span>{d}
            </div>
          ))}
        </Card>
      </div>

      {/* Clinical Dashboard mockup */}
      <div>
        <Eyebrow color={C.mid}>Clinical Dashboard · Web</Eyebrow>
        <div style={{ background: "#1C1C28", borderRadius: 14, overflow: "hidden", boxShadow: "0 16px 48px rgba(0,0,0,0.3)" }}>
          {/* Browser chrome */}
          <div style={{ background: "#2A2A3C", padding: "10px 16px", display: "flex", alignItems: "center", gap: 8 }}>
            {["#FF5F57","#FFBD2E","#28CA42"].map(col => (
              <div key={col} style={{ width: 10, height: 10, borderRadius: "50%", background: col }} />
            ))}
            <div style={{ flex: 1, background: "#18182A", borderRadius: 5, padding: "3px 12px", margin: "0 12px", fontSize: 10, color: "rgba(255,255,255,0.3)" }}>
              app.fitihealth.com/clinical
            </div>
            <Logo light size={0.7} />
          </div>
          {/* Dashboard */}
          <div style={{ background: C.cream, padding: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, color: C.charcoal }}>Population Dashboard</div>
                <div style={{ fontSize: 11, color: C.mid }}>Nairobi Hospital · Primary Care · June 2025</div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <div style={{ background: C.alertLight, border: `1px solid ${C.alert}`, borderRadius: 6, padding: "4px 10px", fontSize: 10, fontWeight: 700, color: C.alert }}>⚠ 12 High-Risk</div>
                <div style={{ background: C.clinicalLight, border: `1px solid ${C.clinical}`, borderRadius: 6, padding: "4px 10px", fontSize: 10, fontWeight: 700, color: C.clinical }}>↓ Export</div>
              </div>
            </div>

            {/* Metrics */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 16 }}>
              {[
                { l: "Active Members", v: "2,400", d: "+12% MoM",       c: C.forest   },
                { l: "Avg PHQ-9",      v: "6.4",   d: "↓ from 12.4",    c: C.clinical },
                { l: "Improvement",    v: "48%",   d: "vs 22% control",  c: C.clinical },
                { l: "High Risk",      v: "12",    d: "↓ from 31",       c: C.alert    },
              ].map(m => (
                <div key={m.l} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 12px" }}>
                  <div style={{ fontSize: 9, color: C.mid, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>{m.l}</div>
                  <div style={{ fontFamily: "monospace", fontSize: 20, fontWeight: 700, color: m.c }}>{m.v}</div>
                  <div style={{ fontSize: 9, color: C.clinical, marginTop: 2 }}>{m.d}</div>
                </div>
              ))}
            </div>

            {/* Charts row */}
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 12, marginBottom: 12 }}>
              <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 14px" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.charcoal, marginBottom: 10 }}>PHQ-9 Cohort Trend · 12-Week Pilot</div>
                <ResponsiveContainer width="100%" height={100}>
                  <AreaChart data={phqData} margin={{ top: 4, right: 4, left: -22, bottom: 0 }}>
                    <defs>
                      <linearGradient id="pg" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor={C.clinical} stopOpacity={0.25} />
                        <stop offset="95%" stopColor={C.clinical} stopOpacity={0}    />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="w" tick={{ fontSize: 8, fill: C.mid }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 8, fill: C.mid }} axisLine={false} tickLine={false} domain={[4, 14]} />
                    <Tooltip contentStyle={{ fontSize: 10, borderRadius: 6, border: `1px solid ${C.border}` }} />
                    <Area type="monotone" dataKey="v" name="Avg PHQ-9" stroke={C.clinical} fill="url(#pg)" strokeWidth={2} dot={{ r: 2.5, fill: C.clinical }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 14px" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.charcoal, marginBottom: 10 }}>Risk Distribution</div>
                {riskDist.map(r => (
                  <div key={r.tier} style={{ marginBottom: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, marginBottom: 4 }}>
                      <span style={{ color: C.charcoal }}>{r.tier}</span>
                      <span style={{ fontFamily: "monospace", color: r.color, fontWeight: 700 }}>{r.n}</span>
                    </div>
                    <div style={{ background: C.muted, borderRadius: 3, height: 5 }}>
                      <div style={{ background: r.color, width: `${r.pct}%`, height: 5, borderRadius: 3 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Alert feed */}
            {[
              { id: "#2847", sig: "14 days no community contact",   phq: 16 },
              { id: "#1923", sig: "Missed 3 scheduled activities",  phq: 14 },
              { id: "#3102", sig: "New isolation signal detected",   phq: 12 },
            ].map(a => (
              <div key={a.id} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px", marginBottom: 6, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: C.alert, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: C.charcoal }}>Patient {a.id}</div>
                    <div style={{ fontSize: 10, color: C.mid }}>{a.sig}</div>
                  </div>
                </div>
                <div style={{ fontFamily: "monospace", fontSize: 13, fontWeight: 700, color: C.alert }}>PHQ-9: {a.phq}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Executive ROI portal */}
    <div>
      <Eyebrow color={C.mid}>Executive Portal — ROI Dashboard</Eyebrow>
      <Card>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 36, alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: 22, color: C.forest, lineHeight: 1.4, marginBottom: 14 }}>
              At 2,400 members, FiTi pays for itself by month 3.
            </div>
            <div style={{ fontSize: 13, color: C.mid, lineHeight: 1.7, marginBottom: 22 }}>
              Based on $5 PMPM investment and 40% ER visit reduction. After month 3, every month is pure savings.
            </div>
            <div style={{ display: "flex", gap: 20 }}>
              <div>
                <div style={{ fontFamily: "monospace", fontSize: 26, color: C.clinical, fontWeight: 700 }}>$1.2M</div>
                <div style={{ fontSize: 11, color: C.mid }}>Year 1 net savings</div>
              </div>
              <div style={{ width: 1, background: C.border }} />
              <div>
                <div style={{ fontFamily: "monospace", fontSize: 26, color: C.forest, fontWeight: 700 }}>10.3×</div>
                <div style={{ fontSize: 11, color: C.mid }}>ROI ratio</div>
              </div>
            </div>
          </div>
          <div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={roiData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor={C.clinical} stopOpacity={0.2} />
                    <stop offset="95%" stopColor={C.clinical} stopOpacity={0}   />
                  </linearGradient>
                  <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor={C.alert} stopOpacity={0.15} />
                    <stop offset="95%" stopColor={C.alert} stopOpacity={0}    />
                  </linearGradient>
                </defs>
                <XAxis dataKey="m" tick={{ fontSize: 10, fill: C.mid }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: C.mid }} axisLine={false} tickLine={false} unit="k" />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 6, border: `1px solid ${C.border}` }} />
                <Area type="monotone" dataKey="savings" name="Healthcare Savings ($k)" stroke={C.clinical} fill="url(#sg)" strokeWidth={2.5} />
                <Area type="monotone" dataKey="cost"    name="FiTi Cost ($k)"          stroke={C.alert}    fill="url(#cg)" strokeWidth={2} strokeDasharray="5 3" />
              </AreaChart>
            </ResponsiveContainer>
            <div style={{ display: "flex", gap: 20, justifyContent: "center", marginTop: 10 }}>
              {[{ c: C.clinical, l: "Healthcare Savings", dash: false }, { c: C.alert, l: "FiTi Cost", dash: true }].map(({ c, l, dash }) => (
                <div key={l} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: C.mid }}>
                  <svg width={24} height={4} viewBox="0 0 24 4">
                    {dash
                      ? <line x1={0} y1={2} x2={24} y2={2} stroke={c} strokeWidth={2} strokeDasharray="4 2" />
                      : <line x1={0} y1={2} x2={24} y2={2} stroke={c} strokeWidth={2.5} />
                    }
                  </svg>
                  {l}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  </div>
);

/* ═══════════════════════════════════════
   SECTION 5: POSITIONING
═══════════════════════════════════════ */
const PositionSection = () => {
  const competitors = [
    { name: "FiTi",             x: 76, y: 18, highlight: true  },
    { name: "Lyra Health",      x: 18, y: 74, highlight: false },
    { name: "Headspace",        x: 24, y: 28, highlight: false },
    { name: "BetterHelp",       x: 14, y: 66, highlight: false },
    { name: "Access Elemental", x: 60, y: 36, highlight: false },
    { name: "Noom",             x: 34, y: 46, highlight: false },
  ];

  const tiers = [
    { name: "Pilot",               price: "$0",           detail: "90 days · 200 members · No EHR required · Full outcome report at close",   tag: "Easiest yes",    color: C.clinical },
    { name: "Health System",       price: "$5–8 PMPM",    detail: "Annual contract · EHR integration · Dedicated CSM · Unlimited member count", tag: "Primary revenue", color: C.forest   },
    { name: "Payer / Risk-Based",  price: "Shared savings",detail: "% of actuarial savings · Outcomes guarantee · Multi-year · No upfront fee", tag: "Highest margin", color: C.amber    },
  ];

  const blockers = [
    { issue: "Demo numbers look fake",        fix: "Label all demo data clearly. Replace placeholder testimonials with anonymized case study format." },
    { issue: "Passive sensing is overstated", fix: "Clarify on-device processing limits. iOS blocks call logs — don't claim otherwise in the deck." },
    { issue: "No real clinical evidence",     fix: "Run one IRB-approved pilot, 200 people, 8 weeks. That data transforms the pitch from story to proof." },
    { issue: "Sales cycle underestimated",    fix: "Budget 12–18 months for a health system contract. Start Kenya / NHIF first — faster to a signed deal." },
  ];

  return (
    <div>
      <SectionHeader
        label="05 — Market Positioning"
        title="Own the quadrant no one else is in."
        desc="Lyra is treatment. Headspace is consumer wellness. FiTi is population prevention infrastructure. Different buyer, different budget, defensible moat."
      />

      {/* Competitor map */}
      <Card style={{ marginBottom: 32 }}>
        <Eyebrow color={C.mid}>Competitive Map — Where FiTi Lives</Eyebrow>
        <div style={{ position: "relative", height: 280, background: C.muted, borderRadius: 10, border: `1px solid ${C.border}`, overflow: "hidden", marginBottom: 16 }}>
          {/* FiTi zone highlight */}
          <div style={{ position: "absolute", top: 0, right: 0, width: "50%", height: "50%", background: "rgba(232,168,56,0.06)", borderBottom: `1px dashed rgba(232,168,56,0.35)`, borderLeft: `1px dashed rgba(232,168,56,0.35)` }} />
          <div style={{ position: "absolute", top: 8, right: 10, fontSize: 9, color: "rgba(232,168,56,0.7)", fontWeight: 700 }}>FiTi's Zone</div>
          {/* Axis labels */}
          <div style={{ position: "absolute", top: 10, left: "28%", fontSize: 9, fontWeight: 700, color: C.mid, textTransform: "uppercase", letterSpacing: "0.06em" }}>← Prevention</div>
          <div style={{ position: "absolute", bottom: 10, right: "8%", fontSize: 9, fontWeight: 700, color: C.mid, textTransform: "uppercase", letterSpacing: "0.06em" }}>Treatment →</div>
          <div style={{ position: "absolute", top: "42%", left: 6, fontSize: 8, fontWeight: 700, color: C.mid, textTransform: "uppercase", letterSpacing: "0.04em", writingMode: "vertical-rl", transform: "rotate(180deg)" }}>Individual</div>
          <div style={{ position: "absolute", top: "32%", right: 6, fontSize: 8, fontWeight: 700, color: C.mid, textTransform: "uppercase", letterSpacing: "0.04em", writingMode: "vertical-rl" }}>Population</div>
          {/* Axes */}
          <div style={{ position: "absolute", top: "50%", left: 24, right: 24, height: 1, background: C.border }} />
          <div style={{ position: "absolute", left: "50%", top: 20, bottom: 20, width: 1, background: C.border }} />
          {/* Dots */}
          {competitors.map(c => (
            <div key={c.name} style={{ position: "absolute", left: `${c.x}%`, top: `${c.y}%`, transform: "translate(-50%, -50%)" }}>
              <div style={{ width: c.highlight ? 14 : 9, height: c.highlight ? 14 : 9, borderRadius: "50%", background: c.highlight ? C.amber : C.mid, boxShadow: c.highlight ? `0 0 0 5px rgba(232,168,56,0.25)` : "none" }} />
              <div style={{ position: "absolute", left: c.highlight ? 18 : 13, top: "50%", transform: "translateY(-50%)", fontSize: c.highlight ? 12 : 10, fontWeight: c.highlight ? 800 : 500, color: c.highlight ? C.forest : C.mid, whiteSpace: "nowrap" }}>
                {c.name}
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: "12px 16px", background: "rgba(13,59,46,0.05)", border: `1px solid rgba(13,59,46,0.12)`, borderRadius: 8, fontSize: 12, color: C.charcoal, lineHeight: 1.7 }}>
          <strong>FiTi's defensible moat:</strong> top-right — Population Prevention. Lyra does 1:1 treatment (10× more expensive per person). Headspace does individual wellness with no clinical outcomes. Access Elemental does population social prescribing but it's manual, UK-only, and has no AI matching. <strong>FiTi is the only platform combining algorithmic community matching + PHQ-9 outcome tracking + EHR integration in one product.</strong>
        </div>
      </Card>

      {/* Pricing */}
      <div style={{ marginBottom: 32 }}>
        <Eyebrow color={C.mid}>Pricing Architecture — Built to Make "Yes" Easy</Eyebrow>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {tiers.map(t => (
            <div key={t.name} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
              <div style={{ background: t.color, padding: "16px 20px" }}>
                <div style={{ fontWeight: 800, fontSize: 15, color: t.name === "Payer / Risk-Based" ? C.forest : C.cream }}>{t.name}</div>
                <div style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: 22, color: t.name === "Payer / Risk-Based" ? C.forest : C.cream, margin: "4px 0" }}>{t.price}</div>
              </div>
              <div style={{ padding: "16px 20px" }}>
                <div style={{ fontSize: 12, color: C.mid, lineHeight: 1.6, marginBottom: 12 }}>{t.detail}</div>
                <div style={{ display: "inline-block", padding: "4px 12px", borderRadius: 99, background: `rgba(0,0,0,0.05)`, fontSize: 11, fontWeight: 700, color: t.color, border: `1px solid ${t.color}44` }}>
                  {t.tag}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Honest blockers */}
      <Card style={{ marginBottom: 32 }}>
        <Eyebrow color={C.alert}>Honest Blockers — Fix These Before Pitching</Eyebrow>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {blockers.map(b => (
            <div key={b.issue} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div style={{ padding: "10px 14px", background: "#FFF4F1", border: "1px solid #F5C0AC", borderRadius: 8 }}>
                <div style={{ fontSize: 9, fontWeight: 700, color: C.alert, marginBottom: 4 }}>BLOCKER</div>
                <div style={{ fontSize: 12, color: C.charcoal, lineHeight: 1.5 }}>{b.issue}</div>
              </div>
              <div style={{ padding: "10px 14px", background: "#F0FAF5", border: "1px solid #B8E2C8", borderRadius: 8 }}>
                <div style={{ fontSize: 9, fontWeight: 700, color: "#2D7A57", marginBottom: 4 }}>FIX</div>
                <div style={{ fontSize: 12, color: C.charcoal, lineHeight: 1.5 }}>{b.fix}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Pitch */}
      <Card style={{ background: C.forest, border: "none" }}>
        <Eyebrow color={C.amber}>30-Second Pitch · Works on Any Buyer</Eyebrow>
        <div style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: 22, color: C.cream, lineHeight: 1.45, marginBottom: 14 }}>
          "Before the ER visit, there's a pattern. FiTi sees it — and intervenes before it becomes a claim."
        </div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.75 }}>
          FiTi is the only platform that passively detects isolation signals, algorithmically forms communities that measurably reduce loneliness, and tracks PHQ-9 outcomes to prove it — all in a single FHIR-integrated system. At $5–8 PMPM for 2,000+ members, it pays for itself by month 3 through reduced ER utilization and hospitalization.
        </div>
      </Card>
    </div>
  );
};

/* ═══════════════════════════════════════
   MAIN APP
═══════════════════════════════════════ */
const TABS = ["Brand", "Architecture", "Onboarding", "Screens", "Positioning"];

export default function FiTiBlueprint() {
  const [tab, setTab]   = useState("Brand");
  const [role, setRole] = useState("Member");

  useEffect(() => {
    const link = document.createElement("link");
    link.rel  = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@300;400;500;600&display=swap";
    document.head.appendChild(link);
    return () => { if (document.head.contains(link)) document.head.removeChild(link); };
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: C.cream, fontFamily: "'DM Sans',Arial,sans-serif", color: C.charcoal }}>
      {/* Header */}
      <header style={{ background: C.forest, padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 20px rgba(0,0,0,0.18)" }}>
        <Logo light size={1.1} />
        <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" }}>Platform Blueprint</span>
      </header>

      {/* Tabs */}
      <nav style={{ background: C.forest, display: "flex", padding: "0 24px", gap: 4, overflowX: "auto", borderBottom: `1px solid ${C.forestMid}` }}>
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: "11px 18px", background: "none", border: "none",
            borderBottom: tab === t ? `2px solid ${C.amber}` : "2px solid transparent",
            color: tab === t ? C.amber : "rgba(255,255,255,0.5)",
            fontSize: 13, fontWeight: tab === t ? 600 : 400,
            cursor: "pointer", whiteSpace: "nowrap", fontFamily: "inherit", marginBottom: -1,
          }}>{t}</button>
        ))}
      </nav>

      {/* Content */}
      <main style={{ padding: "36px 24px 64px", maxWidth: 1040, margin: "0 auto" }}>
        {tab === "Brand"        && <BrandSection />}
        {tab === "Architecture" && <ArchSection  />}
        {tab === "Onboarding"   && <OnboardSection role={role} setRole={setRole} />}
        {tab === "Screens"      && <ScreensSection />}
        {tab === "Positioning"  && <PositionSection />}
      </main>
    </div>
  );
}
