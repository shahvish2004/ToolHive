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
