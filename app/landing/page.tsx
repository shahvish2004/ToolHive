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
                <nav style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"1rem 2rem", borderBottom:`1px solid ${S.border}`, position:"sticky", top:0, zIndex:100, background:S.bg }}>
                          <span style={{ fontSize:"1.4rem", fontWeight:800, color:S.gold }}>ToolHive™</span>span>
                          <div style={{ display:"flex", gap:"1.5rem", alignItems:"center" }}>
                                      <button onClick={()=>go("how-it-works")} style={{ background:"none", border:"none", color:"#CBD5E1", cursor:"pointer", fontSize:"0.9rem" }}>Features</button>button>
                                      <a href="#sitemap" style={{ color:"#CBD5E1", textDecoration:"none", fontSize:"0.9rem" }}>Site Map</a>a>
                                      <a href="#tokens" style={{ color:"#CBD5E1", textDecoration:"none", fontSize:"0.9rem" }}>Tokens</a>a>
                                      <Link href="/" style={{ background:S.gold, color:S.bg, padding:"0.5rem 1.25rem", borderRadius:"8px", fontWeight:700, textDecoration:"none" }}>Enter App</Link>Link>
                          </div>div>
                </nav>nav>

          {/* HERO */}
                <section style={{ textAlign:"center", padding:"5rem 1.5rem 4rem", maxWidth:"800px", margin:"0 auto" }}>
                          <div style={{ display:"inline-block", background:"#1E3A5F", border:`1px solid ${S.gold}44`, borderRadius:"999px", padding:"0.4rem 1.2rem", fontSize:"0.8rem", color:S.gold, marginBottom:"2rem", fontWeight:600 }}>
                                      🍯 THE TOOL-SHARING PLATFORM FOR CANADIANS
                          </div>div>
                          <h1 style={{ fontSize:"clamp(2.5rem,6vw,4.5rem)", fontWeight:900, lineHeight:1.1, marginBottom:"1.5rem" }}>
                                      Rent Tools.<br/>
                                      <span style={{ color:S.gold }}>Earn Tokens.</span>span><br/>
                                      Build Together.
                          </h1>h1>
                          <p style={{ fontSize:"1.1rem", color:S.text, maxWidth:"580px", margin:"0 auto 2.5rem", lineHeight:1.7 }}>
                                      ToolHive™ connects builders, contractors, and DIY enthusiasts with local tool owners.
                                      Borrow what you need, share what you have, and earn ToolTokens every step of the way.
                          </p>p>
                          <div style={{ display:"flex", gap:"1rem", justifyContent:"center", flexWrap:"wrap" }}>
                                      <Link href="/" style={{ background:S.gold, color:S.bg, padding:"0.85rem 2rem", borderRadius:"12px", fontWeight:700, textDecoration:"none" }}>Get Started Free</Link>Link>
                                      <button onClick={()=>go("how-it-works")} style={{ background:"#1E2D40", border:"1px solid #334155", color:"#fff", padding:"0.85rem 2rem", borderRadius:"12px", fontWeight:600, cursor:"pointer" }}>
                                                    See How It Works
                                      </button>button>
                          </div>div>
                </section>section>

          {/* STATS */}
                <section style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", gap:"1rem", maxWidth:"900px", margin:"0 auto 5rem", padding:"0 1.5rem" }}>
                  {[{n:"2,400+",l:"Tools Listed"},{n:"1,200+",l:"Active Members"},{n:"48,000+",l:"Tokens Traded"},{n:"12",l:"Cities Active"}].map(s=>(
                    <div key={s.l} style={{ background:S.card, border:`1px solid ${S.border}`, borderRadius:"16px", padding:"1.5rem", textAlign:"center" }}>
                                  <div style={{ fontSize:"2rem", fontWeight:800, color:S.gold }}>{s.n}</div>div>
                                  <div style={{ color:S.muted, fontSize:"0.85rem", marginTop:"0.3rem" }}>{s.l}</div>div>
                    </div>div>
                  ))}
                </section>section>

          {/* HOW IT WORKS */}
                <section id="how-it-works" style={{ maxWidth:"1000px", margin:"0 auto 5rem", padding:"0 1.5rem" }}>
                          <h2 style={{ textAlign:"center", fontSize:"2rem", fontWeight:800, marginBottom:"0.75rem" }}>How ToolHive™ Works</h2>h2>
                          <p style={{ textAlign:"center", color:S.muted, marginBottom:"3rem" }}>Three simple steps to borrow or lend tools in your neighbourhood.</p>p>
                          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:"1.5rem" }}>
                            {[
          {step:"1",icon:"🔍",title:"Browse & Discover",desc:"Search thousands of tools listed by neighbours nearby. Filter by category, distance, or availability. Find exactly what you need for your next project."},
          {step:"2",icon:"🤝",title:"Request & Connect",desc:"Send a rental request to the owner. ToolHive handles the match, deposit, and scheduling inside the app. Your address stays private until the deposit is confirmed."},
          {step:"3",icon:"🪙",title:"Borrow & Earn",desc:"Pick up the tool, complete your project, return it in good shape, and earn ToolTokens. Lenders earn too — putting idle tools to work for the whole community."},
                    ].map(s=>(
                                  <div key={s.step} style={{ background:S.card, border:`1px solid ${S.border}`, borderRadius:"20px", padding:"2rem", position:"relative" }}>
                                                  <div style={{ position:"absolute", top:"-1px", left:"1.5rem", background:S.gold, color:S.bg, fontWeight:800, fontSize:"0.7rem", padding:"0.2rem 0.6rem", borderRadius:"0 0 8px 8px" }}>STEP {s.step}</div>div>
                                                  <div style={{ fontSize:"2.5rem", margin:"0.75rem 0 1rem" }}>{s.icon}</div>div>
                                                  <h3 style={{ fontSize:"1.1rem", fontWeight:700, marginBottom:"0.75rem" }}>{s.title}</h3>h3>
                                                  <p style={{ color:S.muted, lineHeight:1.7, fontSize:"0.9rem" }}>{s.desc}</p>p>
                                  </div>div>
                                ))}
                          </div>div>
                </section>section>

          {/* FEATURES */}
                <section id="features" style={{ maxWidth:"1100px", margin:"0 auto 5rem", padding:"0 1.5rem" }}>
                          <h2 style={{ textAlign:"center", fontSize:"2rem", fontWeight:800, marginBottom:"0.5rem" }}>Everything in One Hive</h2>h2>
                          <p style={{ textAlign:"center", color:S.muted, marginBottom:"3rem" }}>Six powerful modules — all built for the building community.</p>p>
                          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:"1.25rem" }}>
                            {[
          {icon:"🔧",title:"Tool Library",href:"/tools",color:"#10B981",desc:"Browse thousands of tools for rent. Filter by category, location, or rating.",bullets:["Search by location","All categories","Owner ratings"]},
          {icon:"🐝",title:"HiveMatch™",href:"/hivematch",color:"#F59E0B",desc:"Smart matching engine connects you with verified local tool owners for your project.",bullets:["Smart AI matching","Verified owners","Instant booking"]},
          {icon:"👑",title:"Membership",href:"/membership",color:"#F59E0B",desc:"Free, Standard, Pro, or Elite — unlock more tools, priority support, and perks.",bullets:["4 tiers","Upgrade anytime","Token rewards"]},
          {icon:"👕",title:"HiveHaul Merch",href:"/merch",color:"#8B5CF6",desc:"Shop exclusive ToolHive-branded apparel and gear shipped to your door.",bullets:["Branded apparel","Accessories","Fast shipping"]},
          {icon:"💳",title:"Token Wallet",href:"/wallet",color:"#3B82F6",desc:"Secure wallet — send, receive, buy, or sell ToolTokens with real-time balance.",bullets:["Buy at $1.25/TT","Sell at $0.75/TT","Secure ledger"]},
          {icon:"🪙",title:"Token Shop",href:"/shop",color:"#F59E0B",desc:"Purchase ToolToken packs to unlock tool rentals, memberships, and premium features.",bullets:["Starter to Elite packs","Volume discounts","Instant delivery"]},
                    ].map(f=>(
                                  <div key={f.title} style={{ background:S.card, border:`1px solid ${S.border}`, borderRadius:"20px", padding:"1.75rem" }}>
                                                  <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"1rem" }}>
                                                                    <div style={{ width:48, height:48, background:"#1E2D40", borderRadius:"12px", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.4rem" }}>{f.icon}</div>div>
                                                                    <div>
                                                                                      <div style={{ fontWeight:700 }}>{f.title}</div>div>
                                                                                      <div style={{ color:f.color, fontSize:"0.8rem" }}>{f.href}</div>div>
                                                                    </div>div>
                                                  </div>div>
                                                <p style={{ color:S.muted, fontSize:"0.875rem", lineHeight:1.65, marginBottom:"1rem" }}>{f.desc}</p>p>
                                    {f.bullets.map(b=><div key={b} style={{ color:S.text, fontSize:"0.8rem", marginBottom:"0.3rem" }}>✓ {b}</div>div>)}
                                  </div>div>
                                ))}
                          </div>div>
                </section>section>
        
          {/* TOKEN ECONOMY */}
              <section id="tokens" style={{ maxWidth:"800px", margin:"0 auto 5rem", padding:"0 1.5rem" }}>
                      <div style={{ background:"linear-gradient(135deg,#1E2D40,#111F33)", border:`1px solid ${S.gold}44`, borderRadius:"24px", padding:"3rem 2rem", textAlign:"center" }}>
                                <div style={{ fontSize:"2.5rem", marginBottom:"1rem" }}>🪙</div>div>
                                <h2 style={{ fontSize:"1.75rem", fontWeight:800, color:S.gold, marginBottom:"0.75rem" }}>ToolToken Economy</h2>h2>
                                <p style={{ color:S.text, maxWidth:"500px", margin:"0 auto 2.5rem", lineHeight:1.65 }}>
                                            ToolTokens (TT) power everything on the platform. Buy, earn, and spend tokens to rent tools, unlock features, and reward great owners.
                                </p>p>
                                <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"1rem", marginBottom:"2rem" }}>
                                  {[{i:"📈",v:"$1.25 / TT",l:"Buy Rate"},{i:"📉",v:"$0.75 / TT",l:"Sell Rate"},{i:"⚡",v:"Up to 10 TT/day",l:"Earn Rate"}].map(t=>(
                        <div key={t.l} style={{ background:S.bg, borderRadius:"12px", padding:"1.25rem 0.5rem" }}>
                                        <div style={{ fontSize:"1.5rem", marginBottom:"0.4rem" }}>{t.i}</div>div>
                                        <div style={{ color:S.gold, fontWeight:700 }}>{t.v}</div>div>
                                        <div style={{ color:S.muted, fontSize:"0.75rem", marginTop:"0.25rem" }}>{t.l}</div>div>
                        </div>div>
                      ))}
                                </div>div>
                                <Link href="/shop" style={{ background:S.gold, color:S.bg, padding:"0.85rem 2.5rem", borderRadius:"12px", fontWeight:700, textDecoration:"none", display:"inline-block" }}>Buy ToolTokens</Link>Link>
                      </div>div>
              </section>section>
        
          {/* SITE MAP */}
              <section id="sitemap" style={{ maxWidth:"900px", margin:"0 auto 5rem", padding:"0 1.5rem" }}>
                      <h2 style={{ textAlign:"center", fontSize:"2rem", fontWeight:800, marginBottom:"0.5rem" }}>Site Map</h2>h2>
                      <p style={{ textAlign:"center", color:S.muted, marginBottom:"2.5rem" }}>Every page — at a glance.</p>p>
                      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:"1.5rem" }}>
                                <div style={{ background:S.card, border:`1px solid ${S.border}`, borderRadius:"20px", padding:"2rem" }}>
                                            <p style={{ color:S.gold, fontWeight:700, fontSize:"0.75rem", letterSpacing:"0.08em", marginBottom:"1.25rem" }}>MAIN PLATFORM</p>
                                  {[{i:"🏠",l:"Home / Dashboard",h:"/"},{i:"👑",l:"Membership",h:"/membership"},{i:"🔧",l:"Tool Library",h:"/tools"},{i:"📚",l:"Librar</div>



          {[{i:"🏠",l:"Home",h:"/"},{i:"👑",l:"Membership",h:"/membership"},{i:"🔧",l:"Tool Library",h:"/tools"},{i:"📚",l:"Library Hub",h:"/library"},{i:"🐝",l:"HiveMatch",h:"/hivematch"},{i:"👕",l:"HiveHaul Merch",h:"/merch"}].map(p=>(
                          <div key={p.h} style={{ display:"flex", justifyContent:"space-between", padding:"0.4rem 0", color:S.text, fontSize:"0.85rem" }}>
                                            <span>{p.i} {p.l}</span>span><a href={p.h} style={{ color:S.muted, fontSize:"0.8rem", textDecoration:"none" }}>{p.h}</a>a>
                          </div>div>
                        ))}
                                    </div>
                                            </span>
