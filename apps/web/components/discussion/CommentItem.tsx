"use client";

import { useState } from "react";
import { ThumbsUp, ThumbsDown, Lightbulb, Scale, Handshake, MessageSquare } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import CommentForm from "./CommentForm";

type VoteType = "up" | "down" | "good_perspective" | "fair_point" | "persuasive";

interface Author {
  id: string;
  username: string;
  active_title?: string | null;
}

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

interface CommentItemProps {
  comment: Comment;
  onVote: (commentId: string, type: VoteType) => Promise<void>;
  onReply: (commentId: string, content: string) => Promise<void>;
  depth?: number;
}

const REACTIONS: {
  type: VoteType;
  icon: typeof ThumbsUp;
  label: string;
  activeColor: string;
  countKey: keyof Comment;
}[] = [
  { type: "up", icon: ThumbsUp, label: "좋아요", activeColor: "text-accent", countKey: "upvotes" },
  { type: "good_perspective", icon: Lightbulb, label: "좋은 관점", activeColor: "text-yellow-400", countKey: "good_perspectives" },
  { type: "fair_point", icon: Scale, label: "공정한 지적", activeColor: "text-blue-400", countKey: "fair_points" },
  { type: "persuasive", icon: Handshake, label: "설득력 있음", activeColor: "text-emerald-400", countKey: "persuasives" },
  { type: "down", icon: ThumbsDown, label: "비동의", activeColor: "text-red-400", countKey: "downvotes" },
];

export default function CommentItem({ comment, onVote, onReply, depth = 0 }: CommentItemProps) {
  const { isAuthenticated } = useAuth();
  const [showReplyForm, setShowReplyForm] = useState(false);

  const timeAgo = getTimeAgo(comment.created_at);

  return (
    <div className={depth > 0 ? "ml-6 border-l border-border pl-4" : ""}>
      <div className="py-3">
        {/* Header */}
        <div className="flex items-center gap-2 text-xs text-muted mb-1">
          <span className="font-medium text-foreground">{comment.author.username}</span>
          {comment.author.active_title && (
            <span className="text-accent">{comment.author.active_title}</span>
          )}
          <span>&middot;</span>
          <span>{timeAgo}</span>
        </div>

        {/* Content */}
        <p className="text-sm text-foreground/90 mb-2">{comment.content}</p>

        {/* Reactions */}
        <div className="flex items-center gap-3 text-xs text-muted flex-wrap">
          {REACTIONS.map((reaction) => {
            const Icon = reaction.icon;
            const count = (comment[reaction.countKey] as number) || 0;
            const isActive = comment.my_vote === reaction.type;
            return (
              <button
                key={reaction.type}
                onClick={() => isAuthenticated && onVote(comment.id, reaction.type)}
                className={`flex items-center gap-1 transition-colors ${
                  isActive
                    ? reaction.activeColor
                    : "hover:text-foreground"
                }`}
                title={reaction.label}
              >
                <Icon className="h-3.5 w-3.5" />
                {count > 0 && <span>{count}</span>}
              </button>
            );
          })}

          {depth === 0 && (
            <button
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="flex items-center gap-1 hover:text-foreground transition-colors"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              답글
            </button>
          )}
        </div>

        {/* Reply Form */}
        {showReplyForm && (
          <div className="mt-2">
            <CommentForm
              onSubmit={async (content) => {
                await onReply(comment.id, content);
                setShowReplyForm(false);
              }}
              placeholder="답글 작성..."
              buttonLabel="답글"
            />
          </div>
        )}
      </div>

      {/* Replies */}
      {comment.replies?.map((reply) => (
        <CommentItem
          key={reply.id}
          comment={reply}
          onVote={onVote}
          onReply={onReply}
          depth={depth + 1}
        />
      ))}
    </div>
  );
}

function getTimeAgo(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = now - then;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "방금";
  if (mins < 60) return `${mins}분 전`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}시간 전`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}일 전`;
  return `${Math.floor(days / 30)}개월 전`;
}
