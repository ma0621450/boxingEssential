import bgImg from "@/public/aboutBg.jpg";
import aboutTrainingImg from "@/public/aboutTrainingImg.jpg"
import outboxer from "@/public/outBoxer.jpg"
import swarmer from "@/public/swarmer.jpg"
import counterPuncher from "@/public/counterPuncher.jpg"
import slugger from "@/public/powerPuncher.jpg"
import boxerPuncher from "@/public/boxerPuncher.jpg"
import mAli from "@/public/mAli.png"
import mtyson from "@/public/mtyson.jpg"
import srr from "@/public/SRR.jpg"
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle,
  Target,
  Eye,
  Dumbbell,
  Zap,
  BarChart,
  Shield,
  Users,
  Mail
} from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";

export async function generateMetadata() {
  return {
    title: "About Us | Boxing Essential",
    description: "Welcome to Boxing Essential - Your Knockout Destination for All Things Boxing!",
  };
}

export default function AboutPage() {
  const fightingStyles = [
    {
      title: "Out‑Boxer",
      subtitle: "The Technician",
      tools: "Long jab, swift footwork, range control",
      bestFor: "Tall fighters with agility and patience",
      famous: "Muhammad Ali",
      image: outboxer
    },
    {
      title: "Swarmer",
      subtitle: "Pressure Fighter",
      tools: "Aggressive volume punches, close-range fighting",
      bestFor: "Tough, high-stamina boxers who love the inside fight",
      famous: "Mike Tyson",
      image: swarmer
    },
    {
      title: "Counter‑Puncher",
      subtitle: "The Tactician",
      tools: "Timing, defense, and sharp counters",
      bestFor: "Thinkers, tactical fighters with quick reflexes",
      famous: "Floyd Mayweather Jr.",
      image: counterPuncher
    },
    {
      title: "Slugger",
      subtitle: "Power Puncher",
      tools: "KO power, heavy combinations",
      bestFor: "Physically strong fighters who seek knockouts",
      famous: "George Foreman",
      image: slugger
    },
    {
      title: "Boxer‑Puncher",
      subtitle: "Switch-Hitter",
      tools: "Adaptability, varied combos, footwork",
      bestFor: "Well-rounded fighters who adjust mid-fight",
      famous: "Terence Crawford",
      image: boxerPuncher
    }
  ];

  const legends = [
    {
      name: "Muhammad Ali",
      description: "Known as 'The Greatest,' Muhammad Ali began his career in 1960 and won the heavyweight title at just 22. Ali's speed, skill, and signature quote 'Float like a butterfly, sting like a bee' defined his unique style.",
      stats: "61 Fights | 57 Wins | 37 KOs",
      image: mAli
    },
    {
      name: "Mike Tyson",
      description: "One of the most feared heavyweights, Mike Tyson became the youngest heavyweight champion at 20. Known for his explosive power and aggressive style, he won 50 fights, 44 by knockout.",
      stats: "58 Fights | 50 Wins | 44 KOs",
      image: mtyson
    },
    {
      name: "Sugar Ray Robinson",
      description: "A pioneer of the 'pound for pound' rankings, Sugar Ray Robinson won 173 of 200 fights. His adaptability, speed, and strength across multiple divisions earned him a lasting place among boxing's greatest.",
      stats: "200 Fights | 173 Wins | 108 KOs",
      image: srr
    }
  ];


  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <Image
          src={bgImg}
          alt="Boxing Gym"
          fill
          className="object-cover brightness-[0.3]"
          priority
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <Breadcrumbs items={[{ label: "About" }]} />
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-6 uppercase italic">
            Welcome to <span className="text-primary">Boxing Essential</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-medium leading-relaxed">
            Your Knockout Destination for All Things Boxing!
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-4">Our Story</h2>
              <h3 className="text-3xl md:text-4xl font-black mb-8 leading-tight">
                At Boxing Essential, we live and <span className="text-primary">breathe boxing.</span>
              </h3>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Whether you're a beginner exploring the sport, a fitness enthusiast, or a seasoned fighter, our mission is to deliver powerful content, expert gear reviews, and training tips that empower your boxing journey.
                </p>
                <div className="p-6 bg-secondary/30 rounded-2xl border-l-4 border-primary">
                  <p className="italic font-medium text-foreground">
                    "We're here to share the truth - what's effective, what's worth your money, and what you need to know to improve your game."
                  </p>
                </div>
              </div>
            </div>
            <div className="relative aspect-square">
              <div className="absolute inset-0 bg-primary/10 rounded-3xl -rotate-3 transition-transform hover:rotate-0 duration-500" />
              <Image
                src={aboutTrainingImg}
                alt="Boxing training"
                fill
                className="object-cover rounded-3xl relative z-10 shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20 bg-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-6">Who We Are</h2>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Boxing Essential was founded by a team of passionate boxing professionals and enthusiasts with over 10 years of experience in competitive boxing, coaching, and fitness training.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-background p-8 rounded-2xl border border-border/50 shadow-sm transition-all hover:shadow-md">
              <Users className="w-10 h-10 text-primary mb-6" />
              <h4 className="text-xl font-bold mb-4">Expert Team</h4>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Our team includes certified trainers, former amateur fighters, and gear reviewers who live and breathe the sport.
              </p>
            </div>
            <div className="bg-background p-8 rounded-2xl border border-border/50 shadow-sm transition-all hover:shadow-md">
              <Eye className="w-10 h-10 text-primary mb-6" />
              <h4 className="text-xl font-bold mb-4">Honest Reviews</h4>
              <p className="text-muted-foreground leading-relaxed text-sm">
                We saw a gap in the market - a lack of honest, experience-based reviews. We prioritize depth and firsthand experience over flashy promotions.
              </p>
            </div>
            <div className="bg-background p-8 rounded-2xl border border-border/50 shadow-sm transition-all hover:shadow-md">
              <CheckCircle className="w-10 h-10 text-primary mb-6" />
              <h4 className="text-xl font-bold mb-4">Real Insights</h4>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Every recommendation comes from a place of experience and critical evaluation - not sponsorship deals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 border-t border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold uppercase tracking-wider">
                <Target className="w-4 h-4" /> Our Mission
              </div>
              <p className="text-2xl md:text-3xl font-bold leading-tight">
                To educate, inform, and empower boxers of all levels through experience-driven content and high-performance strategies.
              </p>
              <p className="text-muted-foreground">
                We aim to break the noise of flashy promotions and shallow content. Instead, we deliver truth, precision, and passion straight from the ring to your screen.
              </p>
            </div>
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-bold uppercase tracking-wider">
                <BarChart className="w-4 h-4" /> Our Vision
              </div>
              <p className="text-2xl md:text-3xl font-bold leading-tight">
                A worldwide ecosystem where anyone can access professional-level boxing knowledge and become part of a resilient community.
              </p>
              <p className="text-muted-foreground">
                Regardless of location, budget, or background, we envision a future where everyone can find their fighting identity and grow through the sport.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Train Like A Champion */}
      <section className="py-24 bg-zinc-950 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/10 blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-primary font-bold uppercase tracking-[0.3em] mb-4">Performance</h2>
            <h3 className="text-4xl md:text-6xl font-black uppercase italic mb-6 italic">Train Like A Champion</h3>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Get the full boxing workout experience - intense, energizing, and skill-building - without the bruises, black eyes, or broken noses.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            {[
              "Speed Bag", "Heavy Bag", "Double End Bag", "Hitting Mitts",
              "Shadow Box", "Jumping Rope", "Calisthenics", "Technique"
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <Dumbbell className="w-5 h-5 text-primary shrink-0" />
                <span className="font-bold text-sm sm:text-base">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fighting Types */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-6">Discover Your Style</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Boxing isn’t one-size-fits-all. Every fighter is unique, and so is their style. We help you discover the style that matches your physical traits and mental approach.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {fightingStyles.map((style) => (
              <div key={style.title} className="group flex flex-col h-full bg-secondary/20 rounded-2xl overflow-hidden border border-border/50 transition-all hover:-translate-y-2 hover:bg-secondary/40">
                <div className="relative h-40">
                  <Image src={style.image} alt={style.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h4 className="text-white font-black uppercase text-xl leading-none">{style.title}</h4>
                    <p className="text-primary text-xs font-bold mt-1 uppercase tracking-wider">{style.subtitle}</p>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="space-y-4 mb-6">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest block mb-1">Tools</span>
                      <p className="text-sm font-medium leading-relaxed">{style.tools}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest block mb-1">Best For</span>
                      <p className="text-sm font-medium leading-relaxed">{style.bestFor}</p>
                    </div>
                  </div>
                  <div className="mt-auto pt-4 border-t border-border/50">
                    <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest block mb-1">Icon</span>
                    <p className="text-sm font-black">{style.famous}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Training Resources */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-black mb-8 italic uppercase tracking-tight">
                Customized <br /> Training Guides
              </h2>
              <p className="text-xl opacity-90 mb-8 leading-relaxed">
                We don't believe in generic training. We offer field-tested, progressive, and scalable guides whether you're training at home or at a pro gym.
              </p>
              <Link href="/training/boxing" className="h-12 px-8 inline-flex items-center justify-center rounded-full bg-white text-primary font-black uppercase tracking-wider hover:bg-gray-100 transition-colors shadow-xl">
                Explore Workouts
              </Link>
            </div>
            <div className="space-y-6">
              {[
                { type: "Out‑Boxers", focus: "Distance control drills, jab variations, lateral footwork" },
                { type: "Swarmers", focus: "Pressure sparring, body attacks, conditioning" },
                { type: "Counter‑Punchers", focus: "Timing, baiting, shoulder roll defense" },
                { type: "Sluggers", focus: "Power punches, explosive drills, range cutting" },
                { type: "Switch-Hitters", focus: "Versatility sparring, transition footwork, high IQ" }
              ].map((item) => (
                <div key={item.type} className="flex gap-4 items-start p-4 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10 transition-transform hover:translate-x-2">
                  <CheckCircle className="w-5 h-5 shrink-0" />
                  <div>
                    <h5 className="font-black uppercase text-sm mb-1">{item.type}</h5>
                    <p className="text-sm opacity-80">{item.focus}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-24 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-4">Our Ecosystem</h2>
            <h3 className="text-3xl md:text-5xl font-black mb-6">What We Offer</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                title: "In-Depth Gear Reviews",
                desc: "No gimmicks, no sponsorship bias. We rigorously test gloves, wraps, bags, and more.",
                icon: Shield
              },
              {
                title: "Science-Backed Training",
                desc: "Created by certified coaches, our guides help build stamina, technique, and IQ.",
                icon: Zap
              },
              {
                title: "Beginner & Pro Guides",
                desc: "From your first jab to advanced ring tactics, we cover it all step-by-step.",
                icon: Target
              },
              {
                title: "Boxing News & Updates",
                desc: "Stay current with upcoming fights, rankings, and analysis from inside the world.",
                icon: BarChart
              },
              {
                title: "Educational Content",
                desc: "SEO-friendly, easy-to-digest articles to help you learn and grow every day.",
                icon: Users
              }
            ].map((offer) => (
              <div key={offer.title} className="flex gap-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <offer.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-2">{offer.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{offer.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inspirations */}
      <section className="py-24 bg-zinc-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-primary font-bold uppercase tracking-[0.3em] mb-4">Inspirations</h2>
            <h3 className="text-3xl md:text-5xl font-black">Boxing's Greatest Icons</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {legends.map((legend) => (
              <div key={legend.name} className="group bg-white/5 rounded-3xl overflow-hidden border border-white/10 hover:border-primary/50 transition-colors">
                <div className="relative h-72">
                  <Image src={legend.image} alt={legend.name} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
                </div>
                <div className="p-8">
                  <h4 className="text-2xl font-black uppercase italic mb-2">{legend.name}</h4>
                  <p className="text-primary text-sm font-bold mb-4 uppercase">{legend.stats}</p>
                  <p className="text-gray-400 text-sm leading-relaxed">{legend.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-secondary/30 rounded-[3rem] p-12 lg:p-20 border border-border/50">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h3 className="text-3xl md:text-5xl font-black mb-8">Why Choose Us</h3>
                <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                  We understand that trust must be earned. That's why we hold ourselves to the highest standards of transparency and accountability.
                </p>
                <div className="space-y-4">
                  {[
                    "No paid promotions just real reviews",
                    "Written by fighters and coaches, not marketers",
                    "Every product tested under real training conditions",
                    "Transparent research process with user feedback",
                    "10+ years of hands-on boxing experience"
                  ].map((text) => (
                    <div key={text} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                        <CheckCircle className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span className="font-bold text-sm sm:text-base">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative bg-background p-8 rounded-3xl border border-border/50 shadow-2xl">
                <p className="text-lg font-medium leading-relaxed italic text-muted-foreground mb-6">
                  "You deserve honest advice, not hype. Every article we publish is backed by expert experience, actual performance data, and verified user feedback."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-black">BE</div>
                  <div>
                    <p className="font-bold">Boxing Essential Team</p>
                    <p className="text-xs text-muted-foreground">Certified Coaches & Fighters</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Community */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary opacity-5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-black uppercase mb-8">Join our <span className="text-primary underline underline-offset-8">community</span></h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
            Boxing Essential is more than content — it's a movement. A family. A culture of fighters who respect the grind.
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-12 text-sm font-black uppercase tracking-widest text-muted-foreground">
            <span>Fighters</span>
            <span>Beginners</span>
            <span>Coaches</span>
            <span>Fans</span>
          </div>
        </div>
      </section>

      {/* Get In Touch */}
      <section id="socials" className="py-24 bg-zinc-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h3 className="text-3xl md:text-5xl font-black mb-6 uppercase italic">Get In Touch</h3>
              <p className="text-gray-400 mb-10 text-lg">Let's grow together. Train together. Fight together.</p>

              <div className="flex items-center gap-6 mb-12">
                <a href="#" className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center hover:bg-primary transition-all duration-300" title="Instagram">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.981 1.28.058 1.688.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
                <a href="#" className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center hover:bg-primary transition-all duration-300" title="Facebook">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a href="#" className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center hover:bg-primary transition-all duration-300" title="X (Twitter)">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                  </svg>
                </a>
              </div>

              <div className="flex items-center gap-4 p-6 bg-white/5 rounded-2xl border border-white/10">
                <Mail className="w-6 h-6 text-primary" />
                <div>
                  <p className="text-xs font-bold uppercase text-gray-500 mb-1">Email us</p>
                  <a href="mailto:boxingessential79@gmail.com" className="text-lg font-black hover:text-primary transition-colors">
                    boxingessential79@gmail.com
                  </a>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center bg-primary/10 p-10 rounded-[2rem] border border-primary/20">
              <h4 className="text-2xl font-black mb-4">Have a question?</h4>
              <p className="text-gray-400 mb-8">Want to collaborate or suggest a topic? Reach out to us anytime. We respond to every single message.</p>
              <Link href="/contact-us" className="h-14 px-8 inline-flex items-center justify-center rounded-xl bg-primary text-white font-black uppercase tracking-wider hover:scale-105 transition-all">
                Send Message
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
