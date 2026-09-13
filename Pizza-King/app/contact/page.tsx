// app/contact/page.tsx
"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: connect to backend/email service later
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-16">
      <div className="text-center mb-12">
        <span className="text-tomato text-sm font-semibold uppercase tracking-wide">
          Get In Touch
        </span>
        <h1 className="font-display font-700 text-4xl text-charcoal mt-2">
          We'd Love to Hear From You
        </h1>
        <p className="text-charcoal/60 mt-3 max-w-xl mx-auto">
          Questions, feedback, or a catering request — send us a message and
          we'll get back to you within 24 hours.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-full bg-tomato/10 flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5 text-tomato" />
            </div>
            <div>
              <h3 className="font-semibold text-charcoal">Phone</h3>
              <p className="text-charcoal/60 text-sm mt-1">+92 300 1234567</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-full bg-tomato/10 flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5 text-tomato" />
            </div>
            <div>
              <h3 className="font-semibold text-charcoal">Email</h3>
              <p className="text-charcoal/60 text-sm mt-1">hello@fornopizza.com</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-full bg-tomato/10 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-tomato" />
            </div>
            <div>
              <h3 className="font-semibold text-charcoal">Address</h3>
              <p className="text-charcoal/60 text-sm mt-1">
                Shahrah-e-Faisal, Karachi, Pakistan
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-full bg-tomato/10 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-tomato" />
            </div>
            <div>
              <h3 className="font-semibold text-charcoal">Hours</h3>
              <p className="text-charcoal/60 text-sm mt-1">
                Daily: 12:00 PM – 12:00 AM
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-cheese/10 rounded-2xl p-6 md:p-8">
          {submitted ? (
            <div className="text-center py-10">
              <h3 className="font-display font-700 text-xl text-charcoal">
                Message Sent!
              </h3>
              <p className="text-charcoal/60 mt-2">
                Thanks for reaching out — we'll reply soon.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-5 text-tomato font-semibold hover:underline text-sm"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-charcoal">Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 px-4 py-3 rounded-xl border border-charcoal/15 outline-none focus:border-tomato bg-white"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-charcoal">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 px-4 py-3 rounded-xl border border-charcoal/15 outline-none focus:border-tomato bg-white"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-charcoal">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full mt-1 px-4 py-3 rounded-xl border border-charcoal/15 outline-none focus:border-tomato bg-white resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-tomato hover:bg-tomatoDark transition-colors text-cream font-semibold py-3.5 rounded-full"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}