import { Leaf } from "lucide-react";
import Image from "next/image";
import { cn } from "cn";
import { PSYCHOLOGY_REFERENCES } from "@/app/_lib/constants";

type Person = (typeof PSYCHOLOGY_REFERENCES.people)[number];

const ACCENT_BG: Record<Person["accent"], string> = {
  "dark-green": "bg-dark-green",
  primary: "bg-primary",
  accent: "bg-accent",
  secondary: "bg-secondary",
};

const PAPER_SHAPES = [
  "polygon(3% 8%, 97% 0%, 100% 92%, 4% 100%)",
  "polygon(0% 4%, 96% 0%, 100% 96%, 5% 100%)",
  "polygon(2% 0%, 100% 6%, 98% 100%, 0% 94%)",
];

const PHOTO_WIDTH: Record<Person["size"], string> = {
  sm: "w-24 sm:w-28",
  md: "w-32 sm:w-40",
  lg: "w-40 sm:w-52",
};

/** Único card sem tarja colorida atrás — leva um raminho de folha no lugar. */
const LEAF_ACCENT_NAME = "Lilian Meyer Frazão";

function PhotoBlock({ person, index }: { person: Person; index: number }) {
  const rotation = index % 2 === 0 ? -2 : 2;
  const isLeaf = person.name === LEAF_ACCENT_NAME;

  return (
    <div className={cn("relative shrink-0", PHOTO_WIDTH[person.size])}>
      {isLeaf ? (
        <Leaf aria-hidden className="absolute -top-3 -right-3 size-6 -rotate-12 text-dark-green" />
      ) : (
        <div
          aria-hidden
          className={cn("absolute -inset-2 rounded-lg", ACCENT_BG[person.accent])}
          style={{
            clipPath: PAPER_SHAPES[index % PAPER_SHAPES.length],
            transform: `rotate(${rotation}deg)`,
          }}
        />
      )}
      <span aria-hidden className="absolute -top-2 left-1/3 h-4 w-10 -rotate-6 bg-card/80 shadow-sm" />
      <div
        className="relative overflow-hidden rounded-md shadow-md ring-1 ring-black/5"
        style={{ aspectRatio: person.ratio }}
      >
        <Image
          src={person.image}
          alt={person.name}
          width={person.width}
          height={person.height}
          className="h-full w-full object-cover sepia-[.12] contrast-[1.03]"
          sizes="220px"
        />
      </div>
      <p
        className="mt-2 inline-block max-w-32 origin-top-left rounded-sm bg-card/90 px-1.5 py-1 font-hand text-base leading-tight text-primary shadow-sm sm:mt-3 sm:max-w-36 sm:text-lg"
        style={{ transform: `rotate(${-rotation}deg)` }}
      >
        {person.note}
      </p>
    </div>
  );
}

function ReferenceCard({ person, index }: { person: Person; index: number }) {
  const photoFirst = person.photoSide === "left";

  return (
    <article
      className={cn(
        "flex flex-col gap-2 rounded-xl border border-border/70 bg-card/50 p-3",
        "sm:gap-3 sm:rounded-none sm:border-0 sm:bg-transparent sm:p-0"
      )}
    >
      <div className="flex flex-row gap-3 sm:gap-5">
        <div className={photoFirst ? "order-1" : "order-2"}>
          <PhotoBlock person={person} index={index} />
        </div>
        <div
          className={cn("flex min-w-0 flex-1 flex-col gap-2", photoFirst ? "order-2" : "order-1")}
        >
          <span className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold tracking-[0.15em] text-primary uppercase">
            {person.number}
            <span aria-hidden className="h-px w-6 bg-primary/40" />
            {person.category}
          </span>
          <p className="text-sm text-muted-foreground">{person.text}</p>
        </div>
      </div>
      {/* Nome/cargo ficam sempre à esquerda do card, como na peça de referência
          (embaixo do texto quando a foto está à direita; embaixo da foto quando
          a foto está à esquerda, caso do Winnicott). No mobile o card ganha borda
          própria para deixar claro que nome pertence à foto de cima, não à
          próxima — empilhado, sem isso, os dois se confundiam. */}
      <div>
        <p className="font-heading text-lg text-primary">{person.name}</p>
        <p className="text-xs text-muted-foreground">{person.role}</p>
      </div>
    </article>
  );
}

export function ReferencesCollage() {
  const { eyebrow, title, titleEmphasis, intro, quote, footerLeft, footerRight, people } =
    PSYCHOLOGY_REFERENCES;

  return (
    <div className="rounded-2xl border border-border bg-secondary/60 p-4 sm:p-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
        <div className="max-w-xl">
          <span className="flex items-center gap-3 text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
            {eyebrow}
            <span aria-hidden className="h-px w-10 bg-border" />
          </span>
          <h3 className="mt-2 font-heading text-xl font-medium text-primary sm:mt-3 sm:text-3xl">
            {title}
            <em className="italic">{titleEmphasis}</em>.
          </h3>
          <p className="mt-2 text-sm text-muted-foreground sm:mt-4 sm:text-base">{intro}</p>
        </div>

        <p className="max-w-56 rotate-[-1deg] font-hand text-base leading-snug text-primary/80 sm:max-w-56 sm:text-lg sm:text-right">
          “{quote}”
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-6 sm:mt-10 sm:gap-10">
        <div className="grid gap-x-4 gap-y-6 sm:grid-cols-[1fr_1.3fr] sm:gap-x-8 sm:gap-y-10">
          <ReferenceCard person={people[0]} index={0} />
          <ReferenceCard person={people[1]} index={1} />
        </div>

        <div className="grid gap-x-4 gap-y-6 sm:grid-cols-3 sm:gap-x-8 sm:gap-y-10">
          <ReferenceCard person={people[2]} index={2} />
          <ReferenceCard person={people[3]} index={3} />
          <ReferenceCard person={people[4]} index={4} />
        </div>

        <div className="grid gap-x-4 gap-y-6 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10">
          <ReferenceCard person={people[5]} index={5} />
          <ReferenceCard person={people[6]} index={6} />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-2 border-t border-border pt-4 text-[11px] tracking-wider text-muted-foreground uppercase sm:mt-10 sm:flex-row sm:justify-between">
        <span>{footerLeft}</span>
        <span>{footerRight}</span>
      </div>
    </div>
  );
}
