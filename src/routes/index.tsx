import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { BackToTop, Navbar, SocialRail } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import {
  About,
  Achievements,
  CareerInterests,
  Education,
  Experience,
  Projects,
  Skills,
} from "@/components/portfolio/Sections";
import { Contact, Footer } from "@/components/portfolio/Contact";

const title = "Pankaja Harini R. S | Aspiring Software Engineer Portfolio";
const description =
  "Portfolio of Pankaja Harini R. S — B.Tech Information Technology student at SRM Easwari Engineering College, Java and web development enthusiast open to internships.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Navbar />
      <SocialRail />
      <main>
        <Hero />
        <About />
        <Education />
        <Skills />
        <Experience />
        <Achievements />
        <Projects />
        <CareerInterests />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <Toaster position="bottom-center" />
    </>
  );
}
