"use client";

import { useState } from "react";
import { Send, Mail, MessageSquare } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <Breadcrumbs items={[{ label: "Contact" }]} />

      <h1 className="text-3xl lg:text-4xl font-black tracking-tight mb-4">
        Get in Touch
      </h1>
      <p className="text-muted-foreground leading-relaxed mb-10 max-w-xl">
        Have a question, suggestion, or partnership inquiry? We&apos;d love to hear from you.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
        {/* Form */}
        <div>
          {submitted ? (
            <div className="p-8 rounded-xl bg-primary/10 border border-primary/20 text-center">
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <Send className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl font-bold mb-2">Message Sent!</h2>
              <p className="text-sm text-muted-foreground">
                Thanks for reaching out. We&apos;ll get back to you within 48 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1.5">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1.5">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1.5">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-y"
                  placeholder="How can we help?"
                />
              </div>
              <button
                type="submit"
                className="h-10 px-6 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
              >
                <Send className="h-4 w-4" />
                Send Message
              </button>
            </form>
          )}
        </div>

        {/* Sidebar info */}
        <div className="space-y-5">
          <div className="p-5 rounded-lg border border-border/50 bg-card">
            <div className="flex items-center gap-2 mb-2">
              <Mail className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold">Email Us</h3>
            </div>
            <p className="text-sm text-muted-foreground">hello@boxingessential.com</p>
          </div>
          <div className="p-5 rounded-lg border border-border/50 bg-card">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold">Response Time</h3>
            </div>
            <p className="text-sm text-muted-foreground">We typically respond within 24-48 hours.</p>
          </div>
          <div className="p-5 rounded-lg border border-border/50 bg-card">
            <div className="flex items-center gap-2 mb-2">
              <Send className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold">Partnerships</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Interested in sponsoring or partnering with us? Reach out and let&apos;s talk.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
