import { useEffect, useState } from "react";
import { ArrowRight, Download, Mail, MapPin, Sparkles } from "lucide-react";
import profile from "@/assets/profile.jpg";
import { Reveal } from "./Reveal";

const ROLES = [
  "Software Engineer",
  "Java Learner",
  "Web Developer",
  "Tech Enthusiast",
  "Problem Solver",
];

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
    <span className="font-display text-xl font-semibold text-gradient sm:text-2xl">
      {text}
      <span className="animate-caret ml-0.5 font-normal text-primary">|</span>
    </span>
  );
}

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pb-16 pt-28 sm:pt-32 md:pb-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-blob absolute -left-24 top-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div
          className="animate-blob absolute right-0 top-40 h-80 w-80 rounded-full bg-primary-glow/25 blur-3xl"
          style={{ animationDelay: "-4s" }}
        />
        <div
          className="animate-blob absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-accent/60 blur-3xl"
          style={{ animationDelay: "-8s" }}
        />
      </div>

      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr]">
        <Reveal>
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-primary">
            <Sparkles size={14} /> Available for internships &amp; collaborations
          </span>

          <p className="mt-6 text-base font-medium text-muted-foreground">Hi there, I am</p>
          <h1 className="mt-2 text-4xl font-bold leading-[1.05] text-foreground sm:text-6xl">
            Pankaja Harini <span className="text-gradient">R. S</span>
          </h1>
          <p className="mt-4 text-base font-medium text-foreground/80 sm:text-lg">
            Aspiring Software Engineer | B.Tech IT Student | Java &amp; Web Development Enthusiast
          </p>
          <div className="mt-3 h-9">
            <Typewriter />
          </div>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            I'm an undergraduate Information Technology student at SRM Easwari Engineering College
            with a passion for software development and emerging technologies. I enjoy solving
            problems, building impactful applications, continuously learning new tools, and
            collaborating on innovative projects.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5"
            >
              <Download size={16} /> Download Resume
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-accent"
            >
              View Projects <ArrowRight size={16} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
            >
              <Mail size={16} /> Contact Me
            </a>
          </div>

          <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin size={16} className="text-primary" /> Chennai, Tamil Nadu, India
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative mx-auto w-full max-w-sm">
            <div
              aria-hidden="true"
              className="absolute -inset-4 rounded-[2.5rem] bg-gradient-primary opacity-20 blur-2xl"
            />
            <div className="glass relative overflow-hidden rounded-[2rem] p-3">
              <img
                src={profile}
                alt="Portrait of Pankaja Harini R. S"
                width={912}
                height={912}
                className="aspect-square w-full rounded-[1.5rem] object-cover"
              />
              <div className="flex items-center justify-between gap-3 px-3 py-4">
                <div>
                  <p className="font-display text-sm font-semibold">B.Tech IT</p>
                  <p className="text-xs text-muted-foreground">2025 – 2029</p>
                </div>
                <div className="text-right">
                  <p className="font-display text-sm font-semibold">SRM Easwari</p>
                  <p className="text-xs text-muted-foreground">Engineering College</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
