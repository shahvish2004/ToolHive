"use client";
import Link from "next/link";

const S = {
  bg: "#0B1628", card: "#111F33", border: "#1E3A5F",
  gold: "#F59E0B", muted: "#64748B", text: "#94A3B8",
};

export default function LandingPage() {
  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div style={{ background: S.bg, color: "#fff", minHeight: "100vh", fontFamily: "system-ui,sans-serif" }}>

      {/* NAV */}
      <nav style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"1rem 2rem", borderBottom:`1px solid ${S.border}`, position:"sticky", top:0, background:S.bg, zIndex:100 }}>
        <span style={{ fontSize:"1.4rem", fontWeight:800, color:S.gold }}>ToolHive™</span>
        <div style={{ display:"flex", gap:"1.5rem", alignItems:"center" }}>
          <button onClick={()=>go("how-it-works")} style={{ background:"none", border:"none", color:"#CBD5E1", cursor:"pointer", fontSize:"0.95rem" }}>How It Works</button>
          <a href="#sitemap" style={{ color:"#CBD5E1", textDecoration:"none", fontSize:"0.95rem" }}>Features</a>
          <a href="#tokens" style={{ color:"#CBD5E1", textDecoration:"none", fontSize:"0.95rem" }}>Tokens</a>
          <Link href="/" style={{ background:S.gold, color:S.bg, padding:"0.5rem 1.25rem", borderRadius:"8px", fontWeight:700, textDecoration:"none", fontSize:"0.95rem" }}>Enter App</Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ textAlign:"center", padding:"6rem 1.5rem 4rem", maxWidth:"800px", margin:"0 auto" }}>
        <div style={{ display:"inline-block", background:`${S.gold}22`, border:`1px solid ${S.gold}44`, color:S.gold, padding:"0.35rem 1rem", borderRadius:"999px", fontSize:"0.85rem", marginBottom:"1.5rem" }}>
          ⭐ Community Tool Sharing Platform
        </div>
        <h1 style={{ fontSize:"clamp(2.2rem,6vw,3.75rem)", fontWeight:900, lineHeight:1.1, marginBottom:"1.5rem" }}>
          Rent Tools.<br/>Earn Tokens.<br/>
          <span style={{ color:S.gold }}>Build Together.</span>
        </h1>
        <p style={{ color:S.text, fontSize:"1.15rem", maxWidth:"560px", margin:"0 auto 2.5rem", lineHeight:1.7 }}>
          ToolHive™ connects neighbours to share tools, earn rewards, and build a stronger community — one rental at a time.
        </p>
        <div style={{ display:"flex", gap:"1rem", justifyContent:"center", flexWrap:"wrap" }}>
          <Link href="/" style={{ background:S.gold, color:S.bg, padding:"0.875rem 2.5rem", borderRadius:"12px", fontWeight:700, textDecoration:"none", fontSize:"1.05rem" }}>
            Get Started Free
          </Link>
          <button onClick={()=>go("how-it-works")} style={{ background:"transparent", border:`2px solid ${S.border}`, color:"#CBD5E1", padding:"0.875rem 2.5rem", borderRadius:"12px", fontWeight:600, cursor:"pointer", fontSize:"1.05rem" }}>
            See How It Works
          </button>
        </div>
      </section>

      {/* STATS */}
      <section style={{ display:"flex", justifyContent:"center", gap:"3rem", flexWrap:"wrap", padding:"2rem 1.5rem 4rem" }}>
        {[{v:"2,400+",l:"Tools Listed"},{v:"1,200+",l:"Active Members"},{v:"95%",l:"5-Star Ratings"},{v:"$0",l:"Sign-Up Fee"}].map(s=>(
          <div key={s.l} style={{ textAlign:"center" }}>
            <div style={{ fontSize:"2rem", fontWeight:800, color:S.gold }}>{s.v}</div>
            <div style={{ color:S.text, fontSize:"0.9rem", marginTop:"0.25rem" }}>{s.l}</div>
          </div>
        ))}
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" style={{ padding:"4rem 1.5rem", maxWidth:"900px", margin:"0 auto" }}>
        <h2 style={{ textAlign:"center", fontSize:"2rem", fontWeight:800, marginBottom:"0.75rem" }}>How It Works</h2>
        <p style={{ textAlign:"center", color:S.text, marginBottom:"3rem" }}>Three simple steps to start borrowing or earning with your tools.</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))", gap:"1.5rem" }}>
          {[
            { step:"01", icon:"🔍", title:"Browse & Discover", desc:"Search tools near you by category, distance, or keyword. See owner profiles, ratings, and availability in real-time." },
            { step:"02", icon:"🤝", title:"Request & Connect", desc:"Send a borrow request to the tool owner. Chat through the platform, agree on timing, and confirm with ToolTokens." },
            { step:"03", icon:"🛠️", title:"Borrow & Earn", desc:"Pick up the tool, complete your project, and return it. Earn ToolTokens for every successful transaction as a lender." },
          ].map(s=>(
            <div key={s.step} style={{ background:S.card, border:`1px solid ${S.border}`, borderRadius:"16px", padding:"2rem 1.5rem", position:"relative" }}>
              <div style={{ position:"absolute", top:"1rem", right:"1.25rem", background:`${S.gold}22`, color:S.gold, padding:"0.2rem 0.6rem", borderRadius:"999px", fontSize:"0.75rem", fontWeight:700 }}>STEP {s.step}</div>
              <div style={{ fontSize:"2.5rem", marginBottom:"0.75rem" }}>{s.icon}</div>
              <h3 style={{ fontWeight:700, marginBottom:"0.5rem" }}>{s.title}</h3>
              <p style={{ color:S.text, fontSize:"0.9rem", lineHeight:1.6 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding:"4rem 1.5rem 5rem", maxWidth:"1100px", margin:"0 auto" }}>
        <h2 style={{ textAlign:"center", fontSize:"2rem", fontWeight:800, marginBottom:"0.75rem" }}>Everything You Need</h2>
        <p style={{ textAlign:"center", color:S.text, marginBottom:"3rem" }}>Six powerful modules working together for a seamless tool-sharing experience.</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:"1.25rem" }}>
          {[
            { icon:"🔧", title:"Tool Library", desc:"Browse and list thousands of tools across dozens of categories. Power tools, gardening, plumbing, and more.", bullets:["Smart search & filters","Tool condition ratings","Damage deposit protection"], href:"/tools" },
            { icon:"🐝", title:"HiveMatch™", desc:"Our smart matching engine connects borrowers with the nearest, best-rated tool owners automatically.", bullets:["AI-powered recommendations","Location-based matching","Instant availability checks"], href:"/hivematch" },
            { icon:"📚", title:"Library Hub", desc:"Community-curated lists, how-to guides, and expert tips for getting the most out of every tool.", bullets:["Project guides & tutorials","Tool maintenance tips","Community reviews"], href:"/library" },
            { icon:"👑", title:"Membership", desc:"Upgrade your experience with ToolHive Pro or Business plans for higher earning rates and premium features.", bullets:["Higher earn rates","Priority listing","Advanced analytics"], href:"/membership" },
            { icon:"👕", title:"HiveHaul Merch", desc:"Show off your love for the community with branded gear. Every purchase supports the platform.", bullets:["Branded apparel & gear","Community badge system","Limited edition drops"], href:"/merch" },
            { icon:"💳", title:"ToolToken Wallet", desc:"Earn, hold, and spend ToolTokens (TT) — the platform currency that powers every transaction.", bullets:["Real-time balance","Transaction history","Secure transfers"], href:"/wallet" },
          ].map(f=>(
            <div key={f.title} style={{ background:S.card, border:`1px solid ${S.border}`, borderRadius:"16px", padding:"1.75rem 1.5rem" }}>
              <div style={{ fontSize:"2rem", marginBottom:"0.75rem" }}>{f.icon}</div>
              <h3 style={{ fontWeight:700, marginBottom:"0.5rem" }}>{f.title}</h3>
              <p style={{ color:S.text, fontSize:"0.875rem", marginBottom:"1rem", lineHeight:1.6 }}>{f.desc}</p>
              <div style={{ marginBottom:"1.25rem" }}>
                {f.bullets.map(b=><div key={b} style={{ color:S.text, fontSize:"0.8rem", marginBottom:"0.3rem" }}>✓ {b}</div>)}
              </div>
              <Link href={f.href} style={{ color:S.gold, fontSize:"0.875rem", textDecoration:"none", fontWeight:600 }}>Explore →</Link>
            </div>
          ))}
        </div>
      </section>

      {/* TOKEN ECONOMY */}
      <section id="tokens" style={{ maxWidth:"800px", margin:"0 auto 5rem", padding:"0 1.5rem" }}>
        <div style={{ background:"linear-gradient(135deg,#1E2D40,#111F33)", border:`1px solid ${S.gold}44`, borderRadius:"24px", padding:"3rem 2rem", textAlign:"center" }}>
          <div style={{ fontSize:"2.5rem", marginBottom:"1rem" }}>🪙</div>
          <h2 style={{ fontSize:"1.75rem", fontWeight:800, color:S.gold, marginBottom:"0.75rem" }}>ToolToken Economy</h2>
          <p style={{ color:S.text, maxWidth:"500px", margin:"0 auto 2.5rem", lineHeight:1.65 }}>
            ToolTokens (TT) power everything on the platform. Buy, earn, and spend tokens to rent tools, unlock features, and reward great owners.
          </p>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"1rem", marginBottom:"2rem" }}>
            {[{i:"📈",v:"$1.25 / TT",l:"Buy Rate"},{i:"📉",v:"$0.75 / TT",l:"Sell Rate"},{i:"⚡",v:"Up to 10 TT/day",l:"Earn Rate"}].map(t=>(
              <div key={t.l} style={{ background:S.bg, borderRadius:"12px", padding:"1.25rem 0.5rem" }}>
                <div style={{ fontSize:"1.5rem", marginBottom:"0.4rem" }}>{t.i}</div>
                <div style={{ color:S.gold, fontWeight:700 }}>{t.v}</div>
                <div style={{ color:S.muted, fontSize:"0.75rem", marginTop:"0.25rem" }}>{t.l}</div>
              </div>
            ))}
          </div>
          <Link href="/shop" style={{ background:S.gold, color:S.bg, padding:"0.75rem 2.5rem", borderRadius:"10px", fontWeight:700, textDecoration:"none", display:"inline-block" }}>
            Visit Token Shop
          </Link>
        </div>
      </section>

      {/* SITE MAP */}
      <section id="sitemap" style={{ maxWidth:"1000px", margin:"0 auto 5rem", padding:"0 1.5rem" }}>
        <h2 style={{ textAlign:"center", fontSize:"1.75rem", fontWeight:800, marginBottom:"2rem" }}>Explore ToolHive™</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:"1.5rem" }}>
          <div style={{ background:S.card, border:`1px solid ${S.border}`, borderRadius:"16px", padding:"1.5rem" }}>
            <h3 style={{ color:S.gold, fontWeight:700, marginBottom:"1rem", fontSize:"0.9rem", textTransform:"uppercase", letterSpacing:"0.05em" }}>Main Platform</h3>
            {[{i:"🔧",l:"Tool Library",h:"/tools"},{i:"🐝",l:"HiveMatch™",h:"/hivematch"},{i:"📚",l:"Library Hub",h:"/library"},{i:"👑",l:"Membership",h:"/membership"},{i:"👕",l:"HiveHaul Merch",h:"/merch"}].map(p=>(
              <div key={p.h} style={{ display:"flex", justifyContent:"space-between", padding:"0.4rem 0", color:S.text, fontSize:"0.85rem" }}>
                <span>{p.i} {p.l}</span><a href={p.h} style={{ color:S.muted, fontSize:"0.8rem", textDecoration:"none" }}>{p.h}</a>
              </div>
            ))}
          </div>
          <div style={{ background:S.card, border:`1px solid ${S.border}`, borderRadius:"16px", padding:"1.5rem" }}>
            <h3 style={{ color:S.gold, fontWeight:700, marginBottom:"1rem", fontSize:"0.9rem", textTransform:"uppercase", letterSpacing:"0.05em" }}>Tokens & Info</h3>
            {[{i:"💳",l:"Token Wallet",h:"/wallet"},{i:"🪙",l:"Token Shop",h:"/shop"},{i:"🏢",l:"About Us",h:"/about"},{i:"📬",l:"Contact",h:"/contact"},{i:"📋",l:"Policies",h:"/policies"},{i:"🌐",l:"Landing Page",h:"/landing"}].map(p=>(
              <div key={p.h} style={{ display:"flex", justifyContent:"space-between", padding:"0.4rem 0", color:S.text, fontSize:"0.85rem" }}>
                <span>{p.i} {p.l}</span><a href={p.h} style={{ color:S.muted, fontSize:"0.8rem", textDecoration:"none" }}>{p.h}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ textAlign:"center", padding:"4rem 1.5rem 5rem", maxWidth:"700px", margin:"0 auto" }}>
        <h2 style={{ fontSize:"2.25rem", fontWeight:900, marginBottom:"1rem" }}>Ready to Join the Hive?</h2>
        <p style={{ color:S.muted, marginBottom:"2rem" }}>Sign up free and start browsing tools in your area today. No credit card required.</p>
        <Link href="/" style={{ background:S.gold, color:S.bg, padding:"1rem 3rem", borderRadius:"14px", fontWeight:700, textDecoration:"none", fontSize:"1.1rem", display:"inline-block" }}>
          Join ToolHive™ Free
        </Link>
      </section>

      {/* FOOTER */}
      <footer style={{ textAlign:"center", padding:"1.5rem", borderTop:`1px solid ${S.border}`, color:S.muted, fontSize:"0.85rem" }}>
        © 2026 ToolHive™ — Built for builders, by builders.
      </footer>

    </div>
  );
}
