"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      const res = await fetch("https://formspree.io/f/mkodgevz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("success");
        e.target.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" name="name" placeholder="Your Name" required
          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-cyan-500 outline-none" />
        <input type="email" name="email" placeholder="Your Email" required
          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-cyan-500 outline-none" />
      </div>

      <select name="projectType" required
        className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-cyan-500 outline-none">
        <option value="">Select project type</option>
        <option value="web-app">Web Application</option>
        <option value="mobile-app">Mobile App</option>
        <option value="ai-tool">AI / ML Tool</option>
        <option value="game">Game</option>
        <option value="api">API / Backend</option>
        <option value="other">Other</option>
      </select>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <select name="budget" required
          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-cyan-500 outline-none">
          <option value="">Budget range</option>
          <option value="<500">&lt; $500</option>
          <option value="500-2000">$500 – $2,000</option>
          <option value="2000-5000">$2,000 – $5,000</option>
          <option value="5000+">$5,000+</option>
        </select>
        <select name="timeline" required
          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-cyan-500 outline-none">
          <option value="">Timeline</option>
          <option value="1-2 weeks">1 – 2 weeks</option>
          <option value="1 month">1 month</option>
          <option value="2-3 months">2 – 3 months</option>
          <option value="flexible">Flexible / Not sure</option>
        </select>
      </div>

      <textarea name="message" placeholder="Describe your project idea, features, and any specific requirements..." required rows="5"
        className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-cyan-500 outline-none" />

      <input type="text" name="_gotcha" style={{ display: "none" }} />
      
      <button type="submit" disabled={status === "sending"}
        className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all disabled:opacity-50">
        {status === "sending" ? "Sending..." : "Send Request"}
      </button>

      {status === "success" && <p className="text-green-500 text-center">✅ Request sent! I'll get back to you soon.</p>}
      {status === "error" && <p className="text-red-500 text-center">❌ Something went wrong. Please try again.</p>}
    </form>
  );
}
