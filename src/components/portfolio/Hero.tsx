import { useEffect, useState } from "react";
import {
  ArrowRight,
  Code2,
  Download,
  GraduationCap,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react";
import profile from "@/assets/profile.jpg";
import { Reveal } from "./Reveal";

const ROLES = [
  "Software Engineer",
  "Java Learner",
  "Web Developer",
  "Tech Enthusiast",
  "Problem Solver",
];

const TECH = ["Java", "Python", "C", "HTML", "CSS", "JavaScript", "React"];

function Typewriter() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = ROLES[index % ROLES.length];
    const done = !deleting && text === full;
    const cleared = deleting && text === "";

    const timeout = setTimeout(
      () => {
        if (done) return setDeleting(true);
        if (cleared) {
          setDeleting(false);
          setIndex((i) => (i + 1) % ROLES.length);
          return;
        }
        setText(deleting ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1));
      },
      done ? 1600 : deleting ? 45 : 85,
    );

    return () => clearTimeout(timeout);
  }, [text, deleting, index]);

  return (
    <span className="font-display text-lg font-semibold text-gradient sm:text-2xl">
      {text}
      <span className="animate-caret ml-0.5 font-normal text-primary">|</span>
    </span>
  );
}

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pb-20 pt-28 sm:pt-36 md:pb-28">
      {/* ambient background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="hero-grid absolute inset-0 opacity-[0.55]" />
        <div className="absolute inset-x-0 top-0 h-full bg-[radial-gradient(70%_55%_at_50%_0%,transparent,var(--background))]" />
        <div className="animate-blob absolute -left-28 top-8 h-80 w-80 rounded-full bg-primary/25 blur-[90px]" />
        <div
          className="animate-blob absolute -right-16 top-32 h-96 w-96 rounded-full bg-primary-glow/30 blur-[100px]"
          style={{ animationDelay: "-4s" }}
        />
        <div
          className="animate-blob absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-accent/70 blur-[90px]"
          style={{ animationDelay: "-8s" }}
        />
      </div>

      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Reveal>
            <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-primary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Available for internships &amp; collaborations
            </span>
          </Reveal>

          <Reveal delay={80}>
            <p className="mt-7 text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
              Hi there, I am
            </p>
            <h1 className="mt-3 text-[2.6rem] font-extrabold leading-[1.02] text-foreground sm:text-6xl lg:text-[4.2rem]">
              Pankaja Harini
              <span className="block text-gradient">R. S</span>
            </h1>
          </Reveal>

          <Reveal delay={140}>
            <div className="mt-5 flex min-h-9 items-center gap-3">
              <span className="hidden h-px w-10 bg-gradient-primary sm:block" aria-hidden="true" />
              <Typewriter />
            </div>
            <p className="mt-4 max-w-xl text-sm font-medium text-foreground/75 sm:text-base">
              Aspiring Software Engineer · B.Tech IT Student · Java &amp; Web Development Enthusiast
            </p>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              I'm an undergraduate Information Technology student at SRM Easwari Engineering College
              with a passion for software development and emerging technologies. I enjoy solving
              problems, building impactful applications, continuously learning new tools, and
              collaborating on innovative projects.
            </p>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/resume.pdf"
                download
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-elevated transition-transform duration-300 hover:-translate-y-1"
              >
                <Download size={16} className="transition-transform group-hover:translate-y-0.5" />
                Download Resume
              </a>
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full border border-primary/40 bg-card/60 px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-accent"
              >
                View Projects
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
              >
                <Mail size={16} /> Contact Me
              </a>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <MapPin size={15} className="text-primary" /> Chennai, Tamil Nadu, India
              </span>
              <span className="inline-flex items-center gap-2">
                <GraduationCap size={15} className="text-primary" /> SRM Easwari Engineering College
              </span>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {TECH.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-border bg-card/70 px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={160}>
          <div className="relative mx-auto w-full max-w-sm">
            {/* orbit rings */}
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 flex items-center justify-center"
            >
              <span className="absolute h-[112%] w-[112%] rounded-full border border-primary/15" />
              <span className="absolute h-[126%] w-[126%] rounded-full border border-primary/10" />
              <span className="absolute h-[95%] w-[95%] rounded-full bg-gradient-primary opacity-25 blur-3xl" />
            </div>

            <div className="glass relative rounded-[2.25rem] p-3">
              <div className="relative overflow-hidden rounded-[1.75rem]">
                <img
                  src={profile}
                  alt="Portrait of Pankaja Harini R. S"
                  width={912}
                  height={912}
                  className="aspect-square w-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background/85 to-transparent"
                />
                <div className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-2xl border border-border/60 bg-card/80 px-4 py-2.5 backdrop-blur-md">
                  <div>
                    <p className="font-display text-sm font-semibold">B.Tech IT</p>
                    <p className="text-[11px] text-muted-foreground">2025 – 2029</p>
                  </div>
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground">
                    <Code2 size={16} />
                  </span>
                </div>
              </div>
            </div>

            {/* floating chips */}
            <div
              className="glass animate-blob absolute -left-4 top-10 hidden items-center gap-2 rounded-2xl px-3.5 py-2.5 sm:flex"
              style={{ animationDuration: "9s" }}
            >
              <Sparkles size={15} className="text-primary" />
              <span className="text-xs font-semibold">Always learning</span>
            </div>
            <div
              className="glass animate-blob absolute -right-3 bottom-16 hidden rounded-2xl px-4 py-3 text-center sm:block"
              style={{ animationDuration: "11s", animationDelay: "-3s" }}
            >
              <p className="font-display text-lg font-bold text-gradient">2029</p>
              <p className="text-[11px] text-muted-foreground">Graduating</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
