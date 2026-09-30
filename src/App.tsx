import { Sidebar } from "./components/Sidebar";
import { Intro } from "./components/Intro";
import { About } from "./components/About";
import { Approach } from "./components/Approach";
import { Experience } from "./components/Experience";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-bg"
      >
        Skip to content
      </a>
      <div className="mx-auto max-w-[1440px] lg:flex">
        <Sidebar />
        <div className="min-w-0 flex-1">
          <main>
            <Intro />
            <About />
            <Approach />
            <Experience />
            <Skills />
            <Projects />
            <Contact />
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}
