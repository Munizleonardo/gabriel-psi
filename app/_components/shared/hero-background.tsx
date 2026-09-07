export function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="hero-blob-1 absolute -left-24 -top-24 size-80 rounded-full bg-primary/35 blur-3xl sm:size-96" />
      <div className="hero-blob-2 absolute -right-20 top-4 size-72 rounded-full bg-accent/20 blur-3xl sm:size-[26rem]" />
      <div className="hero-blob-3 absolute -bottom-28 left-1/3 size-72 rounded-full bg-primary/25 blur-3xl sm:size-80" />
    </div>
  );
}
