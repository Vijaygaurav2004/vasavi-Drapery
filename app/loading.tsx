export default function Loading() {
  return (
    <div className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center gap-5">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border border-primary/20 border-t-primary animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-primary/40" />
        </div>
      </div>
      <p className="text-xs uppercase tracking-widest text-muted-foreground font-light" style={{ letterSpacing: '0.25em' }}>
        Vasthrika
      </p>
    </div>
  )
}
