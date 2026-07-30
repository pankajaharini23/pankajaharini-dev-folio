import { useCallback, useEffect, useState } from "react";
import { ArrowUp, Github, Linkedin, Mail, Menu, Moon, Sun, X } from "lucide-react";

const LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "achievements", label: "Achievements" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export const LINKEDIN_URL = "https://www.linkedin.com/in/pankaja-harini-r-s-a54411381";
export const EMAIL = "pankajaharini.23@gmail.com";

function useTheme() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefers =
      stored === "dark" ||
      (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setDark(prefers);
    document.documentElement.classList.toggle("dark", prefers);
  }, []);

  const toggle = useCallback(() => {
    setDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  }, []);

  return { dark, toggle };
}

export function Navbar() {
  const { dark, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
      setScrolled(window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-gradient-primary transition-transform duration-150"
        style={{ transform: `scaleX(${progress / 100})` }}
        aria-hidden="true"
      />
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
          scrolled ? "glass" : "border-b border-transparent"
        }`}
      >
        <nav
          aria-label="Main"
          className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-3 sm:px-8"
        >
          <a href="#home" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary text-sm font-bold text-primary-foreground">
              PH
            </span>
            <span className="font-display text-base font-semibold tracking-tight">Pankaja</span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={`rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                    active === link.id
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggle}
              aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-accent"
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <a
              href="#contact"
              className="hidden rounded-full bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5 sm:inline-flex"
            >
              Hire Me
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle navigation menu"
              aria-expanded={open}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card lg:hidden"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>

        {open ? (
          <ul className="glass mx-4 mb-3 grid gap-1 rounded-2xl p-3 lg:hidden">
            {LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={() => setOpen(false)}
                  className={`block rounded-xl px-4 py-2.5 text-sm font-medium ${
                    active === link.id
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </header>
    </>
  );
}

export function SocialRail() {
  return (
    <div className="fixed left-5 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-3 xl:flex">
      {[
        { href: LINKEDIN_URL, label: "LinkedIn", Icon: Linkedin },
        { href: "https://github.com", label: "GitHub", Icon: Github },
        { href: `mailto:${EMAIL}`, label: "Email", Icon: Mail },
      ].map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={label}
          className="glass flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground transition-all hover:-translate-y-1 hover:text-primary"
        >
          <Icon size={18} />
        </a>
      ))}
      <span className="mt-2 h-20 w-px bg-border" aria-hidden="true" />
    </div>
  );
}

export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground shadow-elevated transition-transform hover:-translate-y-1"
    >
      <ArrowUp size={20} />
    </button>
  );
}
