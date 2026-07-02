export function LoadingScreen() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex items-center gap-3 label-caps text-ink-muted">
        <span className="h-1 w-1 animate-pulse rounded-full bg-blue" />
        Loading
      </div>
    </div>
  );
}
