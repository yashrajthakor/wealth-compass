export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img
        src="/logo.png"
        alt="Rudrans Systematic Investment"
        className="h-22 w-auto object-contain"
      />
    </div>
  );
}
