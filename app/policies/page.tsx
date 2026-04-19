"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";

const policies = [
  {
    id: "refund", icon: "💸", title: "Refund & Cancellation Policy", badge: "Canadian Consumer Protection",
    sections: [
      { heading: "Renter Cancellations", content: `Cancel 48+ hours before pickup: Full refund of ToolTokens, minus a 5 TT processing fee.\nCancel 24-48 hours before pickup: 50% refund of rental ToolTokens.\nCancel less than 24 hours before pickup: No refund. Lender is compensated in full.\nNo-show (renter does not pick up): No refund. Lender receives full rental amount.` },
      { heading: "Lender Cancellations", content: `Lender cancels 48+ hours before pickup: Renter receives full refund + 10 TT goodwill credit.\nLender cancels less than 48 hours before pickup: Renter receives full refund + 25 TT goodwill credit.\nRepeat lender cancellations may result in listing suspension.` },
      { heading: "Dispute Resolution", content: `All disputes must be raised within 72 hours of the rental end date. ToolHive will mediate in good faith. Escalated disputes may be referred to the applicable provincial consumer protection authority.` },
    ],
  },
  {
    id: "damage", icon: "🔨", title: "Damage & Chargeback Policy", badge: "Secure Deposit Loop™",
    sections: [
      { heading: "Damage Tiers", content: `Minor Damage (cosmetic, no functional impact): Up to 20% of tool value charged from deposit.\nModerate Damage (functional impairment, repairable): Up to 60% of tool value charged from deposit.\nMajor Damage / Replacement Required: Full deposit retained. Additional chargeback may apply.\nNormal wear and tear is not claimable.` },
      { heading: "Photo Evidence Required", content: `Both lender and renter must submit timestamped photos at pickup and return. Disputes without photo evidence may be decided in favour of the documented party.` },
      { heading: "Chargeback Process", content: `ToolHive reviews submitted evidence within 3 business days. Deposit funds are held until resolution. Chargebacks are deducted from renter's ToolToken balance or linked payment method.` },
    ],
  },
  {
    id: "privacy", icon: "🔒", title: "Privacy Policy (PIPEDA Compliant)", badge: "Federal Privacy Law",
    sections: [
      { heading: "What We Collect", content: `Account information: preferred name, email, province, phone number.\nIdentity verification: Full legal name and government-issued ID (stored encrypted, backend only).\nRental history, ToolToken transactions, and usage logs.\nDevice data and IP address for fraud prevention.` },
      { heading: "How We Use It", content: `Your data is used only to operate ToolHive services. We do not sell your data to third parties.` },
      { heading: "Your Rights Under PIPEDA", content: `You have the right to access, correct, or request deletion of your personal data. Contact privacy@toolhive.ca for requests.` },
      { heading: "ID Data Retention", content: `Government ID images are retained for 12 months after account closure, then permanently deleted. Only encrypted copies are stored.` },
    ],
  },
  {
    id: "permits", icon: "📋", title: "Permits & Regulated Tools", badge: "Provincial Compliance",
    sections: [
      { heading: "Permit-Required Tools", content: `Some tools require operator permits or certifications in certain provinces (e.g., pressure vessels, powder-actuated tools, chainsaw certification in ON/BC). Lenders must declare permit requirements at listing time.` },
      { heading: "Lender Responsibility", content: `Lenders are responsible for ensuring their tools are safe, maintained, and legally lendable in their province. Listing a regulated tool without declaring it may result in account suspension.` },
      { heading: "Renter Responsibility", content: `Renters confirm at booking that they hold the required certifications. ToolHive is not liable for injuries resulting from improper use.` },
    ],
  },
  {
    id: "liability", icon: "⚖️", title: "Liability & Indemnification", badge: "Legal Terms",
    sections: [
      { heading: "Platform Role", content: `ToolHive is a marketplace platform connecting independent lenders and renters. We are not a party to any rental agreement.` },
      { heading: "Limitation of Liability", content: `To the maximum extent permitted by Canadian law, ToolHive's liability is limited to the total ToolToken value of the disputed transaction.` },
      { heading: "Indemnification", content: `Users agree to indemnify ToolHive against any claims arising from their use of the platform.` },
    ],
  },
  {
    id: "age", icon: "🔞", title: "Eligibility & Age Requirements", badge: "Account Policy",
    sections: [
      { heading: "Minimum Age", content: `You must be 18 years of age or older to create a ToolHive account, list tools, or rent tools.` },
      { heading: "ID Verification", content: `All users who list or rent tools must complete ID verification. Preferred name is displayed publicly. Full legal name and government ID are stored securely on the backend only.` },
      { heading: "Tool Age Limits", content: `Tools older than 15 years may be flagged for safety review. Category maximums apply: power tools 15 years, pressure equipment 10 years, hand tools no limit.` },
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
    <DashboardLayout title="Policies & Legal" subtitle="Governed by Canadian Law">
      <div className="flex flex-col md:flex-row gap-6">

        {/* Left nav */}
        <div className="md:w-56 shrink-0">
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
                <span className="leading-tight text-xs">{p.title.split(" ")[0]} {p.title.split(" ")[1]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="rounded-2xl p-6" style={{ background: "#0F172A", border: "1px solid #1E3A5F" }}>
            <div className="flex items-start gap-4 mb-5">
              <span className="text-3xl">{current.icon}</span>
              <div>
                <div className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold mb-1"
                  style={{ background: "#F59E0B22", color: "#F59E0B" }}>{current.badge}</div>
                <h2 className="text-xl font-black">{current.title}</h2>
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
                        style={{ color: "#94A3B8" }}>{section.content}</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <p className="text-xs mt-3 text-center" style={{ color: "#475569" }}>
            These policies are subject to change. For legal inquiries: legal@toolhive.ca
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}