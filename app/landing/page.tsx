"use client";

import Link from "next/link";

const features = [
  {
    emoji: "👑",
    title: "Membership",
    href: "/membership",
    color: "#7C3AED",
    bg: "#F5F3FF",
    border: "#DDD6FE",
    desc: "Choose your tier — Free, Standard, Pro, or Elite. Unlock more tools, priority support, and exclusive perks as you level up.",
    bullets: ["4 membership tiers", "Upgrade anytime", "ToolToken rewards"],
  },
  {
    emoji: "🔧",
    title: "Tool Library",
    href: "/tools",
    color: "#0369A1",
    bg: "#F0F9FF",
    border: "#BAE6FD",
    desc: "Browse thousands of tools available for rent or sale from local owners. Filter by category, location, or rating.",
    bullets: ["Search by location", "All tool categories", "Owner ratings"],
  },
  {
    emoji: "🐝",
    title: "HiveMatch™",
    href: "/hivematch",
    color: "#D97706",
    bg: "#FFFBEB",
    border: "#FDE68A",
    desc: "Our smart matching engine connects you with verified local tool owners based on your project needs, timeline, and budget.",
    bullets: ["Smart AI matching", "Verified owners", "Instant booking"],
  },
  {
    emoji: "👕",
    title: "HiveHaul Merch",
    href: "/merch",
    color: "#059669",
    bg: "#F0FDF4",
    border: "#A7F3D0",
    desc: "Represent the Hive. Shop exclusive ToolHive-branded apparel, accessories, and gear — all shipped right to your door.",
    bullets: ["Branded apparel", "Accessories", "Fast shipping"],
  },
  {
    emoji: "💳",
    title: "Token Wallet",
    href: "/wallet",
    color: "#1E293B",
    bg: "#F8FAFC",
    border: "#CBD5E1",
    desc: "Your secure digital wallet for ToolTokens. Send, receive, buy, or sell TT tokens. Real-time balance and full transaction history.",
    bullets: ["Buy at $1.25/TT", "Sell at $0.75/TT", "Secure ledger"],
  },
  {
    emoji: "🪙",
    title: "Token Shop",
    href: "/shop",
    color: "#F59E0B",
    bg: "#FFFBEB",
    border: "#FCD34D",
    desc: "Purchase ToolToken packs to unlock tool rentals, memberships, and premium features. The Hive runs on ToolTokens.",
    bullets: ["Starter to Elite packs", "Volume discounts", "Instant delivery"],
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen" style={{ background: "#0F172A" }}>

      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4" style={{ background: "#0F172A", borderBottom: "1px solid #1E3A5F" }}>
        <Link href="/" className="text-2xl font-black" style={{ color: "#F59E0B" }}>
          ToolHive&#8482;
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="#features" className="text-sm font-medium transition-colors" style={{ color: "#94A3B8" }}>Features</Link>
          <Link href="#sitemap" className="text-sm font-medium transition-colors" style={{ color: "#94A3B8" }}>Site Map</Link>
          <Link href="#tokens" className="text-sm font-medium transition-colors" style={{ color: "#94A3B8" }}>Tokens</Link>
        </nav>
        <Link href="/" className="px-5 py-2 rounded-xl text-sm font-bold transition-all hover:opacity-90" style={{ background: "#F59E0B", color: "#0F172A" }}>
          Enter App
        </Link>
      </header>

      {/* Hero */}
      <section className="text-center px-6 py-24 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold mb-8 uppercase tracking-widest" style={{ background: "#F59E0B22", color: "#F59E0B", border: "1px solid #F59E0B44" }}>
          🍯 The Tool-Sharing Platform for Canadians
        </div>
        <h1 className="text-5xl md:text-6xl font-black leading-tight mb-6" style={{ color: "#F8FAFC" }}>
          Rent Tools.<br />
          <span style={{ color: "#F59E0B" }}>Earn Tokens.</span><br />
          Build Together.
        </h1>
        <p className="text-lg mb-10 max-w-2xl mx-auto" style={{ color: "#94A3B8" }}>
          ToolHive&#8482; connects builders, contractors, and DIY enthusiasts with local tool owners. Borrow what you need, share what you have, and earn ToolTokens every step of the way.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="px-8 py-3 rounded-xl text-base font-bold transition-all hover:opacity-90 active:scale-95" style={{ background: "#F59E0B", color: "#0F172A" }}>
            Get Started Free
          </Link>
          <Link href="#features" className="px-8 py-3 rounded-xl text-base font-bold transition-all hover:opacity-80" style={{ background: "#1E293B", color: "#F8FAFC", border: "1px solid #334155" }}>
            See How It Works
          </Link>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="px-6 py-8 max-w-4xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Tools Listed", value: "2,400+" },
            { label: "Active Members", value: "1,200+" },
            { label: "Tokens Traded", value: "48,000+" },
            { label: "Cities Active", value: "12" },
          ].map((stat) => (
            <div key={stat.label} className="text-center rounded-2xl px-4 py-6" style={{ background: "#1E293B", border: "1px solid #334155" }}>
              <p className="text-2xl font-black mb-1" style={{ color: "#F59E0B" }}>{stat.value}</p>
              <p className="text-xs font-medium" style={{ color: "#64748B" }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <section id="features" className="px-6 py-16 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black mb-3" style={{ color: "#F8FAFC" }}>Everything in One Hive</h2>
          <p className="text-base" style={{ color: "#64748B" }}>Six powerful modules — all built for the building community.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <Link key={f.href} href={f.href} className="group block rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-xl" style={{ background: "#1E293B", border: "1px solid #334155" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: f.bg + "22" }}>
                  {f.emoji}
                </div>
                <div>
                  <h3 className="font-bold text-base" style={{ color: "#F8FAFC" }}>{f.title}</h3>
                  <span className="text-xs font-semibold" style={{ color: f.color }}>{f.href}</span>
                </div>
              </div>
              <p className="text-sm mb-4 leading-relaxed" style={{ color: "#94A3B8" }}>{f.desc}</p>
              <ul className="space-y-1">
                {f.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-xs font-medium" style={{ color: "#64748B" }}>
                    <span style={{ color: f.color }}>&#10003;</span> {b}
                  </li>
                ))}
              </ul>
            </Link>
          ))}
        </div>
      </section>

      {/* Token Economy */}
      <section id="tokens" className="px-6 py-16">
        <div className="max-w-4xl mx-auto rounded-3xl p-10 text-center" style={{ background: "linear-gradient(135deg, #1E293B 0%, #0F172A 100%)", border: "2px solid #F59E0B44" }}>
          <div className="text-5xl mb-4">🪙</div>
          <h2 className="text-3xl font-black mb-3" style={{ color: "#F59E0B" }}>ToolToken Economy</h2>
          <p className="text-base mb-8 max-w-xl mx-auto" style={{ color: "#94A3B8" }}>
            ToolTokens (TT) power everything on the platform. Buy, earn, and spend tokens to rent tools, unlock features, and reward great owners.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              { label: "Buy Rate", value: "$1.25 / TT", icon: "📈" },
              { label: "Sell Rate", value: "$0.75 / TT", icon: "📉" },
              { label: "Earn Rate", value: "Up to 10 TT/day", icon: "⚡" },
            ].map((t) => (
              <div key={t.label} className="rounded-2xl px-6 py-5" style={{ background: "#0F172A", border: "1px solid #F59E0B33" }}>
                <div className="text-2xl mb-2">{t.icon}</div>
                <p className="text-xl font-black mb-1" style={{ color: "#F59E0B" }}>{t.value}</p>
                <p className="text-xs" style={{ color: "#64748B" }}>{t.label}</p>
              </div>
            ))}
          </div>
          <Link href="/shop" className="inline-block px-8 py-3 rounded-xl font-bold transition-all hover:opacity-90" style={{ background: "#F59E0B", color: "#0F172A" }}>
            Buy ToolTokens
          </Link>
        </div>
      </section>

      {/* Site Map */}
      <section id="sitemap" className="px-6 py-16 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black mb-3" style={{ color: "#F8FAFC" }}>Site Map</h2>
          <p className="text-sm" style={{ color: "#64748B" }}>Every page — at a glance.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          {/* Main Sections */}
          <div className="rounded-2xl p-6" style={{ background: "#1E293B", border: "1px solid #334155" }}>
            <h3 className="font-bold text-sm uppercase tracking-widest mb-4" style={{ color: "#F59E0B" }}>Main Platform</h3>
            <ul className="space-y-3">
              {[
                { label: "Home / Dashboard", href: "/", emoji: "🏠" },
                { label: "Membership", href: "/membership", emoji: "👑" },
                { label: "Tool Library", href: "/tools", emoji: "🔧" },
                { label: "Library Hub", href: "/library", emoji: "📚" },
                { label: "HiveMatch™", href: "/hivematch", emoji: "🐝" },
                { label: "HiveHaul Merch", href: "/merch", emoji: "👕" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="flex items-center gap-3 text-sm font-medium transition-colors hover:opacity-80" style={{ color: "#94A3B8" }}>
                    <span>{item.emoji}</span>
                    <span>{item.label}</span>
                    <span className="ml-auto text-xs font-mono" style={{ color: "#475569" }}>{item.href}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Token & Info */}
          <div className="rounded-2xl p-6" style={{ background: "#1E293B", border: "1px solid #334155" }}>
            <h3 className="font-bold text-sm uppercase tracking-widest mb-4" style={{ color: "#F59E0B" }}>Tokens & Info</h3>
            <ul className="space-y-3">
              {[
                { label: "Token Wallet", href: "/wallet", emoji: "💳" },
                { label: "Token Shop", href: "/shop", emoji: "🪙" },
                { label: "About Us", href: "/about", emoji: "🏢" },
                { label: "Contact", href: "/contact", emoji: "📬" },
                { label: "Policies", href: "/policies", emoji: "📋" },
                { label: "Landing Page", href: "/landing", emoji: "🌐" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="flex items-center gap-3 text-sm font-medium transition-colors hover:opacity-80" style={{ color: "#94A3B8" }}>
                    <span>{item.emoji}</span>
                    <span>{item.label}</span>
                    <span className="ml-auto text-xs font-mono" style={{ color: "#475569" }}>{item.href}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>

      {/* CTA Footer */}
      <section className="px-6 py-20 text-center">
        <h2 className="text-3xl font-black mb-4" style={{ color: "#F8FAFC" }}>Ready to Join the Hive?</h2>
        <p className="text-base mb-8 max-w-lg mx-auto" style={{ color: "#94A3B8" }}>
          Sign up free and start browsing tools in your area today. No credit card required.
        </p>
        <Link href="/" className="inline-block px-10 py-4 rounded-xl text-lg font-black transition-all hover:opacity-90 active:scale-95" style={{ background: "#F59E0B", color: "#0F172A" }}>
          Join ToolHive&#8482; Free
        </Link>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 text-center" style={{ borderTop: "1px solid #1E293B" }}>
        <p className="text-sm" style={{ color: "#334155" }}>
          &#169; 2026 ToolHive&#8482; &#8212; Built for builders, by builders.
        </p>
      </footer>

    </div>
  );
}
