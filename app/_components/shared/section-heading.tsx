type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
};

export function SectionHeading({ eyebrow, title, description, className }: SectionHeadingProps) {
  return (
    <div className={`flex flex-col gap-3 ${className ?? ""}`}>
      {eyebrow ? (
        <span className="text-sm font-semibold uppercase tracking-wide text-primary">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="font-heading text-3xl font-medium text-foreground sm:text-4xl">{title}</h2>
      {description ? (
        <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
