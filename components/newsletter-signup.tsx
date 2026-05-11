"use client";

import { useState } from "react";
import { Mail, ArrowRight } from "lucide-react";

export function NewsletterSignup({ variant = "default" }: { variant?: "default" | "compact" | "inline" }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  if (variant === "inline") {
    return (
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 rounded-lg bg-secondary/50 border border-border/30">
        <div className="flex items-center gap-2 text-sm font-medium shrink-0">
          <Mail className="h-4 w-4 text-primary" />
          Get weekly boxing tips
        </div>
        {submitted ? (
          <p className="text-sm text-primary font-medium">Thanks for subscribing!</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2 flex-1 w-full sm:w-auto">
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 h-9 rounded-md border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
            <button
              type="submit"
              className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors shrink-0"
            >
              Join
            </button>
          </form>
        )}
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className="p-5 rounded-lg bg-secondary/30 border border-border/30">
        <div className="flex items-center gap-2 mb-3">
          <Mail className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold">Weekly Boxing Tips</h3>
        </div>
        {submitted ? (
          <p className="text-sm text-primary font-medium">You&apos;re in! Check your inbox.</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 h-9 rounded-md border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
            <button
              type="submit"
              className="h-9 px-3 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        )}
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 via-secondary/50 to-secondary/30 border border-border/30 p-8 lg:p-10">
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <Mail className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-bold">Get Weekly Boxing Tips</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-6 max-w-md">
          Join 5,000+ boxers who get our free weekly newsletter with training tips, gear reviews, and nutrition advice.
        </p>
        {submitted ? (
          <div className="flex items-center gap-2 text-primary font-medium">
            <Mail className="h-5 w-5" />
            <span>You&apos;re in! Check your inbox for a welcome email.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 h-11 rounded-md border border-input bg-background px-4 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <button
              type="submit"
              className="h-11 px-6 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors shrink-0"
            >
              Subscribe Free
            </button>
          </form>
        )}
        <p className="text-xs text-muted-foreground mt-3">No spam. Unsubscribe anytime.</p>
      </div>
    </div>
  );
}
