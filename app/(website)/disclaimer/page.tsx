import { AlertTriangle, Mail, Globe, Lock, ShieldCheck, Scale, Info, ShoppingBag, ExternalLink, Dumbbell, UserCheck, Edit } from "lucide-react";

export const metadata = {
  title: "Disclaimer | Boxing Essential",
  description: "This Disclaimer governs your use of our website and all content, articles, reviews, and external links available here.",
};

export default function DisclaimerPage() {
  const sections = [
    { id: "general", title: "1. General Information Only" },
    { id: "accuracy", title: "2. Accuracy of Information" },
    { id: "affiliations", title: "3. Product Reviews & Affiliations" },
    { id: "external", title: "4. External Links Disclaimer" },
    { id: "fitness", title: "5. Fitness & Training Content" },
    { id: "liability", title: "6. Limitation of Liability" },
    { id: "consent", title: "7. Consent" },
    { id: "updates", title: "8. Updates to This Disclaimer" },
    { id: "contact", title: "9. Contact Us" },
  ];

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-300 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-600/10 border border-red-600/20 mb-6">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
            Legal <span className="text-red-600">Disclaimer</span>
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto font-medium">
            Welcome to Boxing Essential. This Disclaimer governs your use of our website and all content, articles, reviews, and external links available here.
          </p>
        </div>

        {/* Table of Contents */}
        <div className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-2xl mb-12">
          <h2 className="text-lg font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
            <Edit className="w-4 h-4 text-red-600" /> Table of Contents
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="text-sm text-zinc-500 hover:text-red-500 transition-colors flex items-center gap-2">
                <span className="text-red-600/50">#</span> {s.title}
              </a>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-16 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 blur-[100px] -z-10" />
          
          {/* Section 1 */}
          <section id="general" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <Info className="w-6 h-6 text-red-600" />
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight">1. General Information Only</h2>
            </div>
            <p className="leading-relaxed text-zinc-400 mb-4">
              The information provided on Boxing Essential is for educational, informational, and entertainment purposes only. We are not medical professionals, certified trainers, or licensed equipment manufacturers. Any action you take based on the information on this site is strictly at your own risk.
            </p>
            <div className="bg-red-600/5 border border-red-600/20 p-4 rounded-xl flex gap-3">
              <ShieldCheck className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <p className="text-sm italic">Always consult with a qualified fitness expert, coach, or medical advisor before starting any boxing training or using any gear discussed here.</p>
            </div>
          </section>

          {/* Section 2 */}
          <section id="accuracy" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <Globe className="w-6 h-6 text-red-600" />
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight">2. Accuracy of Information</h2>
            </div>
            <p className="leading-relaxed text-zinc-400">
              While we strive to provide accurate and up-to-date content, Boxing Essential makes no warranties or guarantees regarding the completeness, reliability, or accuracy of any information published. Boxing is a dynamic sport, and industry standards, safety recommendations, and gear quality may evolve over time. We are not liable for any omissions or inaccuracies in the information provided.
            </p>
          </section>

          {/* Section 3 */}
          <section id="affiliations" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <ShoppingBag className="w-6 h-6 text-red-600" />
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight">3. Product Reviews & Affiliations</h2>
            </div>
            <p className="mb-6 text-zinc-400">Some content on this website may include product reviews or recommendations. These reviews reflect our honest opinions and research; however, please note:</p>
            <div className="space-y-4">
              {[
                "Boxing Essential may participate in affiliate programs. This means we may earn a small commission if you purchase a product through a link on our site, at no additional cost to you.",
                "Affiliate links help support the cost of running this website and producing helpful content.",
                "We only promote products we genuinely believe are beneficial to our audience."
              ].map((text, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-xl bg-zinc-800/30 border border-zinc-700/50">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-600 mt-2 shrink-0" />
                  <span className="text-zinc-400 text-sm leading-relaxed">{text}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4 */}
          <section id="external" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <ExternalLink className="w-6 h-6 text-red-600" />
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight">4. External Links Disclaimer</h2>
            </div>
            <p className="text-zinc-400 leading-relaxed">
              Our website may contain links to external websites or third-party content. These links are provided for your convenience and do not signify our endorsement. We have no control over the content, accuracy, or privacy practices of third-party sites and are not responsible for any loss or damage incurred from their use.
            </p>
          </section>

          {/* Section 5 */}
          <section id="fitness" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <Dumbbell className="w-6 h-6 text-red-600" />
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight">5. Fitness & Training Content</h2>
            </div>
            <p className="text-zinc-400 leading-relaxed">
              All training routines, boxing tips, fitness strategies, and health-related topics are intended for general informational purposes only. The content is not a substitute for professional advice or supervision. Engage in physical training or boxing activities at your own risk.
            </p>
          </section>

          {/* Section 6 */}
          <section id="liability" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <Scale className="w-6 h-6 text-red-600" />
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight">6. Limitation of Liability</h2>
            </div>
            <p className="text-zinc-400 leading-relaxed">
              Under no circumstances shall Boxing Essential or its team members be held liable for any direct, indirect, incidental, consequential, or special damages that result from the use of, or the inability to use, the website or the information contained therein.
            </p>
          </section>

          {/* Section 7 */}
          <section id="consent" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <UserCheck className="w-6 h-6 text-red-600" />
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight">7. Consent</h2>
            </div>
            <p className="text-zinc-400 leading-relaxed">
              By using our website, you hereby consent to this Disclaimer and agree to its terms.
            </p>
          </section>

          {/* Section 8 */}
          <section id="updates" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <Edit className="w-6 h-6 text-red-600" />
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight">8. Updates to This Disclaimer</h2>
            </div>
            <p className="text-zinc-400 leading-relaxed">
              We reserve the right to update, modify, or replace this Disclaimer at any time. Changes will be posted on this page with an updated “Effective Date.” It is your responsibility to check this page periodically for changes.
            </p>
          </section>

          {/* Section 9 */}
          <section id="contact" className="scroll-mt-24">
            <div className="text-center bg-zinc-800/20 border border-zinc-800 p-8 rounded-3xl">
              <Mail className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-4">9. Contact Us</h2>
              <p className="text-zinc-400 mb-6 max-w-md mx-auto">
                If you have any questions regarding this Disclaimer, please contact us at:
              </p>
              <a 
                href="mailto:boxingessential79@gmail.com" 
                className="inline-block bg-red-600 text-white px-8 py-3 rounded-full font-bold hover:bg-red-700 transition-all hover:scale-105 shadow-[0_0_20px_rgba(220,38,38,0.3)]"
              >
                boxingessential79@gmail.com
              </a>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
