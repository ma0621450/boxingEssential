"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Dumbbell, Trophy, HeartPulse } from "lucide-react";
import { cn } from "@/lib/utils";
import logo from "@/public/boxinglogo.png"
import Image from "next/image";

function isLinkActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

const navLinkClass = (active: boolean) =>
  cn(
    "px-3 py-2 text-sm font-medium rounded-md transition-colors",
    active
      ? "text-foreground bg-secondary"
      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
  );

const mobileNavLinkClass = (active: boolean) =>
  cn(
    "px-3 py-2.5 text-sm font-medium rounded-md transition-colors",
    active
      ? "text-foreground bg-secondary"
      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
  );

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
        color: "text-red-500 bg-red-500/10 dark:bg-red-500/20",
      },
      {
        href: "/training/boxing",
        label: "Boxing Training",
        description: "Ring technique, mitt work & sparring preparation.",
        icon: Trophy,
        color: "text-amber-500 bg-amber-500/10 dark:bg-amber-500/20",
      },
      {
        href: "/training/fitness",
        label: "Fitness Training",
        description: "High-energy cardio conditioning & fat-burn routines.",
        icon: HeartPulse,
        color: "text-emerald-500 bg-emerald-500/10 dark:bg-emerald-500/20",
      },
    ],
  },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const pathname = usePathname();
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
            <Image
              src={logo}
              alt="Boxing Essential"
              width={117}
              height={70}
              className="h-14 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              if (link.dropdownItems) {
                const isTrainingActive = link.dropdownItems.some((item) =>
                  isLinkActive(pathname, item.href)
                );

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
                        dropdownOpen || isTrainingActive
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
                          const itemActive = isLinkActive(pathname, item.href);
                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              className={cn(
                                "flex items-start gap-3 p-3 rounded-lg transition-colors",
                                itemActive
                                  ? "bg-secondary text-foreground"
                                  : "hover:bg-secondary"
                              )}
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
                  className={navLinkClass(isLinkActive(pathname, link.href!))}
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
              className={cn(
                "h-9 px-4 inline-flex items-center gap-2 rounded-md border text-sm font-semibold transition-colors",
                isLinkActive(pathname, "/live")
                  ? "border-primary bg-secondary text-foreground"
                  : "border-border bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:text-primary hover:border-primary"
              )}
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
                const isTrainingActive = link.dropdownItems.some((item) =>
                  isLinkActive(pathname, item.href)
                );

                return (
                  <div key={link.label} className="w-full">
                    <button
                      onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                      className={cn(
                        "w-full flex items-center justify-between",
                        mobileNavLinkClass(isTrainingActive)
                      )}
                    >
                      <span>{link.label}</span>
                      <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", mobileDropdownOpen && "rotate-180")} />
                    </button>
                    {mobileDropdownOpen && (
                      <div className="pl-4 pr-2 py-1 flex flex-col gap-1 border-l border-border/60 ml-3 mt-1 mb-2 animate-in fade-in slide-in-from-top-1 duration-200">
                        {link.dropdownItems.map((item) => {
                          const Icon = item.icon;
                          const itemActive = isLinkActive(pathname, item.href);
                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => {
                                setMobileDropdownOpen(false);
                                setMobileOpen(false);
                              }}
                              className={cn(
                                "flex items-center gap-3 p-2 rounded-md transition-colors",
                                itemActive
                                  ? "bg-secondary text-foreground"
                                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                              )}
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
                  className={mobileNavLinkClass(isLinkActive(pathname, link.href!))}
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
