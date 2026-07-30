import { useEffect, useRef, useState } from "react";
import {
  Award,
  BookOpen,
  Braces,
  Brain,
  Briefcase,
  CheckCircle2,
  Code2,
  Compass,
  ExternalLink,
  Github,
  GraduationCap,
  Handshake,
  Layers,
  Lightbulb,
  Megaphone,
  MessagesSquare,
  Mic,
  Repeat,
  Rocket,
  Sparkles,
  Target,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import medilink from "@/assets/medilink.jpg";
import { Reveal, Section } from "./Reveal";

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [value, setValue] = useState(0);
  const { ref, inView } = useInView<HTMLSpanElement>();

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / 1400, 1);
      setValue(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, to]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

const QUALITIES = [
  { icon: BookOpen, title: "Passionate Learner", text: "Always exploring new tools and ideas." },
  { icon: Compass, title: "Curious Developer", text: "Digs into how and why things work." },
  { icon: Users, title: "Team Player", text: "Collaborates openly and reliably." },
  { icon: Target, title: "Leadership", text: "Takes initiative and guides teams." },
  { icon: MessagesSquare, title: "Communication", text: "Clear, structured and confident." },
  { icon: Mic, title: "Public Speaking", text: "Award-winning stage presence." },
  { icon: Zap, title: "Quick Learner", text: "Picks up new tech rapidly." },
  { icon: Repeat, title: "Adaptable", text: "Comfortable with change and feedback." },
];

const STATS = [
  { value: 3, suffix: "+", label: "Programming languages" },
  { value: 8, suffix: "", label: "Core soft skills" },
  { value: 1, suffix: "", label: "Featured project" },
  { value: 2029, suffix: "", label: "Expected graduation" },
];

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About Me"
      title="Building strong foundations, one project at a time"
      description="I am currently pursuing a B.Tech in Information Technology at SRM Easwari Engineering College. My goal is to become a skilled software engineer by continuously learning modern technologies, software tools, and development practices. I enjoy exploring new ideas, improving my technical knowledge, and building solutions that make a positive impact."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {QUALITIES.map((q, i) => (
          <Reveal key={q.title} delay={i * 60}>
            <article className="premium-card glass group h-full rounded-2xl p-5">
              <div className="flex items-start justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-primary transition-colors duration-300 group-hover:bg-gradient-primary group-hover:text-primary-foreground">
                  <q.icon size={20} />
                </span>
                <span className="font-display text-xl font-bold text-muted-foreground/25">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-4 text-base font-semibold">{q.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{q.text}</p>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={120}>
        <div className="glass mt-6 grid overflow-hidden rounded-3xl sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="border-b border-border/60 px-6 py-7 text-center last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0"
            >
              <p className="font-display text-4xl font-bold text-gradient">
                <Counter to={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

function TimelineItem({
  icon: Icon,
  meta,
  title,
  subtitle,
  children,
}: {
  icon: typeof GraduationCap;
  meta: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative pl-10 sm:pl-14">
      <span className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground shadow-soft animate-pulse-ring sm:h-10 sm:w-10">
        <Icon size={16} />
      </span>
      <Reveal>
        <article className="premium-card glass rounded-2xl p-6 sm:p-7">
          <span className="inline-flex rounded-full bg-accent px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
            {meta}
          </span>
          <h3 className="mt-3 text-xl font-semibold sm:text-2xl">{title}</h3>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
          {children}
        </article>
      </Reveal>
    </div>
  );
}

export function Education() {
  return (
    <Section
      id="education"
      eyebrow="Education"
      title="Academic journey"
      description="A strong academic foundation in information technology, programming and software engineering."
    >
      <div className="relative">
        <span className="absolute left-4 top-2 hidden h-[calc(100%-1rem)] w-px bg-gradient-to-b from-primary/60 via-primary/20 to-transparent sm:left-5 sm:block" />
        <TimelineItem
          icon={GraduationCap}
          meta="2025 – 2029 (Expected)"
          title="SRM Easwari Engineering College"
          subtitle="Bachelor of Technology — Information Technology"
        >
          <ul className="mt-5 grid gap-2.5 text-sm text-muted-foreground sm:grid-cols-2">
            {[
              "Current undergraduate student",
              "Strong foundations in programming & software engineering",
              "Learning modern technologies and problem solving",
              "Active participation in campus activities",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-primary" />
                {item}
              </li>
            ))}
          </ul>
        </TimelineItem>
      </div>
    </Section>
  );
}

const SKILL_GROUPS = [
  {
    icon: Code2,
    title: "Programming Languages",
    skills: [
      { name: "Python", level: 75 },
      { name: "C", level: 70 },
      { name: "Java (OOP & DSA)", level: 55 },
    ],
  },
  {
    icon: Braces,
    title: "Web Technologies",
    skills: [
      { name: "HTML", level: 85 },
      { name: "CSS", level: 80 },
      { name: "JavaScript", level: 65 },
    ],
  },
];

const LEARNING = [
  "Object-Oriented Programming using Java",
  "Data Structures using Java",
  "Modern Software Development Practices",
];

const SOFT_SKILLS = [
  { icon: Target, label: "Leadership" },
  { icon: Mic, label: "Public Speaking" },
  { icon: MessagesSquare, label: "Communication" },
  { icon: Users, label: "Teamwork" },
  { icon: Brain, label: "Problem Solving" },
  { icon: Repeat, label: "Adaptability" },
  { icon: BookOpen, label: "Continuous Learning" },
];

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div ref={ref}>
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">{name}</span>
        <span className="font-display text-xs font-semibold text-primary">{level}%</span>
      </div>
      <div className="relative mt-2 h-2.5 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-gradient-primary transition-[width] duration-[1200ms] ease-out"
          style={{ width: inView ? `${level}%` : "0%", transitionDelay: `${delay}ms` }}
        />
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="Technical & personal toolkit"
      description="A growing set of programming, web and interpersonal skills sharpened through coursework and self-learning."
    >
      <div className="grid gap-4 lg:grid-cols-2">
        {SKILL_GROUPS.map((group, gi) => (
          <Reveal key={group.title} delay={gi * 80}>
            <article className="premium-card glass h-full rounded-2xl p-6 sm:p-7">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-soft">
                  <group.icon size={19} />
                </span>
                <h3 className="text-lg font-semibold">{group.title}</h3>
              </div>
              <div className="mt-6 grid gap-5">
                {group.skills.map((skill, si) => (
                  <SkillBar key={skill.name} {...skill} delay={si * 120} />
                ))}
              </div>
            </article>
          </Reveal>
        ))}

        <Reveal delay={160}>
          <article className="premium-card glass h-full rounded-2xl p-6 sm:p-7">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-primary">
                <Lightbulb size={19} />
              </span>
              <h3 className="text-lg font-semibold">Currently Learning</h3>
            </div>
            <ul className="mt-6 grid gap-3">
              {LEARNING.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-border/70 bg-card/40 p-3.5 text-sm transition-colors hover:border-primary/40 hover:bg-accent/40"
                >
                  <Sparkles size={16} className="mt-0.5 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </Reveal>

        <Reveal delay={220}>
          <article className="premium-card glass h-full rounded-2xl p-6 sm:p-7">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-primary">
                <Handshake size={19} />
              </span>
              <h3 className="text-lg font-semibold">Soft Skills</h3>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {SOFT_SKILLS.map((s) => (
                <span
                  key={s.label}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-2 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary hover:shadow-soft"
                >
                  <s.icon size={15} className="text-primary" />
                  {s.label}
                </span>
              ))}
            </div>
          </article>
        </Reveal>
      </div>
    </Section>
  );
}

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience & Leadership"
      title="Involvement beyond the classroom"
      description="Leadership, volunteering and collaboration experiences that shape how I work with people."
    >
      <div className="relative">
        <span className="absolute left-4 top-2 hidden h-[calc(100%-1rem)] w-px bg-gradient-to-b from-primary/60 via-primary/20 to-transparent sm:left-5 sm:block" />
        <TimelineItem
          icon={Briefcase}
          meta="Club Member"
          title="ENN Club Member"
          subtitle="SRM Easwari Engineering College"
        >
          <div className="mt-5 grid gap-2.5 text-sm text-muted-foreground sm:grid-cols-2">
            {[
              "Active member of the ENN Club",
              "Enthusiastic volunteer",
              "Participated in collaborative activities",
              "Interested in organizing events",
              "Enjoy working with teams",
              "Passionate about real-world learning",
            ].map((item) => (
              <p key={item} className="flex items-start gap-2.5">
                <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-primary" />
                {item}
              </p>
            ))}
          </div>
        </TimelineItem>
      </div>
    </Section>
  );
}

const ACHIEVEMENTS = [
  { icon: Trophy, title: "Public Speaking Awards", text: "Multiple award winner in public speaking competitions." },
  { icon: Target, title: "Leadership Abilities", text: "Trusted to lead and coordinate team activities." },
  { icon: Megaphone, title: "Excellent Communication", text: "Confident presenter with clear articulation." },
  { icon: Users, title: "Active Participation", text: "Regularly involved in college activities and events." },
  { icon: Rocket, title: "Growth Mindset", text: "Dedicated learner focused on continuous improvement." },
];

export function Achievements() {
  return (
    <Section
      id="achievements"
      eyebrow="Achievements"
      title="Recognitions & strengths"
      description="Highlights from academics, competitions and campus life."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ACHIEVEMENTS.map((a, i) => (
          <Reveal key={a.title} delay={i * 70}>
            <article className="premium-card glass relative h-full rounded-2xl p-6">
              <span className="dot-grid pointer-events-none absolute right-0 top-0 h-24 w-24 opacity-40" />
              <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-soft">
                <a.icon size={20} />
              </span>
              <h3 className="relative mt-5 text-base font-semibold">{a.title}</h3>
              <p className="relative mt-1.5 text-sm text-muted-foreground">{a.text}</p>
            </article>
          </Reveal>
        ))}

        <Reveal delay={ACHIEVEMENTS.length * 70}>
          <article className="premium-card glass flex h-full flex-col justify-center rounded-2xl bg-gradient-primary p-6 text-primary-foreground">
            <Sparkles size={22} />
            <h3 className="mt-4 text-lg font-semibold">More on the way</h3>
            <p className="mt-1.5 text-sm opacity-90">
              Continuously participating in events, hackathons and technical competitions.
            </p>
          </article>
        </Reveal>
      </div>
    </Section>
  );
}

const FEATURES = [
  "AI Healthcare Assistant",
  "Patient Dashboard",
  "Appointment Management",
  "Digital Prescription Management",
  "Medical Record Storage",
  "Health Analytics Dashboard",
  "Responsive UI",
  "Secure Authentication",
];

const STACK = [
  "React.js",
  "Vite",
  "Tailwind CSS",
  "React Router",
  "Framer Motion",
  "Chart.js",
  "Lucide React",
];

export function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Portfolio"
      title="Featured project"
      description="Applying what I learn to build practical, user-focused applications."
    >
      <Reveal>
        <article className="premium-card glass overflow-hidden rounded-3xl">
          <div className="grid lg:grid-cols-2">
            <div className="relative min-h-64 overflow-hidden">
              <img
                src={medilink}
                alt="MediLink healthcare platform dashboard preview"
                loading="lazy"
                width={1280}
                height={800}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent lg:bg-gradient-to-r" />
              <span className="glass absolute bottom-4 left-4 rounded-full px-3.5 py-1.5 text-xs font-semibold">
                2025 · Academic build
              </span>
            </div>
            <div className="p-6 sm:p-9">
              <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-primary">
                <Layers size={13} /> Web Application
              </span>
              <h3 className="mt-4 text-2xl font-bold sm:text-3xl">
                MediLink – AI Powered Unified Healthcare Platform
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Developed a modern healthcare web application that provides a unified healthcare
                ecosystem with AI-powered features for patients and healthcare professionals.
              </p>

              <div className="mt-6 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                {FEATURES.map((f) => (
                  <p key={f} className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-primary" />
                    {f}
                  </p>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {STACK.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5"
                >
                  <ExternalLink size={15} /> Live Demo
                </a>
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:bg-accent"
                >
                  <Github size={15} /> GitHub
                </a>
              </div>
            </div>
          </div>
        </article>
      </Reveal>
    </Section>
  );
}

const INTERESTS = [
  { icon: Briefcase, title: "Internship Opportunities", text: "Hands-on software engineering internships." },
  { icon: Code2, title: "Freelance Projects", text: "Web development for small teams and creators." },
  { icon: Users, title: "Collaborative Projects", text: "Open-source and campus team builds." },
  { icon: Rocket, title: "Hackathons", text: "Fast-paced problem solving with new tech." },
];

export function CareerInterests() {
  return (
    <Section
      id="careers"
      eyebrow="Career Interests"
      title="Open for Opportunities"
      description="I am actively looking for opportunities to learn, collaborate, and contribute to innovative software projects while expanding my technical expertise."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {INTERESTS.map((c, i) => (
          <Reveal key={c.title} delay={i * 70}>
            <article className="premium-card glass group h-full rounded-2xl p-6">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-primary transition-colors duration-300 group-hover:bg-gradient-primary group-hover:text-primary-foreground">
                <c.icon size={20} />
              </span>
              <h3 className="mt-5 text-base font-semibold">{c.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{c.text}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
                <Award size={12} /> Open
              </span>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
