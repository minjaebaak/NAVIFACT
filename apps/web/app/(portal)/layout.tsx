"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Compass,
  Calendar,
  TrendingUp,
  Search,
  Users,
  LogIn,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";

const navLinks = [
  { href: "/events", label: "이벤트", icon: Compass },
  { href: "/timeline", label: "타임라인", icon: Calendar },
  { href: "/predict", label: "예측시장", icon: TrendingUp },
  { href: "/community", label: "커뮤니티", icon: Users },
  { href: "/search", label: "검색", icon: Search },
];

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground font-bold text-sm">
                NF
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-foreground">
                  NAVIFACT
                </span>
                <span className="text-[10px] leading-none text-muted hidden sm:block">
                  진실을 향한 내비게이션
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-accent/10 text-accent"
                        : "text-muted hover:text-foreground hover:bg-white/5"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-2">
              {isAuthenticated && user ? (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-accent font-semibold">
                    {user.points.toLocaleString()} P
                  </span>
                  <span className="text-sm text-foreground">{user.username}</span>
                  <button
                    onClick={logout}
                    className="text-sm text-muted hover:text-foreground transition-colors"
                  >
                    로그아웃
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-accent text-accent-foreground hover:bg-accent/90 transition-colors"
                >
                  <LogIn className="h-4 w-4" />
                  로그인
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg text-muted hover:text-foreground hover:bg-white/5 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden pb-4 border-t border-border pt-4">
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-accent/10 text-accent"
                          : "text-muted hover:text-foreground hover:bg-white/5"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {link.label}
                    </Link>
                  );
                })}
                {/* Mobile Auth */}
                <div className="border-t border-border mt-2 pt-2">
                  {isAuthenticated && user ? (
                    <div className="flex items-center justify-between px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-foreground">{user.username}</span>
                        <span className="text-sm text-accent font-semibold">
                          {user.points.toLocaleString()} P
                        </span>
                      </div>
                      <button
                        onClick={() => { logout(); setMobileMenuOpen(false); }}
                        className="text-sm text-muted hover:text-foreground"
                      >
                        로그아웃
                      </button>
                    </div>
                  ) : (
                    <Link
                      href="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-accent"
                    >
                      <LogIn className="h-4 w-4" />
                      로그인
                    </Link>
                  )}
                </div>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-muted">
              <span className="font-semibold text-foreground">NAVIFACT</span>
              <span>&middot;</span>
              <span>진실을 향한 내비게이션</span>
            </div>
            <div className="text-xs text-muted">
              Fact-based historical event tracking
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
