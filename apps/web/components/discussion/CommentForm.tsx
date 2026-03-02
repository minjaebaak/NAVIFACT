"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import Link from "next/link";

interface CommentFormProps {
  onSubmit: (content: string) => Promise<void>;
  placeholder?: string;
  buttonLabel?: string;
}

export default function CommentForm({
  onSubmit,
  placeholder = "의견을 남겨보세요...",
  buttonLabel = "댓글 작성",
}: CommentFormProps) {
  const { isAuthenticated } = useAuth();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="rounded-lg border border-border bg-white/5 p-4 text-center text-sm text-muted">
        <Link href="/login" className="text-accent hover:underline">
          로그인
        </Link>
        하면 토론에 참여할 수 있습니다.
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;
    setLoading(true);
    try {
      await onSubmit(content.trim());
      setContent("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder}
        maxLength={2000}
        className="flex-1 rounded-lg border border-border bg-background px-4 py-2 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/50"
      />
      <button
        type="submit"
        disabled={loading || !content.trim()}
        className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground hover:bg-accent/90 disabled:opacity-50 transition-colors whitespace-nowrap"
      >
        {loading ? "..." : buttonLabel}
      </button>
    </form>
  );
}
