export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-baseline gap-2 ${className}`}>
      <span className="font-display text-3xl leading-none text-brand">RSI</span>
      <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
        Rudrans Systematic Investment
      </span>
    </div>
  );
}
