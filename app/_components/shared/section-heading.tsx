import { cn } from "cn";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  /** Barra vertical Bordô à esquerda do título. */
  bar?: boolean;
  /** "dark": título/descrição em creme, para seções escuras. */
  tone?: "light" | "dark";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  bar = true,
  tone = "light",
}: SectionHeadingProps) {
  const dark = tone === "dark";

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {eyebrow ? (
        <span
          className={cn(
            "text-sm font-semibold uppercase tracking-wide",
            dark ? "text-accent" : "text-primary"
          )}
        >
          <span aria-hidden="true">— </span>
          {eyebrow}
        </span>
      ) : null}

      <div className={cn("flex gap-3", bar ? "items-stretch" : "items-center")}>
        {bar ? (
          <span
            aria-hidden="true"
            className={cn(
              "mt-1 w-1 shrink-0 origin-top rounded-full motion-safe:animate-[heading-bar-grow_0.5s_ease-out]",
              dark ? "bg-accent" : "bg-primary"
            )}
          />
        ) : null}
        <h2
          className={cn(
            "font-heading text-3xl font-medium sm:text-4xl",
            dark ? "text-dark-brown-foreground" : "text-foreground"
          )}
        >
          {title}
        </h2>
      </div>

      {description ? (
        <p
          className={cn(
            "max-w-2xl text-base sm:text-lg",
            dark ? "text-dark-brown-foreground/80" : "text-muted-foreground"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
