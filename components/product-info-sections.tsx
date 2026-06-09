import { Check, X, Zap } from "lucide-react";

export function KeyFeatures({ features }: { features: string[] }) {
  if (!features.length) return null;

  return (
    <section aria-labelledby="features-heading">
      <h2 id="features-heading" className="text-xl font-black mb-4">
        Key Features
      </h2>
      <ul className="grid gap-2">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2 text-sm">
            <Zap className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Specifications({
  specs,
}: {
  specs: { label: string; value: string }[];
}) {
  if (!specs.length) return null;

  return (
    <section className="mt-8" aria-labelledby="specs-heading">
      <h2 id="specs-heading" className="text-xl font-black mb-4">
        Specifications
      </h2>
      <dl className="rounded-xl border border-border/50 divide-y divide-border/30">
        {specs.map((spec, i) => (
          <div key={i} className="flex justify-between gap-4 px-4 py-3 text-sm">
            <dt className="text-muted-foreground font-medium">{spec.label}</dt>
            <dd className="font-semibold text-right">{spec.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function Benefits({ benefits }: { benefits: string[] }) {
  if (!benefits.length) return null;

  return (
    <section className="mt-8" aria-labelledby="benefits-heading">
      <h2 id="benefits-heading" className="text-xl font-black mb-4">
        Benefits
      </h2>
      <ul className="grid gap-2">
        {benefits.map((benefit, i) => (
          <li key={i} className="flex items-start gap-2 text-sm">
            <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
            <span>{benefit}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ProsAndCons({
  pros,
  cons,
}: {
  pros: string[];
  cons: string[];
}) {
  if (!pros.length && !cons.length) return null;

  return (
    <section className="mt-8" aria-labelledby="pros-cons-heading">
      <h2 id="pros-cons-heading" className="text-xl font-black mb-4">
        Pros &amp; Cons
      </h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {pros.length > 0 && (
          <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-5">
            <h3 className="font-bold text-green-400 mb-3">Pros</h3>
            <ul className="space-y-2">
              {pros.map((pro, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {cons.length > 0 && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5">
            <h3 className="font-bold text-red-400 mb-3">Cons</h3>
            <ul className="space-y-2">
              {cons.map((con, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

export function ExpertReview({ review }: { review: string }) {
  if (!review) return null;

  return (
    <section className="mt-8" aria-labelledby="expert-review-heading">
      <h2 id="expert-review-heading" className="text-xl font-black mb-4">
        Expert Review
      </h2>
      <blockquote className="rounded-xl border border-border/50 bg-secondary/20 p-6 text-muted-foreground leading-relaxed italic">
        {review}
      </blockquote>
      <p className="text-xs text-muted-foreground mt-2">
        — Boxing Essential Editorial Team
      </p>
    </section>
  );
}
