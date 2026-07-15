"use client";

import { useState, useEffect } from "react";
import { getProjects } from "@/data/projects";
import ContactForm from "@/components/ContactForm";

// ─── Hero Section ───
function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="gradient-text">Turning Ideas</span>
          <br />
          <span className="dark:text-white text-gray-900">Into Reality</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-8">
          I build intelligent apps, games, and tools that make a difference.
        </p>
        <div className="flex gap-4 justify-center">
          <a href="#projects" className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-3 rounded-full hover:shadow-lg hover:shadow-purple-500/25 transition-all">
            View Projects
          </a>
          <a href="#contact" className="border border-gray-300 dark:border-gray-700 px-8 py-3 rounded-full hover:border-cyan-500 transition-all dark:text-white text-gray-900">
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Projects Section ───
function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
        const localProjects = getProjects();
        setProjects(localProjects);
      }
      setLoading(false);
    };
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section id="projects" className="py-24 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-gray-400">Loading projects...</div>
        </div>
      </section>
    );
  }

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
              {p.icon && (
                <div className="text-4xl mb-4">
                  {p.icon.startsWith('http') ? (
                    <img src={p.icon} alt={p.title} className="w-12 h-12 rounded-lg object-cover" />
                  ) : (
                    <span>{p.icon}</span>
                  )}
                </div>
              )}
              <div className={`h-1.5 w-16 rounded-full bg-gradient-to-r ${p.gradient} mb-5`} />
              <h3 className="text-xl font-bold mb-3 dark:text-white text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-500 transition-all">
                {p.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-5 leading-relaxed">{p.description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {p.tech?.map((t) => (
                  <span key={t} className="px-2.5 py-1 text-xs rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">{t}</span>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                {p.link && p.link !== "#" && (
                  <a href={p.link} target="_blank" rel="noopener noreferrer"
                    className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors">↗ Live Demo</a>
                )}
                {p.downloadLink && (
                  <a href={p.downloadLink} target="_blank" rel="noopener noreferrer"
                    className="text-sm bg-gradient-to-r from-cyan-500 to-purple-600 px-4 py-1.5 rounded-full text-white hover:shadow-lg hover:shadow-purple-500/25 transition-all">⬇ Download</a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Main Page ───
export default function Home() {
  return (
    <main>
      <Hero />
      <Projects />
      <section id="contact" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold gradient-text mb-4">Get In Touch</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto">Have a project in mind? Let's talk.</p>
          </div>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
