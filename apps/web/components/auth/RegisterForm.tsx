"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";

export default function RegisterForm() {
  const router = useRouter();
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다");
      return;
    }

    setLoading(true);
    try {
      await register(email, username, password);
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "회원가입에 실패했습니다");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-sm">
      <h1 className="text-2xl font-bold text-center mb-2">회원가입</h1>
      <p className="text-center text-sm text-muted mb-6">
        가입하면 <span className="text-accent font-semibold">100 포인트</span>를 받아요!
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-muted mb-1.5">
            이메일
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/50"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label htmlFor="username" className="block text-sm font-medium text-muted mb-1.5">
            사용자명
          </label>
          <input
            id="username"
            type="text"
            required
            minLength={3}
            maxLength={50}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/50"
            placeholder="3~50자"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-muted mb-1.5">
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/50"
            placeholder="8자 이상"
          />
        </div>

        <div>
          <label htmlFor="confirm-password" className="block text-sm font-medium text-muted mb-1.5">
            비밀번호 확인
          </label>
          <input
            id="confirm-password"
            type="password"
            required
            minLength={8}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/50"
            placeholder="비밀번호 재입력"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground hover:bg-accent/90 disabled:opacity-50 transition-colors"
        >
          {loading ? "가입 중..." : "회원가입"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        이미 계정이 있으신가요?{" "}
        <Link href="/login" className="text-accent hover:underline">
          로그인
        </Link>
      </p>
    </div>
  );
}
