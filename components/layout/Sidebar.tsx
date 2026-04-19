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
