import { useEffect, useRef, useState } from "react";
import {
  Award,
  BookOpen,
  Braces,
  Brain,
  Briefcase,
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

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / 1400, 1);
        setValue(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [to]);

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
            <article className="glass h-full rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-1">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-primary">
                <q.icon size={20} />
              </span>
              <h3 className="mt-4 text-base font-semibold">{q.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{q.text}</p>
            </article>
          </Reveal>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 70}>
            <div className="glass rounded-2xl p-5 text-center">
              <p className="font-display text-3xl font-bold text-gradient">
                <Counter to={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                {s.label}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
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
      <div className="relative border-l border-border pl-8">
        <Reveal>
          <span className="absolute -left-[13px] top-1 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground">
            <GraduationCap size={13} />
          </span>
          <article className="glass rounded-2xl p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              2025 – 2029 (Expected)
            </p>
            <h3 className="mt-2 text-xl font-semibold">SRM Easwari Engineering College</h3>
            <p className="text-sm text-muted-foreground">
              Bachelor of Technology — Information Technology
            </p>
            <ul className="mt-4 grid gap-2 text-sm text-muted-foreground">
              <li>• Current undergraduate student</li>
              <li>• Building strong foundations in programming and software engineering</li>
              <li>• Learning modern technologies and problem solving</li>
            </ul>
          </article>
        </Reveal>
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
            <article className="glass h-full rounded-2xl p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-primary">
                  <group.icon size={18} />
                </span>
                <h3 className="text-lg font-semibold">{group.title}</h3>
              </div>
              <div className="mt-5 grid gap-4">
                {group.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-gradient-primary transition-[width] duration-1000"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </Reveal>
        ))}

        <Reveal delay={160}>
          <article className="glass h-full rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-primary">
                <Lightbulb size={18} />
              </span>
              <h3 className="text-lg font-semibold">Currently Learning</h3>
            </div>
            <ul className="mt-5 grid gap-3">
              {LEARNING.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-border/70 p-3 text-sm"
                >
                  <Sparkles size={16} className="mt-0.5 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </Reveal>

        <Reveal delay={220}>
          <article className="glass h-full rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-primary">
                <Handshake size={18} />
              </span>
              <h3 className="text-lg font-semibold">Soft Skills</h3>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {SOFT_SKILLS.map((s) => (
                <span
                  key={s.label}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-2 text-sm font-medium transition-colors hover:border-primary/50 hover:text-primary"
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
      <div className="relative border-l border-border pl-8">
        <Reveal>
          <span className="absolute -left-[13px] top-1 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground">
            <Briefcase size={13} />
          </span>
          <article className="glass rounded-2xl p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              Club Member
            </p>
            <h3 className="mt-2 text-xl font-semibold">ENN Club Member</h3>
            <p className="text-sm text-muted-foreground">SRM Easwari Engineering College</p>
            <div className="mt-4 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
              <p>• Active member of the ENN Club</p>
              <p>• Enthusiastic volunteer</p>
              <p>• Participated in collaborative activities</p>
              <p>• Interested in organizing events</p>
              <p>• Enjoy working with teams</p>
              <p>• Passionate about real-world learning</p>
            </div>
          </article>
        </Reveal>
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
            <article className="glass h-full rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground">
                <a.icon size={19} />
              </span>
              <h3 className="mt-4 text-base font-semibold">{a.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{a.text}</p>
            </article>
          </Reveal>
        ))}
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
        <article className="glass overflow-hidden rounded-3xl">
          <div className="grid lg:grid-cols-2">
            <img
              src={medilink}
              alt="MediLink healthcare platform dashboard preview"
              loading="lazy"
              width={1280}
              height={800}
              className="h-full w-full object-cover"
            />
            <div className="p-6 sm:p-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-primary">
                <Layers size={13} /> Web Application
              </span>
              <h3 className="mt-4 text-2xl font-bold">
                MediLink – AI Powered Unified Healthcare Platform
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Developed a modern healthcare web application that provides a unified healthcare
                ecosystem with AI-powered features for patients and healthcare professionals.
              </p>

              <div className="mt-5 grid gap-1.5 text-sm text-muted-foreground sm:grid-cols-2">
                {FEATURES.map((f) => (
                  <p key={f}>• {f}</p>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {STACK.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground"
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
                  className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-accent"
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
            <article className="glass h-full rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-primary">
                <c.icon size={19} />
              </span>
              <h3 className="mt-4 text-base font-semibold">{c.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{c.text}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
                <Award size={13} /> Open
              </span>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
