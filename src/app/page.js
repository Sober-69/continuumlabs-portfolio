"use client";

import { useState, useEffect } from "react";

const projects = [
  {
    id: 1,
    title: "Salah Reminder",
    description: "A prayer time reminder app with accurate location-based prayer timings and customizable alerts for all 5 daily prayers.",
    tech: ["React Native", "Expo", "Adhan API"],
    link: "#",
    gradient: "from-cyan-400 to-blue-600",
  },
  {
    id: 2,
    title: "Qi Block Blast",
    description: "An addictive block blast puzzle game with vibrant visuals, power-ups, and increasing difficulty levels.",
    tech: ["Unity", "C#", "Mobile"],
    link: "#",
    gradient: "from-purple-500 to-pink-500",
  },
];

function Header({ dark, toggleDark, menuOpen, setMenuOpen }) {
  const links = [
    { label: "Home", href: "#home" },
    { label: "Projects", href: "#projects" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#home" className="text-xl font-bold gradient-text tracking-wide">Continuumlabs</a>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">{l.label}</a>
          ))}
          <button onClick={toggleDark} className="px-3 py-1 text-xs rounded-full border border-white/20 hover:border-cyan-400/50 transition-all">
            {dark ? "☀️ Light" : "🌙 Dark"}
          </button>
        </nav>
        <div className="flex md:hidden items-center gap-3">
          <button onClick={toggleDark} className="px-3 py-1 text-xs rounded-full border border-white/20">{dark ? "☀️" : "🌙"}</button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-xl">{menuOpen ? "✕" : "☰"}</button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden glass border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)} className="text-gray-400 hover:text-cyan-400">{l.label}</a>
          ))}
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden px-4"
      style={{ backgroundImage: "linear-gradient(rgba(0,240,255,0.03) 1px, transparent 1px),linear-gradient(90deg,rgba(0,240,255,0.03)1px,transparent 1px)", backgroundSize: "50px 50px" }}>
      <div className="relative z-10 text-center max-w-4xl">
        <div className="inline-block px-4 py-1.5 mb-6 rounded-full glass text-xs text-cyan-400 border border-cyan-400/30 tracking-wider uppercase">
          AI Application Developer
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6">
          <span className="gradient-text">Ideas →</span><br />
          <span className="dark:text-white text-gray-900">Reality</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-10">
          I build intelligent applications, games, and tools that turn your vision into polished, shippable products.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#projects" className="px-8 py-3.5 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold text-sm hover:shadow-lg hover:shadow-purple-500/25 transition-all">
            View My Projects
          </a>
          <a href="#contact" className="px-8 py-3.5 rounded-lg glass border border-white/20 hover:border-cyan-400/50 text-sm font-semibold transition-all">
            Start a Project
          </a>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold gradient-text mb-4">My Projects</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto">Each project is built with passion and precision.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <div key={p.id} className="group relative glass rounded-xl p-6 glow-border transition-all duration-500 hover:-translate-y-2">
              <div className={`h-1.5 w-16 rounded-full bg-gradient-to-r ${p.gradient} mb-5`} />
              <h3 className="text-xl font-bold mb-3 dark:text-white text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-500 transition-all">
                {p.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-5 leading-relaxed">{p.description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {p.tech.map((t) => (
                  <span key={t} className="px-2.5 py-1 text-xs rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">{t}</span>
                ))}
              </div>
              {p.link !== "#" && (
                <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors">↗ Live App</a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  const skills = [
    { emoji: "🤖", label: "AI Applications", desc: "Intelligent apps powered by machine learning" },
    { emoji: "🎮", label: "Game Development", desc: "Mobile games with Unity & React Native" },
    { emoji: "⚡", label: "Full-Stack", desc: "From idea to app store — end to end" },
  ];
  return (
    <section id="about" className="py-24 px-4"
      style={{ backgroundImage: "linear-gradient(rgba(0,240,255,0.03)1px,transparent 1px),linear-gradient(90deg,rgba(0,240,255,0.03)1px,transparent 1px)", backgroundSize: "50px 50px" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold gradient-text mb-4">About Me</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto">I&apos;m an AI Application Developer passionate about turning ideas into working products.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {skills.map((s) => (
            <div key={s.label} className="glass rounded-xl p-6 text-center glow-border transition-all hover:-translate-y-1">
              <div className="text-3xl mb-4">{s.emoji}</div>
              <h3 className="font-bold mb-2 dark:text-white text-gray-900">{s.label}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-24 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold gradient-text mb-4">Start Your Project</h2>
          <p className="text-gray-500 dark:text-gray-400">Got an idea? Tell me about it and I&apos;ll bring it to life.</p>
        </div>
        <form action="https://formspree.io/f/YOUR_ENDPOINT" method="POST" className="glass rounded-xl p-8 space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1.5 dark:text-gray-300 text-gray-700">Your Name</label>
            <input type="text" name="name" required
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-cyan-400 focus:outline-none dark:text-white text-gray-900" placeholder="John Doe" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5 dark:text-gray-300 text-gray-700">Your Email</label>
            <input type="email" name="_replyto" required
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-cyan-400 focus:outline-none dark:text-white text-gray-900" placeholder="john@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5 dark:text-gray-300 text-gray-700">Your Idea</label>
            <textarea name="message" required rows={5}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-cyan-400 focus:outline-none dark:text-white text-gray-900 resize-none"
              placeholder="I have an idea for an app that..." />
          </div>
          <input type="text" name="_gotcha" className="hidden" />
          <button type="submit"
            className="w-full py-3.5 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold text-sm hover:shadow-lg hover:shadow-purple-500/25 transition-all">
            Send Message 🚀
          </button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-8 px-4 border-t border-white/10 glass">
      <div className="max-w-6xl mx-auto text-center text-sm text-gray-500">
        © {new Date().getFullYear()} <span className="gradient-text font-semibold">Continuumlabs</span> — Built with Next.js
      </div>
    </footer>
  );
}

export default function Home() {
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <>
      <Header dark={dark} toggleDark={() => setDark(!dark)} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main>
        <Hero />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
