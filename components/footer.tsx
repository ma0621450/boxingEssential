import Link from "next/link";
import { categories } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-sm bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-black text-sm">BE</span>
              </div>
              <span className="text-lg font-bold tracking-tight">
                Boxing<span className="text-primary">Essential</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Your go-to resource for boxing training, nutrition, gear reviews, and fight strategy. Train smarter. Fight better. Stay stronger.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Categories</h3>
            <ul className="space-y-2.5">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/${cat.slug}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Resources</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  All Blogs
                </Link>
              </li>
              <li>
                <Link href="/beginner-guides" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Beginner Start Here
                </Link>
              </li>
              <li>
                <Link href="/gear-reviews" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Gear Reviews
                </Link>
              </li>
              <li>
                <Link href="/training" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Training Programs
                </Link>
              </li>
              <li>
                <Link href="/nutrition" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Nutrition Plans
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Affiliate Disclosure
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Boxing Essential. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Boxing Essential is a participant in affiliate advertising programs. We may earn commissions on purchases through our links.
          </p>
        </div>
      </div>
    </footer>
  );
}
