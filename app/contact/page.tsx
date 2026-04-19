"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";

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
  { q: "How long does it take to get a response?", a: "We aim to respond within 1 business day. Billing and rental disputes are prioritized." },
  { q: "Can I call someone?", a: "We're a lean team — email and in-app messaging are our primary support channels during MVP." },
  { q: "Where is ToolHive™ based?", a: "We're a Canadian company operating under Canadian law, including PIPEDA privacy requirements." },
  { q: "How do I report an unsafe tool or renter?", a: "Use the 'Tool / Rental Issue' category above. Urgent safety issues are escalated immediately." },
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
    <DashboardLayout title="Contact" subtitle="Get in touch with the Hive">
      <div className="grid md:grid-cols-5 gap-6">

        {/* Form */}
        <div className="md:col-span-3">
          {submitted ? (
            <div className="rounded-2xl p-10 text-center"
              style={{ background: "#0F172A", border: "1px solid #F59E0B44" }}>
              <div className="text-5xl mb-4">🐝</div>
              <h2 className="text-2xl font-black mb-2" style={{ color: "#F59E0B" }}>Message Sent!</h2>
              <p className="text-sm" style={{ color: "#94A3B8" }}>
                We'll get back to you within 1 business day.
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
                    <button key={opt.value} onClick={() => setSelectedType(opt.value)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-left transition-all duration-150"
                      style={{
                        background: selectedType === opt.value ? "#F59E0B22" : "#1E293B",
                        border: `1px solid ${selectedType === opt.value ? "#F59E0B" : "#334155"}`,
                        color: selectedType === opt.value ? "#F59E0B" : "#94A3B8",
                      }}>
                      <span>{opt.icon}</span><span>{opt.label}</span>
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
                className="w-full py-3 rounded-xl font-bold text-sm"
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

        {/* Sidebar info */}
        <div className="md:col-span-2 space-y-4">
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
    </DashboardLayout>
  );
}