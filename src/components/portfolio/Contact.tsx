import { useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { Check, Copy, Github, Linkedin, Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { toast } from "sonner";
import { Reveal, Section } from "./Reveal";
import { EMAIL, LINKEDIN_URL } from "./Navbar";
import {
  EMAILJS_PUBLIC_KEY,
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
  emailjsConfigured,
} from "./emailjs";

const PHONE = "+91 6385101636";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [sending, setSending] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      toast.success("Email copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy email");
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim().slice(0, 100);
    const email = String(data.get("email") ?? "").trim().slice(0, 255);
    const subject = String(data.get("subject") ?? "").trim().slice(0, 150) || "Portfolio enquiry";
    const message = String(data.get("message") ?? "").trim().slice(0, 2000);

    if (!name || !email || !message) {
      toast.error("Please fill in your name, email and message.");
      return;
    }

    if (!emailjsConfigured) {
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(`${message}\n\nReply to: ${email}`)}`;
      toast.success("Opening your email app…");
      return;
    }

    setSending(true);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { from_name: name, from_email: email, subject, message, reply_to: email },
        { publicKey: EMAILJS_PUBLIC_KEY },
      );
      toast.success("Message sent — I'll get back to you soon!");
      form.reset();
    } catch {
      toast.error("Could not send right now. Please email me directly.");
    } finally {
      setSending(false);
    }
  };


  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's build something together"
      description="Have an opportunity, project idea, or just want to say hello? I'd love to hear from you."
    >
      <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <div className="glass grid h-full gap-4 rounded-2xl p-6">
            {[
              { icon: Mail, label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
              { icon: Phone, label: "Phone", value: PHONE, href: `tel:+916385101636` },
              { icon: MapPin, label: "Location", value: "Chennai, Tamil Nadu, India" },
              { icon: Linkedin, label: "LinkedIn", value: "pankaja-harini-r-s", href: LINKEDIN_URL },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
                  <item.icon size={18} />
                </span>
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer noopener"
                      className="block truncate text-sm font-medium hover:text-primary"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium">{item.value}</p>
                  )}
                </div>
              </div>
            ))}

            <div className="mt-2 flex flex-wrap gap-2">
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
              >
                <Mail size={15} /> Email Me
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-accent"
              >
                <Linkedin size={15} /> LinkedIn
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-accent"
              >
                {copied ? <Check size={15} /> : <Copy size={15} />} Copy Email
              </button>
            </div>

            <div className="mt-2 overflow-hidden rounded-xl border border-border">
              <iframe
                title="Map of Chennai, Tamil Nadu, India"
                src="https://www.openstreetmap.org/export/embed.html?bbox=80.0%2C12.85%2C80.35%2C13.2&layer=mapnik&marker=13.0827%2C80.2707"
                loading="lazy"
                className="h-56 w-full border-0"
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <form onSubmit={onSubmit} className="glass grid h-full gap-4 rounded-2xl p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-medium">
                Name
                <input
                  name="name"
                  required
                  placeholder="Your name"
                  className="rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                />
              </label>
              <label className="grid gap-2 text-sm font-medium">
                Email
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                />
              </label>
            </div>
            <label className="grid gap-2 text-sm font-medium">
              Subject
              <input
                name="subject"
                placeholder="Internship / project opportunity"
                className="rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium">
              Message
              <textarea
                name="message"
                required
                rows={6}
                placeholder="Tell me a little about it…"
                className="resize-none rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
              />
            </label>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5"
            >
              <Send size={16} /> Send Message
            </button>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border/70 py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-5 px-5 text-center sm:px-8">
        <div>
          <p className="font-display text-lg font-semibold">Pankaja Harini R. S</p>
          <p className="text-sm text-muted-foreground">Aspiring Software Engineer</p>
        </div>
        <div className="flex gap-3">
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
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:text-primary"
            >
              <Icon size={17} />
            </a>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          Made with ❤️ using React &amp; Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
