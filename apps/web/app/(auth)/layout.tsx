import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <Link href="/" className="flex items-center gap-3 mb-8 group">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground font-bold text-base">
          NF
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-bold tracking-tight text-foreground">NAVIFACT</span>
          <span className="text-[10px] leading-none text-muted">진실을 향한 내비게이션</span>
        </div>
      </Link>
      {children}
    </div>
  );
}
