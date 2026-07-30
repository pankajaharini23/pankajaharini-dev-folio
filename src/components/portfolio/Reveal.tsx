import { useEffect, useRef, type ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("is-visible");
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="relative mx-auto w-full max-w-6xl scroll-mt-24 px-5 py-20 sm:px-8 md:py-28">
      <Reveal>
        <div className="flex flex-col items-start gap-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-accent/60 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-primary" />
            {eyebrow}
          </span>
          <h2 className="max-w-3xl text-3xl font-bold leading-[1.15] text-foreground sm:text-4xl md:text-[2.6rem]">
            {title}
          </h2>
          {description ? (
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
              {description}
            </p>
          ) : null}
          <div className="section-rule mt-2 w-full max-w-xs" />
        </div>
      </Reveal>
      <div className="mt-12">{children}</div>
    </section>
  );
}

