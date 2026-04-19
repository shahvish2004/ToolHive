"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";

const team = [
  {
    name: "Vishesh Shah",
    role: "Founder & Engineer-in-Training",
    emoji: "🐝",
    bio: "EIT and project manager building ToolHive™ from the ground up. Believes every Canadian neighbourhood should share resources, not hoard them.",
  },
];

const values = [
  { icon: "🔧", title: "Tools For Everyone", desc: "Quality tools shouldn't sit idle in garages. We connect neighbours so every project gets done right." },
  { icon: "🤝", title: "Community First", desc: "ToolHive™ is built on trust. Every lender, every renter, every driver is part of the hive." },
  { icon: "🍁", title: "Proudly Canadian", desc: "Built in Canada, for Canadians. Our policies, pricing, and values reflect who we are." },
  { icon: "♻️", title: "Sustainable by Design", desc: "Sharing tools reduces waste, cuts costs, and keeps good equipment in circulation longer." },
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
    <DashboardLayout title="About Us" subtitle="Our story & mission">
      <div style={{ color: "#F1F5F9" }}>

        {/* Hero */}
        <section className="relative overflow-hidden px-6 py-16 text-center rounded-2xl mb-6"
          style={{ background: "#0F172A", border: "1px solid #1E3A5F" }}>
          <div className="absolute inset-0 opacity-5 pointer-events-none rounded-2xl"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100'%3E%3Cpath d='M28 66L0 50V16L28 0l28 16v34L28 66zm0-4l24-14V18L28 4 4 18v30l24 14z' fill='%23F59E0B'/%3E%3C/svg%3E")`,
              backgroundSize: "56px 100px",
            }}
          />
          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
              style={{ background: "#F59E0B22", color: "#F59E0B", border: "1px solid #F59E0B44" }}>
              🐝 Est. 2026 · Proudly Canadian
            </div>
            <h1 className="text-4xl font-black mb-3 leading-tight">
              We Built the Hive.<br />
              <span style={{ color: "#F59E0B" }}>You Fill It.</span>
            </h1>
            <p className="text-base leading-relaxed" style={{ color: "#94A3B8" }}>
              ToolHive™ is a peer-to-peer tool rental platform connecting Canadians who have tools
              with neighbours who need them — safely, affordably, and with zero friction.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="mb-6">
          <div className="rounded-2xl p-8" style={{ background: "#0F172A", border: "1px solid #334155" }}>
            <p className="text-xl font-bold leading-relaxed text-center" style={{ color: "#F1F5F9" }}>
              "Most tools are used{" "}
              <span style={{ color: "#F59E0B" }}>less than 13 minutes</span>{" "}
              in their entire lifetime. We think that's a problem worth solving."
            </p>
            <p className="text-center mt-3 text-sm" style={{ color: "#64748B" }}>— ToolHive™ Mission Statement</p>
          </div>
        </section>

        {/* Values */}
        <section className="mb-6">
          <h2 className="text-2xl font-black mb-4">What We Stand For</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {values.map((v, i) => (
              <div key={i}
                onMouseEnter={() => setHoveredValue(i)}
                onMouseLeave={() => setHoveredValue(null)}
                className="rounded-xl p-5 cursor-default transition-all duration-200"
                style={{
                  background: hoveredValue === i ? "#F59E0B11" : "#0F172A",
                  border: `1px solid ${hoveredValue === i ? "#F59E0B66" : "#1E3A5F"}`,
                  transform: hoveredValue === i ? "translateY(-2px)" : "none",
                }}>
                <div className="text-3xl mb-2">{v.icon}</div>
                <h3 className="text-base font-bold mb-1" style={{ color: "#F59E0B" }}>{v.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#94A3B8" }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="mb-6">
          <h2 className="text-2xl font-black mb-4">Our Story</h2>
          <div className="rounded-2xl p-6" style={{ background: "#0F172A", border: "1px solid #1E3A5F" }}>
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-px" style={{ background: "#F59E0B33" }} />
              <div className="space-y-6 pl-14">
                {timeline.map((t, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-8 top-1 w-4 h-4 rounded-full border-2 flex items-center justify-center"
                      style={{ background: "#0F172A", borderColor: "#F59E0B" }}>
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#F59E0B" }} />
                    </div>
                    <div className="text-xs font-bold mb-0.5" style={{ color: "#F59E0B" }}>{t.year}</div>
                    <div className="text-sm font-bold mb-0.5">{t.label}</div>
                    <div className="text-xs" style={{ color: "#94A3B8" }}>{t.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="mb-6">
          <h2 className="text-2xl font-black mb-4">The Team</h2>
          <div className="flex justify-center">
            {team.map((member, i) => (
              <div key={i} className="rounded-2xl p-8 text-center max-w-sm w-full"
                style={{ background: "#0F172A", border: "1px solid #1E3A5F" }}>
                <div className="text-5xl mb-3">{member.emoji}</div>
                <h3 className="text-lg font-black mb-1">{member.name}</h3>
                <div className="text-sm font-semibold mb-2" style={{ color: "#F59E0B" }}>{member.role}</div>
                <p className="text-sm leading-relaxed" style={{ color: "#94A3B8" }}>{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-8">
          <p className="text-sm mb-3" style={{ color: "#64748B" }}>Ready to join the hive?</p>
          <a href="/hivematch/browse"
            className="inline-block px-8 py-3 rounded-xl font-bold text-sm transition-all duration-200 hover:scale-105"
            style={{ background: "#F59E0B", color: "#1E293B" }}>
            Browse Tools Near You 🐝
          </a>
        </section>

      </div>
    </DashboardLayout>
  );
}