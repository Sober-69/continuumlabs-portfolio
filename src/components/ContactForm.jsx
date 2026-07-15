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
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <input type="text" name="name" placeholder="Your Name" required
        className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-cyan-500 outline-none" />
      <input type="email" name="email" placeholder="Your Email" required
        className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-cyan-500 outline-none" />
      <textarea name="message" placeholder="Your Message" required rows="5"
        className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-cyan-500 outline-none" />
      <input type="text" name="_gotcha" style={{ display: "none" }} />
      <button type="submit" disabled={status === "sending"}
        className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all disabled:opacity-50">
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>
      {status === "success" && <p className="text-green-500 text-center">✅ Message sent! I'll get back to you soon.</p>}
      {status === "error" && <p className="text-red-500 text-center">❌ Something went wrong. Please try again.</p>}
    </form>
  );
}
