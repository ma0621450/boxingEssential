"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Search, ChevronDown, Dumbbell, Trophy, HeartPulse } from "lucide-react";
import { cn } from "@/lib/utils";
import logo from "@/public/logo.png"
import Image from "next/image";

// Define structured navigation links. 
// Standard items have an href, while dropdown items have sub-items.
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/news", label: "News" },
  { href: "/shop", label: "Shop" },
  {
    label: "Training School",
    dropdownItems: [
      {
        href: "/training/gym",
        label: "Gym Training",
        description: "Strength, conditioning & athletic development workouts.",
        icon: Dumbbell,
        color: "text-red-500 bg-red-500/10 dark:bg-red-500/20"
      },
      {
        href: "/training/boxing",
        label: "Boxing Training",
        description: "Ring technique, mitt work & sparring preparation.",
        icon: Trophy,
        color: "text-amber-500 bg-amber-500/10 dark:bg-amber-500/20"
      },
      {
        href: "/training/fitness",
        label: "Fitness Training",
        description: "High-energy cardio conditioning & fat-burn routines.",
        icon: HeartPulse,
        color: "text-emerald-500 bg-emerald-500/10 dark:bg-emerald-500/20"
      }
    ]
  },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur-md">
      {/* Ad placeholder - header */}
      <div className="hidden lg:flex items-center justify-center bg-secondary/30 py-1.5 text-xs text-muted-foreground border-b border-border/30">
        <div className="w-[728px] h-[90px] bg-secondary/20 rounded flex items-center justify-center text-muted-foreground/50">
          Advertisement
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Image src={logo} alt="Logo" width={70} height={70} priority={true} />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              if (link.dropdownItems) {
                return (
                  <div
                    key={link.label}
                    className="relative group"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <button
                      className={cn(
                        "px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-1",
                        dropdownOpen
                          ? "text-foreground bg-secondary"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                      )}
                      aria-expanded={dropdownOpen}
                      aria-haspopup="true"
                    >
                      {link.label}
                      <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", dropdownOpen && "rotate-180")} />
                    </button>

                    {/* Dropdown Menu */}
                    <div
                      className={cn(
                        "absolute left-0 mt-1 w-80 rounded-xl border border-border bg-background p-2 shadow-xl transition-all duration-200 z-50",
                        dropdownOpen
                          ? "opacity-100 translate-y-0 pointer-events-auto"
                          : "opacity-0 -translate-y-2 pointer-events-none"
                      )}
                    >
                      <div className="grid gap-1">
                        {link.dropdownItems.map((item) => {
                          const Icon = item.icon;
                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary transition-colors"
                            >
                              <div className={cn("p-2 rounded-lg shrink-0", item.color)}>
                                <Icon className="h-5 w-5" />
                              </div>
                              <div>
                                <div className="text-sm font-semibold text-foreground">{item.label}</div>
                                <div className="text-xs text-muted-foreground mt-0.5 leading-normal">{item.description}</div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/live"
              className="h-9 px-4 inline-flex items-center gap-2 rounded-md border border-border bg-secondary text-secondary-foreground text-sm font-semibold hover:bg-secondary/80 hover:text-primary hover:border-primary transition-colors"
              aria-label="Search Blogs"
            >
              Streaming
            </Link>
            <Link
              href="/contact-us"
              className="h-9 px-4 inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Help Desk
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border/50 bg-background">
          <nav className="flex flex-col p-4 gap-1">
            {navLinks.map((link) => {
              if (link.dropdownItems) {
                return (
                  <div key={link.label} className="w-full">
                    <button
                      onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                      className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                    >
                      <span>{link.label}</span>
                      <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", mobileDropdownOpen && "rotate-180")} />
                    </button>
                    {mobileDropdownOpen && (
                      <div className="pl-4 pr-2 py-1 flex flex-col gap-1 border-l border-border/60 ml-3 mt-1 mb-2 animate-in fade-in slide-in-from-top-1 duration-200">
                        {link.dropdownItems.map((item) => {
                          const Icon = item.icon;
                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => {
                                setMobileDropdownOpen(false);
                                setMobileOpen(false);
                              }}
                              className="flex items-center gap-3 p-2 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                            >
                              <div className={cn("p-1.5 rounded-md", item.color)}>
                                <Icon className="h-4 w-4" />
                              </div>
                              <span className="text-sm font-medium">{item.label}</span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 text-sm font-medium rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/contact-us"
              onClick={() => setMobileOpen(false)}
              className="mt-2 h-10 inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Help Desk
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
