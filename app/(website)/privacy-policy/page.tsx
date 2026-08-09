import type { Metadata } from "next";
import { ShieldCheck, Mail, Globe, Lock, Cookie, UserCheck, Scale, AlertCircle, Clock, Link as LinkIcon, Edit, ShieldAlert } from "lucide-react";
import { SITE_BASE_URL } from "@/lib/sitemap-data";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Boxing Essential collects, uses, stores, and protects your personal data, including cookies, third parties, and your privacy rights.",
  alternates: { canonical: `${SITE_BASE_URL}/privacy-policy` },
  openGraph: {
    title: "Privacy Policy | Boxing Essential",
    description:
      "Read how Boxing Essential handles personal information, cookies, and data protection.",
    url: `${SITE_BASE_URL}/privacy-policy`,
    type: "website",
  },
};

export default function PrivacyPolicyPage() {
  const sections = [
    { id: "info", title: "1. Information We Collect" },
    { id: "usage", title: "2. How We Use Your Information" },
    { id: "cookies", title: "3. Cookies and Tracking Technologies" },
    { id: "third-party", title: "4. Third-Party Disclosure" },
    { id: "retention", title: "5. Data Retention" },
    { id: "rights", title: "6. Your Data Protection Rights" },
    { id: "children", title: "7. Children’s Privacy" },
    { id: "security", title: "8. Security of Your Information" },
    { id: "links", title: "9. Links to Other Websites" },
    { id: "changes", title: "10. Changes to This Privacy Policy" },
    { id: "contact", title: "11. Contact Us" },
  ];

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-300 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-600/10 border border-red-600/20 mb-6">
            <ShieldCheck className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
            Privacy <span className="text-red-600">Policy</span>
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto font-medium">
            At Boxing Essential the privacy of our visitors is of extreme importance to us. This Privacy Policy document outlines the types of personal information that is collected and recorded by Boxing Essential and how we use it.
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
          <section id="info" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <Globe className="w-6 h-6 text-red-600" />
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight">1. Information We Collect</h2>
            </div>
            <p className="mb-6 leading-relaxed">We may collect and process the following types of information:</p>
            <div className="space-y-4">
              {[
                { label: "Personal Identification Information", desc: "Name, email address, phone number, etc." },
                { label: "Technical Data", desc: "IP address, browser type, operating system, referring URLs, and date/time stamps." },
                { label: "Usage Data", desc: "Pages visited, time spent, and links clicked." },
                { label: "Communication Data", desc: "Any messages you send to us via forms, email, or comments." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-xl bg-zinc-800/30 border border-zinc-700/50">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-600 mt-2 shrink-0" />
                  <div>
                    <span className="font-bold text-white block mb-0.5">{item.label}</span>
                    <span className="text-zinc-400 text-sm">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 2 */}
          <section id="usage" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <UserCheck className="w-6 h-6 text-red-600" />
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight">2. How We Use Your Information</h2>
            </div>
            <p className="mb-4 text-zinc-400">We use your information to:</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "Provide, operate, and maintain our website",
                "Improve, personalize, and expand our services",
                "Understand and analyze how you use our site",
                "Communicate with you via email or messages",
                "Send you updates, promotions, or newsletters (with your consent)",
                "Detect and prevent fraud or misuse of our site"
              ].map((text, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-zinc-400">
                  <div className="w-1 h-1 rounded-full bg-red-600" />
                  {text}
                </li>
              ))}
            </ul>
          </section>

          {/* Section 3 */}
          <section id="cookies" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <Cookie className="w-6 h-6 text-red-600" />
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight">3. Cookies and Tracking Technologies</h2>
            </div>
            <div className="prose prose-invert max-w-none text-zinc-400">
              <p>Boxing Essential uses cookies and similar tracking technologies to enhance your browsing experience. Cookies may:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Store user preferences</li>
                <li>Track user behavior and interaction</li>
                <li>Enable Google Analytics and third-party tools</li>
              </ul>
              <p>You can choose to disable cookies through your browser settings. However, this may affect your ability to access certain features of the site.</p>
            </div>
          </section>

          {/* Section 4 */}
          <section id="third-party" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="w-6 h-6 text-red-600" />
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight">4. Third-Party Disclosure</h2>
            </div>
            <div className="prose prose-invert max-w-none text-zinc-400">
              <p>We do not sell, trade, or otherwise transfer your Personally Identifiable Information to outside parties except when:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Required by law or legal process</li>
                <li>In connection with business transfers such as mergers or acquisitions</li>
                <li>With trusted third parties who assist in operating the website (under confidentiality agreements)</li>
              </ul>
              <p>Third-party services (like Google Analytics or advertising platforms) may collect certain data as per their own privacy policies.</p>
            </div>
          </section>

          {/* Section 5 */}
          <section id="retention" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-6 h-6 text-red-600" />
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight">5. Data Retention</h2>
            </div>
            <p className="text-zinc-400 leading-relaxed">
              We retain personal data only as long as necessary to fulfill the purposes for which it was collected, unless a longer retention period is required or permitted by law.
            </p>
          </section>

          {/* Section 6 */}
          <section id="rights" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <Scale className="w-6 h-6 text-red-600" />
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight">6. Your Data Protection Rights</h2>
            </div>
            <div className="prose prose-invert max-w-none text-zinc-400">
              <p>Depending on your location, you may have rights under laws like the GDPR or CCPA. These may include:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>The right to access, correct, or delete your personal data</li>
                <li>The right to object to or restrict processing</li>
                <li>The right to data portability</li>
                <li>The right to withdraw consent at any time</li>
              </ul>
              <p>To exercise these rights, please contact us.</p>
            </div>
          </section>

          {/* Section 7 */}
          <section id="children" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <ShieldAlert className="w-6 h-6 text-red-600" />
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight">7. Children’s Privacy</h2>
            </div>
            <p className="text-zinc-400 leading-relaxed">
              Our website is not intended for children under the age of 13. We do not knowingly collect personal information from children. If we learn that we have collected such data, we will delete it promptly.
            </p>
          </section>

          {/* Section 8 */}
          <section id="security" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="w-6 h-6 text-red-600" />
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight">8. Security of Your Information</h2>
            </div>
            <p className="text-zinc-400 leading-relaxed">
              We use administrative, technical, and physical security measures to help protect your personal information. However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          {/* Section 9 */}
          <section id="links" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <LinkIcon className="w-6 h-6 text-red-600" />
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight">9. Links to Other Websites</h2>
            </div>
            <p className="text-zinc-400 leading-relaxed">
              Our website may contain links to external sites that are not operated by us. We are not responsible for the privacy practices or the content of those third-party websites.
            </p>
          </section>

          {/* Section 10 */}
          <section id="changes" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <Edit className="w-6 h-6 text-red-600" />
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight">10. Changes to This Privacy Policy</h2>
            </div>
            <p className="text-zinc-400 leading-relaxed">
              We reserve the right to update or modify this Privacy Policy at any time. Changes will be posted on this page with an updated “Effective Date.”
            </p>
          </section>

          {/* Section 11 */}
          <section id="contact" className="scroll-mt-24">
            <div className="text-center bg-zinc-800/20 border border-zinc-800 p-8 rounded-3xl">
              <Mail className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-4">11. Contact Us</h2>
              <p className="text-zinc-400 mb-6 max-w-md mx-auto">
                If you have any questions about this Privacy Policy, please contact us at:
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
