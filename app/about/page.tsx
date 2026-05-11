import { Zap, Target, Shield, Users } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";

export async function generateMetadata() {
  return {
    title: "About | Boxing Essential",
    description: "Learn about Boxing Essential - your trusted resource for boxing training, nutrition, and gear reviews.",
  };
}

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <Breadcrumbs items={[{ label: "About" }]} />

      <h1 className="text-3xl lg:text-4xl font-black tracking-tight mb-4">
        About Boxing Essential
      </h1>
      <p className="text-lg text-muted-foreground leading-relaxed mb-12">
        We&apos;re on a mission to make expert boxing knowledge accessible to everyone.
      </p>

      {/* Mission */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 border-l-4 border-primary pl-4">Our Mission</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            Boxing Essential was founded with a simple belief: every boxer deserves access to quality training information, regardless of their gym, coach, or budget. Too many fighters learn through trial and error, picking up bad habits that take years to unlearn.
          </p>
          <p>
            We create in-depth, evidence-based content that covers every aspect of boxing - from the fundamentals of stance and footwork to advanced fight strategy, from proper nutrition for weight class athletes to honest gear reviews that save you money.
          </p>
          <p>
            Every article on Boxing Essential is written or reviewed by experienced coaches and fighters. We don&apos;t publish fluff. We publish content that makes a real difference in your training and performance.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 border-l-4 border-primary pl-4">What We Stand For</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="p-5 rounded-lg border border-border/50 bg-card">
            <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center mb-3">
              <Target className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-base font-semibold mb-1.5">Accuracy First</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Every technique, recommendation, and review is backed by real experience. We test what we recommend.
            </p>
          </div>
          <div className="p-5 rounded-lg border border-border/50 bg-card">
            <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center mb-3">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-base font-semibold mb-1.5">Community Driven</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Built by fighters, for fighters. Our content is shaped by the questions and needs of real boxers.
            </p>
          </div>
          <div className="p-5 rounded-lg border border-border/50 bg-card">
            <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center mb-3">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-base font-semibold mb-1.5">Honest Reviews</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Our gear reviews are unbiased. We disclose affiliate relationships and never let them influence our recommendations.
            </p>
          </div>
          <div className="p-5 rounded-lg border border-border/50 bg-card">
            <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center mb-3">
              <Zap className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-base font-semibold mb-1.5">Continuous Growth</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Boxing evolves, and so do we. We constantly update our content to reflect the latest training methods and research.
            </p>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 border-l-4 border-primary pl-4">Why Trust Us</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            Our team includes certified boxing coaches, sports nutritionists, and competitive fighters with decades of combined experience. We don&apos;t just write about boxing - we live it.
          </p>
          <p>
            When we review gear, we use it for weeks before publishing. When we write training guides, we test them with real athletes. When we cover nutrition, we consult with sports dietitians who work with combat athletes.
          </p>
          <p>
            Boxing Essential is reader-supported through affiliate partnerships. This means we may earn a commission when you purchase through our links, but it never affects our recommendations. We only recommend products we genuinely believe in.
          </p>
        </div>
      </section>
    </div>
  );
}
