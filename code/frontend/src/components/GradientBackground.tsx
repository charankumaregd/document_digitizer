export default function GradientBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden -z-40">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-primary/20">
        <div className="absolute inset-0 bg-grid-primary/30 bg-[size:22px_22px]" />
        <div className="absolute h-96 w-96 -top-56 -right-56 bg-primary/30 rounded-full blur-[140px] animate-pulse-fast" />
        <div className="absolute h-80 w-80 -bottom-56 -left-56 bg-primary/70 rounded-full blur-[120px] animate-pulse-fast delay-500" />
      </div>
      <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
