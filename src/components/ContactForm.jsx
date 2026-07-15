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
      const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
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
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        required
        className="w-full p-2 border rounded"
      />
      <textarea
        name="message"
        placeholder="Your Message"
        required
        rows="5"
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="_gotcha"
        style={{ display: "none" }}
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>

      {status === "success" && (
        <p className="text-green-600">✅ Message sent! Thank you.</p>
      )}
      {status === "error" && (
        <p className="text-red-600">❌ Something went wrong. Try again.</p>
      )}
    </form>
  );
}
