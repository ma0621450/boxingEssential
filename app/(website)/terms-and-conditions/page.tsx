import { Scale, Mail, Globe, Lock, UserCheck, ShieldAlert, Clock, Link as LinkIcon, Edit, FileText, Ban, Zap, Info } from "lucide-react";

export const metadata = {
  title: "Terms and Conditions | Boxing Essential",
  description: "By accessing and using Boxing Essential website, you agree to be bound by our Terms and Conditions.",
};

export default function TermsPage() {
  const sections = [
    { id: "acceptance", title: "1. Acceptance of Terms" },
    { id: "changes", title: "2. Changes to Terms" },
    { id: "use", title: "3. Use of Website" },
    { id: "property", title: "4. Intellectual Property Rights" },
    { id: "user-content", title: "5. User-Generated Content" },
    { id: "links", title: "6. Third-Party Links" },
    { id: "disclaimer", title: "7. Disclaimer of Warranties" },
    { id: "liability", title: "8. Limitation of Liability" },
    { id: "termination", title: "9. Termination" },
    { id: "law", title: "10. Governing Law" },
    { id: "contact", title: "11. Contact Us" },
  ];

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-300 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-600/10 border border-red-600/20 mb-6">
            <Scale className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
            Terms & <span className="text-red-600">Conditions</span>
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto font-medium">
            Welcome to Boxing Essential. By accessing and using Boxing Essential website, you agree to be bound by the following Terms and Conditions.
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
          <section id="acceptance" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <UserCheck className="w-6 h-6 text-red-600" />
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight">1. Acceptance of Terms</h2>
            </div>
            <p className="leading-relaxed text-zinc-400">
              By using this website, you confirm that you have read, understood, and agree to comply with these Terms and Conditions, as well as our Privacy Policy. These terms apply to all visitors, users, and others who access or use the site.
            </p>
          </section>

          {/* Section 2 */}
          <section id="changes" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-6 h-6 text-red-600" />
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight">2. Changes to Terms</h2>
            </div>
            <p className="leading-relaxed text-zinc-400">
              We reserve the right to update or modify these Terms at any time without prior notice. The updated version will be posted on this page, and your continued use of the site after any changes constitutes your acceptance of those changes.
            </p>
          </section>

          {/* Section 3 */}
          <section id="use" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <Ban className="w-6 h-6 text-red-600" />
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight">3. Use of Website</h2>
            </div>
            <p className="mb-4 text-zinc-400">You agree to use Boxing Essential for lawful purposes only. You must not:</p>
            <ul className="space-y-3">
              {[
                "Violate any applicable local, national, or international law",
                "Post or transmit any content that is harmful, defamatory, abusive, obscene, or otherwise objectionable",
                "Attempt to gain unauthorized access to any part of the website, server, or connected database"
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-zinc-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-600 mt-1.5 shrink-0" />
                  {text}
                </li>
              ))}
            </ul>
          </section>

          {/* Section 4 */}
          <section id="property" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-6 h-6 text-red-600" />
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight">4. Intellectual Property Rights</h2>
            </div>
            <div className="prose prose-invert max-w-none text-zinc-400">
              <p>All content on this website including articles, logos, graphics, images, videos, and layout is the property of Boxing Essential or licensed to us and is protected by copyright and intellectual property laws.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-zinc-800/30 p-4 rounded-xl border border-zinc-700/50">
                  <span className="font-bold text-white block mb-2 uppercase text-xs tracking-widest">You May:</span>
                  <p className="text-sm">View and print content for personal, non-commercial use only.</p>
                </div>
                <div className="bg-red-600/5 p-4 rounded-xl border border-red-600/20">
                  <span className="font-bold text-red-500 block mb-2 uppercase text-xs tracking-widest">You May Not:</span>
                  <p className="text-sm">Copy, reproduce, republish, or distribute any content without written permission.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section id="user-content" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="w-6 h-6 text-red-600" />
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight">5. User-Generated Content</h2>
            </div>
            <p className="text-zinc-400 leading-relaxed">
              If you post content on our website (e.g., blog comments or contact forms), you grant us a non-exclusive, royalty-free, perpetual license to use, reproduce, and publish that content. However, we reserve the right to remove any content that is deemed inappropriate or violates our terms.
            </p>
          </section>

          {/* Section 6 */}
          <section id="links" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <LinkIcon className="w-6 h-6 text-red-600" />
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight">6. Third-Party Links</h2>
            </div>
            <p className="text-zinc-400 leading-relaxed">
              Our website may contain links to third-party websites. We are not responsible for the content, policies, or practices of any external sites. Accessing those links is at your own risk.
            </p>
          </section>

          {/* Section 7 */}
          <section id="disclaimer" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <Info className="w-6 h-6 text-red-600" />
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight">7. Disclaimer of Warranties</h2>
            </div>
            <div className="prose prose-invert max-w-none text-zinc-400">
              <p>The content provided on Boxing Essential is for general informational purposes only. While we strive for accuracy, we do not warrant that the content is complete, reliable, or current. Your use of the site is at your own risk.</p>
              <p className="mt-4">We provide no warranties express or implied regarding:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Fitness for a particular purpose</li>
                <li>Non-infringement</li>
                <li>Accuracy or reliability of content</li>
              </ul>
            </div>
          </section>

          {/* Section 8 */}
          <section id="liability" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <ShieldAlert className="w-6 h-6 text-red-600" />
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight">8. Limitation of Liability</h2>
            </div>
            <div className="prose prose-invert max-w-none text-zinc-400">
              <p>To the fullest extent permitted by law, Boxing Essential and its team shall not be liable for any damages arising out of or related to your use of the site. This includes:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Direct, indirect, incidental, or consequential damages</li>
                <li>Loss of data, profits, or reputation</li>
                <li>Any technical issues, errors, or omissions</li>
              </ul>
            </div>
          </section>

          {/* Section 9 */}
          <section id="termination" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <Ban className="w-6 h-6 text-red-600" />
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight">9. Termination</h2>
            </div>
            <p className="text-zinc-400 leading-relaxed">
              We reserve the right to terminate or suspend access to our website, without prior notice or liability, for any reason, including if you violate these Terms.
            </p>
          </section>

          {/* Section 10 */}
          <section id="law" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <Globe className="w-6 h-6 text-red-600" />
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight">10. Governing Law</h2>
            </div>
            <p className="text-zinc-400 leading-relaxed">
              These Terms and Conditions are governed by and construed in accordance with the laws of USA, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </section>

          {/* Section 11 */}
          <section id="contact" className="scroll-mt-24">
            <div className="text-center bg-zinc-800/20 border border-zinc-800 p-8 rounded-3xl">
              <Mail className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-4">11. Contact Us</h2>
              <p className="text-zinc-400 mb-6 max-w-md mx-auto">
                If you have any questions about these Terms, you can contact us at:
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
