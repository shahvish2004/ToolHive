# ToolHive™ — Auto File Deploy Script
# Run this from ANY directory in PowerShell
# It will write all drafted files into your project

$base = "C:\Users\shahv\CascadeProjects\windsurf-project"

Write-Host "🐝 ToolHive™ Deploy Script Starting..." -ForegroundColor Yellow

# ── 1. About Page ────────────────────────────────────────────────────────────
New-Item -ItemType Directory -Force -Path "$base\app\about" | Out-Null
@'
"use client";

import { useState } from "react";

const team = [
  {
    name: "Vishesh Shah",
    role: "Founder & Engineer-in-Training",
    emoji: "🐝",
    bio: "EIT and project manager building ToolHive™ from the ground up. Believes every Canadian neighbourhood should share resources, not hoard them.",
  },
];

const values = [
  {
    icon: "🔧",
    title: "Tools For Everyone",
    desc: "Quality tools shouldn't sit idle in garages. We connect neighbours so every project gets done right.",
  },
  {
    icon: "🤝",
    title: "Community First",
    desc: "ToolHive™ is built on trust. Every lender, every renter, every driver is part of the hive.",
  },
  {
    icon: "🍁",
    title: "Proudly Canadian",
    desc: "Built in Canada, for Canadians. Our policies, pricing, and values reflect who we are.",
  },
  {
    icon: "♻️",
    title: "Sustainable by Design",
    desc: "Sharing tools reduces waste, cuts costs, and keeps good equipment in circulation longer.",
  },
];

const timeline = [
  { year: "2025", label: "Idea Born", desc: "Vishesh couldn't find a decent drill to borrow. ToolHive™ began." },
  { year: "2026", label: "MVP Launch", desc: "HiveMatch™ goes live. First rentals. First community." },
  { year: "2026+", label: "HiveHaul™", desc: "Tool delivery by local drivers — coming soon." },
  { year: "Future", label: "National Hive", desc: "Every city. Every neighbourhood. One platform." },
];

export default function AboutPage() {
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);

  return (
    <div className="min-h-screen" style={{ background: "#1E293B", color: "#F1F5F9" }}>

      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-20 text-center">
        <div className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100'%3E%3Cpath d='M28 66L0 50V16L28 0l28 16v34L28 66zm0-4l24-14V18L28 4 4 18v30l24 14z' fill='%23F59E0B'/%3E%3C/svg%3E")`,
            backgroundSize: "56px 100px",
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-6"
            style={{ background: "#F59E0B22", color: "#F59E0B", border: "1px solid #F59E0B44" }}>
            🐝 Est. 2026 · Proudly Canadian
          </div>
          <h1 className="text-5xl font-black mb-4 leading-tight">
            We Built the Hive.<br />
            <span style={{ color: "#F59E0B" }}>You Fill It.</span>
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: "#94A3B8" }}>
            ToolHive™ is a peer-to-peer tool rental platform connecting Canadians who have tools
            with neighbours who need them — safely, affordably, and with zero friction.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="px-6 py-14 max-w-4xl mx-auto">
        <div className="rounded-2xl p-8 md:p-12"
          style={{ background: "#0F172A", border: "1px solid #334155" }}>
          <p className="text-2xl font-bold leading-relaxed text-center" style={{ color: "#F1F5F9" }}>
            "Most tools are used{" "}
            <span style={{ color: "#F59E0B" }}>less than 13 minutes</span>{" "}
            in their entire lifetime. We think that's a problem worth solving."
          </p>
          <p className="text-center mt-4 text-sm" style={{ color: "#64748B" }}>— ToolHive™ Mission Statement</p>
        </div>
      </section>

      {/* Values */}
      <section className="px-6 py-10 max-w-5xl mx-auto">
        <h2 className="text-3xl font-black mb-8 text-center">What We Stand For</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {values.map((v, i) => (
            <div
              key={i}
              onMouseEnter={() => setHoveredValue(i)}
              onMouseLeave={() => setHoveredValue(null)}
              className="rounded-xl p-6 cursor-default transition-all duration-200"
              style={{
                background: hoveredValue === i ? "#F59E0B11" : "#0F172A",
                border: `1px solid ${hoveredValue === i ? "#F59E0B66" : "#1E3A5F"}`,
                transform: hoveredValue === i ? "translateY(-2px)" : "none",
              }}
            >
              <div className="text-3xl mb-3">{v.icon}</div>
              <h3 className="text-lg font-bold mb-1" style={{ color: "#F59E0B" }}>{v.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#94A3B8" }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="px-6 py-10 max-w-4xl mx-auto">
        <h2 className="text-3xl font-black mb-8 text-center">Our Story</h2>
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-px" style={{ background: "#F59E0B33" }} />
          <div className="space-y-8 pl-16">
            {timeline.map((t, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-10 top-1 w-4 h-4 rounded-full border-2 flex items-center justify-center"
                  style={{ background: "#1E293B", borderColor: "#F59E0B" }}>
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#F59E0B" }} />
                </div>
                <div className="text-xs font-bold mb-1" style={{ color: "#F59E0B" }}>{t.year}</div>
                <div className="text-base font-bold mb-0.5">{t.label}</div>
                <div className="text-sm" style={{ color: "#94A3B8" }}>{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="px-6 py-10 max-w-4xl mx-auto">
        <h2 className="text-3xl font-black mb-8 text-center">The Team</h2>
        <div className="flex justify-center">
          {team.map((member, i) => (
            <div key={i} className="rounded-2xl p-8 text-center max-w-sm w-full"
              style={{ background: "#0F172A", border: "1px solid #1E3A5F" }}>
              <div className="text-6xl mb-4">{member.emoji}</div>
              <h3 className="text-xl font-black mb-1">{member.name}</h3>
              <div className="text-sm font-semibold mb-3" style={{ color: "#F59E0B" }}>{member.role}</div>
              <p className="text-sm leading-relaxed" style={{ color: "#94A3B8" }}>{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="px-6 py-16 text-center">
        <p className="text-sm mb-2" style={{ color: "#64748B" }}>Ready to join the hive?</p>
        <a href="/hivematch/browse"
          className="inline-block px-8 py-3 rounded-xl font-bold text-sm transition-all duration-200 hover:scale-105"
          style={{ background: "#F59E0B", color: "#1E293B" }}>
          Browse Tools Near You 🐝
        </a>
      </section>

    </div>
  );
}
'@ | Set-Content -Path "$base\app\about\page.tsx" -Encoding UTF8
Write-Host "  ✅ app/about/page.tsx" -ForegroundColor Green

# ── 2. Contact Page ───────────────────────────────────────────────────────────
New-Item -ItemType Directory -Force -Path "$base\app\contact" | Out-Null
@'
"use client";

import { useState } from "react";

const contactOptions = [
  { icon: "🐛", label: "Report a Bug", value: "bug" },
  { icon: "💡", label: "Feature Request", value: "feature" },
  { icon: "🔧", label: "Tool / Rental Issue", value: "rental" },
  { icon: "💳", label: "Billing / ToolTokens", value: "billing" },
  { icon: "🪪", label: "ID Verification Help", value: "id" },
  { icon: "📋", label: "Policy Question", value: "policy" },
  { icon: "🤝", label: "Partnership / Press", value: "partnership" },
  { icon: "💬", label: "Other", value: "other" },
];

const faqs = [
  {
    q: "How long does it take to get a response?",
    a: "We aim to respond within 1 business day. Billing and rental disputes are prioritized.",
  },
  {
    q: "Can I call someone?",
    a: "We're a lean team — email and in-app messaging are our primary support channels during MVP.",
  },
  {
    q: "Where is ToolHive™ based?",
    a: "We're a Canadian company operating under Canadian law, including PIPEDA privacy requirements.",
  },
  {
    q: "How do I report an unsafe tool or renter?",
    a: "Use the 'Tool / Rental Issue' category above. Urgent safety issues are escalated immediately.",
  },
];

export default function ContactPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  function handleSubmit() {
    if (!selectedType || !name || !email || !message) return;
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen" style={{ background: "#1E293B", color: "#F1F5F9" }}>
      <section className="px-6 py-16 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-6"
          style={{ background: "#F59E0B22", color: "#F59E0B", border: "1px solid #F59E0B44" }}>
          📬 We actually read every message
        </div>
        <h1 className="text-5xl font-black mb-4">Contact <span style={{ color: "#F59E0B" }}>the Hive</span></h1>
        <p className="text-base" style={{ color: "#94A3B8" }}>
          Got a question, issue, or idea? We're a small Canadian team that genuinely cares. Reach out.
        </p>
      </section>

      <div className="max-w-4xl mx-auto px-6 pb-20 grid md:grid-cols-5 gap-8">
        <div className="md:col-span-3">
          {submitted ? (
            <div className="rounded-2xl p-10 text-center"
              style={{ background: "#0F172A", border: "1px solid #F59E0B44" }}>
              <div className="text-5xl mb-4">🐝</div>
              <h2 className="text-2xl font-black mb-2" style={{ color: "#F59E0B" }}>Message Sent!</h2>
              <p className="text-sm" style={{ color: "#94A3B8" }}>
                We'll get back to you within 1 business day. Check your email for confirmation.
              </p>
            </div>
          ) : (
            <div className="rounded-2xl p-6 space-y-5"
              style={{ background: "#0F172A", border: "1px solid #1E3A5F" }}>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest mb-3 block" style={{ color: "#64748B" }}>
                  What's this about?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {contactOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setSelectedType(opt.value)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-left transition-all duration-150"
                      style={{
                        background: selectedType === opt.value ? "#F59E0B22" : "#1E293B",
                        border: `1px solid ${selectedType === opt.value ? "#F59E0B" : "#334155"}`,
                        color: selectedType === opt.value ? "#F59E0B" : "#94A3B8",
                      }}
                    >
                      <span>{opt.icon}</span>
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest mb-1.5 block" style={{ color: "#64748B" }}>Your Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                  placeholder="First name or preferred name"
                  className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
                  style={{ background: "#1E293B", border: "1px solid #334155", color: "#F1F5F9" }} />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest mb-1.5 block" style={{ color: "#64748B" }}>Email Address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
                  style={{ background: "#1E293B", border: "1px solid #334155", color: "#F1F5F9" }} />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest mb-1.5 block" style={{ color: "#64748B" }}>Message</label>
                <textarea value={message} onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what's going on..." rows={5}
                  className="w-full px-4 py-2.5 rounded-lg text-sm outline-none resize-none"
                  style={{ background: "#1E293B", border: "1px solid #334155", color: "#F1F5F9" }} />
              </div>
              <button onClick={handleSubmit}
                disabled={!selectedType || !name || !email || !message}
                className="w-full py-3 rounded-xl font-bold text-sm transition-all duration-200"
                style={{
                  background: (!selectedType || !name || !email || !message) ? "#334155" : "#F59E0B",
                  color: (!selectedType || !name || !email || !message) ? "#64748B" : "#1E293B",
                  cursor: (!selectedType || !name || !email || !message) ? "not-allowed" : "pointer",
                }}>
                Send Message 🐝
              </button>
            </div>
          )}
        </div>

        <div className="md:col-span-2 space-y-5">
          <div className="rounded-xl p-5" style={{ background: "#0F172A", border: "1px solid #1E3A5F" }}>
            <h3 className="font-bold text-sm mb-3" style={{ color: "#F59E0B" }}>📍 Support Hours</h3>
            <div className="space-y-1 text-sm" style={{ color: "#94A3B8" }}>
              <div>Mon–Fri: 9am–6pm ET</div>
              <div>Sat: 10am–3pm ET</div>
              <div>Sun: Closed</div>
            </div>
            <div className="mt-3 pt-3 text-sm" style={{ borderTop: "1px solid #1E3A5F", color: "#64748B" }}>
              📧 support@toolhive.ca
            </div>
          </div>
          <div className="rounded-xl overflow-hidden" style={{ background: "#0F172A", border: "1px solid #1E3A5F" }}>
            <div className="px-5 py-3 text-sm font-bold" style={{ color: "#F59E0B", borderBottom: "1px solid #1E3A5F" }}>
              ❓ Quick Answers
            </div>
            {faqs.map((faq, i) => (
              <div key={i} style={{ borderBottom: i < faqs.length - 1 ? "1px solid #1E3A5F" : "none" }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-5 py-3 text-sm font-medium flex justify-between items-start gap-2"
                  style={{ color: "#F1F5F9" }}>
                  <span>{faq.q}</span>
                  <span style={{ color: "#F59E0B", flexShrink: 0 }}>{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-3 text-sm" style={{ color: "#94A3B8" }}>{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
'@ | Set-Content -Path "$base\app\contact\page.tsx" -Encoding UTF8
Write-Host "  ✅ app/contact/page.tsx" -ForegroundColor Green

# ── 3. Policies Page ──────────────────────────────────────────────────────────
New-Item -ItemType Directory -Force -Path "$base\app\policies" | Out-Null
@'
"use client";

import { useState } from "react";

const policies = [
  {
    id: "refund",
    icon: "💸",
    title: "Refund & Cancellation Policy",
    badge: "Canadian Consumer Protection",
    sections: [
      {
        heading: "Renter Cancellations",
        content: `Cancel 48+ hours before pickup: Full refund of ToolTokens, minus a 5 TT processing fee.\nCancel 24-48 hours before pickup: 50% refund of rental ToolTokens.\nCancel less than 24 hours before pickup: No refund. Lender is compensated in full.\nNo-show (renter does not pick up): No refund. Lender receives full rental amount.`,
      },
      {
        heading: "Lender Cancellations",
        content: `Lender cancels 48+ hours before pickup: Renter receives full refund + 10 TT goodwill credit.\nLender cancels less than 48 hours before pickup: Renter receives full refund + 25 TT goodwill credit.\nRepeat lender cancellations may result in listing suspension.`,
      },
      {
        heading: "Dispute Resolution",
        content: `All disputes must be raised within 72 hours of the rental end date. ToolHive will mediate in good faith. Escalated disputes may be referred to the applicable provincial consumer protection authority.`,
      },
    ],
  },
  {
    id: "damage",
    icon: "🔨",
    title: "Damage & Chargeback Policy",
    badge: "Secure Deposit Loop™",
    sections: [
      {
        heading: "Damage Tiers",
        content: `Minor Damage (cosmetic, no functional impact): Up to 20% of tool value charged from deposit.\nModerate Damage (functional impairment, repairable): Up to 60% of tool value charged from deposit.\nMajor Damage / Replacement Required: Full deposit retained. Additional chargeback may apply up to declared tool replacement value.\nNormal wear and tear is not claimable.`,
      },
      {
        heading: "Photo Evidence Required",
        content: `Both lender and renter must submit timestamped photos at pickup and return. Disputes without photo evidence from either party may be decided in favour of the documented party.`,
      },
      {
        heading: "Chargeback Process",
        content: `ToolHive reviews submitted evidence within 3 business days. Deposit funds are held until resolution. Chargebacks are deducted from renter's ToolToken balance or linked payment method.`,
      },
    ],
  },
  {
    id: "privacy",
    icon: "🔒",
    title: "Privacy Policy (PIPEDA Compliant)",
    badge: "Federal Privacy Law",
    sections: [
      {
        heading: "What We Collect",
        content: `Account information: preferred name, email, province, phone number.\nIdentity verification: Full legal name and government-issued ID (stored encrypted, backend only).\nRental history, ToolToken transactions, and usage logs.\nDevice data and IP address for fraud prevention.`,
      },
      {
        heading: "How We Use It",
        content: `Your data is used only to operate ToolHive services: matching renters with lenders, processing payments, verifying identity, and resolving disputes. We do not sell your data to third parties.`,
      },
      {
        heading: "Your Rights Under PIPEDA",
        content: `You have the right to: access your personal data, correct inaccuracies, withdraw consent (with some service limitations), and request deletion of your account data. Contact privacy@toolhive.ca for requests.`,
      },
      {
        heading: "ID Data Retention",
        content: `Government ID images are retained for 12 months after account closure for dispute resolution purposes, then permanently deleted. Only encrypted copies are stored.`,
      },
    ],
  },
  {
    id: "permits",
    icon: "📋",
    title: "Permits & Regulated Tools Policy",
    badge: "Provincial Compliance",
    sections: [
      {
        heading: "Permit-Required Tools",
        content: `Some tools require operator permits or certifications in certain provinces (e.g., pressure vessels, powder-actuated tools, chainsaw certification in ON/BC). Lenders listing such tools must declare permit requirements. Renters must confirm they hold applicable certifications before renting.`,
      },
      {
        heading: "Lender Responsibility",
        content: `Lenders are responsible for ensuring their tools are safe, maintained, and legally lendable in their province. Listing a regulated tool without declaring it may result in account suspension.`,
      },
      {
        heading: "Renter Responsibility",
        content: `Renters confirm at the time of booking that they have the skills and certifications required to safely operate the rented tool. ToolHive is not liable for injuries resulting from improper use.`,
      },
    ],
  },
  {
    id: "liability",
    icon: "⚖️",
    title: "Liability & Indemnification",
    badge: "Legal Terms",
    sections: [
      {
        heading: "Platform Role",
        content: `ToolHive is a marketplace platform connecting independent lenders and renters. We are not a party to any rental agreement and do not take possession of any tools at any time.`,
      },
      {
        heading: "Limitation of Liability",
        content: `To the maximum extent permitted by applicable Canadian law, ToolHive's liability is limited to the total ToolToken value of the disputed transaction. We are not liable for personal injury, property damage beyond the declared tool value, or consequential losses.`,
      },
      {
        heading: "Indemnification",
        content: `Users agree to indemnify ToolHive against any claims arising from their use of the platform, including misrepresentation of tool condition, improper use of rented tools, or violation of these policies.`,
      },
    ],
  },
  {
    id: "age",
    icon: "🔞",
    title: "Eligibility & Age Requirements",
    badge: "Account Policy",
    sections: [
      {
        heading: "Minimum Age",
        content: `You must be 18 years of age or older to create a ToolHive account, list tools, or rent tools. By creating an account, you confirm you meet this requirement.`,
      },
      {
        heading: "ID Verification",
        content: `All users who list tools or initiate rentals must complete ID verification. Preferred name is displayed publicly. Full legal name and government ID are stored securely on the backend and are never shared with other users.`,
      },
      {
        heading: "Tool Age Limits",
        content: `Tools with a manufacture date older than 15 years may be flagged for safety review before listing approval. Category-specific maximums apply (e.g., power tools: 15 years; hand tools: no limit; pressure equipment: 10 years).`,
      },
    ],
  },
];

export default function PoliciesPage() {
  const [activePolicy, setActivePolicy] = useState(policies[0].id);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const current = policies.find((p) => p.id === activePolicy)!;

  function toggleSection(key: string) {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <div className="min-h-screen" style={{ background: "#1E293B", color: "#F1F5F9" }}>
      <section className="px-6 py-14 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-5"
          style={{ background: "#F59E0B22", color: "#F59E0B", border: "1px solid #F59E0B44" }}>
          🍁 Governed by Canadian Law
        </div>
        <h1 className="text-4xl font-black mb-3">
          Policies & <span style={{ color: "#F59E0B" }}>Legal Terms</span>
        </h1>
        <p className="text-sm" style={{ color: "#94A3B8" }}>
          ToolHive™ operates under applicable Canadian federal and provincial law. Last updated: January 2026.
        </p>
      </section>

      <div className="max-w-5xl mx-auto px-6 pb-20 flex flex-col md:flex-row gap-6">
        <div className="md:w-64 shrink-0">
          <div className="rounded-xl overflow-hidden sticky top-6"
            style={{ background: "#0F172A", border: "1px solid #1E3A5F" }}>
            {policies.map((p) => (
              <button key={p.id} onClick={() => setActivePolicy(p.id)}
                className="w-full text-left px-4 py-3 flex items-center gap-3 text-sm font-medium transition-all duration-150"
                style={{
                  background: activePolicy === p.id ? "#F59E0B15" : "transparent",
                  borderLeft: `3px solid ${activePolicy === p.id ? "#F59E0B" : "transparent"}`,
                  color: activePolicy === p.id ? "#F59E0B" : "#94A3B8",
                  borderBottom: "1px solid #1E3A5F",
                }}>
                <span>{p.icon}</span>
                <span className="leading-tight">{p.title.split(" ")[0]} {p.title.split(" ")[1]}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1">
          <div className="rounded-2xl p-6 md:p-8" style={{ background: "#0F172A", border: "1px solid #1E3A5F" }}>
            <div className="flex items-start gap-4 mb-6">
              <span className="text-4xl">{current.icon}</span>
              <div>
                <div className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold mb-2"
                  style={{ background: "#F59E0B22", color: "#F59E0B" }}>
                  {current.badge}
                </div>
                <h2 className="text-2xl font-black">{current.title}</h2>
              </div>
            </div>
            <div className="space-y-3">
              {current.sections.map((section, i) => {
                const key = `${current.id}-${i}`;
                const isOpen = openSections[key] !== false;
                return (
                  <div key={i} className="rounded-xl overflow-hidden" style={{ border: "1px solid #1E3A5F" }}>
                    <button onClick={() => toggleSection(key)}
                      className="w-full text-left px-5 py-3 flex justify-between items-center font-bold text-sm"
                      style={{ color: "#F1F5F9", background: "#1E293B" }}>
                      {section.heading}
                      <span style={{ color: "#F59E0B" }}>{isOpen ? "−" : "+"}</span>
                    </button>
                    {isOpen && (
                      <div className="px-5 py-4 text-sm leading-relaxed whitespace-pre-line"
                        style={{ color: "#94A3B8" }}>
                        {section.content}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <p className="text-xs mt-4 text-center" style={{ color: "#475569" }}>
            These policies are subject to change. Continued use of ToolHive™ constitutes acceptance.
            For legal inquiries: legal@toolhive.ca
          </p>
        </div>
      </div>
    </div>
  );
}
'@ | Set-Content -Path "$base\app\policies\page.tsx" -Encoding UTF8
Write-Host "  ✅ app/policies/page.tsx" -ForegroundColor Green

# ── 4. Sidebar ────────────────────────────────────────────────────────────────
@'
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Token Shop", href: "/shop", emoji: "🪙" },
  { label: "Tools Library", href: "/tools", emoji: "🔧" },
  { label: "Merchandise", href: "/merch", emoji: "👕" },
  { label: "Library Hub", href: "/library", emoji: "📚" },
  { label: "HiveMatch™", href: "/hivematch", emoji: "🐝" },
  { label: "Membership", href: "/membership", emoji: "👑" },
  { label: "Secure Wallet", href: "/wallet", emoji: "💳" },
];

const footerItems = [
  { label: "About Us", href: "/about", emoji: "🏠" },
  { label: "Contact", href: "/contact", emoji: "📬" },
  { label: "Policies", href: "/policies", emoji: "📋" },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-20 md:hidden"
          style={{ background: "#00000066" }}
          onClick={onClose} />
      )}
      <aside
        className={`fixed top-0 left-0 h-full z-30 flex flex-col transition-transform duration-300 md:relative md:translate-x-0 md:z-auto ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{ width: 220, background: "#0F172A", borderRight: "1px solid #1E3A5F" }}
      >
        <div className="px-5 py-5" style={{ borderBottom: "1px solid #1E3A5F" }}>
          <Link href="/" onClick={onClose}>
            <span className="text-lg font-black" style={{ color: "#F59E0B" }}>ToolHive™</span>
          </Link>
        </div>

        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <p className="text-xs font-bold uppercase tracking-widest px-2 mb-2" style={{ color: "#475569" }}>Menu</p>
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link key={item.href} href={item.href} onClick={onClose}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 text-sm font-medium transition-all duration-150"
                style={{
                  background: active ? "#F59E0B22" : "transparent",
                  color: active ? "#F59E0B" : "#94A3B8",
                  borderLeft: `3px solid ${active ? "#F59E0B" : "transparent"}`,
                }}>
                <span>{item.emoji}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="px-3 pb-5" style={{ borderTop: "1px solid #1E3A5F" }}>
          <p className="text-xs font-bold uppercase tracking-widest px-2 mt-4 mb-2" style={{ color: "#475569" }}>Info</p>
          {footerItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} onClick={onClose}
                className="flex items-center gap-3 px-3 py-2 rounded-xl mb-1 text-sm font-medium transition-all duration-150"
                style={{
                  background: active ? "#F59E0B22" : "transparent",
                  color: active ? "#F59E0B" : "#64748B",
                }}>
                <span>{item.emoji}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
          <p className="text-xs px-2 mt-4" style={{ color: "#334155" }}>© 2026 ToolHive™</p>
        </div>
      </aside>
    </>
  );
}
'@ | Set-Content -Path "$base\components\layout\Sidebar.tsx" -Encoding UTF8
Write-Host "  ✅ components/layout/Sidebar.tsx" -ForegroundColor Green

# ── 5. HiveMatch Browse (upgraded) ────────────────────────────────────────────
New-Item -ItemType Directory -Force -Path "$base\app\hivematch\browse" | Out-Null
@'
"use client";

import { useState } from "react";

type RentalStep =
  | "browse" | "detail" | "permit-check" | "deposit"
  | "address" | "pickup-photos" | "active" | "return-photos"
  | "owner-review" | "renter-review" | "complete";

interface Tool {
  id: number; name: string; owner: string; ownerInitial: string;
  price: number; deposit: number; category: string; age: number;
  condition: string; permitRequired: boolean; permitNote?: string;
  maxAgeLimit: number; available: boolean; distance: string;
  tags: string[]; emoji: string;
}

const tools: Tool[] = [
  { id: 1, name: "DeWalt 20V Drill Kit", owner: "Marcus T.", ownerInitial: "M", price: 12, deposit: 60, category: "Power Tools", age: 3, condition: "Excellent", permitRequired: false, maxAgeLimit: 15, available: true, distance: "0.8 km", tags: ["cordless", "2 batteries", "case included"], emoji: "🔩" },
  { id: 2, name: "Makita Circular Saw", owner: "Priya S.", ownerInitial: "P", price: 18, deposit: 80, category: "Power Tools", age: 7, condition: "Good", permitRequired: false, maxAgeLimit: 15, available: true, distance: "1.2 km", tags: ["corded", "blade included"], emoji: "🪚" },
  { id: 3, name: "Gas Pressure Washer 3200 PSI", owner: "Devon K.", ownerInitial: "D", price: 35, deposit: 150, category: "Outdoor", age: 5, condition: "Good", permitRequired: true, permitNote: "Operator must be 18+. In BC & ON, commercial use requires a TSSA permit. Residential use is unrestricted.", maxAgeLimit: 10, available: true, distance: "2.1 km", tags: ["gas", "hose included", "surface cleaner"], emoji: "💧" },
  { id: 4, name: "Powder-Actuated Nail Gun", owner: "Jin L.", ownerInitial: "J", price: 25, deposit: 120, category: "Power Tools", age: 4, condition: "Very Good", permitRequired: true, permitNote: "Requires a provincial operator certificate in all provinces. Renter must provide certification number at booking.", maxAgeLimit: 15, available: true, distance: "3.4 km", tags: ["concrete", "fasteners included"], emoji: "🔫" },
  { id: 5, name: "Extension Ladder 24ft", owner: "Sara M.", ownerInitial: "S", price: 14, deposit: 70, category: "Access", age: 8, condition: "Good", permitRequired: false, maxAgeLimit: 15, available: true, distance: "0.5 km", tags: ["aluminum", "Type IA rated"], emoji: "🪜" },
];

function PermitModal({ tool, onAccept, onDecline }: { tool: Tool; onAccept: (cert: string) => void; onDecline: () => void }) {
  const [cert, setCert] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: "#00000088" }}>
      <div className="rounded-2xl p-6 max-w-md w-full" style={{ background: "#0F172A", border: "1px solid #F59E0B66" }}>
        <div className="text-3xl mb-3">📋</div>
        <h2 className="text-xl font-black mb-1" style={{ color: "#F59E0B" }}>Permit Required</h2>
        <p className="text-sm mb-4 leading-relaxed" style={{ color: "#94A3B8" }}>
          <strong style={{ color: "#F1F5F9" }}>{tool.name}</strong> requires operator certification.
        </p>
        <div className="rounded-xl p-4 mb-4 text-sm leading-relaxed"
          style={{ background: "#1E293B", border: "1px solid #334155", color: "#CBD5E1" }}>
          {tool.permitNote}
        </div>
        <div className="mb-4">
          <label className="text-xs font-bold uppercase tracking-widest block mb-1.5" style={{ color: "#64748B" }}>
            Your Certification / Permit Number
          </label>
          <input type="text" value={cert} onChange={(e) => setCert(e.target.value)}
            placeholder="e.g. ON-PAT-2024-XXXXX"
            className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
            style={{ background: "#1E293B", border: "1px solid #334155", color: "#F1F5F9" }} />
        </div>
        <label className="flex items-start gap-3 mb-5 cursor-pointer">
          <input type="checkbox" checked={confirmed} onChange={(e) => setConfirmed(e.target.checked)} className="mt-0.5 accent-amber-400" />
          <span className="text-xs leading-relaxed" style={{ color: "#94A3B8" }}>
            I confirm I hold a valid certification to operate this tool and accept full responsibility for compliant use.
          </span>
        </label>
        <div className="flex gap-3">
          <button onClick={onDecline} className="flex-1 py-2.5 rounded-xl text-sm font-semibold"
            style={{ background: "#1E293B", border: "1px solid #334155", color: "#94A3B8" }}>Cancel</button>
          <button onClick={() => confirmed && cert && onAccept(cert)} disabled={!confirmed || !cert}
            className="flex-1 py-2.5 rounded-xl text-sm font-bold"
            style={{ background: confirmed && cert ? "#F59E0B" : "#334155", color: confirmed && cert ? "#1E293B" : "#64748B", cursor: confirmed && cert ? "pointer" : "not-allowed" }}>
            Confirm & Continue
          </button>
        </div>
      </div>
    </div>
  );
}

function ReviewModal({ role, otherName, onSubmit }: { role: "renter" | "owner"; otherName: string; onSubmit: (rating: number, comment: string) => void }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hovered, setHovered] = useState(0);
  const prompts = role === "renter"
    ? ["Was the tool as described?", "Was pickup smooth?", "Would you rent from this lender again?"]
    : ["Did the renter return on time?", "Was the tool returned in good condition?", "Would you lend to this renter again?"];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: "#00000088" }}>
      <div className="rounded-2xl p-6 max-w-md w-full" style={{ background: "#0F172A", border: "1px solid #1E3A5F" }}>
        <div className="text-3xl mb-2">⭐</div>
        <h2 className="text-xl font-black mb-1">{role === "renter" ? "Rate Your Lender" : "Rate Your Renter"}</h2>
        <p className="text-sm mb-1" style={{ color: "#94A3B8" }}>
          Your review of <strong style={{ color: "#F59E0B" }}>{otherName.split(" ")[0]}</strong>
        </p>
        <p className="text-xs mb-5 px-3 py-2 rounded-lg" style={{ background: "#1E293B", color: "#64748B" }}>
          🔒 Reviews are blind-submitted — neither party sees until both submit or 48 hours pass.
        </p>
        <div className="flex gap-2 mb-4 justify-center">
          {[1,2,3,4,5].map((star) => (
            <button key={star} onMouseEnter={() => setHovered(star)} onMouseLeave={() => setHovered(0)}
              onClick={() => setRating(star)} className="text-3xl transition-transform hover:scale-110"
              style={{ color: star <= (hovered || rating) ? "#F59E0B" : "#334155" }}>★</button>
          ))}
        </div>
        {rating > 0 && <p className="text-center text-xs mb-4" style={{ color: "#F59E0B" }}>{["","Poor","Fair","Good","Great","Excellent"][rating]}</p>}
        <div className="space-y-1 mb-4">
          {prompts.map((q, i) => (
            <div key={i} className="text-xs flex items-center gap-2" style={{ color: "#64748B" }}>
              <span style={{ color: "#F59E0B" }}>•</span> {q}
            </div>
          ))}
        </div>
        <textarea value={comment} onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience (optional)..." rows={3}
          className="w-full px-4 py-2.5 rounded-lg text-sm outline-none resize-none mb-4"
          style={{ background: "#1E293B", border: "1px solid #334155", color: "#F1F5F9" }} />
        <button onClick={() => rating > 0 && onSubmit(rating, comment)} disabled={rating === 0}
          className="w-full py-3 rounded-xl font-bold text-sm"
          style={{ background: rating > 0 ? "#F59E0B" : "#334155", color: rating > 0 ? "#1E293B" : "#64748B", cursor: rating > 0 ? "pointer" : "not-allowed" }}>
          Submit Review
        </button>
      </div>
    </div>
  );
}

function PhotoUpload({ label, onDone }: { label: string; onDone: () => void }) {
  const [count, setCount] = useState(0);
  return (
    <div className="space-y-4">
      <p className="text-sm" style={{ color: "#94A3B8" }}>{label}</p>
      <div className="grid grid-cols-4 gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} onClick={i === count ? () => setCount((c) => Math.min(c + 1, 4)) : undefined}
            className="aspect-square rounded-xl flex items-center justify-center text-xl cursor-pointer transition-all"
            style={{ background: i < count ? "#F59E0B22" : "#1E293B", border: `2px ${i < count ? "solid #F59E0B" : i === count ? "dashed #475569" : "dashed #1E3A5F"}`, color: i < count ? "#F59E0B" : "#475569" }}>
            {i < count ? "📷" : i === count ? "+" : ""}
          </div>
        ))}
      </div>
      <p className="text-xs" style={{ color: "#64748B" }}>{count}/4 photos added</p>
      <button onClick={onDone} disabled={count < 2}
        className="w-full py-3 rounded-xl font-bold text-sm"
        style={{ background: count >= 2 ? "#F59E0B" : "#334155", color: count >= 2 ? "#1E293B" : "#64748B", cursor: count >= 2 ? "pointer" : "not-allowed" }}>
        {count < 2 ? `Add at least ${2 - count} more photo${2 - count > 1 ? "s" : ""}` : "Submit Photos ✓"}
      </button>
    </div>
  );
}

const stepOrder: RentalStep[] = ["deposit","address","pickup-photos","active","return-photos","owner-review","renter-review","complete"];
function ProgressBar({ step }: { step: RentalStep }) {
  const idx = stepOrder.indexOf(step);
  if (idx < 0) return null;
  const pct = Math.round(((idx + 1) / stepOrder.length) * 100);
  return (
    <div className="mb-6">
      <div className="flex justify-between text-xs mb-1" style={{ color: "#64748B" }}><span>Rental Progress</span><span>{pct}%</span></div>
      <div className="h-1.5 rounded-full" style={{ background: "#1E293B" }}>
        <div className="h-1.5 rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: "#F59E0B" }} />
      </div>
    </div>
  );
}

export default function BrowsePage() {
  const [step, setStep] = useState<RentalStep>("browse");
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [certNumber, setCertNumber] = useState("");
  const [showPermitModal, setShowPermitModal] = useState(false);
  const [showOwnerReview, setShowOwnerReview] = useState(false);
  const [showRenterReview, setShowRenterReview] = useState(false);
  const [renterReviewDone, setRenterReviewDone] = useState(false);
  const [filterCat, setFilterCat] = useState("All");

  const categories = ["All", ...Array.from(new Set(tools.map((t) => t.category)))];
  const filtered = filterCat === "All" ? tools : tools.filter((t) => t.category === filterCat);
  const tool = selectedTool;

  function selectTool(t: Tool) { setSelectedTool(t); setStep("detail"); }
  function proceedFromDetail() { if (selectedTool?.permitRequired) { setShowPermitModal(true); } else { setStep("deposit"); } }
  function onPermitAccepted(cert: string) { setCertNumber(cert); setShowPermitModal(false); setStep("deposit"); }
  function handleOwnerReview() { setShowOwnerReview(false); setStep("renter-review"); }
  function handleRenterReview() { setShowRenterReview(false); setRenterReviewDone(true); setStep("complete"); }

  if (step === "browse") return (
    <div className="min-h-screen p-6" style={{ background: "#1E293B", color: "#F1F5F9" }}>
      <h1 className="text-3xl font-black mb-1">Browse Tools 🔍</h1>
      <p className="text-sm mb-5" style={{ color: "#94A3B8" }}>Available near you today</p>
      <div className="flex gap-2 flex-wrap mb-5">
        {categories.map((cat) => (
          <button key={cat} onClick={() => setFilterCat(cat)}
            className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
            style={{ background: filterCat === cat ? "#F59E0B" : "#0F172A", color: filterCat === cat ? "#1E293B" : "#94A3B8", border: `1px solid ${filterCat === cat ? "#F59E0B" : "#334155"}` }}>
            {cat}
          </button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((t) => (
          <div key={t.id} onClick={() => selectTool(t)}
            className="rounded-2xl p-5 cursor-pointer transition-all duration-200 hover:scale-[1.02]"
            style={{ background: "#0F172A", border: "1px solid #1E3A5F" }}>
            <div className="flex items-start justify-between mb-3">
              <span className="text-3xl">{t.emoji}</span>
              <div className="flex flex-col items-end gap-1">
                {t.permitRequired && <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ background: "#EF444422", color: "#F87171" }}>📋 Permit</span>}
                <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: "#22C55E22", color: "#4ADE80" }}>● Available</span>
              </div>
            </div>
            <h3 className="font-bold text-base mb-0.5">{t.name}</h3>
            <p className="text-xs mb-3" style={{ color: "#64748B" }}>{t.owner} · {t.distance}</p>
            <div className="flex gap-1 flex-wrap mb-3">
              {t.tags.map((tag) => (
                <span key={tag} className="text-xs px-2 py-0.5 rounded-full"
                  style={{ background: "#1E293B", color: "#94A3B8", border: "1px solid #334155" }}>{tag}</span>
              ))}
            </div>
            <div className="flex items-end justify-between">
              <div><span className="text-xl font-black" style={{ color: "#F59E0B" }}>{t.price} TT</span><span className="text-xs ml-1" style={{ color: "#64748B" }}>/day</span></div>
              <span className="text-xs" style={{ color: "#64748B" }}>{t.deposit} TT deposit</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (step === "detail" && tool) return (
    <div className="min-h-screen p-6 max-w-lg mx-auto" style={{ background: "#1E293B", color: "#F1F5F9" }}>
      <button onClick={() => setStep("browse")} className="text-sm mb-5 flex items-center gap-1" style={{ color: "#64748B" }}>← Back</button>
      <div className="rounded-2xl p-6" style={{ background: "#0F172A", border: "1px solid #1E3A5F" }}>
        <div className="text-5xl mb-4 text-center">{tool.emoji}</div>
        <h2 className="text-2xl font-black mb-1">{tool.name}</h2>
        <p className="text-sm mb-4" style={{ color: "#64748B" }}>Listed by {tool.owner} · {tool.distance} away</p>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {[["Category", tool.category],["Condition", tool.condition],["Tool Age", `${tool.age} years`],["Max Age Limit", `${tool.maxAgeLimit} years`],["Daily Rate", `${tool.price} TT/day`],["Deposit", `${tool.deposit} TT`]].map(([label, val]) => (
            <div key={label as string} className="rounded-xl p-3" style={{ background: "#1E293B" }}>
              <div className="text-xs mb-0.5" style={{ color: "#64748B" }}>{label as string}</div>
              <div className="text-sm font-semibold">{val as string}</div>
            </div>
          ))}
        </div>
        {tool.age > tool.maxAgeLimit && (
          <div className="rounded-xl p-3 mb-4 text-sm" style={{ background: "#EF444411", border: "1px solid #EF444444", color: "#F87171" }}>
            ⚠️ This tool exceeds the max age limit and is pending safety review.
          </div>
        )}
        {tool.permitRequired && (
          <div className="rounded-xl p-3 mb-4 text-sm leading-relaxed" style={{ background: "#F59E0B11", border: "1px solid #F59E0B44", color: "#FCD34D" }}>
            📋 <strong>Permit Required:</strong> {tool.permitNote}
          </div>
        )}
        <button onClick={proceedFromDetail} className="w-full py-3 rounded-xl font-bold text-sm" style={{ background: "#F59E0B", color: "#1E293B" }}>
          {tool.permitRequired ? "Confirm Permit & Rent" : "Rent This Tool 🐝"}
        </button>
      </div>
      {showPermitModal && <PermitModal tool={tool} onAccept={onPermitAccepted} onDecline={() => setShowPermitModal(false)} />}
    </div>
  );

  if (step === "deposit" && tool) return (
    <div className="min-h-screen p-6 max-w-lg mx-auto" style={{ background: "#1E293B", color: "#F1F5F9" }}>
      <ProgressBar step={step} />
      <h2 className="text-2xl font-black mb-1">Secure Deposit Loop™</h2>
      <p className="text-sm mb-5" style={{ color: "#94A3B8" }}>Your deposit is held in escrow until the tool is safely returned.</p>
      <div className="rounded-2xl p-5 mb-4" style={{ background: "#0F172A", border: "1px solid #1E3A5F" }}>
        <div className="space-y-3 text-sm">
          {[["Tool", tool.name],["Daily Rate", `${tool.price} TT`],["Deposit (held in escrow)", `${tool.deposit} TT`],...(certNumber ? [["Permit #", certNumber]] : [])].map(([label, val]) => (
            <div key={label as string} className="flex justify-between"><span style={{ color: "#94A3B8" }}>{label as string}</span><span className="font-semibold">{val as string}</span></div>
          ))}
          <div className="border-t pt-3 flex justify-between font-bold" style={{ borderColor: "#334155" }}>
            <span>Total Due Now</span><span style={{ color: "#F59E0B" }}>{tool.price + tool.deposit} TT</span>
          </div>
        </div>
      </div>
      <div className="rounded-xl p-4 mb-5 text-xs" style={{ background: "#0F172A", border: "1px solid #334155", color: "#64748B" }}>
        🔒 Funds are released only after both parties confirm a successful return.
      </div>
      <button onClick={() => setStep("address")} className="w-full py-3 rounded-xl font-bold text-sm" style={{ background: "#F59E0B", color: "#1E293B" }}>
        Pay {tool.price + tool.deposit} TT — Confirm Booking
      </button>
    </div>
  );

  if (step === "address" && tool) return (
    <div className="min-h-screen p-6 max-w-lg mx-auto" style={{ background: "#1E293B", color: "#F1F5F9" }}>
      <ProgressBar step={step} />
      <h2 className="text-2xl font-black mb-1">📍 Pickup Address Revealed</h2>
      <p className="text-sm mb-5" style={{ color: "#94A3B8" }}>Address shown after deposit is confirmed.</p>
      <div className="rounded-2xl p-6 mb-4 text-center" style={{ background: "#0F172A", border: "1px solid #F59E0B44" }}>
        <div className="text-4xl mb-3">🏠</div>
        <p className="font-bold text-lg mb-1">47 Hive Lane</p>
        <p style={{ color: "#94A3B8" }}>Toronto, ON M4B 1B3</p>
        <p className="text-sm mt-2" style={{ color: "#64748B" }}>Contact: {tool.owner} · via in-app message</p>
      </div>
      <button onClick={() => setStep("pickup-photos")} className="w-full py-3 rounded-xl font-bold text-sm" style={{ background: "#F59E0B", color: "#1E293B" }}>
        I've Arrived — Take Pickup Photos 📷
      </button>
    </div>
  );

  if (step === "pickup-photos" && tool) return (
    <div className="min-h-screen p-6 max-w-lg mx-auto" style={{ background: "#1E293B", color: "#F1F5F9" }}>
      <ProgressBar step={step} />
      <h2 className="text-2xl font-black mb-1">📷 Pickup Photos</h2>
      <p className="text-sm mb-5" style={{ color: "#94A3B8" }}>Document the tool before you leave. Min 2 photos required.</p>
      <div className="rounded-2xl p-5" style={{ background: "#0F172A", border: "1px solid #1E3A5F" }}>
        <PhotoUpload label="Take clear photos of all sides, any existing damage, and accessories included." onDone={() => setStep("active")} />
      </div>
    </div>
  );

  if (step === "active" && tool) return (
    <div className="min-h-screen p-6 max-w-lg mx-auto" style={{ background: "#1E293B", color: "#F1F5F9" }}>
      <ProgressBar step={step} />
      <div className="rounded-2xl p-6 text-center mb-4" style={{ background: "#0F172A", border: "1px solid #22C55E44" }}>
        <div className="text-5xl mb-3">🟢</div>
        <h2 className="text-2xl font-black mb-1" style={{ color: "#4ADE80" }}>Rental Active</h2>
        <p className="text-sm" style={{ color: "#94A3B8" }}>{tool.name} is yours until the agreed return time.</p>
      </div>
      <div className="rounded-xl p-4 mb-5 text-sm space-y-2" style={{ background: "#0F172A", border: "1px solid #1E3A5F" }}>
        {[["Tool", tool.name],["Rate", `${tool.price} TT/day`],["Deposit Held", `${tool.deposit} TT`],["Return By", "Tomorrow, 6pm"]].map(([l,v]) => (
          <div key={l as string} className="flex justify-between"><span style={{ color: "#64748B" }}>{l as string}</span><span style={l === "Deposit Held" ? {color:"#F59E0B"} : {}}>{v as string}</span></div>
        ))}
      </div>
      <button onClick={() => setStep("return-photos")} className="w-full py-3 rounded-xl font-bold text-sm" style={{ background: "#F59E0B", color: "#1E293B" }}>
        Ready to Return — Take Return Photos
      </button>
    </div>
  );

  if (step === "return-photos" && tool) return (
    <div className="min-h-screen p-6 max-w-lg mx-auto" style={{ background: "#1E293B", color: "#F1F5F9" }}>
      <ProgressBar step={step} />
      <h2 className="text-2xl font-black mb-1">📷 Return Photos</h2>
      <p className="text-sm mb-5" style={{ color: "#94A3B8" }}>Document the tool before handing back. Protects you in any dispute.</p>
      <div className="rounded-2xl p-5" style={{ background: "#0F172A", border: "1px solid #1E3A5F" }}>
        <PhotoUpload label="Photograph all sides, accessories, and any changes from pickup condition." onDone={() => setStep("owner-review")} />
      </div>
    </div>
  );

  if (step === "owner-review" && tool) return (
    <div className="min-h-screen p-6 max-w-lg mx-auto" style={{ background: "#1E293B", color: "#F1F5F9" }}>
      <ProgressBar step={step} />
      <h2 className="text-2xl font-black mb-1">🔍 Lender Inspection</h2>
      <p className="text-sm mb-5" style={{ color: "#94A3B8" }}>The lender reviews return photos and approves the return.</p>
      <div className="rounded-2xl p-5 mb-4 space-y-3" style={{ background: "#0F172A", border: "1px solid #1E3A5F" }}>
        <p className="text-sm font-bold">Simulating lender approval...</p>
        <p className="text-xs" style={{ color: "#64748B" }}>{tool.owner} receives a notification and reviews your return photos. They have 24 hours to raise a dispute.</p>
        <div className="flex gap-3 pt-2">
          <button onClick={() => setShowOwnerReview(true)} className="flex-1 py-2.5 rounded-xl text-sm font-bold"
            style={{ background: "#22C55E22", border: "1px solid #22C55E66", color: "#4ADE80" }}>✓ Approve Return</button>
          <button className="flex-1 py-2.5 rounded-xl text-sm font-bold"
            style={{ background: "#EF444422", border: "1px solid #EF444466", color: "#F87171" }}>⚠ Raise Dispute</button>
        </div>
      </div>
      {showOwnerReview && <ReviewModal role="owner" otherName="Renter" onSubmit={handleOwnerReview} />}
    </div>
  );

  if (step === "renter-review" && tool) return (
    <div className="min-h-screen p-6 max-w-lg mx-auto" style={{ background: "#1E293B", color: "#F1F5F9" }}>
      <ProgressBar step={step} />
      <h2 className="text-2xl font-black mb-1">⭐ Rate Your Experience</h2>
      <p className="text-sm mb-5" style={{ color: "#94A3B8" }}>Your turn to review {tool.owner}.</p>
      <button onClick={() => setShowRenterReview(true)} className="w-full py-3 rounded-xl font-bold text-sm mb-4"
        style={{ background: "#F59E0B", color: "#1E293B" }}>
        Leave a Review for {tool.owner.split(" ")[0]}
      </button>
      <p className="text-xs text-center" style={{ color: "#475569" }}>Reviews are anonymous until both sides submit.</p>
      {showRenterReview && <ReviewModal role="renter" otherName={tool.owner} onSubmit={handleRenterReview} />}
    </div>
  );

  if (step === "complete" && tool) return (
    <div className="min-h-screen p-6 max-w-lg mx-auto flex flex-col items-center justify-center text-center" style={{ background: "#1E293B", color: "#F1F5F9" }}>
      <div className="text-6xl mb-4">🐝</div>
      <h2 className="text-3xl font-black mb-2" style={{ color: "#F59E0B" }}>Rental Complete!</h2>
      <p className="text-sm mb-6" style={{ color: "#94A3B8" }}>
        Your deposit of <strong style={{ color: "#F59E0B" }}>{tool.deposit} TT</strong> has been released.
      </p>
      <div className="rounded-2xl p-5 w-full mb-6" style={{ background: "#0F172A", border: "1px solid #1E3A5F" }}>
        <div className="space-y-2 text-sm">
          {[["Tool", tool.name],["Rental Cost", `${tool.price} TT`],["Deposit Released", `+${tool.deposit} TT ✓`]].map(([l,v]) => (
            <div key={l as string} className="flex justify-between">
              <span style={{ color: "#64748B" }}>{l as string}</span>
              <span style={l === "Deposit Released" ? {color:"#4ADE80"} : {}}>{v as string}</span>
            </div>
          ))}
          <div className="flex justify-between font-bold pt-2" style={{ borderTop: "1px solid #334155" }}>
            <span>Net Cost</span><span style={{ color: "#F59E0B" }}>{tool.price} TT</span>
          </div>
        </div>
      </div>
      <button onClick={() => { setStep("browse"); setSelectedTool(null); setCertNumber(""); }}
        className="w-full py-3 rounded-xl font-bold text-sm" style={{ background: "#F59E0B", color: "#1E293B" }}>
        Browse More Tools 🔍
      </button>
    </div>
  );

  return null;
}
'@ | Set-Content -Path "$base\app\hivematch\browse\page.tsx" -Encoding UTF8
Write-Host "  ✅ app/hivematch/browse/page.tsx" -ForegroundColor Green

Write-Host ""
Write-Host "🐝 All 5 files deployed successfully!" -ForegroundColor Yellow
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "  1. Check localhost:3003 in your browser" -ForegroundColor White
Write-Host "  2. Test /about, /contact, /policies in the sidebar" -ForegroundColor White
Write-Host "  3. Test HiveMatch Browse flow with permit tools" -ForegroundColor White
Write-Host "  4. Upload logo.png to remove.bg for transparency fix" -ForegroundColor White