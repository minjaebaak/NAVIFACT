"use client";

import { useCallback, useEffect, useState } from "react";
import { MessageSquare } from "lucide-react";
import { getToken } from "@/lib/auth";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

interface Author {
  id: string;
  username: string;
  active_title?: string | null;
}

type VoteType = "up" | "down" | "good_perspective" | "fair_point" | "persuasive";

interface Comment {
  id: string;
  content: string;
  author: Author;
  parent_id?: string | null;
  upvotes: number;
  downvotes: number;
  good_perspectives: number;
  fair_points: number;
  persuasives: number;
  my_vote?: string | null;
  created_at: string;
  replies: Comment[];
}

interface Discussion {
  id: string;
  title: string;
  comment_count: number;
}

interface DiscussionThreadProps {
  targetType: "event" | "prediction";
  targetId: string;
}

export default function DiscussionThread({ targetType, targetId }: DiscussionThreadProps) {
  const [discussion, setDiscussion] = useState<Discussion | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDiscussion = useCallback(async () => {
    try {
      const res = await fetch(
        `${API_URL}/discussions?target_type=${targetType}&target_id=${targetId}`
      );
      if (!res.ok) return;
      const disc: Discussion = await res.json();
      setDiscussion(disc);

      // Fetch comments (include auth header for my_vote)
      const token = getToken();
      const commentsRes = await fetch(
        `${API_URL}/discussions/${disc.id}/comments?page_size=50`,
        token ? { headers: { Authorization: `Bearer ${token}` } } : undefined
      );
      if (commentsRes.ok) {
        const data = await commentsRes.json();
        setComments(data.items || []);
      }
    } catch {
      // API unavailable — show empty state
    } finally {
      setLoading(false);
    }
  }, [targetType, targetId]);

  useEffect(() => {
    fetchDiscussion();
  }, [fetchDiscussion]);

  async function handleComment(content: string) {
    if (!discussion) return;
    const token = getToken();
    const res = await fetch(`${API_URL}/discussions/${discussion.id}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ content }),
    });
    if (res.ok) {
      await fetchDiscussion();
    }
  }

  async function handleReply(parentId: string, content: string) {
    if (!discussion) return;
    const token = getToken();
    const res = await fetch(`${API_URL}/discussions/${discussion.id}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ content, parent_id: parentId }),
    });
    if (res.ok) {
      await fetchDiscussion();
    }
  }

  async function handleVote(commentId: string, type: VoteType) {
    const token = getToken();
    if (!token) return;
    await fetch(`${API_URL}/discussions/comments/${commentId}/vote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ vote_type: type }),
    });
    await fetchDiscussion();
  }

  if (loading) {
    return (
      <div className="animate-pulse space-y-3">
        <div className="h-4 bg-white/5 rounded w-32" />
        <div className="h-20 bg-white/5 rounded" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-muted">
        <MessageSquare className="h-5 w-5" />
        <h3 className="font-semibold text-foreground">
          토론 {discussion ? `(${comments.length})` : ""}
        </h3>
      </div>

      <CommentForm onSubmit={handleComment} />

      {comments.length === 0 ? (
        <p className="text-sm text-muted text-center py-8">
          아직 댓글이 없습니다. 첫 번째 의견을 남겨보세요!
        </p>
      ) : (
        <div className="divide-y divide-border">
          {comments.map((c) => (
            <CommentItem
              key={c.id}
              comment={c}
              onVote={handleVote}
              onReply={handleReply}
            />
          ))}
        </div>
      )}
    </div>
  );
}
